---
title: "The Hidden Cheer Squad"
summary: "유닛 확장과 데이터 기반 스테이지 구성을 고려해 개발한 2D 전진형 디펜스 게임입니다."
description: "공통 동작을 재사용 가능한 컴포넌트로 나누고, 스프레드시트 데이터로 유닛과 스테이지를 확장할 수 있게 만든 1인 Unity 프로젝트입니다."
publishedAt: 2025-02-01
category: "game"
workTypes: ["personal"]
status: "prototype"
period: "2024.10–2025.02"
role: "기획·클라이언트 개발"
teamSize: "1인 개발"
platform: ["PC"]
genres: ["2D", "Forward Defense"]
thumbnail: "/images/projects/the-hidden-cheer-squad/cover.png"
videos:
  - title: "The Hidden Cheer Squad 시연"
    youtubeId: "XuslBwZVYNQ"
    url: "https://youtu.be/XuslBwZVYNQ?si=EmGJbILrn8rljf0J"
technologies:
  - name: "Unity · C#"
    purpose: "2D 전진형 디펜스 게임 구현"
  - name: "ScriptableObject"
    purpose: "스테이지·유닛 데이터를 읽기 전용 런타임 데이터로 제공"
  - name: "Addressables"
    purpose: "Label 기반 데이터 로드와 비동기 초기화"
  - name: "Google Spreadsheet · CSV"
    purpose: "운영 데이터 관리와 자동 변환"
features:
  - title: "확장 가능한 유닛 구조"
    description: "이동 등 공통 동작은 추상 클래스로, 공격 방식은 인터페이스로, 체력과 행동은 재사용 가능한 컴포넌트로 분리했습니다."
  - title: "데이터 기반 스테이지"
    description: "Google Spreadsheet의 CSV를 ScriptableObject로 자동 변환하고, 한 Scene에서 데이터만 바꿔 스테이지를 확장하도록 구성했습니다."
  - title: "UI 책임 분리"
    description: "MVC와 Observer 패턴으로 게임 로직과 View를 분리하고, 이벤트 구독·해제를 Observer에 모아 UI 요소 간 결합을 줄였습니다."
challenges:
  - problem: "새 유닛을 추가할 때 이동·공격·체력 코드가 반복되는 구조"
    solution: "공통 동작, 공격 계약, 재사용 컴포넌트를 분리해 필요한 기능을 조합하도록 설계했습니다."
    result: "유닛별 차이는 유지하면서 공통 코드의 중복을 줄일 수 있는 구조를 만들었습니다."
  - problem: "스테이지 추가 때마다 Scene과 코드를 함께 수정해야 하는 비용"
    solution: "CSV 변환 에디터와 Addressables Label 로더를 만들고 초기화 완료 전 데이터 접근을 제한했습니다."
    result: "한 Scene에서 스테이지 데이터 교체만으로 콘텐츠를 확장할 수 있게 했습니다."
---

## 개요

플레이어가 유닛을 배치해 적진으로 전진하는 2D 디펜스 게임입니다. 1인 프로젝트로 기획과 Unity 클라이언트 구현을 진행했으며, 출시·상용화하거나 사용자 지표를 수집한 프로젝트는 아닙니다.

## 설계와 구현

새 유닛을 추가할 때 기존 구현을 복제하지 않도록 공통 이동은 추상 클래스, 서로 다른 공격 방식은 인터페이스, 체력과 행동은 컴포넌트로 나눴습니다. 유닛은 필요한 기능을 조합하고 각자 다른 공격 구현을 제공할 수 있습니다.

스테이지별 몬스터 구성, 스폰 수량·간격, 캐릭터 능력치는 Google Spreadsheet에서 관리했습니다. CSV를 ScriptableObject로 변환하는 Unity Editor 도구를 만들고 Addressables Label로 읽어, 런타임에서는 유형별 읽기 전용 데이터로 제공했습니다. 비동기 초기화가 끝나기 전에 데이터가 사용되지 않도록 접근 시점도 제한했습니다.

UI는 MVC와 Observer 흐름으로 역할을 나눴습니다. Button 입력은 Observer를 거쳐 Controller와 Model로 전달되고, 변경된 상태가 View에 반영됩니다. 구독과 해제를 한곳에서 관리해 UI 요소가 늘어날 때 생기는 연결 비용을 줄였습니다.
