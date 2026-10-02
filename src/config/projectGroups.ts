export const projectGroups = [
  {
    id: 'work',
    label: '업무',
    eyebrow: 'PROFESSIONAL WORK',
    title: '업무 프로젝트',
    description: '팀과 제품 환경에서 맡은 역할, 협업, 구현 결과를 정리했습니다.',
    href: '/projects/work/',
  },
  {
    id: 'games',
    label: '게임',
    eyebrow: 'PERSONAL GAMES',
    title: '게임',
    description: '직접 설계하고 구현한 게임 프로젝트와 개발 과정을 정리했습니다.',
    href: '/projects/games/',
  },
  {
    id: 'research',
    label: '연구',
    eyebrow: 'PERSONAL RESEARCH',
    title: '연구',
    description: '그래픽스와 시뮬레이션을 탐구하고 검증한 과정을 정리했습니다.',
    href: '/projects/research/',
  },
] as const;

export type ProjectGroupId = typeof projectGroups[number]['id'];

export const getProjectGroup = (id: ProjectGroupId) => projectGroups.find((group) => group.id === id)!;
