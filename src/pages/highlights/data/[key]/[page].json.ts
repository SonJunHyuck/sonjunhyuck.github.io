import type { APIRoute, GetStaticPaths } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import HighlightCard from '../../../../components/HighlightCard.astro';
import { HIGHLIGHT_PAGE_SIZE, getHighlightIndex, getHighlightPage, type Highlight } from '../../../../lib/highlights';

export const getStaticPaths = (async () => {
  const { entries, groups } = await getHighlightIndex();
  return groups.flatMap((group) => Array.from({ length: Math.max(1, Math.ceil(group.ids.length / HIGHLIGHT_PAGE_SIZE)) }, (_, index) => ({
    params: { key: group.key, page: String(index + 1) },
    props: { entries: getHighlightPage(entries, group, index + 1) },
  })));
}) satisfies GetStaticPaths;
export const GET: APIRoute = async ({ params, props }) => {
  const container = await AstroContainer.create();
  const cards = await Promise.all(props.entries.map((entry: Highlight) => container.renderToString(HighlightCard, { props: { entry } })));
  return Response.json({ key: params.key, page: Number(params.page), html: cards.join('') });
};
