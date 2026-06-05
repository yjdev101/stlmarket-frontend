# STLmarket Frontend

3D 프린팅용 STL 파일 마켓플레이스의 프론트엔드입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19 |
| Language | TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v4 |
| HTTP | Axios |
| Routing | React Router DOM |

## 주요 기능

- 회원가입 / 로그인 (JWT 기반)
- 상품 목록 (카테고리 필터, 키워드 검색)
- 상품 상세 페이지 및 파일 다운로드
- STL 파일 등록 (판매자 전용)
- 로그인/비로그인 상태에 따른 접근 제어

## 실행 방법

**사전 조건:** Node.js 18+, [stlmarket-backend](https://github.com/yjdev101/stlmarket-backend) 실행 중

```bash
npm install
npm run dev
```

백엔드가 `localhost:8080`에서 실행 중이어야 합니다.  
프론트엔드는 `http://localhost:5173`에서 접속 가능합니다.

## 페이지 구성

| 경로 | 설명 | 접근 |
|------|------|------|
| `/` | 상품 목록 (홈) | 전체 |
| `/login` | 로그인 | 비로그인 |
| `/signup` | 회원가입 | 비로그인 |
| `/products/:id` | 상품 상세 | 전체 |
| `/upload` | 파일 등록 | 판매자 |

## 관련 레포지토리

- Backend: [stlmarket-backend](https://github.com/yjdev101/stlmarket-backend)
