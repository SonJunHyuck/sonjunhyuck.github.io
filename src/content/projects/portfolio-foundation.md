---
title: "A portfolio that documents the work"
summary: "A deliberately small Astro foundation for presenting selected work and the reasoning behind it."
description: "선별한 작업과 그 과정의 판단을 함께 보여 주기 위한 Astro 기반 포트폴리오의 첫 구조입니다."
publishedAt: 2026-09-29
category: "graphics"
workTypes: ["experiment", "personal"]
status: "in-progress"
role: "Strategy, design system, and front-end foundation"
team: "Personal project"
platform: ["Web"]
genres: ["Portfolio", "Development blog"]
technologies:
  - name: "Astro"
    purpose: "정적 사이트 구조와 콘텐츠 렌더링"
  - name: "GitHub Pages"
    purpose: "정적 배포와 호스팅"
features:
  - title: "작업과 기록의 분리"
    description: "결과물과 그 뒤의 판단을 서로 연결하되, 각각 읽기 쉬운 단위로 유지합니다."
isExample: true
draft: true
---

## Context

> This is example content for validating the project template, not a confirmed user project.

A portfolio is more useful when it shows both finished work and the decisions that produced it.

## Decisions

The structure separates **Work** (evidence of outcomes) from **Notes** (reusable thinking), while allowing each to point to the other.

## Result

The initial content model makes each new project or note a Markdown entry, keeping publishing lightweight and version controlled.
