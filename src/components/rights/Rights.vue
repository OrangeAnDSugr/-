<template>
  <div>
    <!-- 权限面包屑导航 -->
    <el-breadcrumb separator="/" class="userNav">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限表格 -->
    <el-table :data="rightsList" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="编号">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="180">
      </el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.level === 0">一级</span> -->
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getRightsList()
  },
  data() {
    return {
      rightsList: []
    }
  },
  methods: {
    async getRightsList() {
      const res = await this.$http.get('/rights/list')
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rightsList = data
      }
    }
  }
}
</script>

<style>
.userNav {
  margin-bottom: 10px;
  padding: 15px;
  background-color: #d4dae0;
}
</style>
