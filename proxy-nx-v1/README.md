# Next.js reverse proxy server(HTTPS)

next.config.js의 rewrite 설정을 통한 프록시

### Ready
- mkcert 설치
- hosts에 로컬에서 사용할 호스트 추가
- certgen.sh 파일에 사용할 호스트 추가
- next.config.js 파일을 열고 destination의 포트를 확인
  - 기본 값 3000
  - 다른 포트를 사용할 경우 수정

### Start
```
npm run cert && npm run dev
```