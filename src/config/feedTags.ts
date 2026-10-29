export const feedTags = ['AI 활용', '학습 기록', '개발 환경', '공모전', '아이디어', '회고'] as const;

export type FeedTag = typeof feedTags[number];
