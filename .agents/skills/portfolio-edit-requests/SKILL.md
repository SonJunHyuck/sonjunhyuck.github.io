---
name: portfolio-edit-requests
description: 로컬 포트폴리오 편집 모드의 사용법을 안내하거나 화면에서 남긴 수정 요청을 확인하고 반영 상태를 기록할 때 사용한다.
---

# 편집 요청

`astro dev`에서 왼쪽 아래 `편집` 버튼이나 `Alt+E`로 켜고 끕니다. 주소에 `?edit`를 붙여 켠 채로 열 수도 있습니다. 켜면 요소를 클릭해 바꿀 문구나 코멘트를 저장할 수 있습니다. `편집` 버튼 위의 패널에서 이 페이지의 요청을 확인하고 해당 요소로 이동하거나 요청을 삭제합니다.

요청은 해당 worktree의 `artifacts/edit-requests/requests.json`에 배열로 저장됩니다. 각 항목에는 `id`, `createdAt`(ISO 시각), `status`(`open` 또는 `done`), `page`(경로), `title`, `selector`, `tag`, `originalText`, `comment`, `viewport`(`width`, `height`), `theme`이 있습니다. Astro가 파일 경로를 제공하면 `src/pages/profile/index.astro`처럼 저장소 루트 기준 상대 경로를 `sourceFile`에 기록합니다. 저장소 밖 경로는 생략합니다. 소스 위치가 있으면 `sourceLoc`을 기록하고, 문구를 바꾼 경우 `newText`를 추가합니다.

Claude는 `open` 요청을 읽고 `page`, `selector`, 소스 위치로 대상을 확인한 뒤 수정 요청을 Codex 작업 지시로 전달합니다. 사이트에 반영된 것을 확인하면 같은 `id`의 `status`를 `done`으로 바꿉니다.
