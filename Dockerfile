# Stage 1: Build Stage
FROM node:14 as builder

# 작업 폴더 생성 및 설정
WORKDIR /usr/src/app

# 패키지.json과 package-lock.json 복사
# 이 단계는 가능한 캐시 사용을 최대화하기 위해 먼저 실행됩니다.
COPY package*.json ./

# 패키지 설치
RUN npm install

# 프로젝트 소스 코드 복사
COPY . .



# 애플리케이션 빌드
RUN npm run build

# Stage 2: Production Stage
FROM nginx:latest

# Nginx의 기본 설정 삭제
RUN rm -rf /etc/nginx/conf.d

# Nginx 설정 파일 복사
COPY conf /etc/nginx

# 빌드된 앱 파일을 Nginx의 정적 파일 서빙 경로로 복사
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# 80포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
