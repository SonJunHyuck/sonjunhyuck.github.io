import styles from './edit-mode.css?inline';

interface RequestDraft {
  page: string;
  title: string;
  selector: string;
  sourceFile?: string;
  sourceLoc?: string;
  tag: string;
  originalText: string;
  newText?: string;
  comment: string;
  viewport: { width: number; height: number };
  theme: 'light' | 'dark';
}

interface EditRequest extends RequestDraft {
  id: string;
  createdAt: string;
  status: 'open' | 'sent' | 'done' | 'held';
  heldReason?: string;
}

interface Pane {
  id: string;
  title: string;
  tab: string;
}

interface SendTargets {
  claude: Pane[];
  error: string | null;
  openCount: number;
  batch: string;
}

const endpoint = '/__edit-requests';
const storageKey = 'portfolio-edit-mode';
const host = document.createElement('portfolio-edit-mode');
const ui = host.attachShadow({ mode: 'open' });
ui.innerHTML = `
  <style>${styles}</style>
  <div id="hover" class="outline" aria-hidden="true" hidden></div>
  <div id="highlight" class="outline" aria-hidden="true" hidden></div>
  <div id="dock">
    <details id="panel" hidden>
      <summary>이 페이지의 요청 <span id="count"></span></summary>
      <div class="requests">
        <div class="send-controls">
          <label hidden>받을 Claude pane<select id="claude-pane"></select></label>
          <div class="send-action">
            <span id="send-count">전체 페이지의 open 요청</span>
            <button id="send" type="button" class="primary" aria-describedby="send-count target-error" disabled>보내기</button>
          </div>
          <div id="target-error" role="status"></div>
          <div id="send-message" role="status"></div>
        </div>
        <div id="panel-message" role="status"></div>
        <ul id="list"></ul>
      </div>
    </details>
    <button id="toggle" type="button" aria-pressed="false" aria-keyshortcuts="Alt+E" title="편집 모드 (Alt+E)">편집</button>
  </div>
  <form id="editor" role="dialog" aria-labelledby="editor-title" hidden>
    <h2 id="editor-title">수정 요청 <span id="target-tag"></span></h2>
    <label id="original-field">현재 텍스트<textarea id="original" rows="2" readonly></textarea></label>
    <label id="replacement-field">바꿀 문구<textarea id="replacement" rows="2"></textarea></label>
    <label>코멘트<textarea id="comment" rows="3"></textarea></label>
    <div id="editor-message" role="status"></div>
    <div class="actions">
      <button id="cancel" type="button">취소</button>
      <button id="save" type="submit" class="primary">저장</button>
    </div>
  </form>
`;
document.body.append(host);

const dock = ui.querySelector<HTMLElement>('#dock')!;
const nextCard = document.querySelector<HTMLElement>('[data-next-up]');
const toggle = ui.querySelector<HTMLButtonElement>('#toggle')!;
const panel = ui.querySelector<HTMLDetailsElement>('#panel')!;
const count = ui.querySelector<HTMLElement>('#count')!;
const list = ui.querySelector<HTMLUListElement>('#list')!;
const panelMessage = ui.querySelector<HTMLElement>('#panel-message')!;
const sendCount = ui.querySelector<HTMLElement>('#send-count')!;
const sendButton = ui.querySelector<HTMLButtonElement>('#send')!;
const claudePane = ui.querySelector<HTMLSelectElement>('#claude-pane')!;
const targetError = ui.querySelector<HTMLElement>('#target-error')!;
const sendMessage = ui.querySelector<HTMLElement>('#send-message')!;
const editor = ui.querySelector<HTMLFormElement>('#editor')!;
const tag = ui.querySelector<HTMLElement>('#target-tag')!;
const originalField = ui.querySelector<HTMLLabelElement>('#original-field')!;
const original = ui.querySelector<HTMLTextAreaElement>('#original')!;
const replacementField = ui.querySelector<HTMLLabelElement>('#replacement-field')!;
const replacement = ui.querySelector<HTMLTextAreaElement>('#replacement')!;
const comment = ui.querySelector<HTMLTextAreaElement>('#comment')!;
const editorMessage = ui.querySelector<HTMLElement>('#editor-message')!;
const save = ui.querySelector<HTMLButtonElement>('#save')!;
const hoverOutline = ui.querySelector<HTMLElement>('#hover')!;
const highlightOutline = ui.querySelector<HTMLElement>('#highlight')!;

let inspection: AbortController | undefined;
let hovered: Element | null = null;
let highlighted: Element | null = null;
let highlightTimeout = 0;
let draft: { target: Element; request: RequestDraft } | null = null;
let saving = false;
let refreshId = 0;
let targets: SendTargets | null = null;
let refreshing = false;
let sending = false;

function eventTarget(event: Event): Element | null {
  const target = event.target;
  if (!(target instanceof Element) || !target.closest('body') || target === document.body ||
      target === host || target.closest('astro-dev-toolbar')) return null;
  if (target instanceof SVGElement) return target.ownerSVGElement ?? target;
  if (target.matches('a, button, img, video, canvas, iframe, input, select, textarea')) return target;
  if (target.matches('abbr, b, code, em, i, mark, s, small, span, strong, sub, sup, u')) {
    return target.closest('a, button, p, h1, h2, h3, h4, h5, h6, blockquote, figcaption, dt, dd, li') ?? target;
  }
  return target;
}

function selectorFor(target: Element): string {
  let path = '';
  for (let node: Element | null = target; node && node !== document.documentElement; node = node.parentElement) {
    const name = CSS.escape(node.localName);
    const classes = [...node.classList].filter((value) => !/^(astro-|is-|has-|active$|selected$|open$)/.test(value));
    const qualified = name + classes.map((value) => `.${CSS.escape(value)}`).join('');
    const suffix = path ? ` > ${path}` : '';
    const href = node.getAttribute('href');
    const choices = new Set([
      ...(node.id ? [`#${CSS.escape(node.id)}`] : []),
      ...(href ? [`${name}[href="${CSS.escape(href)}"]`] : []),
      qualified, name,
    ]);
    for (const choice of choices) {
      const matches = document.querySelectorAll(choice + suffix);
      if (matches.length === 1 && matches[0] === target) return choice + suffix;
    }

    const siblings = [...(node.parentElement?.children ?? [])];
    const qualifiedSiblings = siblings.filter((sibling) => sibling.matches(qualified));
    const sameTag = siblings.filter((sibling) => sibling.localName === node?.localName);
    const step = qualifiedSiblings.length === 1 ? qualified : `${name}:nth-of-type(${sameTag.indexOf(node) + 1})`;
    path = step + suffix;
  }
  return path;
}

function drawOutline(outline: HTMLElement, target: Element | null) {
  const rect = target?.isConnected && target.getBoundingClientRect();
  outline.hidden = !rect || (!rect.width && !rect.height);
  if (!rect) return;
  outline.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
  outline.style.width = `${rect.width}px`;
  outline.style.height = `${rect.height}px`;
}

function positionEditor() {
  if (!draft) return;
  const rect = draft.target.getBoundingClientRect();
  const controls = dock.getBoundingClientRect();
  const margin = 12;
  const gap = 8;
  const width = editor.offsetWidth;
  const rightOfControls = controls.right + gap;
  const fitsBesideControls = rightOfControls + width <= innerWidth - margin;
  const bottom = fitsBesideControls ? innerHeight - margin : controls.top - gap;
  editor.style.maxHeight = `${Math.max(0, bottom - margin)}px`;

  const height = editor.offsetHeight;
  const top = rect.bottom + margin + height <= bottom
    ? rect.bottom + margin
    : Math.max(margin, Math.min(rect.top - height - margin, bottom - height));
  let left = Math.max(margin, Math.min(rect.left, innerWidth - width - margin));
  if (fitsBesideControls && left < rightOfControls && top + height > controls.top - gap) {
    left = rightOfControls;
  }
  editor.style.left = `${left}px`;
  editor.style.top = `${top}px`;
}

function positionDock() {
  const card = nextCard?.getBoundingClientRect();
  const controls = dock.getBoundingClientRect();
  const sharesColumn = nextCard && card?.height && card.left < controls.right && card.right > controls.left;
  if (sharesColumn) {
    // Reserve the card's final footprint while it slides in or out.
    const bottom = parseFloat(getComputedStyle(nextCard).bottom);
    dock.style.bottom = `${bottom + card.height + 8}px`;
  } else {
    dock.style.removeProperty('bottom');
  }
  positionEditor();
}

function updateOverlays() {
  drawOutline(hoverOutline, hovered === draft?.target ? null : hovered);
  drawOutline(highlightOutline, draft?.target ?? highlighted);
  positionEditor();
}

function clearHover() {
  hovered = null;
  drawOutline(hoverOutline, null);
}

function closeEditor(restoreFocus = false) {
  draft = null;
  editor.hidden = true;
  updateOverlays();
  if (restoreFocus) toggle.focus({ preventScroll: true });
}

function updateSaveButton() {
  const changedText = draft && !replacementField.hidden && replacement.value !== draft.request.originalText;
  save.disabled = saving || (!changedText && !comment.value.trim());
}

function openEditor(target: Element) {
  clearHover();
  const source = target.closest('[data-astro-source-file], [data-astro-source-loc]');
  const originalText = target instanceof HTMLElement ? target.innerText.trim() : '';
  const containsBlocks = target.querySelector('article, aside, blockquote, dd, details, div, dl, dt, figcaption, figure, h1, h2, h3, h4, h5, h6, li, ol, p, section, table, ul');
  draft = {
    target,
    request: {
      page: location.pathname,
      title: document.title,
      selector: selectorFor(target),
      sourceFile: source?.getAttribute('data-astro-source-file') ?? undefined,
      sourceLoc: source?.getAttribute('data-astro-source-loc') ?? undefined,
      tag: target.localName,
      originalText,
      comment: '',
      viewport: { width: innerWidth, height: innerHeight },
      theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
    },
  };
  tag.textContent = `<${target.localName}>`;
  originalField.hidden = !originalText;
  replacementField.hidden = !originalText || Boolean(containsBlocks);
  original.value = originalText;
  replacement.value = originalText;
  comment.value = '';
  editorMessage.textContent = '';
  editor.hidden = false;
  updateSaveButton();
  updateOverlays();
  // Focus without selecting the prefilled text, even when the shortcut was used to enter edit mode.
  (replacementField.hidden ? comment : replacement).focus({ preventScroll: true });
}

async function api<T>(method: string, body?: object, path = ''): Promise<T> {
  const response = await fetch(endpoint + path, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

function jumpTo(entry: EditRequest) {
  try {
    const target = document.querySelector(entry.selector);
    if (target?.getClientRects().length && getComputedStyle(target).visibility === 'visible') {
      closeEditor();
      target.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' });
      highlighted = target;
      clearTimeout(highlightTimeout);
      highlightTimeout = window.setTimeout(() => {
        highlighted = null;
        updateOverlays();
      }, 2200);
      panelMessage.textContent = '';
      updateOverlays();
      return;
    }
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'SyntaxError')) throw error;
  }
  panelMessage.textContent = '현재 화면에서 해당 요소를 찾을 수 없습니다.';
}

async function deleteRequest(entry: EditRequest, button: HTMLButtonElement) {
  button.disabled = true;
  try {
    await api('DELETE', { id: entry.id });
    await refreshList();
    if (inspection) panel.querySelector('summary')?.focus({ preventScroll: true });
  } catch (error) {
    button.disabled = false;
    panelMessage.textContent = error instanceof Error ? error.message : '요청을 지우지 못했습니다.';
  }
}

function requestRow(entry: EditRequest) {
  const row = document.createElement('li');
  row.dataset.status = entry.status;
  const jump = document.createElement('button');
  jump.type = 'button';
  jump.className = 'request';
  const summary = document.createElement('span');
  summary.textContent = entry.newText === '' ? '문구 비우기' : (entry.newText ?? entry.comment);
  const time = document.createElement('time');
  time.dateTime = entry.createdAt;
  time.textContent = new Date(entry.createdAt).toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short' });
  const meta = document.createElement('div');
  meta.className = 'request-meta';
  const badge = document.createElement('span');
  badge.className = 'status-badge';
  badge.textContent = entry.status;
  meta.append(time, badge);
  jump.append(summary, meta);
  if (entry.status === 'held' && entry.heldReason) {
    const reason = document.createElement('span');
    reason.className = 'held-reason';
    reason.textContent = entry.heldReason;
    jump.append(reason);
  }
  jump.addEventListener('click', () => jumpTo(entry));
  row.append(jump);

  if (entry.status === 'open' || entry.status === 'held') {
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '삭제';
    remove.setAttribute('aria-label', `요청 삭제 (${summary.textContent.slice(0, 60)})`);
    remove.addEventListener('click', () => void deleteRequest(entry, remove));
    row.append(remove);
  }
  return row;
}

function populatePanes(select: HTMLSelectElement, panes: Pane[]) {
  const previous = select.value;
  const options = panes.map(({ id, title, tab }) => new Option([title, tab, id].filter(Boolean).join(' · '), id));
  if (panes.length > 1) options.unshift(new Option('pane을 선택해 주세요', ''));
  select.replaceChildren(...options);
  if (panes.some(({ id }) => id === previous)) select.value = previous;
  select.parentElement!.hidden = panes.length < 2;
}

function updateSendButton() {
  sendButton.disabled = sending || refreshing || !targets?.openCount || !!targets.error || !claudePane.value;
  sendButton.textContent = sending ? '보내는 중…' : '보내기';
}

async function sendOpenRequests() {
  if (sendButton.disabled || !targets) return;
  const { batch, openCount } = targets;
  const selection = { batch, claudePane: claudePane.value };
  if (!window.confirm(`open 요청 ${openCount}개(전체 페이지 기준)를 Claude에 보낼까요?`)) return;
  sending = true;
  updateSendButton();
  sendMessage.textContent = '';
  try {
    const { count } = await api<{ count: number }>('POST', selection, '/send');
    sendMessage.textContent = `요청 ${count}개를 Claude에 보냈습니다.`;
  } catch (error) {
    sendMessage.textContent = error instanceof Error ? error.message : '요청을 보내지 못했습니다.';
  } finally {
    await refreshList();
    sending = false;
    updateSendButton();
  }
}

async function refreshList() {
  const id = ++refreshId;
  refreshing = true;
  updateSendButton();
  const [requestsResult, targetsResult] = await Promise.allSettled([
    api<EditRequest[]>('GET', undefined, `?${new URLSearchParams({ page: location.pathname })}`),
    api<SendTargets>('GET', undefined, '/targets'),
  ]);
  if (id !== refreshId) return;
  if (requestsResult.status === 'fulfilled') {
    const entries = requestsResult.value;
    count.textContent = `(${entries.length})`;
    list.replaceChildren(...entries.reverse().map(requestRow));
    panelMessage.textContent = entries.length ? '' : '남긴 요청이 없습니다.';
  } else {
    panelMessage.textContent = requestsResult.reason instanceof Error ? requestsResult.reason.message : '요청을 불러오지 못했습니다.';
  }
  targets = targetsResult.status === 'fulfilled' ? targetsResult.value : null;
  populatePanes(claudePane, targets?.claude ?? []);
  sendCount.textContent = targets ? `전체 페이지의 open 요청 ${targets.openCount}개` : '전체 페이지의 open 요청';
  targetError.textContent = targetsResult.status === 'fulfilled' ? targetsResult.value.error ?? '' :
    (targetsResult.reason instanceof Error ? targetsResult.reason.message : '대상 pane을 불러오지 못했습니다.');
  refreshing = false;
  updateSendButton();
}

function inspectClick(event: MouseEvent) {
  const target = eventTarget(event);
  if (!target) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  openEditor(target);
}

function setEnabled(enabled: boolean) {
  if (enabled === Boolean(inspection)) return;
  try {
    sessionStorage.setItem(storageKey, enabled ? 'on' : 'off');
  } catch {
    // The current page can still be edited when storage is unavailable.
  }
  toggle.setAttribute('aria-pressed', String(enabled));
  panel.hidden = !enabled;

  if (!enabled) {
    inspection?.abort();
    inspection = undefined;
    clearHover();
    clearTimeout(highlightTimeout);
    highlighted = null;
    closeEditor();
    return;
  }

  inspection = new AbortController();
  const { signal } = inspection;
  window.addEventListener('pointermove', (event) => {
    hovered = eventTarget(event);
    drawOutline(hoverOutline, hovered === draft?.target ? null : hovered);
  }, { signal });
  document.documentElement.addEventListener('pointerleave', clearHover, { signal });
  window.addEventListener('click', inspectClick, { capture: true, signal });
  window.addEventListener('auxclick', inspectClick, { capture: true, signal });
  window.addEventListener('scroll', updateOverlays, { capture: true, passive: true, signal });
  window.addEventListener('resize', updateOverlays, { signal });
  void refreshList();
}

toggle.addEventListener('click', () => setEnabled(!inspection));
sendButton.addEventListener('click', () => void sendOpenRequests());
claudePane.addEventListener('change', updateSendButton);
panel.addEventListener('toggle', () => { if (inspection && panel.open) void refreshList(); });
window.addEventListener('focus', () => { if (inspection && panel.open) void refreshList(); });
ui.querySelector('#cancel')!.addEventListener('click', () => closeEditor(true));
const dockObserver = new ResizeObserver(positionDock);
dockObserver.observe(dock);
if (nextCard) dockObserver.observe(nextCard);
window.addEventListener('resize', positionDock);
new ResizeObserver(positionEditor).observe(editor);
editor.addEventListener('input', updateSaveButton);
editor.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!draft || save.disabled) return;

  const submitted = draft;
  const request = { ...submitted.request, comment: comment.value.trim() };
  if (!replacementField.hidden && replacement.value !== request.originalText) request.newText = replacement.value;
  saving = true;
  updateSaveButton();
  editorMessage.textContent = '';
  try {
    await api('POST', request);
    if (draft === submitted) closeEditor(true);
    panel.open = true;
    await refreshList();
  } catch (error) {
    if (draft === submitted) {
      editorMessage.textContent = error instanceof Error ? error.message : '요청을 저장하지 못했습니다.';
      positionEditor();
    }
  } finally {
    saving = false;
    updateSaveButton();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.isComposing) return;
  if (event.key === 'Escape' && draft) {
    event.preventDefault();
    event.stopImmediatePropagation();
    closeEditor(true);
    return;
  }

  if (!event.altKey || event.ctrlKey || event.metaKey || event.code !== 'KeyE' || event.repeat) return;
  const editingText = event.composedPath().some((node) => node instanceof HTMLElement && (
    node.isContentEditable || node.matches('input, textarea, select, [role="textbox"]')
  ));
  if (editingText) return;
  event.preventDefault();
  setEnabled(!inspection);
}, { capture: true });

function restoreMode() {
  let enabled = new URLSearchParams(location.search).has('edit');
  try {
    enabled ||= sessionStorage.getItem(storageKey) === 'on';
  } catch {
    // The query parameter also works without storage.
  }
  setEnabled(enabled);
}

restoreMode();
window.addEventListener('pageshow', (event) => {
  if (event.persisted) restoreMode();
});
