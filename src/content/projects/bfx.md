---
title: "Project BFX"
summary: "PvE FPS의 퀘스트·대화 연동, 대화 데이터 임포터, 알림 UI를 구현하고 시스템 간 책임과 콘텐츠 작성 방식을 정리했습니다."
description: "The Division에서 모티브를 얻은 PvE 중심 FPS입니다. 미션을 수행하며 챕터를 이어가는 게임의 클라이언트 개발에 참여했습니다."
publishedAt: 2026-10-08
category: "game"
projectGroup: "games"
workTypes: ["team"]
status: "prototype"
role: "게임 클라이언트 개발"
teamSize: "게임 클라이언트 개발 5명"
platform: ["PC"]
genres: ["PvE FPS"]
thumbnail: "/images/projects/bfx/cover.png"
gallery:
  - src: "/images/projects/bfx/dialogue-preview.png"
    alt: "Project BFX에서 NPC와 대화하는 게임 화면"
    caption: "NPC 대화 UI"
  - src: "/images/projects/bfx/modal.png"
    alt: "Project BFX의 확인과 취소 선택지가 있는 모달 UI"
    caption: "Modal UI"
technologies:
  - name: "Unity · C#"
    purpose: "게임 클라이언트 기능과 UI 구현"
  - name: "Pixel Crushers Dialogue System"
    purpose: "대화 데이터 임포트와 런타임 연동 확장"
  - name: "Spreadsheet workflow"
    purpose: "Conversation 단위 대화 콘텐츠 제작"
features:
  - title: "퀘스트·대화 연동"
    description: "퀘스트 상태와 외부 대화 시스템을 연결했습니다."
  - title: "대화 데이터 임포터"
    description: "Conversation별 워크북의 대사와 연결 정보를 Dialogue Database에 반영합니다."
  - title: "알림 UI"
    description: "MessageFeed·Banner·Radio를 NotificationService로 호출하고, 확인·취소 Popup은 별도로 구성했습니다."
---

<h2 id="overview">게임 소개 및 구현 기능</h2>

<div class="bfx-intro-grid">
  <p>BFX는 <em>The Division</em>에서 모티브를 얻은 PvE 중심 FPS입니다. 플레이어는 전투와 NPC 상호작용이 포함된 미션을 수행하며 챕터를 이어갑니다. 게임 클라이언트 개발자 5명이 게임에 대한 의견을 함께 나누고, 각자 개발할 범위를 맡아 작업했습니다.</p>
</div>

<article class="bfx-case bfx-feature" id="quest-dialogue">
  <header>
    <span class="bfx-case-number">기능 01</span>
    <h3>퀘스트·대화 연동</h3>
    <p>Pixel Crushers의 Dialogue System은 노드 기반의 외부 대화 시스템으로, 대화 조건과 동작을 정의할 때 Lua를 사용합니다. 프로젝트의 C# 퀘스트 시스템과 연결하기 위해 Bridge를 구성했습니다.</p>
    <p>대화에서는 Bridge를 통해 퀘스트 상태를 조회하고, 필요한 시점에 퀘스트 시작이나 보상을 요청합니다. 퀘스트 상태는 프로젝트의 퀘스트 시스템에서 관리하면서, 외부 대화 시스템에서도 이를 사용할 수 있도록 연결했습니다.</p>
  </header>
  <div class="bfx-flow" aria-label="퀘스트와 대화 동작 흐름">
    <div><span>1</span><strong>NPC 상호작용</strong><p>대화 조건에 필요한 퀘스트 상태를 조회합니다.</p></div>
    <div><span>2</span><strong>대화와 퀘스트 시작</strong><p>대화 흐름에서 퀘스트 시작을 요청합니다.</p></div>
    <div><span>3</span><strong>완료·보상·저장</strong><p>완료 조건 이후 보상을 요청하고 저장 흐름으로 연결합니다.</p></div>
  </div>
  <figure class="story-media bfx-video">
    <video controls muted preload="metadata" poster="/images/projects/bfx/dialogue-preview.png" playsinline>
      <source src="/images/projects/bfx/dialogue-demo.mp4" type="video/mp4" />
      <a href="/images/projects/bfx/dialogue-demo.mp4">NPC 대화 영상 열기</a>
    </video>
    <figcaption>임포트한 대화가 NPC 상호작용과 게임 UI로 이어지는 모습 · 11초, 무음</figcaption>
  </figure>
</article>

<article class="bfx-case bfx-feature" id="dialogue-importer">
  <header>
    <span class="bfx-case-number">기능 02</span>
    <h3>대화 데이터 임포터</h3>
    <p>우리 팀은 대화 시스템을 직접 구현하기보다 외부 대화 시스템을 활용하는 편이 개발 시간을 절약하는 데 적합하다고 판단했습니다. 여러 선택지를 검토한 끝에 Pixel Crushers의 Dialogue System을 사용하기로 결정했습니다.</p>
    <p>이 시스템은 노드를 만들고 각 노드에 화자와 대사를 입력한 뒤, 노드 사이의 연결을 설정하는 방식입니다. 대화가 늘어날수록 이러한 편집을 반복해야 했습니다.</p>
    <p>노드마다 입력해야 하는 정보를 데이터 항목으로 정리하고, 스프레드시트에서 일괄적으로 작성·수정할 수 있도록 임포터를 만들었습니다. 대사 정보는 <code>Entries</code> 시트에, 노드 사이의 연결 관계는 <code>Links</code> 시트에 작성하면, 임포터가 이를 읽고 검증해 외부 시스템의 대화 데이터로 반영합니다.</p>
    <p>Conversation 하나당 워크북 하나를 사용하고 파일명을 ID로 삼아, 수정할 대화를 파일 단위로 관리하도록 구성했습니다.</p>
  </header>
  <div class="bfx-decision-grid">
    <div><span>입력</span><p><code>cv_*</code> 형식의 파일명과 Entries·Links 시트를 읽습니다.</p></div>
    <div><span>검증</span><p>파일명과 시트 데이터를 확인하고 소스별 임포트 결과를 보고합니다.</p></div>
    <div><span>반영</span><p>Conversation ID를 기준으로 기존 데이터를 갱신합니다.</p></div>
  </div>
  <figure class="story-media bfx-importer-media">
    <a href="/images/projects/bfx/dialogue-importer.png" target="_blank" rel="noopener" aria-label="Dialogue Importer 원본 이미지 새 탭에서 보기">
      <img src="/images/projects/bfx/dialogue-importer.png" alt="Conversation별 워크북을 등록하고 Conversation ID와 최근 임포트 상태를 보여주는 실제 Dialogue Importer 화면" loading="lazy" />
    </a>
    <figcaption>대화 데이터 임포터 실행 화면 · 이미지를 선택하면 원본 크기로 볼 수 있습니다.</figcaption>
  </figure>
</article>

<article class="bfx-case bfx-feature" id="notification-ui">
  <header>
    <span class="bfx-case-number">기능 03</span>
    <h3>알림 UI와 공통 호출 창구</h3>
    <p>게임에 필요한 정보 전달 방식을 짧은 상태 메시지인 MessageFeed, 강조 안내인 Banner, 화자와 대사를 전달하는 Radio로 나눴습니다.</p>
    <p>사용하는 쪽에서 각 알림의 내부 구현을 개별적으로 다루지 않도록, 공통 호출 창구인 NotificationService를 제안했습니다. 호출부는 필요한 알림과 데이터를 전달하고, 표시 처리는 각 알림의 내부 구현에서 담당하도록 구성했습니다.</p>
  </header>
  <div class="bfx-notification-list">
    <div><strong>MessageFeed</strong><span>아이템 획득이나 짧은 상태 메시지</span></div>
    <div><strong>Banner</strong><span>화면 상단의 강조 안내</span></div>
    <div><strong>Radio</strong><span>화자와 대사를 전달하는 무전</span></div>
  </div>
  <div class="bfx-notification-media">
    <figure class="story-media">
      <img src="/images/projects/bfx/radio.gif" alt="Project BFX에서 화자 이름과 대사가 순서대로 표시되는 Radio 알림 예시" loading="lazy" />
      <figcaption>Radio 알림 표시 예시</figcaption>
    </figure>
  </div>
  <div class="bfx-popup-note">
    <h4>재사용 가능한 확인·취소 Popup</h4>
    <p>확인·취소 요청은 정보를 일방적으로 전달하는 알림과 달리 사용자의 결정과 후속 처리가 필요합니다. 따라서 NotificationService에 포함하지 않고 별도의 Popup으로 분리했습니다.</p>
    <p>확인·취소 창은 상황마다 내용과 선택 이후의 동작이 달라지므로, 호출하는 쪽에서 제목·설명과 함께 확인·취소 시 실행할 함수(callback)를 전달하도록 구성했습니다. 화면을 매번 새로 만들지 않고, 같은 팝업을 여러 상황에서 재사용할 수 있도록 했습니다.</p>
    <figure class="story-media">
      <img src="/images/projects/bfx/modal.png" alt="Project BFX의 재사용 가능한 확인·취소 Popup 예시" loading="lazy" />
      <figcaption>재사용 가능한 확인·취소 Popup 예시</figcaption>
    </figure>
  </div>
</article>

<h2 id="ai-usage">AI 활용</h2>

<p class="bfx-ai-lead">AI는 구현 초안 작성과 구조 검토에 활용했습니다. 필요한 동작과 제약을 설명하고, 제안된 구조가 실제 미션 진행과 콘텐츠 작성 방식에 맞는지 검토했습니다. 맞지 않는 부분은 이유와 대안을 제시해 수정 방향을 정했습니다.</p>
<p class="bfx-ai-lead">아래는 AI의 제안을 검토하고 구현 방향을 조정한 두 가지 대표 사례입니다.</p>

<div class="bfx-ai-process" aria-label="AI 협업 과정">
  <div><span>01</span><strong>요구사항 전달</strong><p>필요한 동작과 사용 상황, 시스템 간 제약을 설명했습니다.</p></div>
  <div><span>02</span><strong>제안 검토</strong><p>실제 미션과 콘텐츠 작성 흐름에 대입해 책임 중복과 사용상의 불편을 살폈습니다.</p></div>
  <div><span>03</span><strong>대안 제시·수정</strong><p>바꿀 이유와 대안을 제시하고 구현 방향을 조정했습니다.</p></div>
</div>

<article class="bfx-case bfx-ai-case" id="ai-workbook">
  <header>
    <span class="bfx-case-number">사례 01</span>
    <h3>대화 파일 단위 재설계</h3>
    <p class="bfx-case-lead">대화를 수정하는 단위에 맞춰 파일 구성을 바꿨습니다.</p>
    <p>Sequence 기준으로 묶인 데이터보다 Conversation별 파일이 NPC 대화를 찾고 수정하는 작업에 맞는다고 판단했습니다. Conversation마다 워크북을 나누고 <code>Entries</code>·<code>Links</code> 시트를 사용하는 구성을 제안했습니다. 이후 워크북이 분리되고, 파일명에서 Conversation ID를 읽는 방식으로 임포터가 변경됐습니다.</p>
  </header>
  <blockquote>“그럼 cv마다 다른 워크북을 두고, 시트를 Entries랑 Links로 두는건 어떻게 생각해?”<cite>대화 원문 일부</cite></blockquote>
  <details class="bfx-proof">
    <summary>판단 과정과 반영 결과</summary>
    <div><img src="/images/projects/bfx/evidence-content-workbook.png" alt="Conversation별 워크북과 Entries, Links 시트 구성을 제안한 대화 원문 재구성" loading="lazy" /><p>Conversation별 워크북 분리와 파일명 기반 ID 파싱이 임포터에 반영됐습니다.</p><p class="bfx-limit">대화 원문 재구성 · 실제 앱 캡처 아님</p></div>
  </details>
</article>

<article class="bfx-case bfx-ai-case" id="ai-sequence">
  <header>
    <span class="bfx-case-number">사례 02</span>
    <h3>Sequence 계층 단순화</h3>
    <p class="bfx-case-lead">기획상의 구분과 실제 실행 구조를 분리했습니다.</p>
    <p>미션 진행을 Quest와 Sequence가 중복해서 표현하면서 코드 관계가 복잡해진다고 판단했습니다. 현재 시나리오에서는 Quest와 Dialogue를 중심으로 진행하고, 무전이나 연출은 필요한 지점의 Trigger에서 호출하는 방향을 제안했습니다. 실제 변경에서는 SequenceManager와 연결 Bridge, Sequence 저장·로드 및 초기화 연결이 제거됐습니다.</p>
  </header>
  <blockquote>“개념적인 단위로 Squence를 쓰고 있지만, 이게 코드적으로 제어하려고 하니까 오히려 더 어색한거 같아.”<cite>대화 원문 일부 · 원문 표기 유지</cite></blockquote>
  <details class="bfx-proof">
    <summary>판단 과정과 반영 결과</summary>
    <div><img src="/images/projects/bfx/evidence-story-structure.png" alt="Quest와 Sequence의 책임 중복을 검토한 대화 원문 재구성" loading="lazy" /><p><code>SequenceManager</code>와 <code>SequenceDialogueBridge</code>, Sequence 저장·로드, 초기화의 자동 시작 연결이 제거됐습니다.</p><p class="bfx-limit">대화 원문 재구성 · 실제 앱 캡처 아님</p></div>
  </details>
</article>
