import type { FeedGroup, FeedPageData } from '../lib/feed';

const list = document.querySelector<HTMLElement>('#feed-list');
const index = document.querySelector<HTMLScriptElement>('#feed-index');
const more = document.querySelector<HTMLButtonElement>('#feed-more');
const status = document.querySelector<HTMLElement>('#feed-status');
const empty = document.querySelector<HTMLElement>('#feed-empty');
const sentinel = document.querySelector<HTMLElement>('#feed-sentinel');
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-feed-filter]')];
const filterBar = document.querySelector<HTMLElement>('.feed-filter-bar');
const filterScroller = document.querySelector<HTMLElement>('.feed-filters');

const updateFilterOverflow = () => {
  if (!filterBar || !filterScroller) return;
  const remaining = filterScroller.scrollWidth - filterScroller.clientWidth - filterScroller.scrollLeft;
  filterBar.toggleAttribute('data-overflow-start', filterScroller.scrollLeft > 1);
  filterBar.toggleAttribute('data-overflow-end', remaining > 1);
};
const revealFilter = (button?: HTMLButtonElement) => {
  if (!filterScroller || !button) return;
  const frame = filterScroller.getBoundingClientRect();
  const target = button.getBoundingClientRect();
  const inset = parseFloat(getComputedStyle(filterScroller).scrollPaddingLeft) || 0;
  if (target.left < frame.left + inset) filterScroller.scrollLeft -= frame.left + inset - target.left;
  else if (target.right > frame.right - inset) filterScroller.scrollLeft += target.right - frame.right + inset;
  updateFilterOverflow();
};
const refreshFilters = () => {
  revealFilter(buttons.find((button) => button.getAttribute('aria-pressed') === 'true'));
  updateFilterOverflow();
};
if (filterScroller) {
  filterScroller.addEventListener('scroll', updateFilterOverflow, { passive: true });
  filterScroller.addEventListener('focusin', (event) => {
    if (event.target instanceof HTMLButtonElement) revealFilter(event.target);
  });
  new ResizeObserver(refreshFilters).observe(filterScroller);
  void document.fonts.ready.then(refreshFilters);
  updateFilterOverflow();
}

if (list && index && more && status && empty && sentinel) {
  const groups: FeedGroup[] = JSON.parse(index.textContent || '[]');
  const pageSize = Number(list.dataset.pageSize);
  let group = groups[0];
  let page = 1;
  let epoch = 0;
  let controller: AbortController | null = null;
  let failed = false;
  const cache = new Map<string, FeedPageData>([['all/1', { key: 'all', page: 1, html: list.innerHTML }]]);

  const hasMore = () => page * pageSize < group.ids.length;
  const updateControls = () => {
    buttons.forEach((button) => {
      button.disabled = false;
      button.setAttribute('aria-pressed', String(button.dataset.feedFilter === group.key));
    });
    empty.hidden = group.ids.length > 0;
    more.disabled = controller !== null;
    more.hidden = !failed && !hasMore();
    more.textContent = failed ? '다시 시도' : '이전 피드 불러오기';
    if (controller) status.textContent = '피드를 불러오는 중입니다.';
    else if (failed) status.textContent = '피드를 불러오지 못했습니다. 다시 시도해 주세요.';
    else if (group.ids.length === 0) status.textContent = '';
    else if (!hasMore()) status.textContent = '모든 피드를 확인했습니다.';
    else status.textContent = `${Math.min(page * pageSize, group.ids.length)}개 피드를 표시했습니다.`;
  };

  const loadPage = async (nextPage: number, replace = false): Promise<boolean> => {
    if (controller) return false;
    const request = new AbortController();
    const version = epoch;
    const requestedGroup = group;
    controller = request;
    failed = false;
    list.setAttribute('aria-busy', 'true');
    updateControls();
    try {
      const cacheKey = `${requestedGroup.key}/${nextPage}`;
      let data = cache.get(cacheKey);
      if (!data) {
        const response = await fetch(`/feed/data/${cacheKey}.json`, { signal: request.signal });
        if (!response.ok) throw new Error(`Feed response: ${response.status}`);
        data = await response.json() as FeedPageData;
        if (data.key !== requestedGroup.key || data.page !== nextPage || typeof data.html !== 'string') {
          throw new Error('Invalid feed page');
        }
        cache.set(cacheKey, data);
      }
      if (version !== epoch) return false;
      const template = document.createElement('template');
      template.innerHTML = data.html;
      if (replace) list.replaceChildren(template.content);
      else list.append(template.content);
      page = nextPage;
      return true;
    } catch {
      if (version === epoch && !request.signal.aborted) failed = true;
      return false;
    } finally {
      if (controller === request) {
        controller = null;
        list.removeAttribute('aria-busy');
        updateControls();
      }
    }
  };

  const loadNext = () => loadPage(page + 1, page === 0);
  const revealAnchor = async () => {
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const position = group.ids.indexOf(id);
    if (position === -1) return;
    const targetPage = Math.floor(position / pageSize) + 1;
    const version = epoch;
    while (page < targetPage && version === epoch) {
      if (!await loadNext()) return;
    }
    if (version === epoch) document.getElementById(id)?.scrollIntoView({ block: 'start' });
  };

  const applyLocation = async () => {
    const tag = new URL(location.href).searchParams.get('tag');
    const next = groups.find((candidate) => candidate.tag === tag) ?? groups[0];
    revealFilter(buttons.find((button) => button.dataset.feedFilter === next.key));
    if (next.key !== group.key) {
      epoch++;
      controller?.abort();
      controller = null;
      group = next;
      page = 0;
      failed = false;
      list.replaceChildren();
      if (!await loadPage(1, true)) return;
    }
    updateControls();
    await revealAnchor();
  };

  buttons.forEach((button) => button.addEventListener('click', () => {
    const next = groups.find((candidate) => candidate.key === button.dataset.feedFilter);
    if (!next || next.key === group.key) return;
    const url = new URL(location.href);
    if (next.tag === null) url.searchParams.delete('tag');
    else url.searchParams.set('tag', next.tag);
    url.hash = '';
    history.pushState(null, '', url);
    void applyLocation();
  }));
  more.addEventListener('click', async () => {
    if (await loadNext()) await revealAnchor();
  });
  window.addEventListener('popstate', () => { void applyLocation(); });
  window.addEventListener('hashchange', () => { void applyLocation(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !controller && !failed && hasMore()) void loadNext();
    }, { rootMargin: '200px 0px' });
    observer.observe(sentinel);
  }
  void applyLocation();
}

const dialog = document.querySelector<HTMLDialogElement>('#feed-photo-dialog');
const fullImage = document.querySelector<HTMLImageElement>('#feed-photo-full');
const close = document.querySelector<HTMLButtonElement>('#feed-photo-close');
if (list && dialog && fullImage && close) {
  let trigger: HTMLButtonElement | null = null;
  let previousOverflow = '';
  list.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('[data-feed-photo]') : null;
    if (!target?.dataset.fullSrc || dialog.open) return;
    trigger = target;
    fullImage.src = target.dataset.fullSrc;
    fullImage.alt = target.dataset.alt || '';
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger?.focus({ preventScroll: true });
  });
}
