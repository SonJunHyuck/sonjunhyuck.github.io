---
title: "Project R"
summary: "나만의 아바타를 만들어 다양한 미니게임을 즐기며 친구를 사귀는 메타버스 소셜 게임"
cardContribution: "UI 및 인게임 콘텐츠 구현에 참여하고 게임 빌드 파이프라인과 Jenkins 자동화를 구현했습니다."
description: "빌드 파이프라인, 네트워크 동기화, 데이터 반응형 UI 개발 등 클라이언트 개발 범위를 확장한 실무 프로젝트입니다."
publishedAt: 2026-03-01
category: "game"
projectGroup: "work"
workTypes: ["professional", "team"]
status: "prototype"
period: "2025.06–2026.03"
role: "Unity 클라이언트 개발"
platform: ["PC", "Android", "iOS"]
genres: ["Metaverse"]
thumbnail: "/images/projects/project-r/cover.png"
gallery:
  - src: "/images/projects/project-r/build-pipeline.png"
    alt: "Jenkins에서 Unity와 Addressables를 빌드하고 S3 배포와 Slack 알림으로 이어지는 파이프라인"
    caption: "Unity 빌드·배포 파이프라인 흐름"
  - src: "/images/projects/project-r/jenkins-build-parameters.png"
    alt: "Windows 빌드의 브랜치와 빌드 유형, 환경을 선택하는 Jenkins 화면"
    caption: "Jenkins Windows 빌드 옵션"
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
  - name: "R3"
    purpose: "MVVM 패턴으로 데이터 변경에 반응하는 상점 UI"
  - name: "GPM for Unity"
    purpose: "상점 상품 목록의 무한 스크롤"
features:
  - title: "빌드 자동화"
    description: "게임 빌드 파이프라인을 구현하고 Jenkins와 연결해 소스 갱신부터 빌드·배포·알림까지 자동화했습니다."
    highlight: "게임 빌드 파이프라인을 구현하고 Jenkins와 연결"
  - title: "이모트"
    description: "플레이어의 아바타가 인사하거나 춤추는 이모트 시스템을 구현했습니다. 네트워크 동기화로 다른 플레이어의 동작을 볼 수 있고, 상호작용을 통해 같은 춤을 출 수 있도록 했습니다."
    highlight: "네트워크 동기화"
  - title: "상점 UI"
    description: "상점 UI를 구현하며 R3와 MVVM 패턴으로 데이터와 화면의 역할을 분리하고, 데이터 변경에 반응해 화면이 갱신되도록 구성했습니다."
    highlight: "데이터와 화면의 역할을 분리"
challenges:
  - problem: "개인 테스트 빌드까지 공용 빌드 머신에 집중되어 발생한 대기와 불필요한 배포"
    solution: "PowerShell로 개인 PC에서 Unity CLI 빌드를 실행하고, Remote Asset은 Python HTTP 서버로 제공했습니다."
    result: "개인 빌드를 공용 파이프라인에서 분리했습니다."

---

## 빌드 자동화

### 게임 빌드 파이프라인 정의 (Unity)

프로파일 설정 → Addressables 에셋 빌드 → 플레이어 빌드 → 플랫폼별 배포 파일 구성 → 원격 저장소 업로드 순서로 게임 빌드 파이프라인을 구성했습니다. <span class="text-highlight">각 단계를 모듈화해 개별적으로 호출</span>할 수 있도록 구현했습니다.

빌드 전에 필요한 옵션을 한곳에서 관리할 수 있도록 <span class="text-highlight">BuildProfile을 정의</span>했습니다. 프로파일링 활성화, Android의 APK·AAB 형식 선택 등 빌드 목적에 맞는 설정을 프로파일로 묶었습니다.

Jenkins가 전달한 인자를 바탕으로 프로파일을 설정하고 빌드를 진행하며, 빌드에 성공하면 결과물을 배포합니다. 업로드에 필요한 AWS 인증 정보는 외부에서 주입받도록 분리해 코드에 민감 정보가 노출되지 않게 했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/jenkins-build-parameters.png" alt="Windows 빌드의 브랜치와 빌드 유형, 환경을 선택하는 Jenkins 화면" loading="lazy" />
  <figcaption>Jenkins Windows 빌드 설정 — Unity BuildProfile에 전달할 빌드 옵션과 대상 브랜치 선택</figcaption>
</figure>

### Jenkins 기반 빌드·배포 자동화

<span class="text-highlight">빌드 요청자가 테스트할 브랜치를 선택</span>할 수 있도록 구성했습니다. 빌드를 시작하기 전에 선택한 브랜치의 최신 소스를 반영한 뒤, Jenkins가 Unity에 구현해 둔 빌드 파이프라인의 각 단계를 순차적으로 호출합니다. 이를 통해 각자 확인이 필요한 브랜치를 대상으로 빌드를 요청할 수 있도록 했습니다.

Slack을 연동해 빌드 시작과 종료를 알리고, 배포된 파일의 다운로드 경로를 공유했습니다. QA팀을 비롯해 테스트가 필요한 동료들이 빌드 채널을 구독하고 결과물을 받을 수 있도록 구성했습니다. 매일 아침에는 정기 빌드를 실행해 전일 최종 버전의 정상 여부를 확인했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/build-pipeline.png" alt="Jenkins에서 Unity와 Addressables를 빌드하고 S3 배포와 Slack 알림으로 이어지는 파이프라인" loading="lazy" />
  <figcaption>Jenkins와 Unity를 연결한 빌드·배포 자동화 흐름</figcaption>
</figure>

### 빌드 검증 및 운영

빌드 테스트는 Windows 플랫폼을 중심으로 진행했습니다. 빌드할 때마다 결과물의 버전이 달라져, 테스트 인원이 최신 파일을 매번 내려받아야 하는 불편이 있었습니다. 이를 줄이기 위해 <span class="text-highlight">WPF 기반 Launcher를 구성</span>하고, 개별 빌드 파일을 전달하는 대신 <span class="text-highlight">Launcher에서 패치 후 바로 실행</span>할 수 있도록 했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/launcher.png" alt="원격 버전 확인과 패치 실행 기능을 제공하는 WPF Game Launcher" loading="lazy" />
  <figcaption>원격 버전 확인과 패치 실행을 위한 WPF Launcher</figcaption>
</figure>

<aside class="implementation-note">
  <p class="note-label">빌드 병목 해결</p>
  <h3>공용 빌드 머신에서 개인 테스트 빌드 분리</h3>
  <p><strong>문제:</strong> 클라이언트 팀원의 개인 테스트 빌드까지 공용 빌드 머신에 집중되면서 빌드 대기와 리소스 병목이 발생했습니다. 개인 테스트에도 S3 업로드와 Slack 알림이 동일하게 수행되어 불필요한 배포 과정이 생겼습니다.</p>
  <p><strong>해결:</strong> Jenkins가 Unity CLI를 호출하는 방식에 착안해, <span class="text-highlight">PowerShell로 각 팀원의 PC에서 실행할 수 있는 로컬 빌드 환경</span>을 구성했습니다. 스크립트가 지정된 경로에 프로젝트를 자동으로 클론하고 빌드를 실행하도록 했으며, Remote Asset은 Python HTTP 서버로 로컬 호스팅해 사내망에서 다운로드할 수 있도록 했습니다. 개인 빌드를 공용 파이프라인에서 분리해 빌드 머신 의존도와 불필요한 배포 과정을 줄였습니다.</p>
</aside>

## 이모트

인사·춤 등 캐릭터의 감정표현 재생과 <span class="text-highlight">다른 플레이어와 같이 춤추는 상호작용 기능</span>을 구현했습니다.

### 이모트 콘텐츠 구현

MMO 환경에서 다른 플레이어에게 이모트 재생 상태가 보이도록 동기화하고, 유형에 따라 재생 방식과 종료 조건을 다르게 처리했습니다.

- **Normal:** 인사처럼 한 번 재생한 뒤 종료
- **Dance:** 춤을 재생하며 중단 조건이 발생하면 종료하고, 다른 플레이어가 상호작용해 따라추기 가능
- **Group:** 악수처럼 두 플레이어가 참여하는 상호작용형 이모트

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

아이템 구매·판매를 위한 상점 UI와 데이터 갱신 흐름을 구현했습니다. 대량의 상품 목록을 처리하기 위해 <span class="text-highlight">GPM for Unity 기반 무한 스크롤</span>을 적용하고, 구매·판매 요청과 서버 응답 이후 변경된 유저 데이터가 UI에 반영되도록 구성했습니다.

<span class="text-highlight">데이터 관리와 화면 표시의 역할을 분리</span>하기 위해 MVVM 패턴을 적용했습니다. Model의 데이터를 ViewModel을 통해 View에 연결하고, R3를 활용해 <span class="text-highlight">데이터 변경에 반응해 화면이 갱신</span>되도록 구성했습니다. 데이터 처리와 화면 갱신이 뒤섞이지 않도록 역할을 나누어 변경 범위를 명확히 하고자 했습니다.

무한 스크롤 적용 방법은 기술 문서와 가이드로 정리해 팀에서 재사용할 수 있도록 공유했습니다.

<figure class="story-media">
  <img src="/images/projects/project-r/shop.png" alt="Project R 상점 UI 구현 화면" loading="lazy" />
  <figcaption>무한 스크롤과 데이터 반응형 갱신을 적용한 상점 UI</figcaption>
</figure>
