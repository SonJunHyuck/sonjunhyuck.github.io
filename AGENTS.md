# 포트폴리오 프로젝트 작업 지침

## 프로젝트
- Astro, TypeScript, pnpm 기반 개인 포트폴리오다.
- 면접관이 이력, 개발 역량, 프로젝트별 기여를 확인하는 사이트다.
- 사용자 루트 GitHub Pages 사이트이며 하위 경로 base를 설정하지 않는다.
- 실제 버전과 실행 방법은 현재 저장소 설정에서 확인한다.

## 작업 방식
- 논의와 설계는 GPT-6 Astra Medium을 사용한다.
- 사용자가 구현을 요청하면, 합의된 내용과 작업 범위를 GPT-6.1 Sol Light 서브에이전트에 전달해 수정을 맡긴다.
- 구현 결과의 검증은 GPT-6 Astra Medium이 수행한다.
- 지정 모델로 위임할 수 없는 환경에서는 그 한계를 알린다.
- 같은 작업 폴더를 수정하는 구현 작업은 동시에 진행하지 않는다.
- 기존 미커밋 변경을 보존한다.
- 커밋·푸시·배포는 해당 작업 지시의 범위를 따른다.

## 콘텐츠
- 사용자가 제공하거나 확인한 사실만 사용하며, 공동 작업에서 사용자의 기여를 확대하지 않는다.
- 필요한 근거가 없거나 사용자가 확인을 요청하면 추측하지 않고 구체적으로 질문한다. 답변이 필요한 부분은 확정하지 않으며, 독립적으로 진행할 수 있는 작업은 계속한다.
- 구현 완료, 설계, 계획을 구분한다.
- 원뜻을 유지하며 간결하게 쓰고, 중복 설명과 불필요한 안내 문구는 줄인다.
- 회사 자료와 타인의 식별 정보는 공개 가능한 범위에서만 사용한다.
- 과거 자료와 최신 사용자 지시가 충돌하면 최신 지시를 따른다.
- 프로젝트 상세를 수정할 때 카드 요약과 메타데이터에 미치는 영향도 검토하고 함께 갱신한다. 프로젝트 목록과 프로필의 프로젝트 카드는 같은 데이터와 컴포넌트를 사용하며, 프로필은 표시할 프로젝트의 선택과 순서만 관리한다.

## 지침 유지관리
- 사용자가 확정한 반복 기준이나 정정은 관련 기존 스킬·매뉴얼에 반영하고 변경 내용을 보고한다. 아직 생성되지 않은 스킬은 임의로 만들지 않고 초안에 반영한다.
- 임시 제안을 확정 규칙으로 만들지 않으며, 개별 프로젝트의 예외는 해당 프로젝트에 한정한다.

## 공통 레이아웃
- 모든 페이지는 공통 최대 콘텐츠 폭, 좌우 여백, 타이포그래피, 간격, Light·Dark 기준을 사용한다. 상세 수치의 단일 원본은 공통 스타일이며, 페이지별로 본문 폭을 임의 재정의하지 않는다.
- 공통 최대 콘텐츠 폭은 현재 프로필 기준 940px이며 `src/styles/global.css`의 `--content-width`를 단일 원본으로 사용한다. 사용자가 별도로 요청하지 않으면 이 폭을 변경하지 않는다.
- 페이지 외곽과 주 본문은 공통 폭을 따르며, 카드·이미지·캡션·리드문처럼 목적이 있는 내부 요소의 크기와 구분한다.
- 색상은 기존 Light(Apple 참고)·Dark(Spotify 참고) 공통 변수와 의미별 역할을 재사용하며, 페이지별 임의 새 색상 추가를 피한다.
- 더 나은 예외가 필요하면 제안하고 사용자와 합의한 뒤 적용한다.
- 줄바꿈은 반응형 자연 흐름을 기본으로 하며 강제 `br`을 사용하지 않는다. 사용자가 명시적으로 요청한 경우는 예외다.
- 레이아웃을 변경할 때 `portfolio-layout` 스킬이 있으면 활용한다.

## 검증과 보고
- 변경에 필요한 빌드·기능·화면 검증을 수행한다.
- 디자인·화면 변경 시 공통 콘텐츠 폭과 정렬, 모바일·데스크톱, Light·Dark, 이미지 잘림과 넘침, 링크와 키보드 조작을 검증한다.
- 변경 내용, 검증 결과, 남은 사항을 보고한다.
- 검증하지 못한 항목은 명시한다.

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tools** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them. `codegraph_node` returns one symbol's source + callers, or reads a whole file with line numbers. If the tools are listed but deferred, load them by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` and `codegraph node <symbol-or-file>` print the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->
