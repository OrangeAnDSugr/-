<template>
  <el-container>
    <el-header>
      <h1>后台管理系统</h1>
      <div class="fr">
        <span>欢迎进入电商后台管理系统</span>
        <a href="#" class="logout" @click.prevent="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1" @click="goUserList"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1" @click="goRolesList"><i class="el-icon-menu"></i>角色列表</el-menu-item>
            <el-menu-item index="2-2" @click="goRightsList"><i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="2-3" @click="goCategoryList"><i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    goUserList() {
      this.$router.push('/home/users')
    },
    goRolesList() {
      this.$router.push('/home/roles')
    },
    goRightsList() {
      this.$router.push('/home/rights')
    },
    goCategoryList() {
      this.$router.push('/home/category')
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  h1 {
    display: inline;
  }
  .logout {
    color: #b07a17;
    text-decoration: none;
    font-weight: 700;
  }
}

.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  overflow: auto;
}

.el-container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
