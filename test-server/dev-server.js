const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const serverName = process.env.NAME;
process.title = serverName;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  console.log(`> ${serverName} 서버가 ${port}번 포트에서 실행 중입니다.`);
});

fetch("http://localhost/api/app", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    hostname: serverName,
    port,
  }),
})
.then((response) => response.json())
.then(console.log)
.catch((error) => {
  console.error("프록시 에이전트 서버가 실행 중인지 확인해 주세요.", error);
});