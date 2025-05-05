import { Target } from "./type";

const LOCAL_TEST_TARGET1: Target = {
  protocol: "http",
  host: "localhost",
  port: 3000,
  desc: "로컬 테스트 서버 1"
};
const LOCAL_TEST_TARGET2: Target = {
  protocol: "http",
  host: "www.kurly.com",
  port: 3001,
  desc: "로컬 테스트 서버 2"
};
const LOCAL_TEST_TARGET3: Target = {
  protocol: "http",
  host: "localhost",
  port: 3002,
  desc: "로컬 테스트 서버 3"
};

const hostToTarget = {
  "local.test1.com": LOCAL_TEST_TARGET1,
  "local.test2.com": LOCAL_TEST_TARGET2,
  "local.test3.com": LOCAL_TEST_TARGET3,
};

export default hostToTarget;
