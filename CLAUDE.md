# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run typecheck    # TypeScript 타입 검사 (tsc --noEmit)
npm run storybook    # Storybook 실행 (port 6006)
```

테스트는 Storybook Vitest 애드온으로 실행하며, 별도의 `npm test` 명령은 없다.

---

## 아키텍처

**Next.js 16 App Router + React 19** 기반의 회고 저널링 앱(TIMO).

### 디렉토리 구조

```
app/                          # 라우팅 (App Router)
src/
  components/
    ui/                       # 범용 UI 컴포넌트 (Button, Modal 등)
    layout/                   # 페이지 레벨 레이아웃 (BottomNavBar, PageHeader 등)
    features/[feature]/       # 기능별 컴포넌트
  hooks/                      # 공용 커스텀 훅
  lib/
    api/                      # HTTP 클라이언트 (Axios + Zod)
    config/env.ts             # 환경 변수
    constants/                # 상수 및 엔드포인트
    helpers/                  # 유틸리티 함수
    firebase/                 # FCM 푸시 알림
```

### 라우트 및 인증

인증은 미들웨어 없이 각 페이지 서버 컴포넌트에서 `access_token` 쿠키를 확인해 처리한다.
온보딩 미완료 시 `/ztpi-test`로 리다이렉트.

- `/` → 홈 (route group `(home)`)
- `/onboarding` → 온보딩
- `/ztpi-test`, `/ztpi/[ztpiTestId]` → ZTPI 성격 테스트
- `/calendar` → 캘린더
- `/reflection`, `/reflection/[reflectionId]` → 회고
- `/characters` → 캐릭터 선택
- `/profile`, `/profile/nickname` → 프로필
- `/api/proxy/[...path]` → 개발용 API 프록시

### 상태 관리

- **서버 상태**: TanStack React Query v5 — staleTime 기본 1분, DevTools는 개발 모드에서만 활성화
- **로컬 상태**: React 훅 (`useState`, `useRef`)
- 쿼리 훅은 `src/components/features/[feature]/queries/` 에 위치

### API / 데이터 페칭

`src/lib/api/` 에 Axios 기반 클라이언트가 있다.

- `instance.ts`: 기본 URL, 타임아웃(10s), `withCredentials`, SSR 쿠키 전달 인터셉터
- `http.ts`: `get`, `post`, `patch`, `del` 래퍼 함수
- `schema.ts`: Zod 기반 요청/응답 유효성 검사 (`responseSchema` 옵션으로 사용)
- 401 응답 시 `/auth/reissue`로 토큰 재발급 후 원 요청 재시도 (동시 재발급 방지 로직 포함)

**쿼리 훅 패턴:**

```typescript
const responseSchema = z.object({ ... })
type Response = z.infer<typeof responseSchema>

const fetchData = () => get<Response>(ENDPOINT, { responseSchema })

export const useDataQuery = () =>
  useQuery({ queryKey: keys.data(), queryFn: fetchData })

export const useSuspenseDataQuery = () =>
  useSuspenseQuery({ queryKey: keys.data(), queryFn: fetchData })
```

### 스타일링

- **Tailwind CSS v4** — `@theme` 디렉티브로 디자인 토큰 정의 (`src/styles/globals.css`)
- 조건부 클래스는 `cn()` 헬퍼 사용 (`src/lib/helpers/cn.ts`)
- 폰트: Noto Sans KR, 커스텀 색상 시스템 (Gray g-0~g-900, Primary=Yellow)

### 컴포넌트 작성 규칙

- UI 컴포넌트는 `src/components/ui/[ComponentName]/[ComponentName].tsx`
- 컴포넌트 파일과 같은 위치에 `.stories.tsx` 작성
- 배럴 파일(`index.ts`) 임포트 금지 — 직접 경로로 임포트
- 무거운 컴포넌트는 `next/dynamic`으로 동적 임포트 (예: Calendar는 `ssr: false`)

---

## React & Next.js 성능 규칙

상세 규칙과 코드 예제는 `.agents/skills/vercel-react-best-practices/rules/` 참고.

### 1. 워터폴 제거 (CRITICAL)

- **await는 실제로 필요한 분기에서만** — 사용하지 않는 코드 경로를 블로킹하지 않는다 (`async-defer-await`)
- **독립적인 비동기 작업은 `Promise.all()`로 병렬화** (`async-parallel`)
- **부분적 의존성이 있을 때는 `better-all` 사용** (`async-dependencies`)
- **API 라우트에서는 Promise를 일찍 시작하고 늦게 await** (`async-api-routes`)
- **Suspense 경계를 전략적으로 사용해 콘텐츠 스트리밍** (`async-suspense-boundaries`)

### 2. 번들 크기 최적화 (CRITICAL)

- **배럴 파일(`index.ts`) 임포트 금지** — 직접 경로로 임포트 (`bundle-barrel-imports`)
- **무거운 컴포넌트는 `next/dynamic`으로 동적 임포트** (`bundle-dynamic-imports`)
- **분석/로깅 등 비핵심 서드파티는 하이드레이션 이후에 로드** (`bundle-defer-third-party`)
- **기능이 활성화될 때만 모듈 로드** (`bundle-conditional`)
- **hover/focus 시점에 preload해 체감 속도 향상** (`bundle-preload`)

### 3. 서버사이드 성능 (HIGH)

- **Server Action도 API 라우트처럼 인증 처리** (`server-auth-actions`)
- **`React.cache()`로 요청 내 중복 호출 제거** (`server-cache-react`)
- **크로스 요청 캐싱은 LRU 캐시 사용** (`server-cache-lru`)
- **RSC props에서 중복 직렬화 방지** (`server-dedup-props`)
- **클라이언트로 전달하는 데이터 최소화** (`server-serialization`)
- **컴포넌트 구조를 재설계해 데이터 페칭 병렬화** (`server-parallel-fetching`)
- **비블로킹 작업은 `after()` 사용** (`server-after-nonblocking`)

### 4. 클라이언트 데이터 페칭 (MEDIUM-HIGH)

- **SWR로 자동 요청 중복 제거** (`client-swr-dedup`)
- **전역 이벤트 리스너 중복 등록 방지** (`client-event-listeners`)
- **스크롤 이벤트는 passive 리스너 사용** (`client-passive-event-listeners`)
- **localStorage 데이터는 버전 관리하고 최소화** (`client-localstorage-schema`)

### 5. 리렌더링 최적화 (MEDIUM)

- **콜백에서만 쓰이는 상태를 구독하지 않는다** (`rerender-defer-reads`)
- **비싼 연산은 메모이제이션 컴포넌트로 분리** (`rerender-memo`)
- **기본값이 non-primitive(객체/배열)이면 외부 상수로 호이스팅** (`rerender-memo-with-default-value`)
- **Effect 의존성은 객체 대신 원시값 사용** (`rerender-dependencies`)
- **Effect 안에서 state 동기화 금지 — 렌더 중 파생** (`rerender-derived-state-no-effect`)
- **안정적인 콜백에는 함수형 setState 사용** (`rerender-functional-setstate`)
- **비싼 초기값은 `useState(() => ...)` 형태로** (`rerender-lazy-state-init`)
- **단순 원시값 계산에 `useMemo` 불필요** (`rerender-simple-expression-in-memo`)
- **상호작용 로직은 Effect 대신 이벤트 핸들러에** (`rerender-move-effect-to-event`)
- **긴급하지 않은 업데이트는 `startTransition`** (`rerender-transitions`)
- **빈번하게 바뀌는 값은 `useRef`로 관리** (`rerender-use-ref-transient-values`)

### 6. 렌더링 성능 (MEDIUM)

- **SVG 애니메이션은 SVG 요소 대신 div 래퍼에** (`rendering-animate-svg-wrapper`)
- **긴 목록에는 `content-visibility: auto` CSS 적용** (`rendering-content-visibility`)
- **정적 JSX는 컴포넌트 외부로 호이스팅** (`rendering-hoist-jsx`)
- **클라이언트 전용 데이터는 인라인 스크립트로 하이드레이션 깜빡임 방지** (`rendering-hydration-no-flicker`)
- **조건부 렌더링은 `&&` 대신 삼항 연산자** (`rendering-conditional-render`)
- **로딩 상태는 수동 관리보다 `useTransition` 선호** (`rendering-usetransition-loading`)

### 7. JavaScript 성능 (LOW-MEDIUM)

- **CSS 변경은 클래스 또는 `cssText`로 묶어 처리** (`js-batch-dom-css`)
- **반복 조회가 많으면 Map으로 인덱스 빌드** (`js-index-maps`)
- **filter + map 같은 다중 배열 순회는 하나의 루프로** (`js-combine-iterations`)
- **함수에서 조기 return** (`js-early-exit`)
- **RegExp는 루프 밖으로 호이스팅** (`js-hoist-regexp`)
- **O(1) 조회가 필요하면 Set/Map 사용** (`js-set-map-lookups`)
- **불변성이 필요하면 `sort()` 대신 `toSorted()`** (`js-tosorted-immutable`)

### 8. 고급 패턴 (LOW)

- **앱 초기화는 마운트마다가 아닌 앱 로드 시 1회** (`advanced-init-once`)
- **이벤트 핸들러를 ref에 저장해 안정적인 참조 유지** (`advanced-event-handler-refs`)
- **안정적인 콜백 ref에는 `useEffectEvent` 사용** (`advanced-use-latest`)
