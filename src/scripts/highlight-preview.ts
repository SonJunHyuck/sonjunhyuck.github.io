interface HighlightPreviewOptions {
  dialog: HTMLDialogElement;
  ids: () => readonly string[];
  onOpen?: (id: string) => void;
  onRequestClose?: () => void;
  onMove?: (id: string) => void;
  returnFocus?: (id: string | null) => HTMLElement | null | undefined;
}

interface HighlightPreviewController {
  has: (id: string) => boolean;
  show: (id: string, opener?: HTMLElement) => void;
  hide: () => void;
}

/** Dialog interactions are shared; list loading and URL/history belong to callers. */
export function createHighlightPreview(options: HighlightPreviewOptions): HighlightPreviewController {
  const { dialog } = options;
  const panels = new Map([...dialog.querySelectorAll<HTMLElement>('[data-highlight-panel]')].map((panel) => [panel.dataset.highlightPanel!, panel]));
  const previous = dialog.querySelector<HTMLButtonElement>('[data-highlight-prev]')!;
  const nextButton = dialog.querySelector<HTMLButtonElement>('[data-highlight-next]')!;
  const positionLabel = dialog.querySelector<HTMLElement>('[data-highlight-position]')!;
  const closeButton = dialog.querySelector<HTMLButtonElement>('[data-highlight-close]')!;
  let activeId: string | null = null;
  let opener: HTMLElement | null = null;
  const pauseVideos = () => dialog.querySelectorAll<HTMLVideoElement>('video').forEach((video) => video.pause());
  const hide = () => {
    if (!dialog.open) return;
    const id = activeId;
    activeId = null;
    pauseVideos();
    dialog.close();
    document.documentElement.removeAttribute('data-quickview-open');
    document.dispatchEvent(new Event('next-up:update'));
    const target = opener?.isConnected ? opener : options.returnFocus?.(id);
    target?.focus({ preventScroll: true });
    opener = null;
  };
  const show = (id: string, trigger?: HTMLElement) => {
    const panel = panels.get(id);
    const ids = options.ids();
    const position = ids.indexOf(id);
    if (!panel || position < 0) return;
    if (trigger) opener = trigger;
    pauseVideos();
    panels.forEach((candidate) => { candidate.hidden = candidate !== panel; });
    activeId = id;
    previous.disabled = position === 0;
    nextButton.disabled = position === ids.length - 1;
    positionLabel.textContent = `${position + 1} / ${ids.length}`;
    dialog.setAttribute('aria-labelledby', `highlight-title-${id}`);
    panel.scrollTop = 0;
    if (!dialog.open) {
      document.documentElement.setAttribute('data-quickview-open', '');
      dialog.showModal();
      closeButton.focus();
      document.dispatchEvent(new Event('next-up:update'));
      options.onOpen?.(id);
    }
  };
  const requestClose = () => {
    if (options.onRequestClose) options.onRequestClose();
    else hide();
  };
  const move = (direction: number) => {
    if (!activeId) return;
    const ids = options.ids();
    const id = ids[ids.indexOf(activeId) + direction];
    if (!id) return;
    show(id);
    options.onMove?.(id);
  };
  previous.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  closeButton.addEventListener('click', requestClose);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); requestClose(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) requestClose(); });
  dialog.addEventListener('keydown', (event) => {
    if (event.altKey || event.metaKey || event.ctrlKey || (event.target instanceof Element && event.target.closest('input,textarea,select,video,[contenteditable]'))) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
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
    if (matchMedia('(max-width: 680px)').matches && Math.abs(dx) >= 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx > 0 ? -1 : 1);
  }, { passive: true });
  dialog.addEventListener('touchcancel', () => { touchStart = null; });
  return { has: (id) => panels.has(id), show, hide };
}
