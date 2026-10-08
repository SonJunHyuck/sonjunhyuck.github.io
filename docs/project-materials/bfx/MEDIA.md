# 미디어 사용 안내

모든 파일은 이 폴더 안에 있으며 외부 장치의 절대 경로를 필요로 하지 않습니다.

2026-10-08 추가: [실제 임포터 화면](media/dialogue-importer-user-capture.png)은 사용자가 직접 제공한 PNG 원본입니다. [코드·diff 근거 자료](code-evidence/README.md)는 실제 Git/소스 원문을 바탕으로 별도 제작했으며 촬영·렌더링 방식은 해당 README를 따릅니다. 상세 연결은 [CODE_EVIDENCE.md](CODE_EVIDENCE.md)를 확인합니다.

| 파일 | 내용·출처 | 권장 용도 | 확인 상태·주의 |
| --- | --- | --- | --- |
| [dialogue-demo.mp4](media/dialogue-demo.mp4) | 사용자가 제공한 `Video Project 3.mp4` 원본 | NPC 대화 결과를 보여주는 주 미디어 | 1920×1080, 30fps, 11.2초. 오디오 포함. 파일 원본 보존 |
| [dialogue-demo.gif](media/dialogue-demo.gif) | 위 MP4 전체 구간 변환 | GIF 삽입이 필요한 매체 | 1280×720, 15fps, 11.2초, 무한 반복. 약 23.8MB. 프레임 수·재생 시간·중간 화면 확인 |
| [dialogue-preview.png](media/dialogue-preview.png) | 위 GIF의 중간 프레임 | 대화 영상 썸네일 후보 | 대화 UI가 표시된 1280×720 이미지 |
| [battle-hud.png](media/battle-hud.png) | Unity 플레이 캡처 | 전투 HUD 구현 소개 | 실제 게임 화면, 1920×1080 |
| [modal.png](media/modal.png) | Unity 플레이 캡처 | 모달 구현 소개 | 실제 게임 화면. 게시 전 문구와 대표 장면 적합성 확인 |
| [radio.gif](media/radio.gif) | Unity에서 수집한 49프레임을 GIF로 결합 | 무전 알림 표시 예시 | 프레임당 180ms로 조립한 예시. 원래 플레이 시간과 동일한 실시간 녹화로 설명하지 않음 |
| [banner.gif](media/banner.gif) | Unity에서 수집한 30프레임을 GIF로 결합 | 배너 알림 표시 예시 | 프레임당 160ms로 조립한 예시. 게시 전 전체 재생 흐름 확인 |
| [질문 이미지 모음](evidence/index.html) | 사용자 질문 19개, 주제별 PNG 11장 | 판단 과정의 원문 근거 | 실제 앱 캡처가 아닌 원문 재구성. 문구·오탈자 보존, 제목은 편집용 |

Radio·Banner GIF의 길이는 합성 시 지정한 프레임 간격을 기준으로 합니다. 실측 응답 속도나 애니메이션 성능의 증거로 사용하지 않습니다.

## 이미지 배치 제안

1. 소개 바로 아래: 대화 데모 또는 HUD 한 장
2. 구조 단순화 사례: `evidence/01-story-structure.png`
3. 콘텐츠 작업 단위 사례: `evidence/02-content-workbook.png`
4. 초기화 책임 사례: `evidence/04-initialization.png`
5. 추가 사례를 확장할 경우: Radio·Banner GIF와 검증 도구 질문

현재 구현 소개 문서의 Markdown은 보유 자료를 찾기 위한 초안입니다. 사이트에 GIF 여러 개를 동시에 자동 재생하도록 구현한 상태가 아닙니다.

## 이번에 포함하지 않은 자료

- 프레임별 PNG 전체: 같은 장면의 중복 용량을 줄이기 위해 GIF만 포함
- 촬영용 명령 JSON·상태 로그·Unity 임시 스크립트: 포트폴리오 원고에 필요하지 않음
- 앱의 실제 질문 캡처: 확보하지 못함. 원문 재구성 이미지와 구분 필요
- 대화 워크북 파일·디버그 패널 스크린샷: 이번 전달 패키지에는 없음. 임포터 화면은 2026-10-08 사용자 제공본을 추가함

정확한 파일 크기와 SHA-256은 `MANIFEST.json`을 참고합니다.
