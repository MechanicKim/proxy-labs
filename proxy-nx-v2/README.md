# NX reverse proxy server(HTTPS)

미들웨어를 통한 프록시

### Ready
- mkcert 설치
- hosts에 로컬에서 사용할 도메인 추가
- certgen.sh 파일에 사용할 도메인 추가
- src/middleware.ts 파일을 열고 확인
  - 특정 경로를 프록시에서 제외할 수 있습니다.
  - 호스트에 따라 프록시 대상을 다르게 지정할 수 있습니다.

### Start
```
npm run cert && npm run dev
```