---
title: "군중 대형 제어 시뮬레이션"
summary: "PBD의 위치 제약을 확장해 군중의 대형과 개별 위치를 제어하는 알고리즘을 연구·구현했습니다."
description: "Position Based Dynamics의 제약 개념을 군중 대형 유지에 적용하고, Short Range Distance로 개별 위치를 제어한 그래픽스 연구입니다."
publishedAt: 2023-06-01
category: "graphics"
workTypes: ["research", "personal"]
status: "prototype"
period: "2022.03–2023.06"
role: "알고리즘 연구·C++/OpenGL 구현"
teamSize: "단독 연구·구현 (지도교수 교신저자)"
platform: ["PC"]
thumbnail: "/images/projects/crowd-formation-control/cover.png"
videos:
  - title: "군중 대형 제어 시뮬레이션"
    youtubeId: "io3nZNFIZKo"
    url: "https://youtu.be/io3nZNFIZKo"
technologies:
  - name: "C++"
    purpose: "군중 대형과 개별 위치 제어 알고리즘 구현"
  - name: "OpenGL"
    purpose: "군중 시뮬레이션 렌더링과 시각 검증"
  - name: "PBD"
    purpose: "위치 기반 제약을 군중 대형 제어로 확장"
features:
  - title: "기술 분석 및 해석"
    description: "Position Based Dynamics의 핵심 원리를 분석하고, 기존 군중 시뮬레이션 연구의 한계를 파악해 개선 방향을 도출했습니다."
  - title: "제어 알고리즘 설계"
    description: "PBD의 위치 제약 개념을 확장해 군중의 대형을 유지하면서 개별 위치를 제어하는 알고리즘을 설계했습니다."
  - title: "시뮬레이션 구현 및 검증"
    description: "C++와 OpenGL로 대형 제어 시뮬레이션을 구현하고, 다양한 대형을 유지하는 군중 움직임을 검증했습니다."
challenges:
  - problem: "기존 군중 시뮬레이션에서 개별 이동과 목표 대형 유지의 동시 제어"
    solution: "PBD 제약 개념을 대형 제어에 맞게 확장하고 SRD 기반 위치 보정을 적용했습니다."
    result: "수치적 성능 우위보다 대형을 유지하는 군중 움직임의 표현 가능성을 시뮬레이션으로 확인했습니다."
repositoryUrl: "https://github.com/SonJunHyuck/CFCS_SRD"
notionUrl: "https://sonnysmile.notion.site/183ed1cbaf6c8067b176f5c2683aec02?source=copy_link"
externalLinks:
  - label: "논문 DOI"
    url: "https://doi.org/10.3390/app14083386"
---

## 기술 분석 및 해석

Position Based Dynamics의 핵심 원리를 분석하고, 기존 PBD 기반 군중 시뮬레이션 연구가 개별 에이전트의 충돌과 이동을 처리하는 방식을 살펴봤습니다. 군중의 자연스러운 움직임과 함께 목표 대형을 유지할 수 있도록 기존 연구의 한계를 파악하고 개선 방향을 도출했습니다.

<div class="story-media-grid">
  <figure class="story-media">
    <img src="/images/projects/crowd-formation-control/reference-research.png" alt="Position Based Dynamics 기반 실시간 군중 시뮬레이션 선행 연구" loading="lazy" />
    <figcaption>PBD 기반 실시간 군중 시뮬레이션 선행 연구</figcaption>
  </figure>
  <figure class="story-media">
    <img src="/images/projects/crowd-formation-control/cuda-particle-reference.png" alt="CUDA 기반 파티클 시뮬레이션 참고 자료" loading="lazy" />
    <figcaption>GPU 파티클 시뮬레이션 구조 참고 자료</figcaption>
  </figure>
</div>

## 제어 알고리즘 설계

PBD의 위치 제약 개념을 군중 대형 제어로 확장했습니다. Short Range Distance를 이용해 대형 안에서 에이전트의 개별 위치를 보정하고, 군중이 이동하는 동안 목표 대형을 유지할 수 있도록 제어 알고리즘을 설계했습니다.

## 시뮬레이션 구현 및 검증

C++와 OpenGL로 PBD 기반 군중 대형 제어 시뮬레이션을 구현했습니다. 서로 다른 대형과 이동 경로를 적용해 군중이 목표 대형을 유지하며 이동하는 과정을 시각적으로 검증했습니다.

<figure class="story-media">
  <img src="/images/projects/crowd-formation-control/formation-simulation.png" alt="빨간색과 파란색 군중이 서로 다른 이동 경로를 따라 대형을 유지하는 시뮬레이션" loading="lazy" />
  <figcaption>이동 경로를 따라 대형을 유지하는 군중 시뮬레이션</figcaption>
</figure>

연구 결과는 *Position-Based Formation Control Scheme for Crowds Using Short Range Distance (SRD)*로 정리되어 Applied Sciences 2024에 게재되었습니다.
