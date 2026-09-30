---
title: "Project R"
summary: "Unity 기반 MMORPG에서 빌드·배포 자동화와 이모트·상점 UI를 구현했습니다."
description: "빌드 파이프라인부터 네트워크 동기화가 필요한 이모트, 데이터 반응형 상점 UI까지 클라이언트 개발 범위를 확장한 실무 프로젝트입니다."
publishedAt: 2026-03-01
category: "game"
workTypes: ["professional", "team"]
status: "prototype"
period: "2025.06–2026.03"
role: "Unity 클라이언트 개발"
platform: ["PC", "Android"]
genres: ["MMORPG"]
thumbnail: "/images/projects/project-r/cover.png"
videos:
  - title: "Project R 플레이 영상"
    youtubeId: "SOOY86MIs1o"
    url: "https://youtu.be/SOOY86MIs1o?si=JKGn13zJDBFoC99p"
    description: "프로젝트의 전체 플레이 화면이며, 아래 담당 범위가 본인의 구현 범위입니다."
  - title: "Project R 트레일러"
    youtubeId: "geDi2GQMaq4"
    url: "https://youtu.be/geDi2GQMaq4?si=KfBWgidWyWw78o2E"
    description: "프로젝트 전체를 소개하는 공식 영상입니다."
  - title: "감정표현 UI"
    youtubeId: "aX2i1YkWQC0"
    url: "https://youtu.be/aX2i1YkWQC0?si=cjcMbX-Z6Db13kq0"
  - title: "이모트 댄스 동기화"
    youtubeId: "ne0Zrcs_jRM"
    url: "https://youtu.be/ne0Zrcs_jRM?si=SNJJh2VIvtttrpee"
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
  - src: "/images/projects/project-r/emote-ui.gif"
    alt: "Project R 인게임 이모트 UI에서 캐릭터가 감정표현을 실행하는 애니메이션"
    caption: "이모트 UI와 인게임 재생"
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
  - title: "빌드·배포 자동화"
    description: "Unity CLI 옵션과 Build Profile을 규격화하고 Jenkins에서 소스 동기화, Addressables, Player 빌드, 배포와 Slack 알림을 연결했습니다."
  - title: "개인 빌드 환경"
    description: "공용 빌드 대기와 불필요한 원격 배포를 줄이기 위해 PowerShell 개인 빌드와 Python HTTP 기반 Remote Asset 테스트 환경을 구성했습니다."
  - title: "이모트 콘텐츠"
    description: "Normal·Dance·Group 재생 흐름과 Owner/Other Client 처리를 구현하고, 서버 담당자와 필요한 데이터와 동기화 조건을 조율했습니다."
  - title: "상점 UI"
    description: "구매·판매 응답 뒤 목록과 상세 UI가 갱신되도록 구성하고, 무한 스크롤 적용 방법을 문서화해 팀에 공유했습니다."
challenges:
  - problem: "공용 빌드 머신 대기와 개인 테스트에도 원격 배포가 필요한 흐름"
    solution: "Unity CLI 빌드를 PowerShell로 감싸 개인 PC에서 실행하고, Remote Asset은 로컬 Python HTTP 서버로 제공했습니다."
    result: "공용 파이프라인과 분리된 개인 빌드·테스트 경로를 마련했습니다."
  - problem: "플레이어마다 이모트 재생 상태가 달라지는 MMO 동기화"
    solution: "이모트 유형별 재생·종료·참여 조건을 나누고 Owner/Other Client 처리와 서버 데이터 범위를 담당자와 조율했습니다."
    result: "캐릭터 설정 미리보기, 퀵슬롯 장착, 인게임 실행을 하나의 흐름으로 연결했습니다."
---

## 개요

Project R에서 빌드 자동화, 이모트 콘텐츠, 상점 UI를 담당했습니다. 프로젝트 전체 영상은 팀 결과물이며, 이 페이지는 그중 직접 구현하거나 서버·데브옵스 담당자와 조율한 클라이언트 범위를 구분해 설명합니다.

## 빌드 자동화

Unity CLI 빌드 옵션과 환경을 정리하고 Jenkins가 소스 동기화, Addressables 빌드, Player 빌드, 산출물 배포와 Slack 알림을 순서대로 실행하도록 구성했습니다. AWS 자격 정보는 Jenkins Credentials로 외부 주입해 코드와 분리했습니다. 데브옵스 팀이 구축한 S3 환경을 사용했으며 인프라 자체를 구축한 것은 아닙니다.

WPF Launcher에서는 인증 후 Platform과 Game을 실행하는 흐름, AssetBundle과 Shader 검증, 패치 후 실행 경로를 확인할 수 있게 했습니다. 정기 빌드는 매일 최종 버전 설정을 확인하는 용도로 운영했습니다.

개인 빌드 환경의 Remote Asset을 Python HTTP 서버로 제공했지만, 회고하면 개인 환경에서는 Remote Asset을 Local 경로로 전환하는 방식이 의존성이 더 적고 단순했을 것입니다.

## 이모트와 상점 UI

이모트는 한 번 재생되는 Normal, 반복되는 Dance, 여러 플레이어가 참여하는 Group으로 나누어 재생과 종료 조건을 처리했습니다. 서버 API와 서버 로직을 직접 구현한 것이 아니라 서버 담당자와 동기화에 필요한 정보와 Owner/Other Client 처리 조건을 합의한 뒤 클라이언트 분기를 구현했습니다.

상점은 GPM for Unity의 무한 스크롤을 상품 목록에 적용하고, 구매·판매 응답 뒤 관련 데이터와 UI가 갱신되도록 UniTask와 R3(UniRx)로 흐름을 구성했습니다. 이후 적용 방법과 주의점을 가이드로 정리해 팀에 공유했습니다.

프로젝트는 출시 전에 중단되어 출시 성과나 사용자 지표를 제시하지 않습니다.
