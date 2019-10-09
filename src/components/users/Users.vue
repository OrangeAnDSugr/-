<template>
  <div>
    <el-table :data="userList" stripe class="userList">
      <el-table-column prop="role_name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
      </el-table-column>
      <el-table-column prop="address" label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      userList: []
    }
  },
  methods: {
    getUserList() {
      axios
        .get('/users', {
          params: {
            pagenum: 1,
            pagesize: 3
          }
          // },
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        })
        .then(res => {
          // console.log(res)
          const { data } = res.data
          this.userList = data.users
        })
    }
  }
}
</script>

<style scoped>
</style>
