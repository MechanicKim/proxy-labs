# Local Proxy

프록시 호스트와 포트를 미리 지정하고 사용하는 서버

### Ready
- mkcert 설치
- hosts에 로컬에서 사용할 호스트 추가
- tools/certgen.sh 파일에 사용할 호스트 추가
- src/components/Hosts/hostToTarget.ts 파일 확인
  - 사용할 호스트를 기준으로 파일을 수정
  - src/components/Hosts/types.ts 파일에서 타입 확인, 필요한 경우 수정

### Start
```
npm run cert && npm run dev
```