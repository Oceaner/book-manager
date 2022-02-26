//首先引入mock
const Mock = require("mockjs");

//设置拦截ajax的请求的响应时间
Mock.setup({
  timeout: "200-600",
});

let configArray = [];

//使用webpack的require.context()来遍历所有mock文件
const files = require.context(".", true, /\.js$/);
files.keys().forEach((key) => {
  if (key === "./index.js") return;
  configArray = configArray.concat(files(key).default);
});

configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split("|");
    Mock.mock(new RegExp("^" + protocol[1]), protocol[0], target);
  }
});
