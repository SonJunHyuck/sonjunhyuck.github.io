---
name: portfolio-edit-requests
description: 로컬 포트폴리오 편집 모드의 사용법과 수정 요청 일괄 전송을 안내하거나 요청을 반영하고 상태를 기록할 때 사용한다.
---

# 편집 요청

`astro dev`에서 왼쪽 아래 `편집` 버튼이나 `Alt+E`로 켜고 끕니다. 주소에 `?edit`를 붙여 켠 채로 열 수도 있습니다. 켜면 요소를 클릭해 바꿀 문구나 코멘트를 저장할 수 있습니다. `편집` 버튼 위의 패널에서 이 페이지의 요청을 확인하고 해당 요소로 이동합니다. `open`과 `held`는 삭제할 수 있습니다.

요청은 해당 worktree의 `artifacts/edit-requests/requests.json`에 배열로 저장됩니다. 각 항목에는 `id`, `createdAt`(ISO 시각), `status`, `page`(경로), `title`, `selector`, `tag`, `originalText`, `comment`, `viewport`(`width`, `height`), `theme`이 있습니다. Astro가 파일 경로를 제공하면 `src/pages/profile/index.astro`처럼 저장소 루트 기준 상대 경로를 `sourceFile`에 기록합니다. 저장소 밖 경로는 생략합니다. 소스 위치가 있으면 `sourceLoc`을 기록하고, 문구를 바꾼 경우 `newText`를 추가합니다.

## 보내기 → Claude 정리 → Codex 반영 → Claude 검토

1. `보내기`를 누르면 모든 페이지의 `open` 요청 수를 확인한 뒤 한 번에 Claude pane으로 짧은 알림(요청 파일 경로와 ID 목록)을 보냅니다. 이 저장소에서 실행 중인 Claude pane이 필요하며, 후보가 여러 곳이면 패널에서 선택합니다.
2. Claude는 받은 ID의 항목을 읽고, `sent`로 기록된 것을 확인한 뒤 정리합니다.
   - 의도가 애매한 요청은 Codex에 넘기기 전에 사용자에게 묻습니다.
   - 요청을 페이지·기능 단위로 묶고, 묶음마다 맡을 Codex를 정합니다. 그 페이지·기능을 맡아 온 Codex가 있으면 그 세션에, 없으면 같은 herdr 워크스페이스에 Codex를 새로 열어 맡깁니다(2026-11-27 사용자 허용).
   - 같은 작업 폴더에서 구현을 동시에 진행하지 않습니다. 묶음을 병렬로 맡길 때는 AGENTS.md에 따라 별도 git worktree를 만들고, 같은 파일을 건드리는 묶음은 순서대로 맡깁니다.
3. Claude가 Codex에 보내는 프롬프트에는 다음을 넣습니다.
   - 요청 파일 경로와 맡기는 ID, 각 요청의 `page`·`selector`·소스 위치
   - `newText`가 있으면 빈 문자열을 포함해 값 그대로 교체하고, `comment`는 수정 지시로 해석합니다. 판단이 애매하면 보류하고 이유를 보고합니다.
   - 커밋하지 않습니다. 빌드는 `PATH="/Users/sonny/Library/Application Support/com.raycast.macos/NodeJS/runtime/22.23.5/bin:$PATH" npm run build`로 확인합니다.
   - 결과는 요청 파일을 다시 읽어 다른 항목을 보존한 채 같은 ID에 기록합니다. 반영하면 `done`과 `doneAt`, 보류하면 `held`와 `heldReason`입니다.
   - 요청별 반영·보류 결과와 이유, 변경 파일, 빌드 결과를 `herdr agent prompt <Claude pane> "<보고>"`로 보냅니다.
4. Claude는 `git diff`로 변경을 직접 읽고 사용자의 의도와 반영 결과를 검토해 보고합니다.

| 상태 | 의미 |
| --- | --- |
| `open` | 저장됐으며 전송을 기다립니다. |
| `sent` | Claude에 전달됐습니다. `sentAt`과 `sentTo`(Claude pane)를 기록합니다. |
| `done` | Codex가 반영했습니다. `doneAt`을 기록합니다. |
| `held` | Codex가 판단을 보류했습니다. `heldReason`을 기록합니다. |
