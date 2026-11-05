import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export interface NextDestination {
  href: string;
  title: string;
  image?: string;
}

/** Published projects in list order (newest first); the list page, quick view and "next" links share it. */
export const getOrderedProjects = async () =>
  (await getCollection('projects', ({ data }) => !data.draft)).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const PROJECT_LIST_DESTINATION: NextDestination = { href: '/projects/', title: '프로젝트 목록', image: '/images/projects/portfolio-website/card.webp' };

/** The project after `id` in list order; the last project leads back to the list. */
export const getNextProject = async (id: string): Promise<{ destination: NextDestination; isProject: boolean }> => {
  const projects = await getOrderedProjects();
  const next = projects[projects.findIndex((project) => project.id === id) + 1];
  return next
    ? { destination: { href: `/projects/${next.id}/`, title: next.data.title, image: next.data.thumbnail }, isProject: true }
    : { destination: PROJECT_LIST_DESTINATION, isProject: false };
};

/** Up to five implementation highlights: feature titles first, otherwise the body's `##` headings. */
export const getHighlights = (project: Project) => {
  const fromFeatures = project.data.features.map(({ title }) => title);
  const fromBody = [...(project.body ?? '').matchAll(/^##\s+(.+)$/gm)].map(([, heading]) => heading.trim()).filter((heading) => heading !== '마치며');
  return (fromFeatures.length > 0 ? fromFeatures : fromBody).slice(0, 5);
};
