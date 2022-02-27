<template>
  <div class="header">
    <a href="/" style="padding-left: 30px">
      <img class="logo" src="@/assets/logo.png" />
      <span class="title">UnNull图书信息管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-drown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-edit" command="b"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { logout } from "@/api/login.js";
export default {
  methods: {
    handleCommand(command) {
      //   this.$message("click on item " + command);
      switch (command) {
        case "a":
          this.$message("单击了修改密码");
          break;
        case "b":
          //退出系统
          //调用logout方法，需要传入一个token，token在哪里呢 在登录时（/login/induex.vue）通过localstorage记住了token信息
          // eslint-disable-next-line no-case-declarations
          const token = localStorage.getItem("yuanhr-manager-token");
          logout(token).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              localStorage.removeItem("yuanhr-manager-token");
              localStorage.removeItem("yuanhr-manager-user");
              this.$router.push("/login");
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
                duration: 1000,
              });
            }
          });
          //   this.$message("单击了退出系统");
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.logo {
  border-radius: 5px;
  vertical-align: middle;
  width: 25px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
}
</style>
