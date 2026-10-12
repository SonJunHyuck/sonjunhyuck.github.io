---
title: "Project BFX"
summary: "The Division에서 모티브를 얻어 전투와 NPC 상호작용이 포함된 미션을 수행하는 PvE FPS입니다."
cardContribution: "퀘스트 시스템 구현·대화 연동, 테이블 기반 대화 제작 도구, 알림 UI를 담당했습니다."
description: "The Division에서 모티브를 얻은 PvE 중심 FPS입니다. 미션을 수행하며 챕터를 이어가는 게임의 클라이언트 개발에 참여했습니다."
publishedAt: 2026-10-08
category: "game"
projectGroup: "games"
workTypes: ["team"]
status: "prototype"
role: "게임 클라이언트 개발"
period: "2026.05.04–2026.09.08"
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
  - title: "외부 대화 도구의 반복 편집 개선"
    description: "캐릭터 간 대화를 테이블화하여 유지보수 편의성을 높였습니다."
    highlight: "캐릭터 간 대화를 테이블화"
  - title: "퀘스트 시스템·대화 연동"
    description: "퀘스트 시스템을 구현하고, 외부 대화 시스템과 연동했습니다."
    highlight: "퀘스트 시스템을 구현"
  - title: "알림 UI"
    description: "게임 내 여러 알림 시스템을 하나의 창구로 캡슐화하여, 내부 구현을 몰라도 메시지만 전달해 사용할 수 있도록 했습니다."
    highlight: "하나의 창구로 캡슐화"
---

<article class="bfx-case bfx-feature" id="dialogue-importer">
  <header>
    <span class="bfx-case-number">기능 01</span>
    <h3>외부 대화 도구의 반복 편집 개선</h3>
    <p>팀에서는 개발 시간을 줄이기 위해 대화 시스템을 직접 구현하는 대신 외부 도구를 활용하기로 했습니다. 여러 선택지를 검토한 끝에 Pixel Crushers의 Dialogue System을 선택했습니다.</p>
    <p>Dialogue System은 노드마다 화자와 대사를 입력하고 연결하는 방식으로, 대화 흐름을 직관적으로 구성할 수 있습니다. 다만 대화가 늘어날수록 노드를 개별적으로 편집하는 작업도 반복됐습니다. 기존 시스템의 대화 실행 기능은 활용하되, <span class="bfx-text-highlight">콘텐츠를 작성하고 수정하는 과정은 더 간편하게 만들고자 했습니다.</span></p>
    <p>이를 위해 <span class="bfx-text-highlight">대사와 연결 관계를 테이블로 관리하는 임포터</span>를 구현했습니다. 기획자는 스프레드시트에서 대화를 일괄 작성·수정하고, 임포터는 데이터를 검증한 뒤 <span class="bfx-text-highlight">노드 생성과 연결을 처리</span>하도록 구성했습니다.</p>
    <p>대사·화자 등 노드 정보는 <code>Entries</code> 시트에, 노드 간 연결 정보는 <code>Links</code> 시트에 작성합니다. 임포터는 두 시트의 데이터를 읽어 Dialogue System의 대화 데이터로 반영합니다.</p>
    <p>스프레드시트는 <span class="bfx-text-highlight">게임 데이터와 분리된 중간 데이터</span>로 두었습니다. 수정 내용은 즉시 적용되지 않고, 기획자가 검토한 뒤 임포터를 통해 반영하도록 했습니다. 이 확인 단계로 편집 실수나 작성 중인 데이터가 게임에 반영될 위험을 줄이고자 했습니다.</p>
  </header>
  <figure class="import-board" id="bfx-import-diagram" aria-label="테이블 기반 대화 제작 도구 설계: 기획자가 대화를 작성하고 스프레드시트로 저장합니다. 기획자가 검토 후 반영 버튼을 누르면 임포터가 검증하고 노드와 링크를 생성하여 게임 데이터로 반영합니다.">
    <span class="import-tag">BFX · 테이블 기반 대화 제작 도구</span>
    <section aria-label="채택한 흐름" class="import-chosen">
      <span class="import-label">채택한 흐름</span>
      <div class="import-flow">
        <div class="import-node"><span class="import-index">01 / 작성</span><h3>기획자</h3><span>대화 작성<br>정해진 형식 정리</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node"><span class="import-index">02 / 중간 데이터</span><h3>스프레드시트</h3><span>Entries · Links<br>자유롭게 수정</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node import-gate"><span class="import-index">03 / 기획자 확인</span><h3>검토 후<br>반영 버튼</h3><span>명시적으로 적용</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node"><span class="import-index">04 / 자동 처리</span><h3>임포터</h3><span>데이터 검증<br>노드 · 링크 생성</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node import-result"><span class="import-index">05 / 반영</span><h3>게임 데이터</h3><span>대화 시스템에<br>변경 사항 적용</span></div>
      </div>
    </section>
  </figure>

  <div class="bfx-import-media-grid">
  <figure class="story-media bfx-sheet-media">
    <a href="/images/projects/bfx/dialogue-spreadsheet.png" target="_blank" rel="noopener" aria-label="대화 스프레드시트 원본 이미지 새 탭에서 보기">
      <img src="/images/projects/bfx/dialogue-spreadsheet.png" alt="cv_npc_luna 워크북의 Entries 시트. entryId, 화자, 대사, 선택지와 조건을 열로 관리하며 하단에 Entries와 Links 시트가 표시되어 있습니다." width="3600" height="2338" loading="lazy" />
    </a>
    <figcaption>게임 내 NPC Luna의 대화 관리 시트. 대사, 화자, 선택지, 조건을 관리하고, 노드 간 연결 정보는 Links 시트에서 관리합니다.</figcaption>
  </figure>
  <figure class="story-media bfx-importer-media">
    <a href="/images/projects/bfx/dialogue-importer.png" target="_blank" rel="noopener" aria-label="Dialogue Importer 원본 이미지 새 탭에서 보기">
      <img src="/images/projects/bfx/dialogue-importer.png" alt="Conversation별 워크북을 등록하고 Conversation ID와 최근 임포트 상태를 보여주는 실제 Dialogue Importer 화면" loading="lazy" />
    </a>
    <figcaption>대화 임포터 화면 — 스프레드시트를 등록해 게임 데이터로 반영할 수 있습니다.</figcaption>
  </figure>
  </div>
</article>

<article class="bfx-case bfx-feature" id="quest-dialogue">
  <header>
    <span class="bfx-case-number">기능 02</span>
    <h3>퀘스트 시스템·대화 연동</h3>
    <p>Pixel Crushers의 Dialogue System은 노드 기반의 외부 대화 시스템으로, 대화 조건과 동작을 정의할 때 Lua를 사용합니다. Unity에서 C#으로 구현한 퀘스트 시스템과 대화 시스템의 Lua 스크립트를 연결하기 위해 <span class="bfx-text-highlight">Bridge</span>를 구성했습니다.</p>
    <p>플레이어가 대화를 진행하면, 내부에서는 Bridge를 통해 <span class="bfx-text-highlight">퀘스트 상태를 조회</span>하고 필요한 시점에 <span class="bfx-text-highlight">퀘스트 시작이나 보상을 요청</span>합니다. 퀘스트 상태는 프로젝트의 퀘스트 시스템에서 관리하면서, 외부 대화 시스템에서도 이를 사용할 수 있도록 연결했습니다.</p>
  </header>
  <div class="bfx-flow" aria-label="퀘스트와 대화 동작 흐름">
    <div><strong>플레이어 대화</strong><p>Lua 스크립트 실행</p></div>
    <div><strong>Bridge</strong><p>상태 조회 · 시작/보상 요청</p></div>
    <div><strong>퀘스트 시스템</strong><p>C#에서 상태 관리</p></div>
  </div>
  <figure class="story-media bfx-video">
    <video controls muted preload="metadata" poster="/images/projects/bfx/dialogue-preview.png" playsinline>
      <source src="/images/projects/bfx/dialogue-demo.mp4" type="video/mp4" />
      <a href="/images/projects/bfx/dialogue-demo.mp4">NPC 대화 영상 열기</a>
    </video>
    <figcaption>임포트한 대화가 NPC 상호작용과 게임 UI로 이어지는 모습</figcaption>
  </figure>
</article>

<article class="bfx-case bfx-feature" id="notification-ui">
  <header>
    <span class="bfx-case-number">기능 03</span>
    <h3>알림 UI와 공통 호출 창구</h3>
    <h4>NotificationService : 공통 호출 창구</h4>
    <p>게임 시스템이 플레이어에게 일방적으로 전달하는 알림을 용도에 따라 구분했습니다. 짧은 상태 메시지는 <code>MessageFeed</code>, 강조 안내는 <code>Banner</code>, 화자와 대사가 있는 무전은 <code>Radio</code>로 구성했습니다.</p>
    <p>이처럼 서로 다른 알림을 <span class="bfx-text-highlight">인게임 기능 구현자가 일관된 방식으로 사용할 수 있도록</span>, 공통 호출 창구인 <code>NotificationService</code>를 제안했습니다. 호출하는 쪽에서는 <span class="bfx-text-highlight">알림 형태를 선택하고 메시지만 전달</span>하면 되고, 각 알림의 내부 구현이 게임 화면에 표시하는 처리를 맡도록 구성했습니다.</p>
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
    <p>확인·취소 요청은 정보를 일방적으로 전달하는 알림과 달리 사용자의 결정과 후속 처리가 필요합니다. 따라서 NotificationService에 포함하지 않고 <span class="bfx-text-highlight">별도의 Popup으로 분리</span>했습니다.</p>
    <p>확인·취소 창은 상황마다 내용과 선택 이후의 동작이 달라지므로, 호출하는 쪽에서 제목·설명과 함께 <span class="bfx-text-highlight">확인·취소 시 실행할 함수(callback)를 전달</span>하도록 구성했습니다. 화면을 매번 새로 만들지 않고, <span class="bfx-text-highlight">같은 팝업을 여러 상황에서 재사용</span>할 수 있도록 했습니다.</p>
    <figure class="story-media">
      <img src="/images/projects/bfx/modal.png" alt="Project BFX의 재사용 가능한 확인·취소 Popup 예시" loading="lazy" />
      <figcaption>재사용 가능한 확인·취소 Popup 예시</figcaption>
    </figure>
  </div>
</article>

<h2 id="ai-usage">AI 활용</h2>

<p class="bfx-ai-lead">이 프로젝트에서는 Unity MCP를 적극 활용했습니다. 구현할 내용과 방향을 자연어로 정리한 뒤 AI와 논의하고, 필요한 동작과 제약을 설명했습니다. 제안된 구조는 그대로 적용하기보다 <span class="bfx-text-highlight">실제 미션 진행과 콘텐츠 작성 방식에 맞는지 검토</span>하며 구체화했습니다.</p>

<article class="bfx-case bfx-ai-case" id="ai-workbook">
  <header>
    <h3>AI 제안을 실제 대화 시스템에 맞게 재설계</h3>
    <p>게임이 챕터 단위로 진행되는 흐름을 기획하면서 이를 Sequence라는 단위로 정의했습니다. 이 기획을 바탕으로 AI와 논의하자, 제안된 코드 구조도 Sequence를 중심으로 이어졌습니다. 하지만 기획상의 구분을 그대로 코드에 옮기는 방식은 이미 사용 중인 Dialogue System의 구조와 잘 맞지 않았습니다.</p>
    <p>Dialogue System은 Conversation을 대화의 단위로 사용합니다. 따라서 <span class="bfx-text-highlight">기획 용어보다 실제 사용하는 도구의 데이터 단위에 맞춰 설계</span>하는 편이 연동과 수정에 적합하다고 판단했습니다. Sequence 중심 구성을 그대로 받아들이지 않고, NPC의 대화를 Conversation별로 관리하는 방향을 제안했습니다.</p>
    <p>이를 반영해 <span class="bfx-text-highlight">Conversation별 워크북과 Entries·Links 시트로 데이터 구성을 변경</span>했습니다. NPC를 기준으로 수정할 대화 파일을 찾고, 해당 파일에서 대사와 연결 정보를 관리하도록 구성했습니다.</p>
    <p>이 과정에서 AI의 제안을 실제 사용 방식과 계속 대조하고, 맞지 않는 부분에는 이유와 대안을 제시했습니다. <span class="bfx-text-highlight">기획 방향과 최종 설계는 직접 판단</span>하고, AI는 대안을 검토하고 구현을 구체화하는 데 활용했습니다.</p>
  </header>
  <details class="bfx-proof">
    <summary>설계 변경을 제안한 대화 기록</summary>
    <div><img src="/images/projects/bfx/evidence-content-workbook.png" alt="Sequence 중심 데이터 구성을 재검토하고 NPC의 대화를 Conversation별 워크북과 Entries·Links 시트로 나누자고 제안한 대화 원문 재구성" loading="lazy" /><p class="bfx-limit">대화 원문 재구성 · 실제 앱 캡처 아님</p></div>
  </details>
</article>
