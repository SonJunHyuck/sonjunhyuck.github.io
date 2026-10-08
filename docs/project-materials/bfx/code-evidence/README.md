# BFX 코드 변경 증거 캡처

검증 HEAD: `1a7d803330923ee6f9f40f5e4bda9e84fb7fab7b`

이 폴더의 PNG는 실제 IDE 화면 캡처가 아닙니다. 지정 커밋의 `git show` 원문과 현재 HEAD의 `git show HEAD:<path>` 원문을 로컬에서 가독성 중심으로 렌더링했습니다. 각 이미지 하단에도 **Git 원문 렌더링 / 실제 IDE 화면 캡처 아님**을 표기했습니다.

## 산출물

총 9장의 PNG(폭 1600px), 각 이미지에 대응하는 발췌 `.diff`/`.txt`, 주요 diff 전체 원문, 그리고 `capture_sources.json`을 포함합니다.

1. `01_sequence_deleted_files.png` — SequenceManager / SequenceDialogueBridge 삭제
2. `02_save_data_sequence_removal.png` — SaveDataManager의 Sequence 로드·저장 책임 삭제
3. `03_dialogue_importer_workbook_transition.png` — Conversations 제거, EntryLinks→Links, 파일명 ID
4. `04_current_parse_conversation.png` — 현재 DialogueImporter 232–255행(ParseConversation 241행 포함)
5. `05_npc_world_ui_initialization_added.png` — 초기 직접 초기화 추가
6. `06_initialization_broadcast_transition.png` — 직접 호출에서 완료 신호로 변경
7. `07_current_npc_world_ui_guard.png` — 현재 Presenter의 Completed 구독/가드
8. `08_publish_radio_added.png` — PublishRadio 추가
9. `09_debug_panel_consolidation.png` — 통합 디버그 패널 추가 및 개별 도구 삭제

## 검증 방식

- 커밋 diff: `git show --format= --find-renames <commit> -- <path>`
- 현재 코드: `git show HEAD:<path>` 후 원본 행 번호 부여
- `*.full.diff`: 캡처의 근거가 된 전체 파일 diff(해당 파일 범위)
- `*.excerpt.diff` / `*.txt`: 이미지에 실제로 렌더링한 텍스트
- `capture_sources.json`: 이미지 ↔ 원문 ↔ 커밋/경로 매핑

긴 diff는 포트폴리오 가독성을 위해 관련 hunk만 발췌했으며, 이미지와 발췌 파일에 발췌임을 표시했습니다. 원문 코드는 수정하거나 재작성하지 않았습니다.

## 인수 검증

2026-10-08 부모 채팅에서 전체 파일 diff를 해당 커밋의 Git 출력과 다시 대조했습니다. 현재 코드 두 발췌도 기준 커밋의 파일 내용과 원본 행 번호로 대조했습니다. 9개 자료 모두 원문 일치를 확인했습니다. `09_debug_panel_consolidation.full.diff`는 패널 파일의 전체 diff 뒤에 해당 커밋의 name-status 목록을 함께 담습니다. 이 목록도 별도로 대조했습니다.

이미지 제작은 사용자 요청에 따라 GPT-5.6 Sol / low 설정의 별도 채팅에서 진행했습니다. 렌더링 스크립트는 이 전달 자료에 포함하지 않았습니다. 출처 원문과 이미지가 최종 산출물입니다.
