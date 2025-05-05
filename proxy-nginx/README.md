# Nginx reverse proxy server(HTTP/HTTPS)

Nginx 도커 이미지를 통한 프록시

### Ready
- Docker Desktop 설치
- mkcert 설치
- hosts에 로컬에서 사용할 도메인 추가
- certgen.sh 파일에 사용할 도메인 추가
- conf.d/default.conf 파일을 열고 모든 proxy_pass의 포트를 확인
  - 기본 값 3000
  - 다른 포트를 사용할 경우 수정

### Start
다음 명령을 실행하고 도커 데스크탑을 실행하여 확인
```
./certgen.sh && docker compose up
```