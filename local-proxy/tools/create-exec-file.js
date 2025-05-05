const path = require('path');
const fs = require('fs');
const os = require('os');

const serverPath = path.resolve(process.cwd(), "../");
const shellScripFile = "LocalProxyServer.sh";
const shellScript = `#!/bin/bash
echo "Local Proxy 서버 시작: ${shellScripFile}"
cd ${serverPath} && node server.js
`;

try {
  fs.writeFileSync(
    path.resolve(os.homedir(), "Desktop", shellScripFile),
    shellScript,
    { mode: 0o755 }
  );
} catch (error) {
  console.error("쉘 스크립트 파일 생성 중 오류 발생:", error);
  process.exit(1);
}
