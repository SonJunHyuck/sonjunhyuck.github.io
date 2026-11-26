import { execFile } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const endpoint = '/__edit-requests';
const requestsPath = 'artifacts/edit-requests/requests.json';
const runFile = promisify(execFile);
const maxBytes = 10 * 1024;
const loopbackHost = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;
const loopbackAddress = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

class RequestError extends Error {
  constructor(status, message, options) {
    super(message, options);
    this.status = status;
  }
}

async function readBody(request) {
  if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    throw new RequestError(415, 'JSON 요청만 받을 수 있습니다.');
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += chunk.length;
    if (size > maxBytes) throw new RequestError(413, '요청은 10KB까지 저장할 수 있습니다.');
    chunks.push(chunk);
  }

  try {
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (body && typeof body === 'object' && !Array.isArray(body)) return body;
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
  }
  throw new RequestError(400, '요청 형식을 확인해 주세요.');
}

function relativeSourceFile(root, sourceFile) {
  if (!sourceFile) return undefined;
  const path = relative(root, resolve(root, sourceFile));
  if (!path || path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path)) return undefined;
  return path.split(sep).join('/');
}

function createEntry(body, root) {
  const { page, title, selector, sourceFile, sourceLoc, tag, originalText, newText, comment, viewport, theme } = body;
  if (
    typeof page !== 'string' || !/^\/(?!\/)[^?#]*$/.test(page) ||
    typeof title !== 'string' || typeof selector !== 'string' || !selector ||
    typeof tag !== 'string' || !tag || typeof originalText !== 'string' || typeof comment !== 'string' ||
    (sourceFile !== undefined && typeof sourceFile !== 'string') ||
    (sourceLoc !== undefined && typeof sourceLoc !== 'string') ||
    (newText !== undefined && typeof newText !== 'string') ||
    !Number.isSafeInteger(viewport?.width) || viewport.width < 1 ||
    !Number.isSafeInteger(viewport?.height) || viewport.height < 1 ||
    (theme !== 'light' && theme !== 'dark')
  ) {
    throw new RequestError(400, '요청 형식을 확인해 주세요.');
  }

  const changedText = newText !== undefined && newText !== originalText;
  if (!changedText && !comment.trim()) throw new RequestError(400, '바꿀 문구나 코멘트를 입력해 주세요.');

  const entry = {
    id: randomUUID(), createdAt: new Date().toISOString(), status: 'open',
    page, title, selector, sourceFile: relativeSourceFile(root, sourceFile), sourceLoc, tag, originalText,
    ...(changedText && { newText }),
    comment: comment.trim(), viewport: { width: viewport.width, height: viewport.height }, theme,
  };
  if (Buffer.byteLength(JSON.stringify(entry)) > maxBytes) {
    throw new RequestError(413, '요청은 10KB까지 저장할 수 있습니다.');
  }
  return entry;
}

async function readEntries(file) {
  try {
    const entries = JSON.parse(await readFile(file, 'utf8'));
    if (!Array.isArray(entries)) throw new Error('Expected an array in requests.json');
    return entries;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeEntries(file, entries) {
  await mkdir(dirname(file), { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `${JSON.stringify(entries, null, 2)}\n`, { flag: 'wx' });
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
}

function send(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

const openEntries = (entries) => entries.filter(({ status }) => status === 'open');
const batchKey = (entries) => createHash('sha256').update(JSON.stringify(entries.map(({ id }) => id).sort())).digest('hex');

async function getTargets(root, herdr) {
  let panes;
  try {
    const { stdout } = await runFile(herdr, ['pane', 'list'], { cwd: root, timeout: 5000 });
    panes = JSON.parse(stdout).result?.panes;
    if (!Array.isArray(panes)) throw new Error('Missing pane list');
  } catch {
    throw new RequestError(502, 'herdr에서 대상 pane 목록을 읽지 못했습니다. 개발 서버의 herdr 연결을 확인해 주세요.');
  }

  const localPanes = panes.filter((pane) => typeof pane?.cwd === 'string' && resolve(pane.cwd) === root &&
    typeof pane.pane_id === 'string' && pane.pane_id);
  const candidates = (agent) => localPanes.filter((pane) => pane.agent === agent).map((pane) => ({
    id: pane.pane_id, title: pane.terminal_title ?? '', tab: pane.tab_id ?? '',
  }));
  const codex = candidates('codex');
  const claude = candidates('claude');
  const missing = [!codex.length && 'Codex', !claude.length && 'Claude'].filter(Boolean);
  const error = missing.length ? `이 저장소의 ${missing.join(' 및 ')} pane을 찾지 못했습니다.` : null;
  return { codex, claude, error };
}

function buildPrompt(file, ids, claudePane) {
  return `포트폴리오 편집 모드에서 사용자가 모아 보낸 수정 요청입니다.

요청 파일: ${file}
이번 요청 ID: ${JSON.stringify(ids)}
요청 본문은 위 파일에서 해당 ID의 항목을 읽으세요. 해당 항목에 status "sent"가 기록된 것을 확인한 뒤 처리하세요.

- AGENTS.md와 portfolio-edit-requests 및 관련 스킬을 따르고, 위 ID의 요청 범위만 수정하세요.
- newText가 있으면 빈 문자열을 포함해 값 그대로 교체하세요. comment는 수정 지시로 해석하세요.
- 판단이 애매한 요청은 보류하고 이유를 보고하세요. 커밋하지 마세요.
- 빌드 확인은 아래 Node 22 PATH로 실행하세요.
  PATH="/Users/sonny/Library/Application Support/com.raycast.macos/NodeJS/runtime/22.23.5/bin:$PATH" npm run build
- 결과를 기록할 때 요청 파일을 다시 읽어 다른 항목을 보존하세요. 반영한 요청에는 status "done"과 doneAt(ISO 시각), 보류한 요청에는 status "held"와 heldReason을 기록하세요.
- 각 요청의 반영 또는 보류 결과와 이유, 변경 파일, 빌드 결과를 다음 명령으로 Claude에 보고하세요.
  herdr agent prompt ${claudePane} "<보고>"`;
}

export default function editMode() {
  let root;
  let file;
  let writes = Promise.resolve();
  let sending = false;
  const herdr = process.env.EDIT_REQUESTS_HERDR_BIN || 'herdr';
  const delivered = new Set();

  function serialize(operation) {
    // Keep overlapping requests from overwriting one another's changes.
    const result = writes.then(operation);
    writes = result.catch(() => {});
    return result;
  }

  function mutate(change) {
    return serialize(async () => {
      const entries = await readEntries(file);
      const result = change(entries);
      await writeEntries(file, entries);
      return result;
    });
  }

  function sendRequests({ batch, codexPane, claudePane }) {
    if (sending) throw new RequestError(409, '이미 요청을 보내고 있습니다.');
    sending = true;
    return serialize(async () => {
      const targets = await getTargets(root, herdr);
      if (targets.error) throw new RequestError(409, targets.error);
      if (!targets.codex.some(({ id }) => id === codexPane) || !targets.claude.some(({ id }) => id === claudePane)) {
        throw new RequestError(409, '대상 pane이 바뀌었습니다. 목록을 다시 열고 대상을 확인해 주세요.');
      }
      const open = openEntries(await readEntries(file));
      if (!open.length || batch !== batchKey(open)) {
        throw new RequestError(409, '보낼 요청 목록이 바뀌었습니다. 새 요청 수를 확인해 주세요.');
      }
      const ids = new Set(open.map(({ id }) => id));
      const saveError = 'Codex에 전달했지만 전송 상태를 저장하지 못했습니다. 다시 보내기 전에 대상 pane과 요청 파일을 확인해 주세요.';
      if ([...ids].some((id) => delivered.has(id))) throw new RequestError(409, saveError);

      try {
        await runFile(herdr, ['agent', 'prompt', codexPane, buildPrompt(file, [...ids], claudePane)], { cwd: root, timeout: 10000 });
      } catch {
        throw new RequestError(502, 'herdr가 Codex에 프롬프트를 보내지 못했습니다. 대상 pane과 herdr 연결을 확인해 주세요.');
      }
      for (const id of ids) delivered.add(id);
      const sentAt = new Date().toISOString();
      try {
        const latest = await readEntries(file);
        await writeEntries(file, latest.map((entry) => ids.has(entry.id)
          ? { ...entry, status: entry.status === 'open' ? 'sent' : entry.status, sentAt, sentTo: codexPane }
          : entry));
      } catch (error) {
        throw new RequestError(500, saveError, { cause: error });
      }
      for (const id of ids) delivered.delete(id);
      return { count: ids.size };
    }).finally(() => {
      sending = false;
    });
  }

  return {
    name: 'portfolio-edit-mode',
    hooks: {
      'astro:config:setup': ({ command, config, injectScript }) => {
        if (command !== 'dev') return;
        root = resolve(fileURLToPath(config.root));
        file = resolve(root, requestsPath);
        injectScript('page', 'import "/dev/edit-mode/client.ts";');
      },
      'astro:server:setup': ({ server, logger }) => {
        if (!file) return;
        server.middlewares.use(async (request, response, next) => {
          const path = request.url?.split('?', 1)[0];
          if (![endpoint, `${endpoint}/targets`, `${endpoint}/send`].includes(path)) return next();

          const { host, origin } = request.headers;
          if (
            !loopbackAddress.has(request.socket.remoteAddress) || !loopbackHost.test(host ?? '') ||
            (origin && origin !== `http://${host}` && origin !== `https://${host}`)
          ) {
            return send(response, 403, { error: '로컬 개발 서버에서만 요청할 수 있습니다.' });
          }

          try {
            if (path === `${endpoint}/targets`) {
              if (request.method !== 'GET') {
                response.setHeader('Allow', 'GET');
                return send(response, 405, { error: '지원하지 않는 요청입니다.' });
              }
              const open = openEntries(await readEntries(file));
              const targets = await getTargets(root, herdr);
              return send(response, 200, { ...targets, openCount: open.length, batch: batchKey(open) });
            }
            if (path === `${endpoint}/send`) {
              if (request.method !== 'POST') {
                response.setHeader('Allow', 'POST');
                return send(response, 405, { error: '지원하지 않는 요청입니다.' });
              }
              return send(response, 200, await sendRequests(await readBody(request)));
            }
            if (request.method === 'GET') {
              const page = new URL(request.url, 'http://localhost').searchParams.get('page');
              const entries = await readEntries(file);
              return send(response, 200, page === null ? entries : entries.filter((entry) => entry.page === page));
            }
            if (request.method === 'POST') {
              const entry = createEntry(await readBody(request), root);
              await mutate((entries) => entries.push(entry));
              return send(response, 201, entry);
            }
            if (request.method === 'DELETE') {
              const { id } = await readBody(request);
              if (typeof id !== 'string' || !id) throw new RequestError(400, '요청 ID가 필요합니다.');
              await mutate((entries) => {
                const index = entries.findIndex((entry) => entry.id === id);
                if (index === -1) throw new RequestError(404, '요청을 찾을 수 없습니다.');
                if (!['open', 'held'].includes(entries[index].status)) throw new RequestError(409, 'open 또는 held 요청만 삭제할 수 있습니다.');
                entries.splice(index, 1);
              });
              return send(response, 200, { id });
            }
            response.setHeader('Allow', 'GET, POST, DELETE');
            return send(response, 405, { error: '지원하지 않는 요청입니다.' });
          } catch (error) {
            request.resume();
            if (error instanceof RequestError) {
              if (error.cause) logger.error(String(error.cause));
              return send(response, error.status, { error: error.message });
            }
            logger.error(String(error));
            return send(response, 500, { error: '요청 파일을 읽거나 저장할 수 없습니다.' });
          }
        });
      },
    },
  };
}
