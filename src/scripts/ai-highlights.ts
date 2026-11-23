import { createHighlightPreview } from './highlight-preview';

const links = document.querySelector<HTMLElement>('.workspace-links');
const dialog = document.querySelector<HTMLDialogElement>('#highlight-preview');
if (links && dialog) {
  const ids = [...dialog.querySelectorAll<HTMLElement>('[data-highlight-panel]')].map((panel) => panel.dataset.highlightPanel!);
  const preview = createHighlightPreview({ dialog, ids: () => ids });
  links.addEventListener('click', (event) => {
    if (!(event instanceof MouseEvent) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('[data-highlight-id]') : null;
    if (!link || !preview.has(link.dataset.highlightId!)) return;
    event.preventDefault();
    preview.show(link.dataset.highlightId!, link);
  });
}
