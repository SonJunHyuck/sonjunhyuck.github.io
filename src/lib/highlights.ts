import { getCollection, render, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { createRequire } from 'node:module';
import { highlightTags } from '../config/highlightTags';

// Resolve the HTML parser already used by Astro's Markdown pipeline.
const require = createRequire(import.meta.url);
const astroRequire = createRequire(require.resolve('astro/package.json'));
const markdownRequire = createRequire(astroRequire.resolve('@astrojs/markdown-remark'));
interface HtmlNode {
  type: string; tagName?: string; value?: string;
  properties?: { id?: string; src?: string; alt?: string };
  children?: HtmlNode[];
  position?: { start: { offset: number }; end: { offset: number } };
}
const { fromHtml } = await import(/* @vite-ignore */ markdownRequire.resolve('hast-util-from-html')) as {
  fromHtml: (html: string, options: { fragment: boolean }) => HtmlNode;
};
const parseHtml = (html: string) => fromHtml(html, { fragment: true });
const flatten = (node: HtmlNode): HtmlNode[] => [node, ...(node.children ?? []).flatMap(flatten)];
const text = (node: HtmlNode): string => node.value ?? (node.children ?? []).map(text).join('');
export const HIGHLIGHT_PAGE_SIZE = 10;
export interface Highlight {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  lettering: string;
  project?: { id: string; title: string };
  section?: string;
  source?: { project: string; section: string };
  image?: string;
  imageAlt: string;
  html: string;
  notionUrl?: string;
}
export interface HighlightGroup { key: string; tag: string | null; ids: string[]; }
export interface HighlightPageData { key: string; page: number; html: string; }

/** Keep markup, links and media from the original section; never maintain a second copy. */
function extractSection(html: string, section: string) {
  const root = parseHtml(html);
  const nodes = flatten(root);
  const wrapper = nodes.find((node) => node.properties?.id === section);
  const heading = (wrapper && flatten(wrapper).find((node) => /^h[1-6]$/.test(node.tagName ?? '')))
    ?? nodes.find((node) => /^h[1-6]$/.test(node.tagName ?? '') && text(node).trim() === section);
  if (!heading?.position) throw new Error(`하이라이트 원본 섹션을 찾을 수 없습니다: ${section}`);
  // BFX features and portfolio stories each have their own article. Nested diagram
  // headings (including .portfolio-diagram-title) stay inside the same story.
  const article = root.children?.find((node) => node.tagName === 'article' && flatten(node).includes(heading));
  if (article?.position) return {
    html: html.slice(article.position.start.offset, article.position.end.offset),
    anchor: article.properties?.id ?? heading.properties?.id,
  };
  const level = Number(heading.tagName!.slice(1));
  const siblings = root.children ?? [];
  const end = siblings.slice(siblings.indexOf(heading) + 1).find((node) => /^h[1-6]$/.test(node.tagName ?? '') && Number(node.tagName!.slice(1)) <= level);
  return { html: html.slice(heading.position.start.offset, end?.position?.start.offset ?? html.length), anchor: heading.properties?.id ?? section };
}

let indexPromise: Promise<{ entries: Highlight[]; groups: HighlightGroup[] }> | undefined;
export function getHighlightIndex() {
  return indexPromise ??= buildIndex();
}
async function buildIndex() {
  const [raw, projects, container] = await Promise.all([
    getCollection('highlights', ({ data }) => import.meta.env.DEV || !data.draft),
    getCollection('projects', ({ data }) => !data.draft),
    AstroContainer.create(),
  ]);
  const projectMap = new Map(projects.map((entry) => [entry.id, entry]));
  const rendered = new Map<string, Promise<string>>();
  const renderEntry = (entry: CollectionEntry<'projects'> | CollectionEntry<'highlights'>) => {
    const key = `${entry.collection}/${entry.id}`;
    let promise = rendered.get(key);
    if (!promise) {
      promise = render(entry).then(({ Content }) => container.renderToString(Content));
      rendered.set(key, promise);
    }
    return promise;
  };
  const entries = await Promise.all(raw.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id)).map(async (entry): Promise<Highlight> => {
    const { data, id } = entry;
    const projectId = data.source?.project ?? data.project;
    const project = projectId ? projectMap.get(projectId) : undefined;
    if (projectId && !project) throw new Error(`연결 프로젝트가 없습니다: ${id} → ${projectId}`);
    if (data.source && entry.body?.trim()) throw new Error(`원본 섹션 하이라이트 본문은 비워 주세요: ${id}`);
    const section = data.source && project ? extractSection(await renderEntry(project), data.source.section) : undefined;
    const html = section?.html ?? await renderEntry(entry);
    const nodes = flatten(parseHtml(html));
    const firstImage = nodes.find((node) => node.tagName === 'img');
    const thumbnail = data.image ? await getImage({ src: data.image, width: Math.min(940, data.image.width), format: 'webp' }) : undefined;
    const image = thumbnail?.src ?? (data.source ? firstImage?.properties?.src ?? project?.data.thumbnail : undefined);
    const imageAlt = data.imageAlt ?? firstImage?.properties?.alt ?? (project ? `${project.data.title} 대표 이미지` : '');
    const paragraph = nodes.find((node) => node.tagName === 'p');
    const firstLine = (paragraph ? text(paragraph) : text(parseHtml(html))).trim().split('\n').find((line) => line.trim()) ?? data.title;
    // Namespace source IDs so multiple previews can coexist in one document.
    const ids = new Map(nodes.filter((node) => node.properties?.id).map((node) => [node.properties!.id!, `highlight-${id}-${node.properties!.id}`]));
    const previewHtml = html.replace(/\bid="([^"]+)"/g, (match, value: string) => ids.has(value) ? `id="${ids.get(value)}"` : match)
      .replace(/\bhref="#([^"]+)"/g, (match, value: string) => ids.has(value) ? `href="#${ids.get(value)}"` : match)
      .replace(/\b(aria-labelledby|aria-describedby)="([^"]+)"/g, (_, attr: string, value: string) => `${attr}="${value.split(/\s+/).map((key) => ids.get(key) ?? key).join(' ')}"`);
    return { id, title: data.title, date: data.date.toISOString().slice(0, 10), summary: data.summary ?? firstLine.replace(/\s+/g, ' '),
      tags: data.tags, lettering: data.lettering, project: project ? { id: project.id, title: project.data.title } : undefined,
      section: section?.anchor, source: data.source, image, imageAlt, html: previewHtml, notionUrl: data.notionUrl };
  }));
  const tags: string[] = [...highlightTags, ...projects.map(({ data }) => `프로젝트: ${data.title}`)];
  const hasTag = (entry: Highlight, tag: string) => entry.tags.includes(tag) || (entry.project && `프로젝트: ${entry.project.title}` === tag);
  const groups: HighlightGroup[] = [
    { key: 'all', tag: null, ids: entries.map(({ id }) => id) },
    ...tags.map((tag, index) => ({ key: `tag-${index}`, tag, ids: entries.filter((entry) => hasTag(entry, tag)).map(({ id }) => id) }))
      .filter(({ ids }) => ids.length).sort((a, b) => b.ids.length - a.ids.length),
  ];
  return { entries, groups };
}
export function getHighlightPage(entries: Highlight[], group: HighlightGroup, page: number) {
  const ids = new Set(group.ids.slice((page - 1) * HIGHLIGHT_PAGE_SIZE, page * HIGHLIGHT_PAGE_SIZE));
  return entries.filter(({ id }) => ids.has(id));
}
