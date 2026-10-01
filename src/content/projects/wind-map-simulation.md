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
  - title: "플랫폼 이식 및 성능 확장"
    description: "기존 WebGL 프로젝트를 C++와 OpenGL 환경으로 재구현해 데스크톱 환경에서 확장할 수 있는 기반을 마련했습니다."
  - title: "GPU 병렬 연산 최적화"
    description: "Compute Shader를 활용해 대규모 파티클의 위치와 속도를 실시간으로 제어하는 아키텍처를 구축했습니다."
  - title: "기상 데이터 연동"
    description: "GRIB 데이터를 텍스처 정보로 변환하는 원리를 해석하고, 파티클 시스템에 투영해 실제 바람 흐름을 표현했습니다."
  - title: "실시간 검증 환경"
    description: "ImGui에서 파티클 수와 물리 변수를 조정하며 시스템 부하와 시각적 변화를 즉시 확인하도록 구성했습니다."
challenges:
  - problem: "대량의 파티클 위치와 속도를 매 프레임 CPU에서 갱신하는 부담"
    solution: "갱신 작업을 Compute Shader로 옮기고 GRIB 텍스처의 바람 벡터를 병렬로 참조하도록 구성했습니다."
    result: "지도 위에서 기상 데이터에 따른 바람 흐름을 실시간으로 관찰할 수 있는 시뮬레이션을 구현했습니다."
repositoryUrl: "https://github.com/SonJunHyuck/Wind_Simulation"
notionUrl: "https://sonnysmile.notion.site/183ed1cbaf6c807bb6fff35bcedc4beb"
---

## 플랫폼 이식 및 성능 확장

기존 WebGL 기반 바람 지도 프로젝트를 C++와 OpenGL 환경으로 재구현했습니다. 데이터 처리와 렌더링 흐름을 데스크톱 그래픽스 환경에 맞게 옮기고, 대규모 파티클 연산으로 확장할 수 있는 기반을 마련했습니다.

<figure class="story-media">
  <img src="/images/projects/wind-map-simulation/mapbox-webgl-reference.png" alt="Mapbox의 WebGL 기반 바람 지도 프로젝트 화면" loading="lazy" />
  <figcaption>재구현의 기반이 된 Mapbox WebGL 바람 지도 프로젝트 · <a href="https://medium.com/mapbox/how-i-built-a-wind-map-with-webgl-b63022b5537f" target="_blank" rel="noreferrer">원문 보기 ↗</a></figcaption>
</figure>

## GPU 병렬 연산 최적화

Compute Shader를 활용해 대규모 파티클의 위치와 속도를 GPU에서 병렬로 갱신하는 아키텍처를 구축했습니다. 각 파티클은 현재 위치에 해당하는 바람 벡터를 참조하고, OpenGL은 계산된 결과를 지도 위에 렌더링합니다.

## 기상 데이터 연동

GRIB 기상 데이터를 텍스처 정보로 변환하는 원리를 해석했습니다. 지도 좌표에 대응하는 텍스처의 바람 벡터를 파티클 시스템에 실시간으로 투영해 실제 기상 데이터에 따른 바람 흐름을 표현했습니다.

<figure class="story-media">
  <img src="/images/projects/wind-map-simulation/grib-wind-vector-flow.png" alt="GRIB 바람 데이터를 텍스처로 변환하고 파티클 이동 벡터에 적용하는 흐름" loading="lazy" />
  <figcaption>GRIB 데이터에서 파티클 이동 벡터를 얻는 과정</figcaption>
</figure>

## 실시간 검증 환경

ImGui를 통해 파티클 수와 물리 변수를 실시간으로 조정했습니다. 설정 변화에 따른 시스템 부하와 시각적 결과를 즉시 확인하며 파티클 표현을 검증하고 최적화했습니다.

<figure class="story-media">
  <img src="/images/projects/wind-map-simulation/opengl-new-version.png" alt="ImGui 제어 화면과 대규모 파티클로 표현한 OpenGL 바람 지도 시뮬레이션" loading="lazy" />
  <figcaption>C++·OpenGL 환경으로 재구현한 바람 지도 시뮬레이션</figcaption>
</figure>

GTX 1080 Ti 환경에서 약 3천만 개의 바람 입자를 시뮬레이션했습니다.
