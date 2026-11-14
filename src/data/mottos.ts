export const mottos = [
  '결국, **진심**이 있는 사람이 좋다.',
  '**주관**과 **취향**은 무기가 된다.',
] as const;

/** Only paired ** markers become markup; all supplied HTML remains text. */
export function renderMotto(value: string): string {
  const escaped = value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
  return escaped.replace(/\*\*([^*]+)\*\*/g, '<em>$1</em>');
}
