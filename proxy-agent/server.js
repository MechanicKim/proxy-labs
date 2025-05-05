const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const httpApp = express();
const httpsApp = express();
const { onAppRegister, onAppsRegistered, onProxy, onProxyWs } = require("./proxy");

httpApp.use(bodyParser.json()); // JSON 본문 파싱 미들웨어
httpApp.post("/api/app", onAppRegister); // 앱 서버의 로컬 호스트 이름, 포트 등록 API 엔드포인트
httpApp.get("/api/apps", onAppsRegistered); // 등록된 모든 앱의 로컬 호스트 이름, 포트 목록을 보는 엔드포인트
httpApp.use(onProxy); // 프록시 로직: 들어오는 모든 요청을 처리

httpsApp.use(bodyParser.json()); // JSON 본문 파싱 미들웨어
httpsApp.use(onProxy); // 프록시 로직: 들어오는 모든 요청을 처리

const HTTPS_PORT = 443;
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("./certs/key.pem"),
    cert: fs.readFileSync("./certs/cert.pem"),
  },
  httpsApp
);
httpsServer.on("upgrade", onProxyWs);
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS 프록시 서버(${HTTPS_PORT}) 실행 중입니다.`);
});

const HTTP_PORT = 80;
const httpServer = http.createServer(httpApp);
httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP 프록시 서버(${HTTP_PORT}) 실행 중입니다.`);
});
