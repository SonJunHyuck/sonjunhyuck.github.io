# 판단 사례와 근거 연결

아래의 '의미'는 사용자 발언을 바탕으로 한 편집 해석입니다. 원문과 구분해 사용합니다. 이미지 전체에 수록된 사용자 발언은 `evidence/sources.json`과 일치합니다.

| 사례 | 부딪힌 문제 | 검토·선택 방향 | 고려한 제약 | 질문 이미지 |
| --- | --- | --- | --- | --- |
| 스토리 구조 단순화 | Quest와 Sequence가 진행을 중복 표현하고 Beat 연결이 복잡해짐 | 실제 시나리오에 필요한 Quest·Dialogue·Trigger 중심으로 구성 제안 | 저장·재접속 후 연출 재생 여부는 별도 상태가 필요할 수 있음 | [01](evidence/01-story-structure.png) |
| 콘텐츠 수정 단위 | 노드별 입력 부담과 Sequence 중심 데이터의 낮은 직관성 | 스프레드시트로 제작하고 Conversation별 워크북 + Entries/Links 제안 | 협업 시간·충돌 감소 수치는 측정하지 않음 | [10](evidence/10-dialogue-authoring.png), [02](evidence/02-content-workbook.png) |
| 상태 소유권 | 두 시스템이 퀘스트 상태를 관리할 수 있는 중복 | Quest가 상태 결정, Dialogue는 참조 | 조회·변경 경계를 명확히 해야 함 | [03](evidence/03-quest-ownership.png) |
| UI 제어 책임 | 외부 대화 UI와 기존 UIManager의 제어가 겹칠 가능성 | DialogueManager에 ESC 등 대화 제어를 두고 연결부는 활성화·UI 정책 담당 | 프로젝트 커서·입력·패널 정책과 동기화 필요 | [06](evidence/06-dialogue-lifecycle.png) |
| 초기화 순서 | 씬에 따라 데이터 준비 전 UI 초기화가 발생 | 명시적 초기화 진입점 + 데이터 준비 후 Initializer에서 호출 제안 | 초기화 순서 의존성 자체는 남음 | [04](evidence/04-initialization.png) |
| 래퍼 철회 | 외부 메서드가 늘 때마다 전달 메서드가 증가 | 래퍼와 fallback 대신 개발 시점에 매니저 배치 | 필수 씬 설정을 올바르게 유지해야 함 | [05](evidence/05-wrapper-reconsideration.png) |
| 호출부 편의 | Radio의 호출 창구가 일반 알림과 분리됨 | 이유를 확인한 후 NotificationService 편입 결정 | Modal처럼 결과를 반환하는 UI는 별도 정책 검토 | [07](evidence/07-notification-api.png), [11](evidence/11-modal-usage.png) |
| 검증 경로 | 특정 게임 상황을 만들어야 UI 동작 확인 가능 | 직접 입력·전송과 통합 디버그 패널 요청 | 도구 요청 기록을 자동 테스트 통과 근거로 쓰면 안 됨 | [08](evidence/08-runtime-testing.png) |
| 실패 관찰 | 1·2·3 호출 중 2의 로그는 있지만 화면에서 누락 | 현상을 보고하고 구조 변경 가능성까지 열어 해결 방향 질문 | 해당 질문만으로 원인·수정 완료를 확정할 수 없음 | [09](evidence/09-queue-failure.png) |

## 주요 인용 후보

> 개념적인 단위로 Squence를 쓰고 있지만, 이게 코드적으로 제어하려고 하니까 오히려 더 어색한거 같아.

`quest2` — 원문 일부. 사례 01의 두 번째 메시지에서 발췌.

> 그럼 cv마다 다른 워크북을 두고, 시트를 Entries랑 Links로 두는건 어떻게 생각해?

`quest2` — 원문 일부. 사례 02의 두 번째 메시지에서 발췌.

> Start대신에 초기화 구문을 별도로 만드는 제안은 OK. 하지만 QuestManager에 종속되는건 반대야.

`quest2` — 원문 일부. 사례 04의 두 번째 메시지에서 발췌.

인용을 줄여 사용할 때는 '원문 일부'로 표시합니다. 문장을 다듬어 쓴 문구는 직접 인용으로 표시하지 않습니다.

## 미디어와의 대응

- 대화 데모: 구현 결과를 보여줌. 설계 과정 자체의 증거는 질문 원문을 함께 제시.
- Radio·Banner GIF: 알림 표시 예시. 큐 실패 수정이나 모든 예외 처리가 검증됐다는 증거는 아님.
- HUD·Modal PNG: 구현 화면 소개. 시스템 책임 분리의 증거는 아님.
- 질문 이미지: 사용자의 의문 제기·대안 제시·판단의 근거. 실제 앱 캡처가 아님을 명시.
