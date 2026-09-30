---
title: "바람 가시화 지도 시뮬레이션"
summary: "기상 데이터를 바탕으로 바람의 흐름을 GPU 파티클로 시각화했습니다."
description: "기존 WebGL 프로젝트를 C++/OpenGL로 재구현하고, GRIB 기상 데이터와 Compute Shader 기반 파티클로 바람의 흐름을 표현한 학습·연구 프로젝트입니다."
publishedAt: 2020-04-01
category: "graphics"
workTypes: ["learning", "research", "personal"]
status: "prototype"
period: "2019.12–2020.04"
role: "그래픽스 프로그래밍"
teamSize: "1인 개발"
platform: ["PC"]
thumbnail: "/images/projects/wind-map-simulation/cover.png"
videos:
  - title: "바람 가시화 지도 시뮬레이션"
    youtubeId: "p5STJoc0wRI"
    url: "https://youtu.be/p5STJoc0wRI"
technologies:
  - name: "C++ · OpenGL"
    purpose: "기존 WebGL 작업의 데스크톱 그래픽스 재구현"
  - name: "Compute Shader"
    purpose: "파티클 위치와 속도의 GPU 병렬 갱신"
  - name: "GRIB"
    purpose: "기상 데이터를 텍스처로 변환해 바람 벡터 제공"
  - name: "ImGui"
    purpose: "파티클 수와 물리 변수의 실시간 조정"
features:
  - title: "기상 데이터 변환"
    description: "GRIB 데이터를 GPU가 참조할 수 있는 텍스처 정보로 변환하고 파티클 이동에 반영했습니다."
  - title: "GPU 파티클"
    description: "Compute Shader에서 파티클의 위치와 속도를 갱신해 지도 위 바람 흐름을 시각화했습니다."
  - title: "실시간 제어"
    description: "ImGui에서 파티클 수와 물리 변수를 조절하며 시각적 변화를 확인할 수 있게 했습니다."
challenges:
  - problem: "대량의 파티클 위치와 속도를 매 프레임 CPU에서 갱신하는 부담"
    solution: "갱신 작업을 Compute Shader로 옮기고 GRIB 텍스처의 바람 벡터를 병렬로 참조하도록 구성했습니다."
    result: "지도 위에서 기상 데이터에 따른 바람 흐름을 실시간으로 관찰할 수 있는 시뮬레이션을 구현했습니다."
repositoryUrl: "https://github.com/SonJunHyuck/Wind_Simulation"
notionUrl: "https://sonnysmile.notion.site/183ed1cbaf6c807bb6fff35bcedc4beb"
---

## 개요

기존 WebGL 바람 지도 작업을 C++와 OpenGL 환경에서 다시 구현하며 GPU 파티클 처리와 기상 데이터 활용 방법을 학습한 1인 프로젝트입니다.

## 데이터와 파티클 흐름

GRIB 기상 데이터를 텍스처 형태로 변환하고, 각 파티클이 현재 위치의 바람 벡터를 참조하도록 구성했습니다. Compute Shader가 파티클 위치와 속도를 갱신하고 OpenGL이 결과를 지도 위에 그립니다. ImGui에서는 파티클 수와 물리 변수를 바꾸며 결과를 확인할 수 있습니다.

원본 포트폴리오에는 GTX 1080 Ti 환경의 약 3천만 입자 사례가 기록되어 있지만, FPS와 측정 조건을 함께 검증하지 못해 이 페이지에서는 성능 보장이나 정량 개선 수치로 제시하지 않습니다.
