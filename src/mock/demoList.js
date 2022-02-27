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

let bookinfolist = Mock.mock({
  "booklists|30": [
    {
      "id|+1": 1, //id从1开始连续编号
      bookISBN: /[0-9]{13}/, //13位数的ISBN号
      bookName: "@ctitle(4, 12)", //书名为4~12个汉字
      author: "@cname", //中文作者姓名
      "press|1": [
        "清华大学出版社",
        "北京大学出版社",
        "北京理工大学出版社",
        "人民邮电出版社",
        "电子工业出版社",
        "牛津大学出版社",
      ],
      publicationdate: '@date("yyyy/MM/dd)',
      price: "@float(10,99,0,1)",
      "quantity|50-1000": 1,
      "bookType|1": ["1", "2", "3", "4"],
    },
  ],
});
export default {
  "post|/user/login": demoList,
  // 也可以这样写
  // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  "get|/user/info/": () => {
    // 可以在这个地方对demoList2进行一系列操作，例如增删改
    // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
    return {
      status: 200,
      message: "success",
      flag: true,
      data: demoList2,
    };
  },
  "post|/user/logout": () => {
    return {
      status: 200,
      message: "退出失败",
      flag: true,
    };
  },
  "get|/bookinfo/list": () => {
    // 可以在这个地方对demoList2进行一系列操作，例如增删改
    // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性
    return {
      status: 200,
      message: "查询成功",
      flag: true,
      data: bookinfolist,
    };
  },
};
