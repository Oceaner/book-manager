//导入VueRouter对象
import router from "./router";
import { getUserInfo } from "./api/login";

//利用VueRouter对象router的beforeEach方法进行校验
//前面登录逻辑是：提交用户名、秘密到后端校验，校验成功获取token，通过token到后端获取用户信息
router.beforeEach((to, from, next) => {
  //获取token
  const token = localStorage.getItem("yuanhr-manager-token");
  //如果没有获取到token
  if (!token) {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    //获取到token
    //请求登录路由/login，那就让其进入目标路由/login
    if (to.path === "/login") {
      next();
    } else {
      //请求的是非登录页面，查看本地是否存有用户信息
      const userinfo = localStorage.getItem("yuanhr-manager-user");
      if (userinfo) {
        next();
      } else {
        getUserInfo(token).then((response) => {
          //使用getUserinfo方法，上面需要先导入login.js
          const respUser = response.data;
          if (respUser.flag) {
            //如果获取到用户信息，则保存到本地，并让其进入
            localStorage.setItem(
              "yuanhr-manager-user",
              JSON.stringify(respUser.data)
            );
            next();
          } else {
            //如果没有获取到用户信息（比如token失败），就返回到登录页面
            next({ paht: "/login" });
          }
        });
      }
    }
  }
});
