const urls = {
  "dev": "https://test.phmzykj.com/bp",//开发
  "test": "http://192.168.0.113:8089/zhuoya-cg",//测试
  "pro": "https://www.phmzykj.com/cg"//正式
}
const Config = {
  mode: "pro",
  baseUrl: urls["pro"],
  staticUrl: "https://www.phmzykj.com/cg",
  // staticUrl: "https://192.168.0.109:8087/cg",
  key: "BYHBZ-FV5C4-K6RUC-XCZFN-YYE2E-PDFPN",
  version: "1.0.0"
}
export { Config }