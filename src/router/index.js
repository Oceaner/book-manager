import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "@/components/Layout";
import Home from "@/views/home/index.vue";
import Bookinfo from "@/views/book/bookinfo.vue";
import Booktype from "@/views/book/booktype.vue";
import Inputsearch from "@/views/Inventory/inputsearch";
import Outputsearch from "@/views/Inventory/outputsearch";
import Searchall from "@/views/Inventory/searchall";
import User from "@/views/user/user.vue";

Vue.use(VueRouter);

const routes = [
  {
    //配置登录路由
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    //配置主路由
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      //设置为Layout的子路由
      {
        path: "/home",
        component: Home,
        meta: { title: "首页" },
      },
      {
        path: "/booktype",
        component: Booktype,
        meta: { title: "图书类型管理" },
      },
      {
        path: "/bookinfo",
        component: Bookinfo,
        meta: { title: "图书信息管理" },
      },
      {
        path: "/inputsearch",
        component: Inputsearch,
        meta: { title: "入库查询" },
      },
      {
        path: "/outputsearch",
        component: Outputsearch,
        meta: { title: "出库查询" },
      },
      {
        path: "/searchall",
        component: Searchall,
        meta: { title: "库存查询" },
      },
      {
        path: "/user",
        component: User,
        meta: { title: "用户管理" },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
