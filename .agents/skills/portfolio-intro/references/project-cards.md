# 프로필의 프로젝트 카드

2026-11-05부터 프로필에는 프로젝트 카드를 두지 않는다. 대신 프로젝트·피드로 가는 큰 버튼을 둔다. 아래는 다시 카드를 노출할 때의 기준이다.

공유 데이터·컴포넌트·카드 구성과 상세 수정 시 동기화는 [AGENTS.md](../../../../AGENTS.md)의 콘텐츠 기준을 따른다. 카드의 표시 항목은 [목록 매뉴얼](../../portfolio-project/references/list.md)을 참조한다.

- 프로필의 노출 선택과 순서는 [index.astro](../../../../src/pages/index.astro)에서 관리한다.
- 공유 원본은 [프로젝트 데이터](../../../../src/content/projects)와 [ProjectCard.astro](../../../../src/components/ProjectCard.astro)다.
- 자기소개에 쓰는 근거 카드는 프로젝트 카드 목록과 구분한다.
