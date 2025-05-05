#!/bin/bash
rm -rf certs
mkdir -p certs && cd $_
mkcert -key-file key.pem -cert-file cert.pem \
local.test1.com \
local.test2.com \
local.test3.com \
localhost \
127.0.0.1 \
::1