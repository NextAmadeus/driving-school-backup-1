# 운전면허 학원 회원 관리 시스템

## 설치 및 실행 방법

### 1. 데이터베이스 설정
1. [phpMyAdmin](http://induck1111.dothome.co.kr/myadmin/index.php?route=/database/structure&db=induck1111)에 접속
2. 제공된 SQL 코드로 `members` 테이블 생성

### 2. 백엔드 서버 설치 및 실행

#### 로컬 개발 환경
```bash
# 의존성 설치
npm install

# 개발 모드 실행 (자동 재시작)
npm run dev
```

#### 프로덕션 환경 (dothome.co.kr 배포)
```bash
# 의존성 설치
npm install

# 프로덕션 모드 실행
npm run prod
```

### 3. 접속
- **로컬 개발**: `http://localhost:3000`
- **프로덕션**: `http://induck1111.dothome.co.kr`
- 회원 등록 모달에서 "+" 버튼 클릭하여 테스트

## API 엔드포인트

### 회원 등록
- **POST** `/api/members`
- 회원 정보를 데이터베이스에 저장

### 회원 목록 조회
- **GET** `/api/members`
- 모든 회원 목록 조회

### 회원 상세 조회
- **GET** `/api/members/:id`
- 특정 회원 정보 조회

### 회원 정보 수정
- **PUT** `/api/members/:id`
- 회원 정보 수정

### 회원 삭제
- **DELETE** `/api/members/:id`
- 회원 삭제

## 데이터베이스 정보
- **호스트**: localhost
- **데이터베이스**: induck1111
- **사용자명**: induck1111
- **비밀번호**: APPLEwogh3853!

## 주요 기능
- 회원 등록 (모든 폼 데이터 저장)
- 상품/할인 관리
- 약관 관리
- 교육 메모 관리
- 실시간 가격 계산
