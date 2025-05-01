# Gasannes · 2024.11

**Gasannes**는 현대 오토에버 모빌리티 SW 스쿨에서 진행한 영화 리뷰 사이트 프로젝트로, 스케줄러를 통해 주기적으로 시상식을 진행하고, 유저는 시상식에 참여하여 직접 작품에 투표할 수 있는 기능을 가진 서비스입니다.

[시연 영상](https://drive.google.com/file/d/1dNMuN9FU0LD65_bzb47AZeXk3sOR0E4l/view?usp=sharing)

[발표 자료](https://www.canva.com/design/DAGW4X4V11Q/QhsEziay6rIkpa026fwizA/view?utm_content=DAGW4X4V11Q&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=heee1f14190)

(※ 현재는 배포되지 않은 프로젝트입니다.)

## 😀 개발 인원

| 이름 | 역할 | 연락처 |
| --- | --- | --- |
| 박상연 | FE | [dhkdwk1041@gmail.com](mailto:dhkdwk1041@gmail.com) |
| 안준수 | FE | [junsoo1003](https://github.com/junsoo1003) |
| 남종식 | BE | [N-jongsik](https://github.com/N-jongsik) |
| 양혜지 | BE | [yhj0619](https://github.com/yhj0619) |
| 이윤주 | BE | [glowju013](https://github.com/glowju013) |

## 🛠 프로젝트 기술 스택

- **프론트엔드**: React.js, css module, typescript, axios, tanstack query, zustand, chart.js, swiper, Quill Editor
- **백엔드**: Spring Boot, Spring Data JPA, MySQL
- **배포**: AWS (EC2, S3, RDS, Route 53), Docker, github action

## 📞 API

| API 명 | 설명 |
| --- | --- |
| `TMDB API` | 영화 데이터 수집 |
| `kakao login API` | 소셜 로그인 구현 |

## ✏️ Issue

### SSE + Spring Scheduler

Gasannes 프로젝트에서는 일정 주기로 시상식을 진행하고 이를 사용자에게 알려야 했습니다. 이를 위해 Spring Scheduler를 사용해 정해진 주기마다 이벤트를 발생시키고, 이벤트가 발생할 때마다 SSE(Server-Sent Events)를 통해 클라이언트에 메시지를 전송했습니다.

초기에는 WebSocket도 고려했지만, 양방향 통신이 아닌 서버에서 클라이언트로의 실시간 단방향 전송만 필요했기 때문에, 보다 적합한 SSE를 선택해 구현하였습니다.

