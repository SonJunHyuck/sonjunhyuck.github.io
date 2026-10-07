# Project BFX — 사용자 질문 원문

실제 앱 화면 캡처가 아닌, read_thread로 확인한 사용자 질문 원문의 재구성 이미지. 원문 문구와 오탈자를 보존하며 줄바꿈만 화면 너비에 맞춤. 제목은 편집자가 작성.

이미지의 소제목은 분류를 위한 편집 제목이며, 상자 안 문장은 사용자 원문입니다. 실제 앱 화면 캡처는 아닙니다.

## 01. 스토리 구조의 필요성 재검토

이미지: [01-story-structure.png](01-story-structure.png)

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019fc2cd-77fc-7780-a5da-de2f5026f859`
Message ID: `item-648`

```text
Squence단위로 지금 스토리를 진행하려고 하고 있지만, 그냥 단순히 퀘스트 구조만으로 스토리를 진행시킬 수 없나? 개념적인 단위로 Squence를 쓰고 있지만, 이게 코드적으로 제어하려고 하니까 오히려 더 어색한거 같아
```

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019fc2d0-008f-7483-b78d-359aa7353956`
Message ID: `item-649`

```text
Squence단위로 지금 스토리를 진행하려고 하고 있지만, 그냥 단순히 퀘스트 구조만으로 스토리를 진행시킬 수 없나? 개념적인 단위로 Squence를 쓰고 있지만, 이게 코드적으로 제어하려고 하니까 오히려 더 어색한거 같아. 그냥 무전이면 RadioManager, 연출이면 DirectorManager 처럼 그냥 필요할 때 호출해서 쓰면 될 것 같은데? 구태여 Beat라는 개념까지 강제로 구현해나가면서 진행시키니까 코드 관계만 복잡해지는것 같아. 그냥 Dialogue와 Quest로만 진행하되, 연출이 필요하면 Trigger를 발동 시켜서 그 연출을 보여줘도 될 것 같아. 예를 들어서, SQ의 특정 퀘스트에서 어느 위치에 도달하면 무전이 나온다 라는 개념은 그냥 도착 지역에 무전이 나오는 Trigger를 설치할 뿐인것 처럼 만드는게 더 자연스러운것 같은데
```

## 02. 콘텐츠 수정 단위 재설계

이미지: [02-content-workbook.png](02-content-workbook.png)

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019ff145-3513-78b3-aecf-d586cb396b4c`
Message ID: `item-741`

```text
음 근데 데이터 구조를 좀 바꾸는게 좋을거 같아. Sequence 기준으로 두는건 직관적이지도 않고, 운영적인 측면에서 안좋은거 같아. CV가 npc 단위로 있는걸 착안해서 cv 기준으로 sheet를 두는게 맞지 않을까 싶어. conversation_id를 시트의 이름으로 두고, 각 시트에는 그 npc의 cv entryid를 다 두는거지. 어때?
```

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019ff14a-9ec9-78a0-a6d0-17533b4fd5d3`
Message ID: `item-744`

```text
아 하나의 워크북에 npc를 몰아두면 이런점이 생기는구나? 그럼 cv마다 다른 워크북을 두고, 시트를 Entries랑 Links로 두는건 어떻게 생각해?
```

## 03. 퀘스트 상태의 소유권

이미지: [03-quest-ownership.png](03-quest-ownership.png)

대화: **quest**

Thread ID: `019ef238-3eb9-7831-a4d8-03c79ef717b8`
Turn ID: `019f46e3-3167-7161-b0d9-c1be085a6926`
Message ID: `item-223`

```text
퀘스트 상태는 결국 퀘스트 자체에서 결정하고, 변수만 Dialogue System에서 참조해서 사용하면 되는거 같은데, 맞나? 예를들면, 1번 퀘스트가 끝났는지 확인하고 3번 conversation에 진입가능한지 여부를 따지는 것 과 같은거 말이지
```

## 04. 초기화 순서와 책임 분리

이미지: [04-initialization.png](04-initialization.png)

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019ff535-a0bd-75c3-b68e-1499d7a08491`
Message ID: `item-929`

```text
Start에서 초기화 하지 않고, 별도의 초기화 지점을 지정해줘야 할거 같은데? UI니까 UIManager 초기화 할 때 같이 해준다던가?
```

대화: **quest2**

Thread ID: `019f4b55-608b-72d1-b658-44b6c4c09db0`
Turn ID: `019ff541-3e39-7ba0-8a85-80cb0340ecaf`
Message ID: `item-935`

```text
Start대신에 초기화 구문을 별도로 만드는 제안은 OK. 하지만 QuestManager에 종속되는건 반대야. 이건 QuestManager를 참조하는건 맞지만, 그냥 초기화 자체를 Data초기화 뒤에 후순위로 해야한다는 주석만 명시해놓고 StandaloneInitializer 의 초기화구문 후순위로 넣는게 더 맞는거 같아. 이래야 객체지향성이 보장되고, 관계가 느슨해지니까. 니 생각을 말해줘. 동의해도 좋고, 반박해도 좋아ㅡ
```

## 05. 래퍼와 자동 생성 방향 수정

이미지: [05-wrapper-reconsideration.png](05-wrapper-reconsideration.png)

대화: **quest**

Thread ID: `019ef238-3eb9-7831-a4d8-03c79ef717b8`
Turn ID: `019f4a39-8710-7b52-992d-91517849ec71`
Message ID: `item-289`

```text
근데 이 래핑 싱글턴은 결국 우리가 접근하려고 하는 DialogueManager의 메서드가 늘어날 때마다 메서드를 만들어야 하는 구조니까 별로인거 같아. 다시 원상복구 해줘. 그냥 Scene에 DialogueManager가 고정으로 있는게 나은거 같아. 원래 의도는 DialogueManager가 Scene에 없으면 fallback으로 만들어주는 것을 생각햇는데, 그냥 개발타임에 Scene에 넣는게 맞는거 같다.
```

## 06. 대화 UI의 제어 책임

이미지: [06-dialogue-lifecycle.png](06-dialogue-lifecycle.png)

대화: **StandardDialogueUI UIBase 상속 방법**

Thread ID: `01a03438-7682-7092-b890-6934f721b88f`
Turn ID: `01a03445-03d8-7b13-8a2f-eccdf92d668c`
Message ID: `01a03445-063d-7181-b9b5-ea6e5bceaf90`

```text
DialogueUIAdapter 제도로 한번 구현 해봐줄래? 대신 DialogueUI는 상시 유지하고 Open/Close 호출하는 방식으로 진행 한번 해줄래? 어댑터는 활성화와 UI 정책만 담당하도록 하고.
```

대화: **StandardDialogueUI UIBase 상속 방법**

Thread ID: `01a03438-7682-7092-b890-6934f721b88f`
Turn ID: `01a034c3-7864-7de1-aa0c-a917b35390a2`
Message ID: `01a034c3-7902-7211-9613-1978376d54cb`

```text
DialogueManager에서 애초에 이 UI를 관리하는게 더 주된 상태라, 그냥 Pixel Crusher의 esc 기능을 쓰는게 맞는거 같은데 어떻게 생각해?
```

## 07. 공통 호출 창구에 대한 의문

이미지: [07-notification-api.png](07-notification-api.png)

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcd88-8c05-71b2-b883-eb9e45032198`
Message ID: `item-304`

```text
Radio는 왜 notificationService에 편입안했어? 이유를 아렬줘
```

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcd91-6d71-78f2-b3f9-e6c3bb2a4e41`
Message ID: `item-306`

```text
notificationService로 편입해줘.
```

## 08. 직접 재현할 수 있는 검증 도구

이미지: [08-runtime-testing.png](08-runtime-testing.png)

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcda0-b837-7692-b2e8-d3a6a6f4b296`
Message ID: `item-312`

```text
좋아. 이제 Runtime test tool을 만들건데, 대사 입력하고 전송 버튼 누르면, 해당 무전이 나오도록 하는 tool 만들어줄래? 단축키는 런타임에 F3을 나오게 해줘
```

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcddd-dd65-7120-9dae-0e95ec479df4`
Message ID: `item-345`

```text
이제 이것도 test Tool을 만들건데, 우리 이때까지 만들었떤, MessageFeed, Banner, Radio, Modal를 아까 만들었던 DebugPannel에 모두 몰아서 구현해줄 수 있어? 기존에 있었던 MessageFeed Test용은 삭제해주고
```

## 09. 동시 호출에서 발견한 실패 사례

이미지: [09-queue-failure.png](09-queue-failure.png)

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fc889-bf28-7640-93a6-f09df613a594`
Message ID: `item-254`

```text
지금 1 2 3 으로 동시에 호출해봤는데, 2번이 지금 로그는찍히는데 건너띄워지고 바로 1번 후 3번이 바로 진행되는데 이유가 뭘까?
```

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fc88a-9f60-79d2-8dba-98ef0094b38b`
Message ID: `item-257`

```text
다른 담백한 방법은 없을까? 구조가 변경되더라도
```

## 10. 대화 제작 방식의 효율 검토

이미지: [10-dialogue-authoring.png](10-dialogue-authoring.png)

대화: **quest**

Thread ID: `019ef238-3eb9-7831-a4d8-03c79ef717b8`
Turn ID: `019f46e6-88c2-76c0-a434-e118323cb166`
Message ID: `item-228`

```text
좋아 일단 이 방향은 구현할거지만, 잠깐 놔둬주고, conversation을 일일이 노드를 가지고 만드는건 좀 비효울적인거 같아서 말이지. conversation을 스프레드 시트로 DataTable화 해서, 이것들을 가지고 와서 대화를 만드는 것 가능할까?
```

## 11. 사용하기 쉬운 모달 호출 방식

이미지: [11-modal-usage.png](11-modal-usage.png)

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcdc5-c242-7e70-b324-d745006e1ebc`
Message ID: `item-323`

```text
좋아. 이제 Modal을 만들건데, Modal은 Popup그룹인데 NotificationService의 영향을 따로 받지 않고, Popup으로 만들고자 하는데, 그냥 UIBase를 하나 상속받아서, 만들까해. 그리고 래핑 매서드를 구현해서, 사용하기 쉽게 만들고자 해. title, desc, okCallback, cancelCallback 을 받아서 Show 해주도록 말이지. 어떤것 같아?
```

대화: **notification**

Thread ID: `019fa955-fc1a-7411-914b-29953323c493`
Turn ID: `019fcdcd-19d1-7773-ac04-ca742e611663`
Message ID: `item-329`

```text
음 확실히 여러 요청이 동시에 들어오면 Queue 구조가 필요하긴 하겠다. 추가적으로 callback을 하나도 안 넣고 그냥 title과 desc만 넣어서 호출하면, 그냥 확인 버튼만 나오도록 구조를 만드는건 어때?
```
