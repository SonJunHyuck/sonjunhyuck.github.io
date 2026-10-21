import type { APIRoute, GetStaticPaths } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import FeedCard from '../../../../components/FeedCard.astro';
import { FEED_PAGE_SIZE, getFeedIndex, getFeedPage } from '../../../../lib/feed';

export const getStaticPaths = (async () => {
  const { entries, groups } = await getFeedIndex();
  return groups.flatMap((group) => Array.from({ length: Math.max(1, Math.ceil(group.ids.length / FEED_PAGE_SIZE)) }, (_, index) => ({
    params: { key: group.key, page: String(index + 1) },
    props: { entries: getFeedPage(entries, group, index + 1) },
  })));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params, props }) => {
  const container = await AstroContainer.create();
  const cards = await Promise.all(props.entries.map((entry: Parameters<typeof getFeedPage>[0][number]) => container.renderToString(FeedCard, { props: { entry } })));
  return Response.json({ key: params.key, page: Number(params.page), html: cards.join('') });
};
