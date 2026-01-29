## 1) 목적
이 문서는 팀에서 **코드 생성 / 수정 / 리뷰 기준을 통일**하기 위한 규칙입니다.

## 2) 적용 범위 & 우선순위
- 적용 범위: 레포지토리 전체
- 특정 도메인/폴더에 추가 규칙이 필요한 경우:
  - 해당 폴더 내부의 `AGENTS.md`를 **추가로** 확인합니다.
- 우선순위:
  1. 폴더별 `AGENTS.md` (존재 시)
  2. 루트 `AGENTS.md` (이 문서)
  3. 기타 문서/가이드

---

## 3) 프로젝트 컨텍스트
- Framework: Next.js
- Language: TypeScript only
- Package manager: pnpm
- Styling: Tailwind CSS
- Server state: TanStack Query
- Global state: Zustand

---

## 4) 필수 명령어
### 개발
- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

### 품질
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`

### 테스트
- Test: `pnpm test`  
  - 현재는 테스트가 없으며, 테스트 도구 도입 전까지는 참고용입니다.

---

## 5) 포맷팅 / 린트
- 포맷과 린트의 **단일 기준(source of truth)** 은 설정 파일입니다.
  - Prettier: `.prettierrc`, `.prettierignore`
  - ESLint: `eslint.config.mjs`
- 실행은 아래 명령만 사용합니다.
  - `pnpm lint`
  - `pnpm typecheck`

---

## 6) 파일 확장자 정책
### 코드(소스) 파일
- `src/**` 내부의 코드는 TypeScript만 허용합니다.
  - 허용: `.ts`, `.tsx`
  - 금지: `.js`, `.jsx`, `.mts`

### 설정 파일 예외
- 도구/빌드 설정 파일은 예외로 허용합니다.
  - 예: `eslint.config.mjs`, `commitlint.config.mjs`, `next.config.*` 등

---

## 7) Git 규칙

### 브랜치 네이밍
- `feature/{기능-or-작업-이름}-#{이슈번호}`
- 예: `feature/kakao-map-lib-#1066`

### 커밋 메시지 규칙
#### 기본 형식
- `<type>: 변경 내용 요약`
- (필요한 경우) 한 줄을 비운 뒤 body 작성
- body의 각 줄은 `-` 로 시작

#### description 규칙
- 한 줄 요약
- 50자 내외
- 마침표 사용 금지
- 한글 작성 가능

#### body 규칙
- 필요한 경우에만 작성
- 무엇을, 왜 변경했는지 중심으로 작성
- 각 줄은 `-` 로 시작

#### type 목록
- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `docs`: 문서만 수정
- `style`: 코드 의미 없는 스타일 변경 (포맷 등)
- `refactor`: 기능 변화 없는 리팩터링
- `test`: 테스트 코드 관련 변경
- `chore`: 빌드, 설정, 기타 작업

#### commitlint 정책
- scope 사용 금지
- subject 최대 50자
- subject 끝에 마침표 금지
- body 작성 시, 각 줄은 반드시 `-`로 시작

### PR 규칙
- PR 제목은 변경 내용을 설명할 수 있는 **적절한 이름**으로 작성합니다.
- 머지 전략(스쿼시/리베이스 등)은 팀 합의를 따릅니다.

---

## 8) 아키텍처/폴더 구조
- Next.js 폴더 구조는 팀에서 합의한 가이드를 따릅니다.
- 폴더/도메인별로 추가 규칙이 필요하면 해당 폴더에 `AGENTS.md`를 추가합니다.
- 폴더 내부 규칙이 루트 규칙보다 우선합니다.

## 📁 폴더 구조 기준

- 프로젝트 폴더 구조는  
 [**Best Practices for Organizing Your Next.js 15 (2025)**](https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji) 글을 기준으로 합니다.
- 폴더 구조 변경 또는 신규 폴더 추가 시,
  해당 기준을 우선 검토하고 관련 문서를 함께 업데이트합니다.

---

## 📂 src 디렉토리 설계 원칙

- 실제 애플리케이션 코드는 모두 `src/` 하위에 위치합니다.
- 폴더는 **역할(role) 기준으로만 분리**합니다.
- 비즈니스 도메인 기준 분리(`domains/`, `modules/` 등)는 사용하지 않습니다.
- 각 폴더는 하나의 명확한 책임만 가집니다.

---

## 🧭 app/ 디렉토리 규칙 (App Router)

- `app/` 디렉토리는 **라우트와 레이아웃 정의만 담당**합니다.
- 허용되는 역할:
  - URL 구조 정의
  - `page.tsx`, `layout.tsx` 구성
  - Route Group `(group)`을 통한 구조 정리
- 지양 사항:
  - 공용 컴포넌트 정의
  - 재사용 로직 작성
  - 복잡한 비즈니스 로직 작성

---

## 🧩 components/ 디렉토리 규칙

### components/ui
- 어디서든 재사용 가능한 **순수 UI 컴포넌트**
- 특정 페이지나 기능에 종속되지 않아야 합니다.
- import 가능:
  - `app/**`
  - `components/**`
  - `hooks/**`

### components/layout
- 페이지 구조(Header, Footer, Sidebar 등)를 구성하는 컴포넌트
- 여러 페이지에서 공통으로 사용되는 레이아웃 요소를 포함합니다.
- import 가능:
  - `components/ui`
  - `components/features`

### components/features
- 특정 기능(UI 기준)과 관련된 컴포넌트 묶음
- 예: `auth`, `blog` 등
- feature 내부 컴포넌트는 다른 feature에서 직접 참조하지 않는 것을 권장합니다.
- 공통으로 쓰이기 시작한 컴포넌트는 `components/ui`로 이동합니다.

---

## 🔗 import 기본 규칙
- import는 항상 하위 역할 → 상위 역할 방향으로만 한다.

### 허용 방향
- `app/` → 모든 컴포넌트 및 유틸
- `components/features` → `components/ui`, `hooks`, `lib`, `types`
- `components/layout` → `components/ui`, `components/features`
- `hooks` → `lib`, `types`

### 지양 방향
- `components/ui` → `components/features`
- `lib` → React 컴포넌트(`components/**`, `hooks/**`)
- feature 간 직접 import

---

## 🛠 lib / hooks / types 규칙

### lib/
- 유틸리티, API 함수, 상수만 포함합니다.
- React 컴포넌트(`components/**`, `hooks/**`)에 의존하지 않습니다.

### hooks/
- React 커스텀 훅만 위치합니다.
- `use*` 네이밍 규칙을 유지합니다.

### types/
- 전역적으로 공유되는 TypeScript 타입 정의를 위치시킵니다.
- 어디서든 import 가능합니다.

---

## 🧠 구조 운영 원칙

- 폴더 구조가 과도하게 깊어지지 않도록 유지합니다.
- 컴포넌트 수가 증가하면 하위 폴더로 분리합니다.
- 구조 변경이 필요한 경우, 관련 문서를 함께 수정합니다.

---

## 🤖 구조 준수 규칙

- 새로운 폴더 또는 역할을 도입할 경우,
  기존 구조로 해결 가능한지 먼저 검토합니다.
- 구조 변경이 발생하면 AGENTS.md 또는 폴더 구조 문서를 함께 업데이트합니다.

---

## 9) TypeScript / React 최소 규칙
- `any` 사용 금지 (ESLint 기준)
- 사용하지 않는 변수:
  - 의도된 경우 `_` prefix로 명시
- 콘솔 로그:
  - 개발 중 사용은 가능하나, 머지 전 제거를 권장
- 타입 import:
  - `import type { ... }` 형태를 선호

---

## 10) AI 사용 규칙
- 어떤 AI 도구를 사용하든 결과물은 이 문서 규칙을 따라야 합니다.
- AI가 생성/수정한 코드도 `pnpm lint`, `pnpm typecheck`를 통과해야 합니다.
- 특정 도메인에 규칙이 있는 경우, 해당 폴더의 `AGENTS.md`를 우선 적용합니다.

---

## 11) Agent Skills 사용 규칙

- 이 레포는 Agent Skills를 사용한다.
- 코드 생성/수정 시 아래 skill을 참고한다.
  - `vercel-react-best-practices`
- Skill 파일 위치:
  - `.agents/skills/vercel-react-best-practices/`
  - (Codex/Gemini/GitHub 환경에서는 동일 내용이 각 도구별 skills 디렉토리에 심볼릭 링크로 연결됨)
- Skill의 권장 사항과 이 문서(AGENTS.md)가 충돌할 경우,
  **AGENTS.md 규칙을 우선한다.**
- Skill 기준으로 더 나은 구조나 패턴이 있다고 판단되면,
  **자동 적용하지 말고 제안 형태로만 설명한다.**
- 제안에는 반드시
  - 왜 더 나은지
  - 지금 구조에서의 장단점
  을 함께 포함한다.