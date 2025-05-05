# NX reverse proxy server(HTTPS)

프록시 호스트와 대상을 자동으로 관리하는 에이전트

### Ready
- mkcert 설치
- hosts에 로컬에서 사용할 도메인 추가
- certgen.sh 파일에 사용할 도메인 추가
- 프록시 대상 서버는 구동 시 에이전트에서 제공하는 api를 호출하여 호스트와 포트를 등록하도록 준비
  - test-server 프로젝트의 server.js 참고

### Start
```
npm run cert && npm run dev
```