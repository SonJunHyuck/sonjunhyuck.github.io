import { getCollection, type CollectionEntry } from 'astro:content';

export const FEED_PAGE_SIZE = 10;
export const FEED_COLUMN_WIDTH = 600;
const FEED_IMAGE_MIN_RATIO = 4 / 5;
const FEED_IMAGE_MAX_RATIO = 1.91;

export function getFeedImageLayout(image: { width: number; height: number }) {
  const originalRatio = image.width / image.height;
  const ratio = Math.min(FEED_IMAGE_MAX_RATIO, Math.max(FEED_IMAGE_MIN_RATIO, originalRatio));
  return {
    ratio,
    coversFrame: image.width >= FEED_COLUMN_WIDTH,
    cropsImage: ratio !== originalRatio,
    thumbnailWidth: Math.min(image.width, FEED_COLUMN_WIDTH * 2),
  };
}

export interface FeedGroup {
  key: string;
  tag: string | null;
  ids: string[];
}

export interface FeedPageData {
  key: string;
  page: number;
  html: string;
}

export async function getFeedIndex() {
  const entries = (await getCollection('feed', ({ data }) => import.meta.env.DEV || !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
  const tags = [...new Set(entries.flatMap(({ data }) => data.tags))].sort((a, b) => a.localeCompare(b, 'ko'));
  const groups: FeedGroup[] = [
    { key: 'all', tag: null, ids: entries.map(({ id }) => id) },
    ...tags.map((tag, index) => ({
      key: `tag-${index}`,
      tag,
      ids: entries.filter(({ data }) => data.tags.includes(tag)).map(({ id }) => id),
    })),
  ];
  return { entries, groups };
}

export function getFeedPage(entries: CollectionEntry<'feed'>[], group: FeedGroup, page: number) {
  const ids = new Set(group.ids.slice((page - 1) * FEED_PAGE_SIZE, page * FEED_PAGE_SIZE));
  return entries.filter(({ id }) => ids.has(id));
}
