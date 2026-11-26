---
name: portfolio-edit-requests
description: 로컬 포트폴리오 편집 모드의 사용법과 수정 요청 일괄 전송을 안내하거나 요청을 반영하고 상태를 기록할 때 사용한다.
---

# 편집 요청

`astro dev`에서 왼쪽 아래 `편집` 버튼이나 `Alt+E`로 켜고 끕니다. 주소에 `?edit`를 붙여 켠 채로 열 수도 있습니다. 켜면 요소를 클릭해 바꿀 문구나 코멘트를 저장할 수 있습니다. `편집` 버튼 위의 패널에서 이 페이지의 요청을 확인하고 해당 요소로 이동합니다. `open`과 `held`는 삭제할 수 있습니다.

요청은 해당 worktree의 `artifacts/edit-requests/requests.json`에 배열로 저장됩니다. 각 항목에는 `id`, `createdAt`(ISO 시각), `status`, `page`(경로), `title`, `selector`, `tag`, `originalText`, `comment`, `viewport`(`width`, `height`), `theme`이 있습니다. Astro가 파일 경로를 제공하면 `src/pages/profile/index.astro`처럼 저장소 루트 기준 상대 경로를 `sourceFile`에 기록합니다. 저장소 밖 경로는 생략합니다. 소스 위치가 있으면 `sourceLoc`을 기록하고, 문구를 바꾼 경우 `newText`를 추가합니다.

## 보내기 → Codex 반영 → Claude 검토

1. `보내기`를 누르면 모든 페이지의 `open` 요청 수를 확인한 뒤 한 번에 보냅니다. 이 worktree에서 실행 중인 Codex와 Claude pane이 필요합니다. 한 역할에 후보가 여러 곳이면 패널에서 선택합니다.
2. Codex는 받은 ID의 항목을 파일에서 읽고 `page`, `selector`, 소스 위치로 대상을 확인합니다. `newText`가 있으면 값 그대로 교체합니다. `comment`는 수정 지시로 해석하고, 판단이 애매한 요청은 보류합니다. 결과는 같은 ID에 기록합니다.
3. Codex는 요청별 반영 또는 보류 결과와 이유, 변경 파일, 빌드 결과를 선택한 Claude pane에 보냅니다. Claude는 사용자의 의도와 반영 결과를 검토합니다.

| 상태 | 의미 |
| --- | --- |
| `open` | 저장됐으며 전송을 기다립니다. |
| `sent` | Codex에 전달됐습니다. `sentAt`과 `sentTo`를 기록합니다. |
| `done` | Codex가 반영했습니다. `doneAt`을 기록합니다. |
| `held` | Codex가 판단을 보류했습니다. `heldReason`을 기록합니다. |
