import type { HighlightGroup, HighlightPageData } from '../lib/highlights';

const list = document.querySelector<HTMLElement>('#highlight-list');
const index = document.querySelector<HTMLScriptElement>('#highlight-index');
const more = document.querySelector<HTMLButtonElement>('#highlight-more');
const status = document.querySelector<HTMLElement>('#highlight-status');
const empty = document.querySelector<HTMLElement>('#highlight-empty');
const sentinel = document.querySelector<HTMLElement>('#highlight-sentinel');
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-highlight-filter]')];
const filterBar = document.querySelector<HTMLElement>('.highlight-filter-bar');
const filterScroller = document.querySelector<HTMLElement>('.highlight-filters');

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
  const groups: HighlightGroup[] = JSON.parse(index.textContent || '[]');
  const pageSize = Number(list.dataset.pageSize);
  let group = groups[0];
  let page = 1;
  let epoch = 0;
  let controller: AbortController | null = null;
  let failed = false;
  let observer: IntersectionObserver | null = null;
  const cache = new Map<string, HighlightPageData>([['all/1', { key: 'all', page: 1, html: list.innerHTML }]]);

  const hasMore = () => page * pageSize < group.ids.length;
  const refreshSentinel = () => {
    if (!observer) return;
    observer.unobserve(sentinel);
    if (!controller && !failed && hasMore()) observer.observe(sentinel);
  };
  const updateControls = () => {
    buttons.forEach((button) => {
      button.disabled = false;
      button.setAttribute('aria-pressed', String(button.dataset.highlightFilter === group.key));
    });
    empty.hidden = group.ids.length > 0;
    more.disabled = controller !== null;
    more.hidden = !failed && !hasMore();
    more.textContent = failed ? '다시 시도' : '이전 하이라이트 불러오기';
    if (controller) status.textContent = '하이라이트를 불러오는 중입니다.';
    else if (failed) status.textContent = '하이라이트를 불러오지 못했습니다. 다시 시도해 주세요.';
    else if (group.ids.length === 0) status.textContent = '';
    else if (!hasMore()) status.textContent = '모든 하이라이트를 확인했습니다.';
    else status.textContent = `${Math.min(page * pageSize, group.ids.length)}개 하이라이트를 표시했습니다.`;
    // The page-end "next" card waits until there is nothing left to load.
    list.toggleAttribute('data-complete', !controller && !failed && !hasMore());
    document.dispatchEvent(new Event('next-up:update'));
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
        const response = await fetch(`/highlights/data/${cacheKey}.json`, { signal: request.signal });
        if (!response.ok) throw new Error(`Highlight response: ${response.status}`);
        data = await response.json() as HighlightPageData;
        if (data.key !== requestedGroup.key || data.page !== nextPage || typeof data.html !== 'string') {
          throw new Error('Invalid highlight page');
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
        refreshSentinel();
      }
    }
  };

  const loadNext = () => loadPage(page + 1, page === 0);
  const revealPreviewCard = async (id: string) => {
    const position = group.ids.indexOf(id);
    if (position === -1) return;
    const targetPage = Math.floor(position / pageSize) + 1;
    const version = epoch;
    while (page < targetPage && version === epoch) {
      if (!await loadNext()) return;
    }
  };
  const dialog = document.querySelector<HTMLDialogElement>('#highlight-preview')!;
  const panels = new Map([...dialog.querySelectorAll<HTMLElement>('[data-highlight-panel]')].map((panel) => [panel.dataset.highlightPanel!, panel]));
  const previous = dialog.querySelector<HTMLButtonElement>('[data-highlight-prev]')!;
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-highlight-next]')!;
  const positionLabel = dialog.querySelector<HTMLElement>('[data-highlight-position]')!;
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-highlight-close]')!;
  let activeId: string | null = null;
  let opener: HTMLElement | null = null;
  let pushed = false;
  let locationVersion = 0;
  const hidePreview = () => {
    if (!dialog.open) return;
    const id = activeId;
    activeId = null;
    dialog.querySelectorAll<HTMLVideoElement>('video').forEach((video) => video.pause());
    dialog.close();
    document.documentElement.removeAttribute('data-quickview-open');
    document.dispatchEvent(new Event('next-up:update'));
    const target = opener?.isConnected ? opener : (id ? list.querySelector<HTMLElement>(`[data-highlight-id="${CSS.escape(id)}"]`) : null);
    (target ?? buttons.find((button) => button.getAttribute('aria-pressed') === 'true'))?.focus({ preventScroll: true });
    opener = null;
  };
  const showPreview = (id: string) => {
    const panel = panels.get(id);
    const position = group.ids.indexOf(id);
    if (!panel || position < 0) return;
    dialog.querySelectorAll<HTMLVideoElement>('video').forEach((video) => video.pause());
    panels.forEach((candidate) => { candidate.hidden = candidate !== panel; });
    activeId = id;
    previous.disabled = position === 0;
    nextButton.disabled = position === group.ids.length - 1;
    positionLabel.textContent = `${position + 1} / ${group.ids.length}`;
    dialog.setAttribute('aria-labelledby', `highlight-title-${id}`);
    panel.scrollTop = 0;
    if (!dialog.open) {
      document.documentElement.setAttribute('data-quickview-open', '');
      dialog.showModal();
      closeButton.focus();
      document.dispatchEvent(new Event('next-up:update'));
    }
  };
  const requestClose = () => {
    if (pushed) { pushed = false; history.back(); }
    else {
      const url = new URL(location.href);
      url.searchParams.delete('h');
      history.replaceState(history.state, '', url);
      hidePreview();
    }
  };
  const movePreview = (direction: number) => {
    if (!activeId) return;
    const id = group.ids[group.ids.indexOf(activeId) + direction];
    if (!id) return;
    const url = new URL(location.href);
    url.searchParams.set('h', id);
    history.replaceState(history.state, '', url);
    showPreview(id);
    void revealPreviewCard(id);
  };
  previous.addEventListener('click', () => movePreview(-1));
  nextButton.addEventListener('click', () => movePreview(1));
  closeButton.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) requestClose(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.altKey || event.metaKey || event.ctrlKey || (event.target instanceof Element && event.target.closest('input,textarea,select,video,[contenteditable]'))) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      movePreview(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  let touchStart: { x: number; y: number } | null = null;
  dialog.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || (event.target instanceof Element && event.target.closest('video,a,button,pre'))) { touchStart = null; return; }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  dialog.addEventListener('touchend', (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (matchMedia('(max-width: 680px)').matches && Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5) movePreview(dx > 0 ? -1 : 1);
  }, { passive: true });
  dialog.addEventListener('touchcancel', () => { touchStart = null; });
  list.addEventListener('click', (event) => {
    if (!(event instanceof MouseEvent) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-highlight-id]') : null;
    if (!link || !panels.has(link.dataset.highlightId!)) return;
    event.preventDefault();
    opener = link;
    const url = new URL(location.href);
    url.searchParams.set('h', link.dataset.highlightId!);
    history.pushState(history.state, '', url);
    pushed = true;
    showPreview(link.dataset.highlightId!);
  });

  const applyLocation = async () => {
    const version = ++locationVersion;
    const url = new URL(location.href);
    const tag = url.searchParams.get('tag');
    const next = groups.find((candidate) => candidate.tag === tag) ?? groups[0];
    revealFilter(buttons.find((button) => button.dataset.highlightFilter === next.key));
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
    if (version !== locationVersion) return;
    const id = url.searchParams.get('h');
    if (id && group.ids.includes(id) && panels.has(id)) {
      showPreview(id);
      await revealPreviewCard(id);
    } else {
      pushed = false;
      hidePreview();
      if (id) { url.searchParams.delete('h'); history.replaceState(history.state, '', url); }
    }
    if (version === locationVersion) refreshSentinel();
  };

  buttons.forEach((button) => button.addEventListener('click', () => {
    const next = groups.find((candidate) => candidate.key === button.dataset.highlightFilter);
    if (!next || next.key === group.key) return;
    const url = new URL(location.href);
    if (next.tag === null) url.searchParams.delete('tag');
    else url.searchParams.set('tag', next.tag);
    url.hash = '';
    url.searchParams.delete('h');
    history.pushState(null, '', url);
    void applyLocation();
  }));
  more.addEventListener('click', async () => {
    await loadNext();
  });
  window.addEventListener('popstate', () => { void applyLocation(); });
  window.addEventListener('hashchange', () => { void applyLocation(); });
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !controller && !failed && hasMore()) void loadNext();
    }, { rootMargin: '200px 0px' });
    observer.observe(sentinel);
  }
  void applyLocation();
}

