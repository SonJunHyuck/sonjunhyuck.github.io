---
title: "AI 협업으로 구축한 포트폴리오"
summary: "익숙하지 않은 웹 프런트엔드에 자연어 AI 협업으로 도전하고, 공통 규격과 작업 방식을 다듬은 개인 프로젝트입니다."
cardContribution: "페이지 구성과 디자인 방향을 정하고, 통합 결과를 검토하며 공통 규격과 AI 작업 범위를 조정했습니다."
description: "익숙하지 않은 웹 프런트엔드에 도전하며, 방문자가 이력과 개발 역량, 프로젝트별 기여를 확인할 포트폴리오를 자연어로 AI와 협업하며 만들었습니다. 필요한 페이지와 디자인 방향을 정하고 결과를 검토했으며, AI는 기술 선택 논의와 구현·기술적 확인을 맡았습니다."
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
<span class="bfx-case-number">01 · 도구 선택</span>
<h3>시작: 도구 선택 논의부터</h3>
</header>

처음부터 자기소개와 연혁을 담은 프로필, 프로젝트 목록, 프로젝트 상세 페이지가 필요하다고 AI에 전달했습니다. 기술은 <span class="text-highlight">운영 부담을 줄이고 원하는 디자인을 유연하게 조정할 수 있는지</span>를 기준으로 함께 논의했습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="간단한 운영과 유연한 디자인 요구에서 기술을 선택한 과정">
<span class="import-tag">기술 선택</span>
<div class="portfolio-decision-rows">
<div class="portfolio-decision-tree">
<div class="portfolio-decision-node portfolio-decision-reason"><span class="portfolio-decision-label">운영 방식 선택</span><strong>백엔드 관리 부담을 줄이고 프런트엔드에 집중</strong></div>
<div class="portfolio-decision-branches">
<div class="portfolio-decision-node portfolio-decision-rejected"><span class="visually-hidden">제외한 선택지</span><strong>백엔드까지 직접 구축·운영</strong><p>직접 관리할 범위를 줄이고자 함</p></div>
<div class="portfolio-decision-node portfolio-decision-selected"><span class="portfolio-decision-label">채택</span><strong>GitHub Pages</strong><p>별도 백엔드 없이 정적 사이트 배포</p></div>
</div>
</div>
<div class="portfolio-decision-tree">
<div class="portfolio-decision-node portfolio-decision-reason"><span class="portfolio-decision-label">페이지 구성 선택</span><strong>원하는 디자인을 계속 유연하게 조정</strong></div>
<div class="portfolio-decision-branches">
<div class="portfolio-decision-node portfolio-decision-rejected"><span class="visually-hidden">제외한 선택지</span><strong>Jekyll 템플릿 기반 구성</strong><p>정해진 템플릿보다 자유로운 조정을 원함</p></div>
<div class="portfolio-decision-node portfolio-decision-selected"><span class="portfolio-decision-label">채택</span><strong>Astro + TypeScript</strong><p>AI가 함께 제안한 구성을 채택해 원하는 페이지로 구현</p></div>
</div>
</div>
</div>
</div>
<figcaption>운영 요구와 디자인의 유연성을 기준으로 선택했습니다. Astro와 TypeScript는 AI가 함께 제안한 구성으로 채택했습니다.</figcaption>
</figure>

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="Apple과 Spotify의 색 조합을 각각 Light와 Dark 테마의 레퍼런스로 전달">
<span class="import-tag">디자인 선택</span>
<h3 class="portfolio-diagram-title">시장에서 검증된 사례를 레퍼런스로.</h3>
<div class="portfolio-theme-paths">
<div class="portfolio-theme-path portfolio-theme-light"><span class="portfolio-icon" aria-hidden="true">☀</span><strong>Light</strong><span class="portfolio-decision-arrow" aria-hidden="true">↓</span><strong>Apple 홈페이지</strong></div>
<div class="portfolio-theme-path portfolio-theme-dark"><span class="portfolio-icon" aria-hidden="true">☾</span><strong>Dark</strong><span class="portfolio-decision-arrow" aria-hidden="true">↓</span><strong>Spotify 홈페이지</strong></div>
</div>
</div>
<figcaption>디자인 사례의 선택은 제 판단이며, 각 홈페이지의 색 조합을 사이트 테마의 출발점으로 삼았습니다.</figcaption>
</figure>
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">02 · 모델 역할 분리</span>
<h3>논의는 Astra, 구현은 Sol이라던데</h3>
</header>

개념으로만 알고 있던 모델별 역할 분담을 가볍게 적용해 봤습니다. 논의와 검토는 Astra로 진행하고, 구현은 상대적으로 비용 부담이 낮을 것으로 기대한 Sol에 맡기기로 했습니다.

사용자와 논의가 끝나면 <span class="text-highlight">Astra가 별도 구현 채팅의 Sol에 작업 지시를 전달하도록</span> 요청했습니다. 합의한 방향과 구현을 나누어 진행해 본 이 경험은, 이후 요청에 맞는 모델을 선택하는 Router를 만들어 보고 싶다는 생각으로 이어졌습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="논의와 검토를 맡은 Astra가 별도 구현 채팅의 Sol에 명령을 전달하는 역할 분담 개념도">
<span class="import-tag">논의 → 구현 전달 구조</span>
<div class="portfolio-decision-row portfolio-model-flow">
<div><strong>Astra · 논의와 검토</strong><p>맥락과 선택지를 검토하고 방향 합의</p></div>
<span class="portfolio-decision-arrow portfolio-command-arrow">명령 전달 →</span>
<div><strong>Sol · 구현</strong><p>구현 모델을 나누어 비용 부담을 줄이려는 선택</p></div>
</div>
</div>
<figcaption>논의에서 합의한 작업을 별도 구현 채팅에 전달하도록 요청한 구조입니다.</figcaption>
</figure>
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">03 · 페이지별 문맥 분리</span>
<h3>내 나름대로의 전략, 맥락 나누기</h3>
</header>

<h4>맥락 분리</h4>

프로필, 목록, 상세 페이지는 서로의 맥락을 모두 공유할 필요가 없다고 생각해 별도 채팅에서 진행했습니다. 읽을 내용이 줄면 토큰도 절약할 수 있겠다는 기대였습니다. 대화 맥락은 나누되, 같은 저장소의 코드를 함께 다루는 구조였습니다.

<h4>오류 봉착</h4>

페이지들이 함께 따라야 할 공통 맥락을 정의하지 않은 결과로, 상세 페이지의 포맷과 폭, 레이아웃 등 각 페이지들의 형태가 제각각이었습니다.

<blockquote>
<p>회고 글 폭이 다른 프로젝트에 비해 좁은데, 이러니까 Layout에 일관성이 없어.</p>
<cite>원문 발췌 · AGENT와 SKILL · 2026-10-10</cite>
</blockquote>

<h4>해결</h4>

각 페이지를 수정하는 대신, <span class="text-highlight">이후 작업도 함께 따를 공통 규격과 페이지별 특이점을 문서로 정리</span>했습니다.

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

</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">04 · 지침 조정</span>
<h3>지침을 만들었더니 작업이 커졌다</h3>
</header>

공통 기준을 이어가기 위해 지침을 도입했지만, 적용 범위가 넓고 작업을 마칠 조건이 명확하지 않자, 작은 수정에도 긴 자료 읽기와 도구 호출, 반복 검증과 재시도가 이어졌습니다.

<blockquote>
<p>좋아. 그리고 검증도 매번 하지말고 좀 제한해둘 필요가 있을 것 같은데, 그냥 문구 수정했다고 또 검증돌리고 계속 이러는거 같더라고</p>
<cite>원문 발췌 · 토큰 절약 · 2026-10-11</cite>
</blockquote>

<span class="text-highlight">현재 판단에 필요한 구간만 읽고, 변경의 영향에 맞춰 검증하도록</span> 지침을 조정했습니다. 의미를 유지한 문구 수정은 변경 차이로 확인하고, 코드·배치·동작이 바뀌면 영향받는 항목을 확인하도록 했습니다. 확보한 확인 결과는 변경이나 오류 등 새로운 근거가 없으면 재사용하고, 화면 검증에 실패하면 추가 시도를 멈추고 재시도 여부를 묻도록 중단 조건도 두었습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="지침 도입 뒤 반복 작업이 커진 원인과 범위 및 종료 조건을 조정한 작업 흐름 개념도">
<span class="import-tag">작업 흐름 개념도</span>
<h3 class="portfolio-diagram-title">공통 지침에 작업 범위와 종료 조건 더하기</h3>
<div class="portfolio-handoff portfolio-guideline-fixes">
<div><strong>반복 자료 읽기</strong><span class="portfolio-decision-arrow" aria-hidden="true">→</span><p>현재 판단에 필요한 구간만 읽기</p></div>
<div><strong>작은 수정에도 과도한 검증</strong><span class="portfolio-decision-arrow" aria-hidden="true">→</span><p>변경의 영향에 맞춰 검증하기</p></div>
<div><strong>끝없는 재시도</strong><span class="portfolio-decision-arrow" aria-hidden="true">→</span><p>화면 검증 실패 시 멈추고 재시도 여부 확인</p></div>
<div><strong>담당자와 중복 확인</strong><span class="portfolio-decision-arrow" aria-hidden="true">→</span><p>새로운 근거가 없으면 담당자의 확인 결과 재사용</p></div>
</div>
</div>
<figcaption>실행 로그가 아닌, 지침의 부작용과 조정 방향을 정리한 작업 흐름 개념도입니다.</figcaption>
</figure>

규칙을 조정한 뒤에는 작업 규모에 맞게 동작한다는 느낌을 받았습니다. 다만 이는 사용 과정에서의 체감이며, 사용량이나 비용이 얼마나 줄었는지는 측정하지 않았습니다.
</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">05 · 다음 할 일</span>
<h3>결론 및 다음 과제로</h3>
</header>

전체 페이지의 규격을 확인한 뒤, 기본 사이트 틀은 제 판단으로 만족할 수 있는 상태가 되었습니다. 다음에는 이 틀을 바탕으로 콘텐츠 운영 자동화와 라우터 구현을 진행하려 합니다.

<h4>운영 자동화</h4>

규격화 덕분에 콘텐츠를 일정한 형식으로 작성할 수 있게 됐습니다. 다만 사실이 정확하고 읽기 쉬운지에 대한 <span class="text-highlight">최종 판단은 사람이 검토</span>해야 합니다.

다음 계획은 평소 학습하며 Notion에 정리한 내용을 공유할 사이트 피드를 만드는 것입니다. Notion과 AI를 연동해 전일 추가·수정된 내용이 있으면, 이를 바탕으로 <span class="text-highlight">간단한 피드 초안을 자동으로 작성</span>하는 흐름을 구상하고 있습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram" aria-label="Notion 피드를 추가하거나 수정하면 AI가 전일 변경점을 감지하고 피드 초안을 작성하는 계획">
<span class="import-tag">콘텐츠 운영 계획 · 미구현</span>
<div class="portfolio-decision-row portfolio-model-flow">
<div><strong>Notion 피드 추가·수정</strong><p>평소 학습한 내용을 기록</p></div>
<span class="portfolio-decision-arrow portfolio-command-arrow" aria-hidden="true">변경점 전달 →</span>
<div><strong>AI 변경점 감지 및 피드 초안 작성</strong><p>전일 변경사항이 있을 때 초안 작성</p></div>
</div>
</div>
<figcaption>구현 전의 운영 계획입니다. 작성된 초안은 사람이 사실 정확성과 가독성을 검토합니다.</figcaption>
</figure>

<blockquote>
<p>반복되는 초안 작성은 자동화하고, 사실 정확성과 가독성의 최종 판단은 사람이 맡는 운영 방식을 목표로 합니다.</p>
</blockquote>

<h4>라우터 구현</h4>

현재 모델 역할 배분은 작업 지침을 통한 개념적 적용 단계이며, 사용량 측정 등의 실험은 아직 수행하지 않았습니다. 다음에는 작업별 <span class="text-highlight">예상 토큰과 실제 토큰·비용을 로그로 남겨 비교</span>하려 합니다.

<span class="text-highlight">예상과 실제의 편차가 큰 구간을 점검 대상으로 삼고</span>, 원인을 분석한 뒤 라우팅 규칙을 보완할 계획입니다. 편차만으로 문제가 있다고 확정하지 않으며, 사용량이 적더라도 결과 품질이 충분했는지 함께 확인해야 합니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram">
<span class="import-tag">토큰 비교 예시 · 가상 수치</span>
<svg viewBox="0 0 720 340" width="100%" role="img" aria-labelledby="portfolio-token-title portfolio-token-description" xmlns="http://www.w3.org/2000/svg">
<title id="portfolio-token-title">작업별 예상 토큰과 실제 토큰 비교 예시</title>
<desc id="portfolio-token-description">실측이 아닌 가상 수치입니다. 작업 A는 예상 1000, 실제 1100토큰. 작업 B는 예상 1000, 실제 1800토큰입니다. 빨간 실제 막대는 예상범위에서 벗어난 코인 사용으로 관찰이 필요한 구간을 나타냅니다. 작업 C는 예상 1000, 실제 800토큰입니다. 모든 막대는 같은 0부터 2000토큰 축을 사용합니다.</desc>
<g fill="var(--ink)" font-family="inherit" font-size="18">
<rect x="110" y="18" width="20" height="16" fill="none" stroke="var(--ink)" stroke-width="0.65"/><path d="M110 19.5 L116.6 18 L123.2 19.8 L130 18 L129.25 26 L130 34 L123 32.8 L116.4 34 L110 33.25 L110.9 26 Z" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 20.9 L119 19.55 L129 20.6 M111 32 L121 30.8 L129 32.3" fill="none" stroke="var(--ink)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><text x="140" y="32">예상</text>
<rect x="230" y="18" width="20" height="16" fill="var(--accent)" fill-opacity="0.2"/><path d="M230 19.5 L236.6 18 L243.2 19.8 L250 18 L249.25 26 L250 34 L243 32.8 L236.4 34 L230 33.25 L230.9 26 Z" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M231 20.9 L239 19.55 L249 20.6 M231 32 L241 30.8 L249 32.3" fill="none" stroke="var(--accent)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><path d="M231 22 L236.4 21.25 L243.4 22.75 L249 22 M231 25 L236.4 24.25 L243.4 25.75 L249 25 M231 28 L236.4 27.25 L243.4 28.75 L249 28 M231 31 L236.4 30.25 L243.4 31.75 L249 31" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/><text x="260" y="32">실제</text>
<g stroke="var(--line)"><path d="M110 55V295 M230 55V295 M350 55V295 M470 55V295 M590 55V295"/></g>
<path d="M111.05 55 L109.1 135 L110.9 215 L110.3 295 M105.5 294 L110.75 295 L114.5 294.5 M231.05 55 L229.1 135 L230.9 215 L230.3 295 M225.5 294 L230.75 295 L234.5 294.5 M351.05 55 L349.1 135 L350.9 215 L350.3 295 M345.5 294 L350.75 295 L354.5 294.5 M471.05 55 L469.1 135 L470.9 215 L470.3 295 M465.5 294 L470.75 295 L474.5 294.5 M591.05 55 L589.1 135 L590.9 215 L590.3 295 M585.5 294 L590.75 295 L594.5 294.5" fill="none" stroke="var(--muted)" stroke-width="0.7" stroke-linecap="round" opacity="0.6"/>
<text x="15" y="105">작업 A</text>
<rect x="110" y="65" width="240" height="22" fill="none" stroke="var(--ink)" stroke-width="0.65"/><path d="M110 66.5 L189.2 65 L268.4 66.8 L350 65 L349.25 76 L350 87 L266 85.8 L186.8 87 L110 86.25 L110.9 76 Z" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 67.9 L218 66.55 L349 67.6 M111 85 L242 83.8 L349 85.3" fill="none" stroke="var(--ink)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><text x="362" y="83">1,000</text>
<rect x="110" y="97" width="264" height="22" fill="var(--accent)" fill-opacity="0.2"/><path d="M110 98.5 L197.12 97 L284.24 98.8 L374 97 L373.25 108 L374 119 L281.6 117.8 L194.48 119 L110 118.25 L110.9 108 Z" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 99.9 L228.8 98.55 L373 99.6 M111 117 L255.2 115.8 L373 117.3" fill="none" stroke="var(--accent)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><path d="M111 101 L194.48 100.25 L286.88 101.75 L373 101 M111 104 L194.48 103.25 L286.88 104.75 L373 104 M111 107 L194.48 106.25 L286.88 107.75 L373 107 M111 110 L194.48 109.25 L286.88 110.75 L373 110 M111 113 L194.48 112.25 L286.88 113.75 L373 113 M111 116 L194.48 115.25 L286.88 116.75 L373 116" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/><text x="386" y="115">1,100</text>
<path d="M7 131 L180 130 L354 132 L528 130 L704 131 L703 171 L705 210 L531 211 L355 209 L180 211 L6 210 L7 170 Z" fill="none" stroke="var(--observation)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
<text x="15" y="185">작업 B</text>
<text x="435" y="155" fill="var(--ink)" font-size="16" textLength="260" lengthAdjust="spacingAndGlyphs">예상범위 밖 코인 사용 → 관찰 필요</text>
<rect x="110" y="145" width="240" height="22" fill="none" stroke="var(--ink)" stroke-width="0.65"/><path d="M110 146.5 L189.2 145 L268.4 146.8 L350 145 L349.25 156 L350 167 L266 165.8 L186.8 167 L110 166.25 L110.9 156 Z" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 147.9 L218 146.55 L349 147.6 M111 165 L242 163.8 L349 165.3" fill="none" stroke="var(--ink)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><text x="362" y="163">1,000</text>
<rect x="110" y="177" width="432" height="22" fill="var(--observation)"/><path d="M110 178.5 L252.56 177 L395.12 178.8 L542 177 L541.25 188 L542 199 L390.8 197.8 L248.24 199 L110 198.25 L110.9 188 Z" fill="none" stroke="var(--observation)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 179.9 L304.4 178.55 L541 179.6 M111 197 L347.6 195.8 L541 197.3" fill="none" stroke="var(--observation)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><path d="M111 181 L248.24 180.25 L399.44 181.75 L541 181 M111 184 L248.24 183.25 L399.44 184.75 L541 184 M111 187 L248.24 186.25 L399.44 187.75 L541 187 M111 190 L248.24 189.25 L399.44 190.75 L541 190 M111 193 L248.24 192.25 L399.44 193.75 L541 193 M111 196 L248.24 195.25 L399.44 196.75 L541 196" fill="none" stroke="var(--observation)" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/>
<text x="554" y="195">1,800</text>
<text x="15" y="265">작업 C</text>
<rect x="110" y="225" width="240" height="22" fill="none" stroke="var(--ink)" stroke-width="0.65"/><path d="M110 226.5 L189.2 225 L268.4 226.8 L350 225 L349.25 236 L350 247 L266 245.8 L186.8 247 L110 246.25 L110.9 236 Z" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 227.9 L218 226.55 L349 227.6 M111 245 L242 243.8 L349 245.3" fill="none" stroke="var(--ink)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><text x="362" y="243">1,000</text>
<rect x="110" y="257" width="192" height="22" fill="var(--accent)" fill-opacity="0.2"/><path d="M110 258.5 L173.36 257 L236.72 258.8 L302 257 L301.25 268 L302 279 L234.8 277.8 L171.44 279 L110 278.25 L110.9 268 Z" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M111 259.9 L196.4 258.55 L301 259.6 M111 277 L215.6 275.8 L301 277.3" fill="none" stroke="var(--accent)" stroke-width="0.75" stroke-linecap="round" opacity="0.7"/><path d="M111 261 L171.44 260.25 L238.64 261.75 L301 261 M111 264 L171.44 263.25 L238.64 264.75 L301 264 M111 267 L171.44 266.25 L238.64 267.75 L301 267 M111 270 L171.44 269.25 L238.64 270.75 L301 270 M111 273 L171.44 272.25 L238.64 273.75 L301 273 M111 276 L171.44 275.25 L238.64 276.75 L301 276" fill="none" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" opacity="0.85"/><text x="314" y="275">800</text>
<g fill="var(--muted)" text-anchor="middle"><text x="110" y="320">0</text><text x="230" y="320">500</text><text x="350" y="320">1,000</text><text x="470" y="320">1,500</text><text x="590" y="320">2,000</text></g>
<text x="650" y="320" fill="var(--muted)">토큰</text>
</g>
</svg>
</div>
<figcaption>실제 측정 결과나 절감 성과가 아닌 비교 방법의 예시입니다. 작업 B의 빨간 막대는 예상범위에서 벗어난 코인 사용으로, 추가 관찰이 필요한 구간을 나타냅니다. 수치와 축의 단위는 토큰입니다.</figcaption>
</figure>

<blockquote>
<p>실제 사용량과 결과 품질을 함께 검증하고, 편차의 원인을 분석하며 라우팅 규칙을 보완하는 실험을 별도의 Router 프로젝트로 이어갈 계획입니다.</p>
</blockquote>

익숙하지 않은 웹 분야에서 원하는 방향을 세세히 설명하고 조정하는 데에는 예상보다 시간이 들었습니다. 자연어로 시작할 수는 있었지만, 결과를 정밀하게 판단하고 원하는 모습으로 만들려면 저 역시 그 분야를 배워야 한다는 점을 느꼈습니다.
</article>
