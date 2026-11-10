import { landingCards, type LandingImageRule } from '../config/landingCards';
import { getOrderedProjects } from './projects';
import { getHighlightIndex } from './highlights';

export async function getLandingCards() {
  const [projects, { entries }] = await Promise.all([getOrderedProjects(), getHighlightIndex()]);
  const resolveImage = (rule: LandingImageRule) => {
    if (rule.kind === 'static') return { src: rule.src, alt: rule.alt };
    if (rule.kind === 'first-project') {
      const project = projects.find(({ data }) => !rule.group || data.projectGroup === rule.group);
      return project?.data.thumbnail ? { src: project.data.thumbnail, alt: `${project.data.title} 대표 이미지` } : undefined;
    }
    const highlight = entries.find((entry) => entry.image);
    return highlight?.image ? { src: highlight.image, alt: highlight.imageAlt } : undefined;
  };
  return landingCards.map((card) => ({ ...card, image: resolveImage(card.image) }));
}
