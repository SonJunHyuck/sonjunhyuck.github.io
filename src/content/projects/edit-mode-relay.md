---
title: "웹 포트폴리오 개편: \"딸각\"은 없다."
summary: "브랜드 사이트를 참고해 포트폴리오 UX를 개편하고, 화면에서 모은 수정 요청을 Claude와 Codex가 이어서 처리하는 흐름을 설계했습니다."
cardLabel: "브랜드 사이트를 참고한 포트폴리오 UX 개편과 로컬 편집 모드"
cardContribution: "개편 방향을 정하고 편집 모드와 AI 협업 흐름을 설계했습니다. AI가 반영한 결과를 검토했습니다."
description: "포트폴리오 UX 개선 프로젝트입니다. 그 과정에서 추가한 Edit mode를 소개합니다."
publishedAt: 2026-11-27
category: "ai"
projectGroup: "ai"
aiCollaboration: true
series:
  id: web-portfolio
  title: "웹 포트폴리오"
  part: 2
  partLabel: "개편"
workTypes: ["personal", "experiment"]
status: "in-progress"
period: "2026.11.26–2026.11.27"
role: "AI 오케스트레이션"
platform: ["Web"]
thumbnail: "/images/projects/edit-mode-relay/cover.webp"
technologies:
  - name: "Astro"
    purpose: "개발 서버 전용 스크립트와 저장 미들웨어 연결"
  - name: "TypeScript"
    purpose: "편집 모드의 요소 선택과 요청 패널 동작"
  - name: "herdr CLI"
    purpose: "에이전트 세션 간 프롬프트 전달"
features: []
---

<article class="bfx-case">
<header>
<span class="bfx-case-number">01 · 수정 계기</span>
<h3>"시선의 흐름을 설계해보자."</h3>
</header>

AI 오케스트레이션을 해보며 만든 웹 포트폴리오는 중구난방이었습니다. 흐름이 고려되지 않은 채, 분산돼 있는 정보들이 가득했습니다. 하지만 가공하는 것까지가 AI 사용자의 능력이라고 생각합니다.

확인할 정보와 필요한 이동 경로만 간결하게 남기고 싶었습니다. 여러 브랜드 홈페이지의 화면을 살펴보며, UX를 고민했습니다.

</article>

<article class="bfx-case" id="ux-references">
<header>
<span class="bfx-case-number">02 · 참고한 UX</span>
<h3>방문자가 정보를 읽고 이동하는 방식을 살폈습니다</h3>
</header>

<h4>프로필에 적용한 서핏의 이력서 구성</h4>

서핏 프로필을 참고해 원형 사진과 이름, 직무, 연락처, 자기소개를 프로필 상단에 모았습니다. <span class="text-highlight">이력서를 보고 온 방문자는 같은 레이아웃임을 직감하고 아래 내용으로 바로 내려갈 수 있고, 포트폴리오로 바로 온 방문자는 기본 정보부터 확인할 수 있게</span> 구성했습니다.

<div class="story-media-grid story-comparison">
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/reference-surfit.webp" alt="서핏 공개 이력서에서 원형 사진 아래 이름과 직무가 놓인 화면" width="880" height="301" style="height: auto" loading="lazy" decoding="async">
<figcaption>서핏의 이력서 레이아웃. 사진, 이름, 직무를 상단에 모은 구성</figcaption>
</figure>
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/profile-top.webp" alt="포트폴리오 프로필 상단에 원형 사진, 이름, 직무가 놓인 화면" width="1200" height="374" style="height: auto" loading="lazy" decoding="async">
<figcaption>서핏을 모방한 레이아웃</figcaption>
</figure>
</div>

<h4>코카콜라 홈페이지의 구성에서 착안하다.</h4>

코카콜라 사이트를 참고해 상단 커버 캐러셀을 상세 페이지의 진입점으로 두었습니다. 아래에는 이미지와 글 카드가 좌우로 번갈아 겹치는 지그재그 소개 블록을 배치했습니다. 기존에 존재하던 3D 아바타는 존재 이유가 없었으며, 능력치 구역은 객관적 정보를 제공하기에는 아쉽다고 판단하여 덜어냈습니다.

<div class="story-media-grid story-comparison story-comparison-tall">
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/reference-coca-cola.webp" alt="코카콜라 메인 캐러셀과 이미지와 글 카드가 좌우로 번갈아 겹치는 두 소개 블록" width="1200" height="1560" style="height: auto" loading="lazy" decoding="async">
<figcaption>코카콜라에서 참고한 메인 캐러셀과 좌우가 바뀌는 두 소개 블록을 발췌</figcaption>
</figure>
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/projects-after.webp" alt="포트폴리오 프로젝트 목록의 커버 캐러셀 아래에 지그재그 소개 블록이 이어지는 화면" width="1200" height="1558" style="height: auto" loading="lazy" decoding="async">
<figcaption>프로젝트 목록에도 커버 캐러셀을 먼저 두고 소개 블록을 좌우로 교차 배치</figcaption>
</figure>
</div>

<h4>롤렉스의 진입점 연출을 참고하다.</h4>

프로젝트 페이지에 진입하게 되면 사용자가 처음 맞이하게 되는 화면에는 임팩트를 주고 싶었습니다. 롤렉스 홈페이지를 방문했을 때, 거대한 영상을 마주하게 됐고, 임팩트를 주기에 좋다고 판단하여 착안했습니다.

프로젝트 커버 위에 분류, 제목, ‘자세히 보기’를 올려 방문자가 어떤 프로젝트인지 확인하고 바로 상세로 이동할 수 있게 했습니다.

<div class="story-media-grid story-comparison">
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/reference-rolex.webp" alt="롤렉스 컬렉션 영상 위에 제목과 신제품 자세히 보기 버튼이 겹쳐진 화면" width="1200" height="553" style="height: auto" loading="lazy" decoding="async">
<figcaption>착안점 : 롤렉스 홈페이지 일부</figcaption>
</figure>
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/carousel-overlay.webp" alt="군중 대형 제어 시뮬레이션 커버 하단에 분류와 제목, 자세히 보기 버튼이 겹쳐진 화면" width="1200" height="553" style="height: auto" loading="lazy" decoding="async">
<figcaption>글자의 가독성을 위해 그라디언트 커버를 깔아두었습니다.</figcaption>
</figure>
</div>

</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">03 · 편집 모드</span>
<h3>터미널에서 설명하는 것은 비효율적이다.</h3>
</header>

개편할 화면을 살펴보며 고칠 곳이 보일 때마다 터미널로 돌아가 어느 페이지의 어떤 요소인지 AI에 설명했습니다. <span class="text-negative">화면에서는 바로 가리킬 수 있는 위치를 대화로 다시 설명하는 과정이 번거로웠습니다. 터미널에서 명령하면 터미널과 웹페이지를 오가야 해서 작업 흐름이 분산된다고 판단했습니다.</span> <span class="text-highlight">화면에서 요소를 직접 고르고 그 자리에 원하는 변경을 남기고 싶었습니다.</span>

편집 모드에서는 화면에서 요소를 고르고 바꿀 문구나 코멘트를 저장하면 수정 요청이 파일에 쌓입니다. 패널에서 현재 페이지의 요청을 확인하고 해당 요소로 다시 이동할 수 있습니다.

<figure class="story-media">
<img src="/images/projects/edit-mode-relay/card.webp" alt="선택한 요소가 강조된 화면 위에 수정 요청 폼과 현재 페이지의 요청 목록이 표시되어 있습니다." width="1440" height="900" style="height: auto" loading="lazy" decoding="async">
<figcaption>고칠 요소를 선택하면 바꿀 문구와 코멘트를 입력할 수 있습니다. 왼쪽 아래 패널에서 저장한 요청을 확인합니다.</figcaption>
</figure>

요소 선택과 패널 동작은 TypeScript를 사용합니다. Astro 통합은 개발 서버(`dev`)에서만 이 스크립트를 주입하고 요청 저장 미들웨어를 연결합니다. 배포용 빌드(`build`)에서는 이 통합이 편집 기능을 추가하는 작업 없이 종료됩니다.

</article>

<article class="bfx-case">
<header>
<span class="bfx-case-number">04 · 일괄 전송</span>
<h3>수정 요청은 모아서</h3>
</header>

페이지 전체를 손볼 때 <span class="text-negative">수정할 곳마다 메시지를 보내면 에이전트 호출과 결과 검토가 반복됩니다.</span> 요청마다 같은 맥락을 다시 읽는 데 토큰이 들고 검토도 여러 번 해야 했습니다. 실제 업무 환경에서도 먼저 수정할 곳을 모은 뒤 한꺼번에 반영하는 흐름에서 착안했습니다.

메뉴와 목록처럼 서로 연결된 콘텐츠를 각각 보내면 AI가 변경점 사이의 관계를 함께 고려하기 어렵다고 판단했습니다. 여러 페이지의 요청을 모아 두었다가 <span class="text-highlight">'보내기'를 눌러 대기 중인 요청을 한 번에 전달</span>하도록 했습니다.

<h4>"Codex에게 바로 보내는 것은 위험한데?"</h4>

처음에는 미리 작성한 프롬프트로 Codex에 요청을 바로 보냈습니다. 하지만 작업 지시를 해석 없이 바로 전달하기보다, 맡기기 전에 문장의 의도를 파악하고 구현 지시를 쓰는 과정이 필요하다고 판단해 <span class="text-highlight">Claude가 한 번 정제하는 과정을 추가</span>했습니다.

의도가 애매한 요청은 Claude가 저에게 다시 질문하도록 해, 의도에서 벗어나지 않도록 방어기제를 깔아 두기도 했습니다.

<figure class="story-media portfolio-diagram">
<div class="import-board portfolio-import-diagram">
<span class="import-tag">수정 요청 일괄 전송</span>
<div class="import-flow" role="list" aria-label="요청 저장부터 Claude 정제와 처리 결과 기록까지">
<div class="import-node" role="listitem"><strong>요소를 골라 요청 저장</strong><span>대기(open)</span></div>
<span class="import-arrow" aria-hidden="true">→</span>
<div class="import-node" role="listitem"><strong>수정할 곳 모으기</strong><span>여러 페이지의 요청을 한곳에</span></div>
<span class="import-arrow" aria-hidden="true">→</span>
<div class="import-node" role="listitem"><strong>한 번에 보내기</strong><span>전달(sent)</span></div>
<span class="import-arrow" aria-hidden="true">→</span>
<div class="import-node" role="listitem"><strong>Claude 정제</strong><span>의도 확인, 구현 지시 작성</span></div>
<span class="import-arrow" aria-hidden="true">→</span>
<div class="import-node import-result" role="listitem"><strong>처리 결과 기록</strong><span>반영(done) / 보류(held)</span></div>
</div>
</div>
</figure>

</article>

<article class="bfx-case" id="redesign-results">
<header>
<span class="bfx-case-number">05 · 개편 결과와 회고</span>
<h3>원하는 결과를 마주하기까지.</h3>
</header>

AI와 협업하는 모든 프로젝트에서 느끼는 것이지만, <span class="text-negative">한 걸음에 프로젝트가 완성되지는 않는다는 점</span>을 다시 한번 체감했습니다. 내가 원하는 방향을 최대한 디테일하게 잡아줘야 했고, 이 과정에서 <span class="text-highlight">레퍼런스를 많이 찾아보는 게 도움이 됐습니다.</span>

이미 시중에 있는 프로덕트는 수많은 의사 결정을 통해 탄생했기 때문에, 이를 모방하는 편이 낫겠다고 판단했습니다. 다만 <span class="text-highlight">내 프로젝트에 맞게 디테일을 한 스푼 넣는 것이 핵심</span>이라고 생각합니다. 각 프로젝트에 필요한 정보를 학습해야 더 좋은 퀄리티의 프로덕트가 나온다는 것도 느꼈습니다. <span class="text-negative">캐러셀이라는 단어를 모르면 사용할 수 없는 것</span>과 같습니다.

하지만 <span class="text-highlight">AI는 훌륭한 구현 도구이자 학습 도구입니다.</span> 프로젝트를 진행하며 학습하고 디테일을 잡아가면서 <span class="text-highlight">나를 표현할 수 있었습니다.</span>

<div class="story-media-grid story-comparison story-comparison-tall">
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/ai-before.webp" alt="AI 협업 개편 전 화면. 작업 환경과 터미널 녹화가 먼저 나오고 아래에 프로젝트 카드가 나옵니다." width="1200" height="1558" style="height: auto" loading="lazy" decoding="async">
<figcaption>개편 전에는 작업 환경을 먼저 보여 주고 그 아래에 프로젝트 카드를 배치했습니다.</figcaption>
</figure>
<figure class="story-media">
<img src="/images/projects/edit-mode-relay/ai-after.webp" alt="AI 협업 개편 후 화면. 커버 캐러셀과 지그재그 소개 블록이 목록의 상단에 나옵니다." width="1200" height="1558" style="height: auto" loading="lazy" decoding="async">
<figcaption>개편 후에는 프로젝트 목록과 같은 구성으로 AI 협업 프로젝트를 소개합니다.</figcaption>
</figure>
</div>

</article>
