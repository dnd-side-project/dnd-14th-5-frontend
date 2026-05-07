## Timo를 소개해요!

![스크린샷 2026-04-24 오후 9.56.36.png.webp](https://cdn.inflearn.com/public/files/posts/027c5de4-675d-4430-a248-93129fca8861/bfba245b-e1a2-4898-bfea-97d7d32bcf65.webp)

맞춤 질문으로 만드는 회고 습관 **"Timo"**

Timo(Time Moment)는 현대인들의 회고를 지속할 수 있도록 돕는 서비스에요.

하루 하나의 질문과 답변으로 오늘 하루를 돌아볼 수 있습니다.

![스크린샷 2026-04-24 오후 9.52.21.png.webp](https://cdn.inflearn.com/public/files/posts/2f2f4064-ab73-40d5-bfb5-659d411679f1/ab64ef39-803b-456d-8378-4314213d6d67.webp)

여러분이 삶을 바라보는 시간 관점은 균형이 잡혀 있나요?

심리학적으로 검증된 **ZTPI 테스트**를 통해 나에게 가장 활성화된 시간 관점을 알아보고, 지속적인 회고를 통해 건강한 시간 관점에 도달할 수 있도록 맞춤형 질문을 받을 수 있어요.

![스크린샷 2026-04-24 오후 10.02.43.png.webp](https://cdn.inflearn.com/public/files/posts/4b15b8a3-050c-4fb5-9f91-192452329c05/1665c10b-8c76-40e3-8bdc-bac2363de4fa.webp)

답변 후에는 **AI 피드백**으로 오늘 돌아본 하루에 대해서 또 한 번 생각해 볼 수 있답니다.

현재 Timo는 서비스 출시 초기 단계에 있으며, [_timo.io.kr_](http://timo.io.kr/)로 접속해서 사용해보실 수 있습니다.

## 프로젝트 기간을 소개해요.

> **MVP 개발 기간: 26.01.10 ~ 26.02.28**

- ZTPI 검사 - 시간 성향 5개 카테고리 점수 집계 및 분석
- 맞춤 회고 질문 - 점수 편차 기반 가중 랜덤 알고리즘으로 오늘의 질문 선택
- AI 피드백 - Google Gemini API로 회고 답변에 대한 개인화 피드백 생성
- FCM 푸시 알림 - 사용자 지정 시간에 회고 알림 발송
- OAuth2 소셜 로그인 - Google · Naver · Kakao, JWT HttpOnly 쿠키 인증

> **추가 확장 개발 기간: 26.04.28 ~ 진행중**

- 그룹 회고 - 그룹에 속한 그룹원들과 회고 내용 공유

## 핵심 기술을 소개해요.

**1. Axios 인터셉터 기반 JWT 자동 재발급**

- 401 응답 시 `/auth/reissue`로 토큰을 재발급하고 원 요청을 자동으로 재시도
- `Promise` 공유로 **동시 다발적인 재발급 요청을 1회로 수렴**하여 중복 호출 방지
- SSR 환경에서는 `next/headers`의 쿠키를 Axios 요청 헤더에 자동 주입

**2. TanStack React Query v5 — 서버 상태 관리**

- `useQuery` / `useSuspenseQuery`를 통한 데이터 페칭 및 캐싱
- Suspense 경계와 결합해 **로딩·에러 상태를 선언적으로 처리**
- 쿼리 훅을 `features/[feature]/queries/`에 모아 관심사 분리

**3. Zod 기반 런타임 응답 검증**

- API 응답을 `responseSchema` 옵션으로 Zod 스키마 검증
- **빌드 타임 타입 추론과 런타임 유효성 검사를 동시에** 확보해 백엔드 계약 불일치를 조기 발견

**4. Firebase FCM 웹 푸시 알림**

- Service Worker 기반으로 **백그라운드 푸시 알림** 처리
- 알림 권한 요청 및 FCM 토큰 등록 플로우를 `src/lib/firebase/`에서 관리

**5. Next.js App Router + React 19 서버 컴포넌트**

- 페이지 단위 서버 컴포넌트에서 `access_token` 쿠키로 인증 처리 (Next.js Proxy 활용)

## 사용한 기술 스택은 다음과 같아요.

| 구분        | 기술                                             |
| ----------- | ------------------------------------------------ |
| 프레임워크  | Next.js 16 (App Router), React 19                |
| 언어        | TypeScript                                       |
| 스타일링    | Tailwind CSS v4                                  |
| 상태 관리   | TanStack React Query v5, Zustand                 |
| HTTP / 검증 | Axios, Zod                                       |
| 알림        | Firebase FCM                                     |
| 테스팅      | Storybook 10, Vitest, Playwright                 |
| 코드 품질   | ESLint, Prettier, Husky, lint-staged, commitlint |
| 배포        | Vercel, Github Actions                           |

## 프론트엔드 팀원을 소개해요!

| ![img](https://github.com/jeongyou.png) | ![img](https://github.com/baegyeong.png) |
| --------------------------------------- | ---------------------------------------- |
| 정유정                                  | 조배경                                   |

## 로컬 서버 실행 방법이에요.

**1. 환경 변수 설정**

`.env.local` 파일을 생성하고 아래 변수를 입력해요.

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

**2. 패키지 설치**

```bash
pnpm install
```

**3. 개발 서버 실행**

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000` 으로 접속할 수 있어요.
