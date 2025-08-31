# Next.js App Router 및 프로젝트 구조 분석

## 1. Next.js App Router란?

Next.js 13부터 도입된 App Router는 이전의 `pages` 디렉토리 기반 라우팅을 개선한 새로운 라우팅 시스템입니다. 주요 특징은 다음과 같습니다.

- **디렉토리 기반 라우팅**: `app` 디렉토리 안의 폴더 구조가 그대로 URL 경로가 됩니다. 예를 들어 `app/dashboard/settings/page.tsx`는 `/dashboard/settings` 경로에 해당합니다.

- **특수 파일 컨벤션**:
  - `page.tsx`: 경로의 고유한 UI를 정의하며, 해당 경로를 공개적으로 접근 가능하게 만듭니다.
  - `layout.tsx`: 여러 페이지에서 공유하는 공통 UI(헤더, 푸터 등)를 정의합니다. 하위 페이지들은 `children` prop으로 `layout` 내에 렌더링됩니다.
  - `loading.tsx`: React Suspense를 기반으로, 해당 경로의 콘텐츠가 로딩되는 동안 보여줄 로딩 UI를 정의합니다.
  - `error.tsx`: 경로에서 발생하는 에러를 처리하고 보여줄 UI를 정의합니다.
  - `route.ts`: API 엔드포인트를 생성할 때 사용합니다.

- **서버 컴포넌트 기본**: `app` 디렉토리 내의 모든 컴포넌트는 기본적으로 **서버 컴포넌트**입니다. 서버에서만 렌더링되므로, 데이터베이스 조회나 파일 시스템 접근 같은 백엔드 작업을 API 라우트 없이 직접 수행할 수 있어 코드가 간결해집니다.

- **클라이언트 컴포넌트**: `useState`, `useEffect` 같은 React 훅을 사용하거나 브라우저 이벤트를 처리해야 할 경우, 파일 상단에 `'use client';` 지시어를 추가하여 **클라이언트 컴포넌트**로 전환할 수 있습니다.

- **라우트 그룹**: `(auth)`처럼 괄호로 폴더 이름을 묶으면, 관련된 라우트들을 그룹화하면서도 실제 URL 경로에는 영향을 주지 않을 수 있습니다. 레이아웃을 공유하는 페이지들을 묶을 때 유용합니다.

---

## 2. 현재 프로젝트 구조 및 기능 분석

이 프로젝트는 App Router의 기능을 적극적으로 활용하여 구조화되어 있습니다.

### 전체적인 레이아웃 (`src/app/layout.tsx`)

프로젝트의 가장 최상위 레이아웃으로, 모든 페이지에 공통적으로 적용되는 사항을 정의합니다.

- **전역 폰트 및 스타일**: `globals.css`와 구글 폰트를 모든 페이지에 적용합니다.
- **`AuthProvider`**: `src/contexts/AuthContext.tsx`에서 가져온 Provider로, 앱 전체에 사용자 로그인 상태와 같은 인증 정보를 공유합니다.
- **`AppLayout`**: `src/components/AppLayout.tsx` 컴포넌트로 모든 페이지의 자식 요소(`children`)를 감싸고 있습니다. 이는 모든 페이지에 헤더, 사이드바, 푸터 등 일관된 UI 셸을 제공하는 역할을 합니다.
- **`Toaster`**: 앱 전체에서 사용될 알림(Toast) 메시지 컴포넌트를 설정합니다.

### 기능별 라우트 구조 (`src/app`)

`app` 디렉토리의 하위 폴더들은 웹 애플리케이션의 주요 기능들을 나타냅니다.

- **`/` (메인 페이지)**: `app/page.tsx` 파일이 담당하며, 애플리케이션의 랜딩 페이지 역할을 합니다.

- **인증 `(auth)`**: 라우트 그룹으로 묶여있습니다.
  - `layout.tsx`: 로그인, 회원가입 페이지가 공유하는 UI 레이아웃입니다.
  - `login/page.tsx`: **`/login`** 경로의 로그인 페이지입니다.
  - `registration/page.tsx`: **`/registration`** 경로의 회원가입 페이지입니다.

- **`/contests`**: `contests/page.tsx`에서 처리하며, 공모전 목록 또는 관련 기능을 담고 있습니다.

- **`/dashboard`**: `dashboard/page.tsx`에서 처리하며, 로그인 후 사용자가 보게 될 메인 대시보드입니다.

- **`/evaluation`**: `evaluation/page.tsx`에서 처리하며, 프로젝트나 팀원에 대한 평가 관련 기능을 담당합니다.

- **`/mypage`**: `mypage/page.tsx`에서 처리하며, 사용자의 개인 프로필 정보 등을 보여주는 페이지입니다.

- **`/projects`**: 프로젝트 관련 기능을 담당합니다.
  - `page.tsx`: **`/projects`** 경로의 프로젝트 목록 페이지입니다.
  - `details/page.tsx`: **`/projects/details`** 경로의 특정 프로젝트 상세 정보 페이지입니다.

- **`/users`**: `users/page.tsx`에서 처리하며, 사용자 목록을 보여주는 페이지입니다.

### 공용 모듈

- **`src/components`**: 버튼, 카드, 다이얼로그 등 앱 전반에서 재사용되는 UI 컴포넌트들이 위치합니다.
- **`src/contexts`**: `AuthContext`와 같이 여러 컴포넌트에서 공유되는 전역 상태를 관리합니다.
- **`src/lib`**: `firebase.ts` 등 Firebase 연동 설정과 같이 프로젝트 전반에서 사용되는 유틸리티 및 라이브러리 설정 코드가 위치합니다.
