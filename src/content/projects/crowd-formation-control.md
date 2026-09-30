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
  - title: "대형 제약 확장"
    description: "PBD의 위치 제약을 확장해 군중이 목표 대형을 유지하도록 하는 제어 방법을 설계했습니다."
  - title: "개별 위치 제어"
    description: "Short Range Distance를 사용해 대형 안에서 에이전트의 개별 위치를 조정하는 알고리즘을 구현했습니다."
  - title: "시뮬레이션 검증"
    description: "C++/OpenGL 시뮬레이션으로 다양한 대형이 유지되는 움직임을 관찰하고 연구 결과를 논문으로 정리했습니다."
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

## 연구 문제

기존 Position Based Dynamics 기반 군중 시뮬레이션의 핵심 원리를 분석하고, 군중이 정해진 대형을 유지하면서 각 에이전트의 위치를 제어할 수 있는 방법을 연구했습니다.

## 구현과 검증

PBD의 위치 제약을 군중 대형에 맞게 확장하고 Short Range Distance를 이용해 개별 위치를 보정했습니다. C++와 OpenGL로 시뮬레이션을 구현해 대형을 유지하는 움직임을 시각적으로 검증했습니다.

이 연구는 수치적 성능 우위를 주장하기보다, 대형을 유지하면서 그럴듯한 군중 움직임을 만들 수 있음을 보이는 데 초점을 두었습니다. 결과는 *Position-Based Formation Control Scheme for Crowds Using Short Range Distance (SRD)*로 정리되어 Applied Sciences 2024에 게재되었습니다.
