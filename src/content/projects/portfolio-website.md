---
title: "AI 협업으로 구축한 포트폴리오"
summary: "자연어로 페이지를 구축하고, 통합 과정에서 공통 규격과 AI 협업 절차를 조정한 개인 프로젝트입니다."
cardContribution: "페이지 구성과 디자인 방향을 정하고, 통합 결과를 검토하며 공통 규격과 AI 작업 범위를 조정했습니다."
description: "면접관에게 이력과 개발 역량, 프로젝트별 기여를 전달하는 사이트를 AI와 함께 만들었습니다. 원하는 결과를 자연어로 설명하고, 실제 결과물을 검토하며 협업 방식까지 조정한 과정입니다."
publishedAt: 2026-10-13
category: "ai"
projectGroup: "ai"
workTypes: ["personal", "experiment"]
status: "in-progress"
draft: false
role: "페이지 구성·디자인 방향 결정, 결과 검토, 협업 기준 정리"
platform: ["Web"]
thumbnail: "/images/projects/portfolio-website/cover.png"
technologies:
  - name: "Astro · TypeScript"
    purpose: "프로젝트 콘텐츠와 공통 페이지 구성"
  - name: "CSS"
    purpose: "반응형 레이아웃과 Light·Dark 테마"
  - name: "GitHub Pages"
    purpose: "정보 제공 중심의 정적 사이트 배포"
  - name: "Codex"
    purpose: "기술 선택 논의, 글 초안, 코드 구현과 기술적 확인"
features: []
videos: []
gallery: []
challenges: []
externalLinks: []
---


<article class="bfx-case">
<header>
<span class="bfx-case-number">01 · 의도</span>
<h3>자연어로 실제 웹 결과물을 만들 수 있을까</h3>
</header>

웹 프런트엔드를 주력으로 하지 않는 개발자로서, <span class="bfx-text-highlight">자연어로 AI와 협업해 실제 포트폴리오 사이트를 만들 수 있는지</span> 확인하고자 했습니다. 면접관이 이력과 개발 역량, 프로젝트별 기여를 확인할 수 있는 사이트가 목표였습니다.

저는 필요한 페이지와 디자인 방향을 정하고 결과가 의도에 맞는지 판단했습니다. AI는 기술 선택 논의, 페이지 구현과 기술적 확인을 맡았습니다.
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">02 · 초기 구상</span>
<h3>전달할 정보와 원하는 화면에서 출발하기</h3>
</header>

자기소개와 연혁을 담은 프로필, 프로젝트 목록, 프로젝트 상세 페이지가 필요하다는 점부터 논의하고 합의했습니다. 기술은 사이트의 목적과 구성을 조정할 수 있는지를 기준으로 선택했습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="주소 운영과 페이지 구성의 요구에서 제외한 선택지와 채택한 선택지로 분기하는 기술 선택 과정">
<span class="import-tag">기술 선택</span>
<h3 class="portfolio-diagram-title">사용하려는 이유에서 선택으로</h3>
<div class="portfolio-decision-rows">
<div class="portfolio-decision-tree">
<div class="portfolio-decision-node portfolio-decision-reason"><span class="portfolio-decision-label">주소 운영 선택</span><strong>정보 전달 중심의 포트폴리오를 간단히 운영</strong></div>
<div class="portfolio-decision-branches">
<div class="portfolio-decision-node portfolio-decision-rejected"><span class="visually-hidden">제외한 선택지</span><strong>별도 개인 도메인 추가</strong><p>별도 도메인을 두지 않기로 결정</p></div>
<div class="portfolio-decision-node portfolio-decision-selected"><span class="portfolio-decision-label">채택</span><strong>GitHub Pages 기본 주소</strong><p>기본 주소를 그대로 사용</p></div>
</div>
</div>
<div class="portfolio-decision-tree">
<div class="portfolio-decision-node portfolio-decision-reason"><span class="portfolio-decision-label">페이지 구성 선택</span><strong>원하는 페이지 구성을 유연하게 조정</strong></div>
<div class="portfolio-decision-branches">
<div class="portfolio-decision-node portfolio-decision-rejected"><span class="visually-hidden">제외한 선택지</span><strong>Jekyll 템플릿 기반 구성</strong><p>기존 템플릿을 출발점으로 삼는 구성은 제외</p></div>
<div class="portfolio-decision-node portfolio-decision-selected"><span class="portfolio-decision-label">채택</span><strong>Astro + TypeScript</strong><p>AI가 함께 제안한 구성을 채택해 원하는 페이지로 구현</p></div>
</div>
</div>
</div>
</div>
<figcaption>주소 운영과 페이지 구성은 요구에서 두 선택지로 나누어 판단했습니다. TypeScript는 Astro와 함께 제안받은 구성으로 채택했습니다.</figcaption>
</figure>

디자인은 <span class="bfx-text-highlight">시장에서 검증된 사례를 참고하는 편이 좋겠다고 판단</span>했습니다. Light는 Apple 홈페이지, Dark는 Spotify 홈페이지의 색 조합을 선택하고 레퍼런스 이미지와 사이트를 AI에 전달했습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="검증된 사례를 참고한다는 판단에서 Apple과 Spotify의 색 조합을 선택한 과정">
<span class="import-tag">디자인 선택</span>
<h3 class="portfolio-diagram-title">참고할 사례를 정하고 → 테마에 적용</h3>
<p class="portfolio-design-intent">시장에서 검증된 사례를 참고하자는 판단</p>
<div class="portfolio-theme-paths">
<div class="portfolio-theme-path portfolio-theme-light"><span class="portfolio-icon" aria-hidden="true">☀</span><strong>Light</strong><span class="portfolio-decision-arrow" aria-hidden="true">↓</span><strong>Apple 홈페이지</strong><p>색 조합을 레퍼런스로 전달</p></div>
<div class="portfolio-theme-path portfolio-theme-dark"><span class="portfolio-icon" aria-hidden="true">☾</span><strong>Dark</strong><span class="portfolio-decision-arrow" aria-hidden="true">↓</span><strong>Spotify 홈페이지</strong><p>색 조합을 레퍼런스로 전달</p></div>
</div>
<p class="portfolio-design-result">실제 화면을 보며 배치와 표현 조율</p>
</div>
<figcaption>디자인 사례의 선택은 제 판단이며, 각 홈페이지의 색 조합을 사이트 테마의 출발점으로 삼았습니다.</figcaption>
</figure>
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">03 · 구현 과정</span>
<h3>페이지를 나누어 만들며 구체화하기</h3>
</header>

작업별 대화 맥락이 서로 영향을 덜 주도록 프로필, 목록, 상세 페이지 작업을 별도 채팅에서 진행했습니다. <span class="bfx-text-highlight">같은 저장소에서 작업했으므로 코드까지 독립된 것은 아니었습니다.</span> 페이지를 구성하면서 업무와 개인 프로젝트를 구분하고, 개인 프로젝트도 성격이 다른 게임과 연구로 나눌 필요가 생겨 업무경험·게임·연구 페이지로 재분류했습니다.

<blockquote>
<p>Projects 페이지에서 별도로 각기 다른 세 페이지로 나누는건 어떻게 생각해? 어찌됐건 업무랑 개인 프로젝트는 나눠야 할 것 같고 개인 프로젝트에서 다시 게임이랑 연구는 성격이 달라서 또 나누고 싶어서</p>
<cite>원문 발췌 · Blog Root · 2026-10-01</cite>
</blockquote>

처음에는 높은 추론 수준의 모델과 논의하고, 낮은 추론 수준의 모델을 사용하는 별도 구현 채팅에 작업을 전달했습니다. 이후 논의 담당인 Astra가 구현 담당 Sol 서브에이전트에 작업을 맡기는 방식으로 전환했습니다. Astra는 의도와 합의 충족을 판단하고, Sol은 구현과 필요한 기술적 확인을 담당하도록 역할을 정했습니다.
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">04 · 오류 봉착</span>
<h3>화면의 일관성과 작업 범위가 흔들리다</h3>
</header>

통합한 결과를 확인하자 상세 페이지의 포맷과 폭, 레이아웃이 제각각이었습니다.

<blockquote>
<p>회고 글 폭이 다른 프로젝트에 비해 좁은데, 이러니까 Layout에 일관성이 없어.</p>
<cite>원문 발췌 · AGENT와 SKILL · 2026-10-10</cite>
</blockquote>

또한 규칙의 적용 범위가 넓고 작업을 마칠 조건이 명확하지 않으면, 작은 수정에도 긴 자료 읽기와 도구 호출, 반복 검증과 재시도가 이어졌습니다.

<blockquote>
<p>좋아. 그리고 검증도 매번 하지말고 좀 제한해둘 필요가 있을 것 같은데, 그냥 문구 수정했다고 또 검증돌리고 계속 이러는거 같더라고</p>
<cite>원문 발췌 · 토큰 절약 · 2026-10-11</cite>
</blockquote>

<blockquote>
<p>반복 검증과 긴 도구 호출 때문에 생기는 토큰 사용을 줄일 수 잇는 방법은 없나?</p>
<cite>원문 발췌 · 토큰 절약 · 2026-10-12</cite>
</blockquote>

</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">05 · 해결</span>
<h3>공통 기준과 작업 종료 조건을 남기기</h3>
</header>

각 페이지를 개별적으로 고치는 것에 더해, 다음 작업에서도 같은 기준을 따를 수 있도록 공통 규격을 정리했습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="서로 다른 페이지 구성을 공통 규격으로 맞춘 구성 개념도">
<span class="import-tag">구성 개념도</span>
<h3 class="portfolio-diagram-title">페이지마다 달랐던 기준을 공통 규격으로</h3>
<div class="portfolio-comparison">
<div class="portfolio-stage"><span class="portfolio-pill">변경 전</span><div class="portfolio-pages portfolio-pages-before"><div class="portfolio-page"><strong>프로필</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div><div class="portfolio-page"><strong>목록</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div><div class="portfolio-page"><strong>상세</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div></div><p>각 작업에서 개별적으로 구성</p></div>
<span class="portfolio-comparison-arrow" aria-hidden="true">→</span>
<div class="portfolio-stage portfolio-stage-after"><span class="portfolio-pill">변경 후</span><div class="portfolio-pages portfolio-pages-after"><div class="portfolio-page"><strong>프로필</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div><div class="portfolio-page"><strong>목록</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div><div class="portfolio-page"><strong>상세</strong><div class="portfolio-page-body"><i></i><i></i><i></i></div></div></div><p>공통 규격 + 페이지별 예외</p></div>
</div>
</div>
<figcaption>페이지의 폭·간격·색상 기준을 맞춘 구성 개념도입니다.</figcaption>
</figure>

`AGENTS.md`에는 모든 페이지에 적용할 공통 원칙을, 레이아웃 스킬에는 적용 조건과 흐름을 두었습니다. 폭과 색상 같은 실제 값은 공통 스타일에서 관리하고, 세부 기준과 페이지별 예외는 매뉴얼로 분리했습니다. 반복해서 전달하던 합의를 이후 작업에서도 참조할 수 있게 만든 것입니다.

<span class="bfx-text-highlight">현재 판단에 필요한 구간만 읽고, 변경의 영향에 맞춰 검증하도록</span> 지침을 조정했습니다. 의미를 유지한 문구 수정은 변경 차이로 확인하고, 코드·배치·동작이 바뀌면 영향받는 항목을 확인하도록 했습니다. 확보한 확인 결과는 변경이나 오류 등 새로운 근거가 없으면 재사용하고, 화면 검증에 실패하면 추가 시도를 멈추고 재시도 여부를 묻도록 중단 조건도 두었습니다.
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">06 · 다음 할 일</span>
<h3>기본 틀에서 운영과 측정으로</h3>
</header>

전체 페이지의 규격을 확인한 뒤, 기본 사이트 틀은 제 판단으로 만족할 수 있는 상태가 되었습니다. 지금은 콘텐츠의 내용과 순서를 조율하고 프로젝트를 추가하는 작업을 중심으로 운영하고 있습니다.

규칙을 조정한 뒤에는 작업 규모에 맞게 동작한다는 느낌을 받았습니다. 다만 이는 사용 과정에서의 체감이며, <span class="bfx-text-highlight">실제 사용량과 결과 품질을 함께 확인해야 개선을 검증할 수 있습니다.</span> 사용량이나 비용이 얼마나 줄었는지는 측정하지 않았습니다. 이 과제는 다음 Router 프로젝트로 이어가려 합니다.

<aside class="bfx-callout">
<span>NEXT · 콘텐츠 운영 자동화 검토 / 미구현 계획</span>
<p>Notion의 각 프로젝트 원본을 연결하고, 매일 아침 변경 사항을 확인해 웹에 반영하는 운영 흐름을 검토하고 있습니다. 어떤 변경까지 자동으로 반영할지는 아직 정하지 않았습니다.</p>
</aside>

<aside class="bfx-callout portfolio-next">
<span>NEXT · Router 프로젝트</span>
<h3>체감한 개선을 수치로 확인하기</h3>
<p>요청에 맞는 모델 선택 → 예상·실제 사용량 비교 → 차이가 큰 작업의 규칙 조정</p>
<p>다음 프로젝트에서 진행할 과제</p>
</aside>
</article>
