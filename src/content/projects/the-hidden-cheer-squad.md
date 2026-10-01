---
title: "The Hidden Cheer Squad"
summary: "밀려오는 적들을 막아내며, 적군을 물리치는 2D 전진형 디펜스 게임입니다."
description: "밀려오는 적들을 막아내며, 적군을 물리치는 2D 전진형 디펜스 게임"
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
    description: "캐릭터의 공통 동작을 추상 클래스로 규격화하고, 유닛별 공격 방식은 인터페이스와 개별 클래스로 분리했습니다."
  - title: "데이터 기반 스테이지 운영"
    description: "Google Spreadsheet의 운영 데이터를 ScriptableObject로 자동 변환하고, 하나의 Scene에서 데이터만 바꿔 스테이지를 확장하도록 구성했습니다."
  - title: "UI 구조 설계"
    description: "MVC와 Observer 패턴을 적용해 게임 로직과 View의 책임을 분리하고, UI 이벤트 흐름과 구독 관리를 구조화했습니다."
challenges:
  - problem: "새 유닛을 추가할 때 이동·공격·체력 코드가 반복되는 구조"
    solution: "공통 동작, 공격 계약, 재사용 컴포넌트를 분리해 필요한 기능을 조합하도록 설계했습니다."
    result: "유닛별 차이는 유지하면서 공통 코드의 중복을 줄일 수 있는 구조를 만들었습니다."
  - problem: "스테이지 추가 때마다 Scene과 코드를 함께 수정해야 하는 비용"
    solution: "CSV 변환 에디터와 Addressables Label 로더를 만들고 초기화 완료 전 데이터 접근을 제한했습니다."
    result: "한 Scene에서 스테이지 데이터 교체만으로 콘텐츠를 확장할 수 있게 했습니다."
---

## 확장 가능한 유닛 구조

이동 등 캐릭터의 공통 동작을 추상 클래스로 규격화했습니다. 유닛마다 다른 공격 방식은 인터페이스로 분리하고 개별 클래스에서 구체화했으며, 공통 기능은 컴포넌트로 구성해 코드 중복을 줄였습니다.

공통 기능과 유닛별 차별 기능을 구분해 신규 유닛을 추가하기 쉬운 구조를 설계했습니다. 추상화와 컴포넌트 재사용을 기반으로 유닛과 스테이지 확장에 유연하게 대응할 수 있도록 구성했습니다.

## 데이터 기반 스테이지 운영

Google Spreadsheet에서 스테이지별 몬스터 구성, 스폰 수량·간격과 캐릭터 능력치 등의 운영 데이터를 관리했습니다. CSV 데이터를 Unity ScriptableObject로 자동 변환하는 에디터 도구를 개발해 반복 작업과 수작업 오류를 줄였습니다.

DataManager에서 Addressables Label을 통해 데이터를 일괄 로드하고, 유형별로 분류해 읽기 전용으로 제공했습니다. 하나의 게임 Scene에 서로 다른 데이터를 적용해 코드와 Scene을 추가하지 않고도 스테이지 구성과 난이도를 확장할 수 있는 운영 구조를 구축했습니다.

## UI 구조 설계

버튼 수를 최소화하고 주요 기능을 직관적으로 배치해 2D 게임에 적합한 UX를 구성했습니다. MVC 패턴을 적용해 게임 로직과 UI View의 역할과 책임을 분리했습니다.

Observer 패턴을 결합해 Button → Observer → Controller → Model → View로 이어지는 UI 이벤트 흐름을 설계했습니다. 이벤트 구독과 해제는 Observer에서 중앙 관리해 UI 요소 간 결합도와 관리 비용을 줄였습니다.
