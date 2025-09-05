# OpenKnights Web - 경진대회 관리 플랫폼

## 📖 소개

OpenKnights Web은 교내에서 진행되는 다양한 경진대회(오픈소스, SW창의융합, 창업 아이디어)를 효율적으로 홍보하고, 참가 신청, 이력 관리, 심사 등을 통합 관리하기 위한 웹 애플리케이션입니다. 학생들이 과거의 프로젝트를 쉽게 참고하고 새로운 아이디어에 도전하도록 영감을 주어 경진대회 참여를 활성화하는 것을 목표로 합니다.

## ✨ 주요 기능

- **통합 경진대회 관리**: 여러 종류의 경진대회(오픈소스, SW창의융합, 창업)를 하나의 플랫폼에서 관리합니다.
- **프로젝트 관리**: 경진대회별 프로젝트 및 팀 정보를 등록하고 상세 내용을 조회합니다. (팀원, 문서, 스크린샷, GitHub 등)
- **사용자 인증 및 관리**: Firebase를 통한 사용자 회원가입, 로그인 및 역할 기반 접근 제어를 제공합니다.
- **대시보드**: 관리자를 위한 대시보드에서 공지사항, 전체 일정, 예선/본선 진행 상황 등을 한눈에 파악할 수 있습니다.
- **데이터 관리**: CSV 파일을 이용해 심사 점수를 가져오고, 순위를 정하는 등 데이터를 편리하게 관리합니다.

## 🛠️ 기술 스택

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend & DB**: Firebase (Firestore, Authentication, Hosting)
- **State Management**: React Context API, React Hooks
- **Forms**: React Hook Form, Zod
- **Charts**: Recharts
- **Package Manager**: pnpm

## 📁 디렉토리 구조

```
openknights_web/
├── .firebase/       # Firebase 에뮬레이터 캐시
├── .github/         # GitHub Actions 워크플로우 (Firebase 호스팅)
├── docs/            # 프로젝트 관련 문서
├── public/          # 정적 에셋 (이미지, 폰트 등)
├── src/
│   ├── app/         # Next.js App Router 기반 페이지 및 라우팅
│   ├── components/  # 재사용 가능한 React 컴포넌트 (UI 포함)
│   ├── contexts/    # 전역 상태 관리를 위한 React Context
│   ├── hooks/       # 커스텀 React 훅
│   ├── lib/         # Firebase 설정, 유틸리티 함수 등
│   └── types/       # 프로젝트 전반에서 사용되는 타입 정의
├── firebase.json    # Firebase 호스팅 및 규칙 설정
├── next.config.ts   # Next.js 설정 파일
├── package.json     # 프로젝트 의존성 및 스크립트
└── tailwind.config.ts # Tailwind CSS 설정 파일
```

## 🚀 시작하기

### 사전 준비

- [Node.js](https://nodejs.org/) (v20.x 이상)
- [pnpm](https://pnpm.io/installation)

### 설치 및 실행

1.  **저장소 복제**
    ```bash
    git clone https://github.com/your-repository/openknights_web.git
    cd openknights_web
    ```

2.  **의존성 설치**
    ```bash
    pnpm install
    ```

3.  **Firebase 설정**
    - Firebase 프로젝트를 생성하고 웹 앱을 추가합니다.
    - 프로젝트 루트에 `.env.local` 파일을 생성하고 Firebase 설정 값을 추가합니다.
      ```.env.local
      NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
      NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
      ```
    - `src/lib/firebase.ts` 파일에서 설정이 올바르게 연결되었는지 확인하세요.

4.  **개발 서버 실행**
    ```bash
    pnpm dev
    ```
    브라우저에서 `http://localhost:9002` 주소로 접속하여 확인할 수 있습니다.

## 📦 사용 가능한 스크립트

- `pnpm dev`: 개발 모드로 애플리케이션을 실행합니다.
- `pnpm build`: 프로덕션용으로 애플리케이션을 빌드합니다.
- `pnpm start`: 빌드된 프로덕션 서버를 시작합니다.
- `pnpm lint`: ESLint로 코드 스타일을 검사합니다.
- `pnpm typecheck`: TypeScript 타입을 검사합니다.

## 🌐 배포

이 프로젝트는 Firebase Hosting을 통해 배포되도록 설정되어 있습니다. `.github/workflows` 디렉토리의 워크플로우를 통해 `main` 브랜치에 push가 발생하면 자동으로 배포가 진행됩니다.
