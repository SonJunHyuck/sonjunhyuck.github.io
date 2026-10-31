---
title: "Sonny Ghostty — 터미널 안 파일 탐색기 사이드바"
date: 2026-10-30
notionUrl: "https://sonnysmile.notion.site/409ed1cbaf6c804ea1a4fb8c92d93e2a"
tags: ["개발 환경", "AI 활용"]
image: "../../assets/feed/sonny-ghostty-sidebar.png"
imageAlt: "탐색기 사이드바를 붙인 Sonny Ghostty 화면"
draft: false
---

herdr로 Claude Code와 Codex를 나란히 띄운 Ghostty 안에서 파일 구조를 바로 보려고 Ghostty를 포크해 오른쪽 탐색기 사이드바(⌘B) 추가.
업스트림은 안정 릴리스 태그만 병합하고, 사이드바 코드는 별도 폴더에 모아 업스트림 연결 지점을 3곳으로 제한. v1.4.0 병합이 충돌 없이 끝나 구조의 효과 확인.
herdr 소켓 API로 포커스된 패인의 작업 디렉토리를 받아 사이드바 루트로 사용.
실제 설치한 앱에서만 드러난 herdr 판별 버그를 고치며, 임시 환경 테스트만으로는 부족하다는 점 확인.
