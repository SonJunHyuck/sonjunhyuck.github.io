import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type ProjectSection = 'projects' | 'ai';

interface ProjectSeriesPart {
  project: Project;
  part: number;
  label: string;
}

interface ProjectSeries {
  title: string;
  parts: ProjectSeriesPart[];
}

export type ProjectListItem = Pick<Project, 'id' | 'data'> & { series?: ProjectSeries };

export const getProjectSection = (data: Pick<Project['data'], 'aiCollaboration'>): ProjectSection =>
  data.aiCollaboration ? 'ai' : 'projects';

export interface NextDestination {
  href: string;
  title: string;
  image?: string;
}

/** Published projects in list order; omit section when all projects are needed. */
export const getOrderedProjects = async (section?: ProjectSection) =>
  (await getCollection('projects', ({ data }) => !data.draft && !data.hiddenFromProjects && (!section || getProjectSection(data) === section))).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

/** Keep each series at its earliest list position and use its first published part as the cover entry. */
export function getProjectListItems(projects: Project[]): ProjectListItem[] {
  const seriesById = new Map<string, ProjectSeriesPart[]>();
  for (const project of projects) {
    const { aiCollaboration, series } = project.data;
    if (!aiCollaboration || !series) continue;
    const parts = seriesById.get(series.id) ?? [];
    parts.push({ project, part: series.part, label: series.partLabel });
    seriesById.set(series.id, parts);
  }

  return projects.flatMap<ProjectListItem>((project) => {
    const { aiCollaboration, series } = project.data;
    if (!aiCollaboration || !series) return [project];
    const parts = seriesById.get(series.id);
    if (!parts || parts.length < 2) return [project];
    if (parts[0].project !== project) return [];

    const orderedParts = [...parts].sort((a, b) => a.part - b.part);
    const first = orderedParts[0].project;
    return [{ id: first.id, data: first.data, series: { title: series.title, parts: orderedParts } }];
  });
}

export const getProjectListDestination = async (section: ProjectSection): Promise<NextDestination> => ({
  href: section === 'ai' ? '/ai/' : '/projects/',
  title: section === 'ai' ? 'AI 협업' : '프로젝트 목록',
  image: getProjectListItems(await getOrderedProjects(section))[0]?.data.thumbnail,
});

/** Cycle through the section in list order, visiting the parts of a series consecutively. */
export const getNextProject = async (id: string): Promise<{ destination: NextDestination; isProject: boolean; series?: ProjectSeries }> => {
  const projects = await getOrderedProjects();
  const current = projects.find((project) => project.id === id);
  const section = current ? getProjectSection(current.data) : 'projects';
  const siblings = projects.filter((project) => getProjectSection(project.data) === section);
  const order = getProjectListItems(siblings).flatMap((item) =>
    (item.series?.parts.map(({ project }) => project) ?? [item]).map((project) => ({ project, item })),
  );
  const position = order.findIndex(({ project }) => project.id === id);
  const next = position >= 0 ? order[(position + 1) % order.length] : undefined;
  return next
    ? {
        destination: { href: `/projects/${next.project.id}/`, title: next.project.data.title, image: next.project.data.thumbnail },
        isProject: true,
        series: order[position].item.series,
      }
    : { destination: await getProjectListDestination(section), isProject: false };
};

/** Up to five implementation highlights: feature titles first, otherwise the body's `##` headings. */
export const getHighlights = (project: Project) => {
  const fromFeatures = project.data.features.map(({ title }) => title);
  const fromBody = [...(project.body ?? '').matchAll(/^##\s+(.+)$/gm)].map(([, heading]) => heading.trim()).filter((heading) => heading !== '마치며');
  return (fromFeatures.length > 0 ? fromFeatures : fromBody).slice(0, 5);
};
