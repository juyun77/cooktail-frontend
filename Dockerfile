# Stage 1: Build Stage
FROM node:14 AS builder

# 작업 폴더 생성 및 설정
WORKDIR /app

# 패키지.json과 package-lock.json을 작업 폴더로 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 프로젝트 소스 코드 복사
COPY . .

# React 애플리케이션 빌드
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine

# 빌드된 React 애플리케이션 파일을 Nginx의 정적 파일 서빙 경로로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# 80포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
