const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

// 등록된 앱 서버 정보를 저장할 객체 { hostname: port } 형태
const appRegistry = {};

proxy.on("error", (err, req, res) => {
  console.error("Proxy Error:", err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("프록시 서버에 문제가 발생했습니다.");
});

function onAppRegister(req, res) {
  const { hostname, port } = req.body;

  if (!hostname || !port) {
    return res.status(400).json({ error: "hostname과 port가 필요합니다." });
  }

  // 이미 등록된 호스트인지 확인 (선택 사항)
  if (appRegistry[hostname]) {
    console.log(
      `"${hostname}" 서버가 이미 등록되어있습니다. 포트 번호를 덮어씁니다. ${port}`
    );
  }

  appRegistry[hostname] = port;
  console.log(`"${hostname}" 서버가 ${port}번 포트를 사용 중입니다.`);

  res.status(200).json({ message: `${hostname}:${port} 등록 완료!` });
}

function onAppsRegistered(req, res) {
  res.status(200).json(appRegistry);
}

function refineHostname(req) {
  // 요청의 Host 헤더에서 대상 호스트 이름을 가져옵니다.
  const requestedHost = req.headers.host;
  // 호스트에 포트 번호가 포함되어 있을 수 있으므로 제거합니다.
  if (requestedHost && requestedHost.includes(":")) {
    return requestedHost.split(":")[0];
  }
  return requestedHost;
}

function onProxy(req, res) {
  const hostname = refineHostname(req);
  const targetPort = appRegistry[hostname];

  if (targetPort) {
    const targetUrl = `http://localhost:${targetPort}`;
    proxy.web(req, res, { target: targetUrl });
  } else {
    // 등록되지 않은 호스트 이름이면 404 또는 502 응답을 보냅니다.
    const errorMessage = `등록되지 않은 호스트 "${hostname}"입니다.`;
    console.warn(errorMessage);
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end(errorMessage);
  }
}

function onProxyWs(req, socket, head) {
  const hostname = refineHostname(req);
  const targetPort = appRegistry[hostname];
  proxy.ws(req, socket, head, {
    target: `ws://localhost:${targetPort}`,
  });
}

exports.onAppRegister = onAppRegister;
exports.onAppsRegistered = onAppsRegistered;
exports.onProxy = onProxy;
exports.onProxyWs = onProxyWs;
