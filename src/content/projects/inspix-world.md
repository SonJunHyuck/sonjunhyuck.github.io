---
title: "InspixWorld: BattleRoyal"
summary: "라이브 서비스의 이슈 수정과 업데이트 대응, 테스트 환경·협업 절차 정리를 담당했습니다."
description: "일본 라이브 서비스 중인 BattleRoyal 어트랙션의 이슈를 분석·수정하고, 버전별 반영 범위와 테스트·온보딩 흐름을 정리했습니다."
publishedAt: 2026-02-01
category: "game"
workTypes: ["professional", "team", "live-service"]
status: "released"
period: "2025.05–2026.03"
role: "Unity 클라이언트 유지보수"
platform: ["PC"]
genres: ["Battle Royale", "Metaverse Attraction"]
thumbnail: "/images/projects/inspix-world/cover.png"
gallery:
  - src: "/images/projects/inspix-world/test-environment.png"
    alt: "InspixWorld Standalone 테스트 환경 설정 화면"
    caption: "Standalone 테스트 환경 변경 온보딩 가이드 일부"
technologies:
  - name: "Unity · C#"
    purpose: "BattleRoyal 어트랙션 이슈 분석과 수정"
  - name: "Docker"
    purpose: "파트너사 자료를 바탕으로 Dedicated Server 테스트 실행 방법 확인"
features:
  - title: "라이브 이슈 대응"
    description: "전달받은 변경 사항을 기준으로 수정 대상과 영향 범위를 정리하고, 이슈 수정과 업데이트 반영을 담당했습니다."
  - title: "버전별 반영 범위 조율"
    description: "팀원과 수정 공수를 검토하고 이슈 중요도를 함께 고려해 파트너사와 버전별 수정·업데이트 범위를 조율했습니다."
  - title: "테스트 환경 정리"
    description: "Standalone 클라이언트와 Docker 기반 Dedicated Server 실행 방법을 확인하고, 동작하지 않던 절차를 수정해 테스트 환경을 마련했습니다."
  - title: "온보딩 문서"
    description: "서버 오픈, 빌드, 에셋번들 업데이트, 협업 절차와 신규 투입 인원을 위한 기술 가이드를 작성했습니다."
challenges:
  - problem: "전달받은 절차대로 Dedicated Server 테스트 환경이 동작하지 않음"
    solution: "Standalone과 Docker 기반 DS의 실행 조건을 단계별로 확인하고, 동작 가능한 실행 방법으로 절차를 수정했습니다."
    result: "테스트와 신규 투입에 사용할 수 있는 온보딩 가이드로 정리했습니다."
---

## 개요

InspixWorld의 BattleRoyal 어트랙션 유지보수에 참여했습니다. 라이브 이슈의 영향 범위를 확인하고 클라이언트 수정을 적용했으며, 업데이트 일정과 버전별 반영 범위를 파트너사와 조율했습니다.

## 담당 범위

수정 요청을 그대로 적용하기보다 관련 코드와 데이터의 영향 범위를 먼저 확인했습니다. 팀원과 예상 공수를 검토한 뒤 중요도와 함께 종합해 어느 버전에 반영할지 파트너사와 논의했습니다.

파트너사 자료를 바탕으로 테스트용 Standalone 환경을 설정했고, 전달받은 방법대로 Dedicated Server가 실행되지 않는 문제를 확인했습니다. Docker 기반 실행 절차를 수정해 테스트가 가능한 상태로 만들고, 서버 오픈·빌드·에셋번들 업데이트와 협업 절차를 온보딩 문서로 남겼습니다. Docker나 서버 인프라 자체를 구축·운영한 것은 아닙니다.

운영 화면과 파트너사 대화에는 내부 정보가 포함될 수 있어 공개 이미지에서는 제외했습니다.
