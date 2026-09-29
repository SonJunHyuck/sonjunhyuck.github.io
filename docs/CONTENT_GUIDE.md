# 콘텐츠 추가 안내

이 사이트는 화면 코드와 콘텐츠를 분리합니다. 실제 자료가 확정되면 아래 파일만 추가하거나 수정하면 카드와 상세 페이지가 자동으로 갱신됩니다.

## About

`src/pages/index.astro`의 입력 대기 문구를 실제 소개, 경력, 학력, 기술, 활동, 연락처로 교체합니다. 기간, 역할, 성과를 확인할 수 있는 표현을 우선하고 공개하면 안 되는 정보는 넣지 않습니다.

## Project

`src/content/projects/`에 기존 예시 파일을 복사해 새 Markdown 파일을 만듭니다. 파일명이 URL 식별자가 됩니다. 필수 정보는 제목, 요약, 설명, 날짜, `game` 또는 `graphics` 분류, 작업 성격 태그, 상태, 기술, 핵심 기여입니다. 기간, 역할, 팀 규모, 대표 이미지, 갤러리, 영상, GitHub, 실행 파일, Notion 링크는 확인된 항목만 선택적으로 추가합니다.

OpenGL 튜토리얼이나 렌더링 학습은 `category: graphics`, `workTypes: [learning]`으로 분류합니다. 예시가 아닌 실제 자료에는 `isExample`을 생략하거나 `false`로 설정합니다.

## DevLog

`src/content/devlog/`에 Markdown 파일을 추가합니다. 제목, 2~3줄 요약에 해당하는 `description`, 날짜, 분류, 태그, 공개 Notion URL을 입력합니다. 관련 프로젝트가 있으면 `relatedProject`에 프로젝트 식별자를 적습니다. 목록은 날짜 최신순으로 정렬되며 본문은 Notion에서 읽습니다.
