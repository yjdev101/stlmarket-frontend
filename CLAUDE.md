# STLmarket Frontend

STL 파일(3D 프린팅) 마켓플레이스의 React 프론트엔드.

## 기술 스택

- Node.js 24 / npm 11
- React 19 + TypeScript
- Vite (번들러, 개발 서버)
- Tailwind CSS v4 (@tailwindcss/vite)
- axios (API 통신)
- react-router-dom (라우팅)

## 실행 방법

```powershell
cd C:\Users\Administrator\IdeaProjects\stlmarket-frontend
npm run dev   # http://localhost:5173
```

백엔드(8080)가 먼저 실행되어 있어야 함. `/api` 요청은 vite.config.ts의 proxy 설정으로 8080으로 자동 전달됨.

## 프로젝트 구조

```
src/
├── main.tsx                # 진입점
├── App.tsx                 # 라우터 설정
├── api/
│   └── axios.ts            # axios 인스턴스 (JWT 자동 첨부)
├── context/
│   └── AuthContext.tsx     # 로그인 상태 전역 관리
├── pages/
│   ├── HomePage.tsx        # 상품 목록
│   ├── ProductDetailPage.tsx  # 상품 상세
│   ├── LoginPage.tsx       # 로그인
│   ├── SignupPage.tsx       # 회원가입
│   └── UploadPage.tsx      # 상품 업로드 (판매자용)
└── components/
    ├── Navbar.tsx           # 상단 네비게이션
    └── ProductCard.tsx      # 상품 카드 컴포넌트
```

## 주요 규칙

- JWT는 localStorage에 저장 (`token` 키)
- API 호출은 `src/api/axios.ts` 인스턴스만 사용
- 페이지 컴포넌트는 `src/pages/`, 재사용 컴포넌트는 `src/components/`
- npm strict-ssl=false 설정됨 (피씨방 네트워크 환경)