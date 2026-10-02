---
title: "Project R"
summary: "Unity 기반 MMORPG에서 빌드·배포 자동화와 이모트·상점 UI를 구현했습니다."
description: "빌드 파이프라인, 네트워크 동기화, 데이터 반응형 UI 개발 등 클라이언트 개발 범위를 확장한 실무 프로젝트입니다."
publishedAt: 2026-03-01
category: "game"
projectGroup: "work"
workTypes: ["professional", "team"]
status: "prototype"
period: "2025.06–2026.03"
role: "Unity 클라이언트 개발"
platform: ["PC", "Android", "iOS"]
genres: ["MMORPG"]
thumbnail: "/images/projects/project-r/cover.png"
gallery:
  - src: "/images/projects/project-r/build-pipeline.png"
    alt: "Jenkins에서 Unity와 Addressables를 빌드하고 S3 배포와 Slack 알림으로 이어지는 파이프라인"
    caption: "Unity 빌드·배포 파이프라인 흐름"
  - src: "/images/projects/project-r/jenkins-build-parameters.png"
    alt: "브랜치와 빌드 유형, 환경을 선택하는 Jenkins 빌드 화면"
    caption: "Jenkins 빌드 옵션"
  - src: "/images/projects/project-r/launcher.png"
    alt: "원격 버전 확인과 패치 실행 기능을 제공하는 WPF Game Launcher"
    caption: "WPF Launcher 테스트 화면"
  - src: "/images/projects/project-r/shop.png"
    alt: "Project R 상점 UI 구현 화면"
    caption: "무한 스크롤을 적용한 상점 UI"
  - src: "/images/projects/project-r/group-emote.gif"
    alt: "여러 캐릭터가 함께 감정표현을 실행하는 애니메이션"
    caption: "Group 이모트 참여 장면"
  - src: "/images/projects/project-r/emote-preview.gif"
    alt: "캐릭터 감정표현 미리보기 애니메이션"
    caption: "캐릭터 설정의 이모트 미리보기"
  - src: "/images/projects/project-r/emote-scene.gif"
    alt: "여러 플레이어가 있는 공간에서 이모트를 실행하는 애니메이션"
    caption: "다른 플레이어와 함께 있는 장면의 이모트"
technologies:
  - name: "Unity · C#"
    purpose: "클라이언트 기능과 빌드 진입점 구현"
  - name: "Jenkins"
    purpose: "소스 동기화부터 빌드·배포·알림까지 작업 오케스트레이션"
  - name: "Addressables"
    purpose: "에셋 빌드와 버전·배포 흐름 구성"
  - name: "UniTask · R3(UniRx)"
    purpose: "비동기 처리와 데이터 변경에 반응하는 상점 UI"
  - name: "GPM for Unity"
    purpose: "상점 상품 목록의 무한 스크롤"
features:
  - title: "빌드 자동화"
    description: "Jenkins 기반으로 소스 동기화부터 빌드·배포·알림까지 반복 가능한 파이프라인을 구축하고, 개인 빌드와 Launcher 기반 테스트 환경을 구성했습니다."
  - title: "이모트"
    description: "캐릭터의 감정표현 재생과 플레이어 간 상호작용을 구현하고, 설정창의 확인·미리보기·퀵슬롯 장착부터 인게임 사용까지 연결했습니다."
  - title: "상점 UI"
    description: "대량 상품 목록에 무한 스크롤을 적용하고, 구매·판매 결과에 따라 유저 데이터와 UI가 갱신되는 흐름을 구현했습니다."
challenges:
  - problem: "공용 빌드 머신 대기와 개인 테스트에도 원격 배포가 필요한 흐름"
    solution: "Unity CLI 빌드를 PowerShell로 감싸 개인 PC에서 실행하고, Remote Asset은 로컬 Python HTTP 서버로 제공했습니다."
    result: "공용 파이프라인과 분리된 개인 빌드·테스트 경로를 마련했습니다."
  - problem: "플레이어마다 이모트 재생 상태가 달라지는 MMO 동기화"
    solution: "이모트 유형별 재생·종료·참여 조건을 나누고 Owner/Other Client 처리와 서버 데이터 범위를 담당자와 조율했습니다."
    result: "캐릭터 설정 미리보기, 퀵슬롯 장착, 인게임 실행을 하나의 흐름으로 연결했습니다."
---

## 빌드 자동화

Jenkins 기반으로 소스 동기화부터 빌드·배포·알림까지 반복 가능한 빌드 파이프라인을 구축했습니다. 공용 빌드 환경의 병목을 줄이기 위한 개인 빌드 환경과 Launcher 기반 테스트 환경을 구성하고, 정기 빌드와 결과 검증을 통해 안정적으로 운영할 수 있도록 개선했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/build-pipeline.png" alt="Jenkins에서 Unity와 Addressables를 빌드하고 S3 배포와 Slack 알림으로 이어지는 파이프라인" loading="lazy" />
  <figcaption>Unity 빌드·배포 파이프라인 흐름</figcaption>
</figure>

### Unity CLI 빌드 파이프라인

Dev·QA·STG 환경별 심볼과 설정을 Argument로 제어하고 Development Build, Profiling, Android AAB·APK 등 빌드 옵션을 지원했습니다. Addressables 전체 빌드와 콘텐츠 업데이트 빌드, 플랫폼별 Player 빌드, Windows 배포 산출물 정리와 ZIP 패키징을 하나의 진입점에서 실행하도록 구성했습니다.

Jenkins에서 전달한 인자를 기반으로 실행되도록 설계했으며, AWS 인증 정보는 외부에서 주입받도록 분리해 코드에 민감 정보가 노출되지 않게 했습니다.

### Jenkins 기반 빌드·배포 자동화

원격 저장소의 최신 변경 사항을 반영한 뒤 빌드를 실행하고, Jenkins 파라미터로 플랫폼·환경·프로파일러 옵션을 선택하도록 구성했습니다. Unity CLI가 Addressables와 Player 빌드를 순차 수행하고, 생성된 배포 패키지를 지정 경로에 업로드합니다. AWS 인증 정보는 Jenkins Credentials로 빌드 시점에 주입하고, Slack으로 성공·실패 결과와 배포 파일 다운로드 경로를 자동 공유했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/jenkins-build-parameters.png" alt="브랜치와 빌드 유형, 환경을 선택하는 Jenkins 빌드 화면" loading="lazy" />
  <figcaption>브랜치, 빌드 유형, 실행 환경을 선택하는 Jenkins 빌드 옵션</figcaption>
</figure>

### 빌드 검증 및 운영

빌드 오류는 영향도에 따라 대응했습니다. 경미한 문제는 먼저 조치한 뒤 공유하고, 콘텐츠 수정이 필요한 문제는 담당자와 논의한 뒤 수정했습니다. 정상 빌드 완료 후에는 실제 실행 환경에서 Auth → Platform → Game 진입 흐름, AssetBundle 다운로드와 로딩, Shader 깨짐 등 빌드 환경에서 발생하는 문제를 확인했습니다.

Windows 배포 환경에는 WPF 기반 Launcher를 구성했습니다. QA 등 클라이언트 팀 외 테스트 인원에게 개별 빌드 결과를 전달하는 대신 Launcher에서 패치 후 바로 실행할 수 있게 했고, 매일 아침 정기 빌드로 전일 최종 버전의 정상 여부를 확인했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/launcher.png" alt="원격 버전 확인과 패치 실행 기능을 제공하는 WPF Game Launcher" loading="lazy" />
  <figcaption>원격 버전 확인과 패치 실행을 위한 WPF Launcher</figcaption>
</figure>

<aside class="implementation-note">
  <p class="note-label">공용 파이프라인에서 확장한 작업</p>
  <h3>개인 빌드 환경</h3>
  <p><strong>문제:</strong> 클라이언트 팀원의 개인 테스트 빌드까지 공용 빌드 머신을 사용해 빌드 대기와 리소스 병목이 발생했습니다. 개인 테스트에도 S3 업로드와 Slack 알림이 동일하게 수행되어 불필요한 배포 과정이 생겼습니다.</p>
  <p><strong>해결:</strong> 기존 CLI 빌드 로직을 PowerShell과 연결해 팀원 PC에서 직접 실행할 수 있는 로컬 빌드 환경을 구성했습니다. 특정 경로에 프로젝트를 자동으로 클론해 빌드하고, Remote Asset은 Python HTTP 서버로 로컬 호스팅해 사내망에서 다운로드할 수 있도록 했습니다. 개인 빌드를 공용 파이프라인에서 분리해 빌드 머신 의존도와 불필요한 배포 과정을 줄였습니다.</p>
  <p><strong>회고:</strong> 개인 빌드라면 Remote Asset까지 Local 경로로 전환해 Python 호스팅 단계 자체를 제거하는 방식이 더 단순했을 것으로 판단했습니다.</p>
</aside>

<aside class="reflection">
  <h3>빌드 자동화 회고</h3>
  <p>빌드 파이프라인을 구축하며 단순한 자동화를 넘어 개발 결과물이 QA → STG → LIVE를 거쳐 서비스에 배포되는 전체 과정을 이해했습니다. 빌드 목적에 따른 옵션과 플랫폼별 방식을 구성하면서 빌드부터 테스트·배포까지 이어지는 제품 운영 흐름을 경험했습니다.</p>
  <p>Jenkins, AWS, WPF 등 처음 접한 도구의 역할을 파악해 하나의 빌드·배포 흐름으로 연결했습니다. 빌드 오류와 실행 환경 문제를 대응할 때는 담당 코드뿐 아니라 관련 시스템과 데이터 흐름까지 확인해야 정확한 원인을 찾을 수 있다는 점을 배웠습니다.</p>
</aside>

## 이모트

인사·춤 등 캐릭터 애니메이션을 활용해 플레이어 간 감정표현과 상호작용이 가능한 이모트 콘텐츠를 구현했습니다. 캐릭터의 감정표현 재생부터 다른 플레이어와 함께 사용하는 상호작용 기능을 구현하고, 캐릭터 설정창에서 이모트 확인·미리보기·퀵슬롯 장착·인게임 사용까지 연결했습니다.

### 이모트 콘텐츠 구현

MMO 환경에서 다른 플레이어에게 이모트 재생 상태가 보이도록 동기화하고, 유형에 따라 재생 방식과 종료 조건을 다르게 처리했습니다.

- **Normal:** 인사처럼 한 번 재생한 뒤 종료
- **Dance:** 춤을 재생하며 중단 조건이 발생하면 종료하고, 다른 플레이어가 상호작용해 따라추기 가능
- **Group:** 악수처럼 두 플레이어가 참여하는 상호작용형 이모트

서버 담당자와 실행에 필요한 데이터와 전송 조건을 협의하고, 네트워크 동기화 조건에 따라 Owner Client와 Other Client 처리를 분기했습니다. 기존 애니메이션 시스템을 분석해 구조에 맞게 이모트 State를 확장하고, 애니메이션 상태 전환과 네트워크 동기화 처리를 구현했습니다.

<div class="story-media-grid">
  <figure class="story-media">
    <img src="/images/projects/project-r/group-emote.gif" alt="여러 캐릭터가 함께 감정표현을 실행하는 애니메이션" loading="lazy" />
    <figcaption>Group 이모트 참여 장면</figcaption>
  </figure>
  <figure class="story-media">
    <img src="/images/projects/project-r/emote-scene.gif" alt="다른 플레이어와 함께 있는 공간에서 이모트를 실행하는 애니메이션" loading="lazy" />
    <figcaption>다른 플레이어와 함께 사용하는 이모트</figcaption>
  </figure>
</div>

### 이모트 UI 구현

캐릭터 설정창에 보유한 이모트와 해금 상태를 표시하고, 선택한 이모트의 캐릭터 애니메이션을 미리볼 수 있게 했습니다. 이모트 퀵슬롯 장착·교체 기능을 구현하고, 퀵슬롯에 등록한 이모트를 인게임 실행 기능과 연동했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/emote-preview.gif" alt="캐릭터 설정창에서 이모트 애니메이션을 미리보는 장면" loading="lazy" />
  <figcaption>캐릭터 설정창의 이모트 미리보기</figcaption>
</figure>

## 상점 UI

아이템 구매·판매를 위한 상점 UI와 데이터 갱신 흐름을 구현했습니다. 대량의 상품 목록을 처리하기 위해 GPM for Unity 기반 무한 스크롤을 적용하고, 구매·판매 요청과 서버 응답 이후 변경된 유저 데이터가 UI에 반영되도록 구성했습니다.

UniTask와 R3(UniRx)를 활용해 데이터 변경에 반응하도록 UI를 연결했습니다. 무한 스크롤 적용 방법은 기술 문서와 가이드로 정리해 팀에서 재사용할 수 있도록 공유했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/shop.png" alt="Project R 상점 UI 구현 화면" loading="lazy" />
  <figcaption>무한 스크롤과 데이터 반응형 갱신을 적용한 상점 UI</figcaption>
</figure>
