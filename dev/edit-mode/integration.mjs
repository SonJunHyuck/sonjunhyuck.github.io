import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const endpoint = '/__edit-requests';
const maxBytes = 10 * 1024;
const loopbackHost = /^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;
const loopbackAddress = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

class RequestError extends Error {
  constructor(status, message) {
    super(message);
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

export default function editMode() {
  let root;
  let file;
  let writes = Promise.resolve();

  function mutate(change) {
    // Keep overlapping requests from overwriting one another's changes.
    const operation = writes.then(async () => {
      const entries = await readEntries(file);
      const result = change(entries);
      await writeEntries(file, entries);
      return result;
    });
    writes = operation.catch(() => {});
    return operation;
  }

  return {
    name: 'portfolio-edit-mode',
    hooks: {
      'astro:config:setup': ({ command, config, injectScript }) => {
        if (command !== 'dev') return;
        root = fileURLToPath(config.root);
        file = resolve(root, 'artifacts/edit-requests/requests.json');
        injectScript('page', 'import "/dev/edit-mode/client.ts";');
      },
      'astro:server:setup': ({ server, logger }) => {
        if (!file) return;
        server.middlewares.use(async (request, response, next) => {
          if (request.url?.split('?', 1)[0] !== endpoint) return next();

          const { host, origin } = request.headers;
          if (
            !loopbackAddress.has(request.socket.remoteAddress) || !loopbackHost.test(host ?? '') ||
            (origin && origin !== `http://${host}` && origin !== `https://${host}`)
          ) {
            return send(response, 403, { error: '로컬 개발 서버에서만 요청할 수 있습니다.' });
          }

          try {
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
                entries.splice(index, 1);
              });
              return send(response, 200, { id });
            }
            response.setHeader('Allow', 'GET, POST, DELETE');
            return send(response, 405, { error: '지원하지 않는 요청입니다.' });
          } catch (error) {
            request.resume();
            if (error instanceof RequestError) return send(response, error.status, { error: error.message });
            logger.error(String(error));
            return send(response, 500, { error: '요청 파일을 읽거나 저장할 수 없습니다.' });
          }
        });
      },
    },
  };
}
