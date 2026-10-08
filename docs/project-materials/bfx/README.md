# Project BFX — 포트폴리오 작성 자료

이 폴더는 **포트폴리오 본문 초안과 미디어, 사용자 질문 근거**를 보관하는 자료 패키지입니다. 사이트 구현이나 게시용 콘텐츠 등록은 하지 않았습니다.

## 다른 디바이스에서 시작하기

원격 저장소의 `codex/bfx-portfolio-materials` 브랜치를 가져와 이 문서부터 읽습니다. 이미 작업 중인 변경 사항이 있다면 보존한 뒤 브랜치를 전환합니다.

```sh
git fetch origin
git switch --track origin/codex/bfx-portfolio-materials
```

로컬에 동일 브랜치가 이미 있으면 `git switch codex/bfx-portfolio-materials`를 사용합니다. 경로는 `docs/project-materials/bfx/`입니다. 이 폴더 안의 링크는 상대 경로로 작성되어 다른 운영체제에서도 사용할 수 있습니다.

## 읽는 순서

1. [HANDOFF.md](HANDOFF.md): 사용자의 의도와 다음 작업 범위
2. [PORTFOLIO_DRAFT.md](PORTFOLIO_DRAFT.md): 포트폴리오 본문 초안
3. [DECISIONS.md](DECISIONS.md): 문제·검토·선택·제약과 질문 근거
4. [MEDIA.md](MEDIA.md): 이미지·GIF·영상 용도와 확인 상태
5. [evidence/README.md](evidence/README.md): 사용자 질문 전체 원문과 출처 ID
6. [evidence/index.html](evidence/index.html): 질문 이미지 11장 모아보기
7. [CODE_EVIDENCE.md](CODE_EVIDENCE.md): 질문에서 실제 커밋과 현재 코드로 이어지는 검증
8. [code-evidence/README.md](code-evidence/README.md): 코드·diff 이미지와 원문 발췌

## 자료의 성격

- 사용자 질문 19개를 실제 대화 기록에서 확인했습니다. [원문 데이터](evidence/sources.json)에 대화·턴·메시지 ID가 있습니다.
- 질문 PNG는 **앱 스크린샷이 아닌 원문 재구성 이미지**입니다. 제목은 편집용이고 본문 문구와 오탈자는 원문을 보존했습니다.
- 게임 화면 PNG, 프레임 기반 GIF, 사용자가 제공한 MP4 및 그 변환 GIF를 포함합니다.
- 작업 기간, 팀 규모, 수치 성과는 확인되지 않아 임의로 채우지 않았습니다.
- 2026-10-08에 주요 사례의 실제 Git diff와 기준 HEAD 코드를 대조했습니다. 확인 범위와 남은 한계는 `CODE_EVIDENCE.md`에 정리했습니다. 새 런타임 테스트는 수행하지 않았습니다.
- 사용자가 직접 캡처한 Dialogue Importer 화면도 포함합니다. 질문 재구성 이미지 및 코드 원문 렌더링 자료와 구분합니다.
- 파일 누락·변경 확인용 SHA-256 목록은 `MANIFEST.json`에 있습니다.

최초 정리: 2026-10-07 / 코드 근거 보강: 2026-10-08
