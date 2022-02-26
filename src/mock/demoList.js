//首先引入mock
const Mock = require("mockjs");
let demoList = {
  status: 200,
  flag: true,
  message: "success",
  data: {
    token: "admin",
  },
};
let demoList2 = Mock.mock({
  "id|1-10000": 1,
  name: `@cname`,
  roles: "manager",
  job: "前端工程师",
});
export default {
  "post|/user/login": demoList,
  // 也可以这样写
  // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  "get|/user/info/": (option) => {
    // 可以在这个地方对demoList2进行一系列操作，例如增删改
    // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
    return {
      status: 200,
      message: "success",
      flag: true,
      data: demoList2,
    };
  },
};
