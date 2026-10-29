---
title: "Project BFX"
summary: "The Division에서 모티브를 얻어 전투와 NPC 상호작용이 포함된 미션을 수행하는 PvE FPS입니다."
cardContribution: "퀘스트 시스템 구현·대화 연동, 테이블 기반 대화 제작 도구, 알림 UI를 담당했습니다."
description: "The Division에서 모티브를 얻은 PvE 중심 FPS입니다. 미션을 수행하며 챕터를 이어가는 게임의 클라이언트 개발에 참여했습니다."
publishedAt: 2026-10-08
category: "game"
projectGroup: "games"
aiCollaboration: true
workTypes: ["team"]
status: "prototype"
role: "게임 클라이언트 개발"
period: "2026.05.04–2026.09.08"
teamSize: "게임 클라이언트 개발 5명"
platform: ["PC"]
genres: ["PvE FPS"]
thumbnail: "/images/projects/bfx/cover.webp"
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
  </header>
  <p>팀에서는 개발 시간을 줄이기 위해 대화 시스템을 직접 구현하는 대신 외부 도구를 활용하기로 했습니다. 여러 선택지를 검토한 끝에 Pixel Crushers의 Dialogue System을 선택했습니다. Dialogue System은 노드마다 화자와 대사를 입력하고 연결하는 방식으로, 대화 흐름을 직관적으로 구성할 수 있습니다. 다만 대화가 늘어날수록 노드를 개별적으로 편집하는 작업도 반복됐습니다.</p>
  <figure class="story-media">
    <img src="/images/projects/bfx/dialogue-node-editing.gif" alt="Dialogue System에서 대화 노드를 개별적으로 편집하는 과정" width="800" height="450" loading="lazy" />
    <figcaption>Pixel Crushers의 Dialogue System 대화 제작 노드 시스템</figcaption>
  </figure>
  <p>기존 시스템의 대화 실행 기능은 활용하되, <span class="bfx-text-highlight">콘텐츠를 작성하고 수정하는 과정은 더 간편하게 만들고자 했습니다.</span> 이를 위해 <span class="bfx-text-highlight">대사와 연결 관계를 테이블로 관리하는 임포터</span>를 구현했습니다. 기획자는 스프레드시트에서 대화를 일괄 작성·수정하고, 임포터는 데이터를 검증한 뒤 <span class="bfx-text-highlight">노드 생성과 연결을 처리</span>하도록 구성했습니다. 대사·화자 등 노드 정보는 <code>Entries</code> 시트에, 노드 간 연결 정보는 <code>Links</code> 시트에 작성합니다. 임포터는 두 시트의 데이터를 읽어 Dialogue System의 대화 데이터로 반영합니다.</p>
  <div class="bfx-import-media-grid">
  <figure class="story-media bfx-sheet-media">
    <a href="/images/projects/bfx/dialogue-spreadsheet.webp" target="_blank" rel="noopener" aria-label="대화 스프레드시트 원본 이미지 새 탭에서 보기">
      <img src="/images/projects/bfx/dialogue-spreadsheet.webp" alt="cv_npc_luna 워크북의 Entries 시트. entryId, 화자, 대사, 선택지와 조건을 열로 관리하며 하단에 Entries와 Links 시트가 표시되어 있습니다." width="3600" height="2338" loading="lazy" />
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
    <p>스프레드시트는 <span class="bfx-text-highlight">게임 데이터와 분리된 중간 데이터</span>로 두었습니다. 수정 내용은 즉시 적용되지 않고, 기획자가 검토한 뒤 임포터를 통해 반영하도록 했습니다. 이 확인 단계로 편집 실수나 작성 중인 데이터가 게임에 반영될 위험을 줄이고자 했습니다.</p>
  <figure class="import-board" id="bfx-import-diagram" aria-label="테이블 기반 대화 제작 도구 설계: 기획자가 대화를 작성하고 스프레드시트로 저장합니다. 기획자가 검토 후 반영 버튼을 누르면 임포터가 검증하고 노드와 링크를 생성하여 게임 데이터로 반영합니다.">
    <span class="import-tag">BFX · 테이블 기반 대화 제작 도구</span>
    <section aria-label="채택한 흐름" class="import-chosen">
      <span class="import-label">채택한 흐름</span>
      <div class="import-flow">
        <div class="import-node"><span class="import-index">01 / 작성</span><h3>기획자</h3><span>대화 작성 · 정해진 형식 정리</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node"><span class="import-index">02 / 중간 데이터</span><h3>스프레드시트</h3><span>Entries · Links 자유롭게 수정</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node import-gate"><span class="import-index">03 / 기획자 확인</span><h3>검토 후 반영 버튼</h3><span>명시적으로 적용</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node"><span class="import-index">04 / 자동 처리</span><h3>임포터</h3><span>데이터 검증 · 노드와 링크 생성</span></div>
        <span class="import-arrow" aria-hidden="true">→</span>
        <div class="import-node import-result"><span class="import-index">05 / 반영</span><h3>게임 데이터</h3><span>대화 시스템에 변경 사항 적용</span></div>
      </div>
    </section>
  </figure>
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
      <img src="/images/projects/bfx/radio.webp" alt="Project BFX에서 화자 이름과 대사가 순서대로 표시되는 Radio 알림 예시" loading="lazy" />
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


## 마치며

이 프로젝트는 이전 회사 동료들과 각자의 시간을 할애해 진행한 사이드 프로젝트입니다. 제한된 시간 안에서 AI를 적극적으로 활용해 게임을 만들어가는 방법을 함께 고민했습니다.

프로젝트 이전에는 바이브 코딩에 회의적이었고, AI도 필요한 순간에만 보조적으로 사용했습니다. 하지만 Unity MCP를 활용해 자연어로 구현 방향을 설명하고 게임을 만들어가면서 생각이 달라졌습니다. 개발 속도의 변화를 체감했고, 제가 직접 작성한 코드보다 더 나은 구조를 제안받는 경험도 있었습니다.

물론 그 과정이 항상 매끄럽지는 않았습니다. 잘못된 전제를 바로잡고 방향을 반복해서 설명해야 했으며, 오류가 누적된 대화는 맥락을 버리고 다시 시작하기도 했습니다. 특히 Dialogue System과 직접 구현한 퀘스트 시스템을 연동할 때는 기존 도구의 구조에 맞지 않는 제안이 이어져, <span class="bfx-text-highlight">설계 방향을 직접 정하고 제안을 검토하며 구현을 진행했습니다.</span>

이 경험을 통해 관심은 AI를 사용할지 말지에서, <span class="bfx-text-highlight">필요한 맥락과 제약을 전달해 신뢰할 수 있는 결과를 얻는 방법</span>으로 옮겨갔습니다. AI의 도움을 더 적극적으로 받아들이면서도, 결과를 판단하는 책임은 제가 맡아야 한다고 느꼈습니다.

코드가 빠르게 만들어질수록 이를 이해하는 일도 중요해졌습니다. 동료들과 함께 개발하는 만큼, 제가 맡은 구현은 스스로 이해하고 설명할 수 있어야 했습니다. <span class="bfx-text-highlight">이해하지 못한 코드가 지식 부채로 남지 않도록</span>, 생성된 코드의 구조와 동작을 확인하는 데 더 많은 시간을 들였습니다. 이 프로젝트를 통해 AI와 함께 개발한다는 것은 구현 속도를 높이는 동시에, 결과를 이해하고 검토하는 책임을 이어가는 일이라고 느꼈습니다. 앞으로도 이 경험을 바탕으로 AI를 적극적으로 활용하며, 구현과 검토를 함께 발전시켜 나가고자 합니다.
