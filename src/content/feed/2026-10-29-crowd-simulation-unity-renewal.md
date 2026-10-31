---
title: "군중 대형 제어 시뮬레이션, Unity 리뉴얼 시작"
date: 2026-10-29
notionUrl: "https://sonnysmile.notion.site/408ed1cbaf6c810b8c48f9aac8ceb10c"
tags: ["군중 시뮬레이션", "PBD"]
draft: false
---

C++/OpenGL로 구현한 PBD 기반 군중 대형 제어 알고리즘의 Unity 이식 시작. 원본 영상과 같은 결과를 먼저 재현한 뒤 대량 렌더링·캐릭터 애니메이션으로 확장 예정.
원본 시뮬레이션 8단계를 같은 순서로 Burst Job에 이식. 제약 계산을 에이전트별 방식으로 바꿔 병렬화하고, 원본과 결과가 같은지 테스트로 검증.
재생 배율 0.25~32배 조절, 디버그 창 분리 등 확인 도구 정비.
설계·검토는 Claude, 구현은 Codex가 맡고 UnityMCP로 에디터 조작.
