import type { Project } from '../lib/projects';

export type LandingImageRule =
  | { kind: 'static'; src: string; alt: string }
  | { kind: 'first-project'; group?: Project['data']['projectGroup'] }
  | { kind: 'latest-highlight-image' };

export interface LandingCard {
  id: string;
  title: string;
  description: string;
  href: string;
  image: LandingImageRule;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
}

/** Add categories here; image selection and the fan adapt to the number of cards. */
export const landingCards: LandingCard[] = [
  {
    id: 'profile', title: '프로필', description: '이력과 경험', href: '/profile/',
    image: { kind: 'static', src: '/profile.webp', alt: '꽃밭에서 촬영한 손준혁 프로필 사진' },
    imagePosition: '50% 42%',
  },
  {
    id: 'highlights', title: '하이라이트', description: '작업의 핵심 장면을 짧게', href: '/highlights/',
    image: { kind: 'latest-highlight-image' },
  },
  {
    id: 'projects', title: '프로젝트', description: '프로젝트 전체 이야기', href: '/projects/',
    image: { kind: 'first-project' }, imageFit: 'contain',
  },
];
