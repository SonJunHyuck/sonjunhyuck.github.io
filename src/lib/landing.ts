import { landingCards, type LandingImageRule } from '../config/landingCards';
import { getOrderedProjects, getProjectSection } from './projects';
import { getHighlightIndex } from './highlights';

export async function getLandingCards() {
  const [projects, { entries }] = await Promise.all([getOrderedProjects(), getHighlightIndex()]);
  const resolveImage = (rule: LandingImageRule) => {
    if (rule.kind === 'static') return { src: rule.src, alt: rule.alt };
    if (rule.kind === 'first-project') {
      const project = projects.find(({ data }) => getProjectSection(data) === rule.section);
      return project?.data.thumbnail ? { src: project.data.thumbnail, alt: `${project.data.title} 대표 이미지` } : undefined;
    }
    const highlight = entries.find((entry) => entry.image);
    return highlight?.image ? { src: highlight.image, alt: highlight.imageAlt } : undefined;
  };
  const orderedCards = [...landingCards];
  const profileIndex = orderedCards.findIndex(({ id }) => id === 'profile');
  if (profileIndex >= 0) {
    const [profile] = orderedCards.splice(profileIndex, 1);
    orderedCards.splice(Math.floor(landingCards.length / 2), 0, profile);
  }
  return orderedCards.map((card) => ({ ...card, image: resolveImage(card.image) }));
}
