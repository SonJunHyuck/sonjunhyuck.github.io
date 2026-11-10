import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectSection = 'projects' | 'ai';

export const getProjectSection = (data: Pick<Project['data'], 'aiCollaboration'>): ProjectSection =>
  data.aiCollaboration ? 'ai' : 'projects';

export interface NextDestination {
  href: string;
  title: string;
  image?: string;
}

/** Published projects in list order; omit section when all projects are needed. */
export const getOrderedProjects = async (section?: ProjectSection) =>
  (await getCollection('projects', ({ data }) => !data.draft && (!section || getProjectSection(data) === section))).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const getProjectListDestination = async (section: ProjectSection): Promise<NextDestination> => ({
  href: section === 'ai' ? '/ai/' : '/projects/',
  title: section === 'ai' ? 'AI 협업' : '프로젝트 목록',
  image: (await getOrderedProjects(section))[0]?.data.thumbnail,
});

/** Cycle through projects within the same section, including from last to first. */
export const getNextProject = async (id: string): Promise<{ destination: NextDestination; isProject: boolean }> => {
  const projects = await getOrderedProjects();
  const current = projects.find((project) => project.id === id);
  const section = current ? getProjectSection(current.data) : 'projects';
  const siblings = projects.filter((project) => getProjectSection(project.data) === section);
  const next = current ? siblings[(siblings.findIndex((project) => project.id === id) + 1) % siblings.length] : undefined;
  return next
    ? { destination: { href: `/projects/${next.id}/`, title: next.data.title, image: next.data.thumbnail }, isProject: true }
    : { destination: await getProjectListDestination(section), isProject: false };
};

/** Up to five implementation highlights: feature titles first, otherwise the body's `##` headings. */
export const getHighlights = (project: Project) => {
  const fromFeatures = project.data.features.map(({ title }) => title);
  const fromBody = [...(project.body ?? '').matchAll(/^##\s+(.+)$/gm)].map(([, heading]) => heading.trim()).filter((heading) => heading !== '마치며');
  return (fromFeatures.length > 0 ? fromFeatures : fromBody).slice(0, 5);
};
