<template>
  <div class="main">
    <el-breadcrumb
      v-show="$route.path != '/home'"
      separator-class="el-icon-arrow-right"
    >
      <span class="line">|</span>
      <el-breadcrumb-item
        v-show="$route.path == '/booktype' || $route.path == '/bookinfo'"
        >图书信息管理</el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-show="
          $route.path == '/inputsearch' ||
          $route.path == '/outputsearch' ||
          $route.path == '/searchall'
        "
        >图书库存管理</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ paht: $route.path }">{{
        $route.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 子组件路由出口，即渲染在此处 -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.el-breadcrumb {
  height: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.line {
  position: absolute;
  color: white;
  border-left: 3px solid red;
  left: 10px;
}
</style>
