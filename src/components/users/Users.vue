<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="userNav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input placeholder="请输入内容" v-model="queryData" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click.enter="queryUser"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="success" plain @click="showAddUserDialog">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="userList" stripe class="userList">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeUserState(scope.row.id,scope.row.mg_state)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"
          @click="showUpdateUserDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delUser(scope.row.id)"></el-button>
          <el-button type="success" plain size="mini" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="getCurUserList" :current-page.sync="curPage">
    </el-pagination>

    <!-- 添加用户模态框 -->
    <el-dialog title="添加用户" :visible.sync="showAddDialog" width="50%">
      <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="updateFormVisible">
      <el-form :model="updateUserForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="updateUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="updateUser">确 定</el-button>
      </div>
    </el-dialog>
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
      userList: [],
      total: -1,
      pageSize: 3,
      curPage: 1,
      queryData: '',
      // 添加用户模态框数据
      showAddDialog: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '100px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      value: true,
      // 是否显示编辑用户对话框
      updateFormVisible: false,
      updateUserForm: {
        id: '',
        username: '',
        mobile: '',
        email: ''
      }
    }
  },
  methods: {
    // 获取所有的用户数据
    getUserList() {
      axios
        .get('/users', {
          params: {
            pagenum: this.curPage,
            pagesize: this.pageSize,
            query: this.queryData || ''
          }
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
        })
        .then(res => {
          const { data } = res.data
          this.userList = data.users
          this.total = data.total
        })
    },
    // 点击分页中的每一页 获取当前页数据
    getCurUserList(curPage) {
      this.curPage = curPage
      this.getUserList()
    },
    // 查询用户
    queryUser() {
      this.curPage = 1
      this.getUserList()
    },
    // 展示添加用户模态框
    showAddUserDialog() {
      this.showAddDialog = true
    },
    // 添加用户
    addUser() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          this.$http.post('/users', this.addUserForm).then(res => {
            console.log(res)
            this.total += 1
            this.curPage = Math.ceil(this.total / this.pageSize)
            this.getUserList()
          })
        } else {
          alert('验证失败')
          return false
        }
      })
      // 关闭模态框
      this.showAddDialog = false
    },
    // 改变用户登录状态
    async changeUserState(id, curState) {
      const res = await this.$http.put(`/users/${id}/state/${curState}`)
      const { data, meta } = res.data
      if (meta.status === 200) {
        if (data.mg_state === 1) {
          this.$message({
            message: '启用成功',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: '禁用成功',
            type: 'success',
            duration: 1000
          })
        }
      }
    },
    // 删除用户事件
    delUser(id) {
      this.$confirm('您是否确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then(res => {
            console.log(res)
            const { meta } = res.data
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              })
            }
            this.total -= 1
            if (this.curPage > Math.ceil(this.total / this.pageSize)) {
              this.curPage = Math.ceil(this.total / this.pageSize)
            }
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 显示编辑用户信息对话框
    showUpdateUserDialog(data) {
      this.updateFormVisible = true
      // console.log(data)
      for(const key in data ) {
        this.updateUserForm[key] = data[key]
      }
    },
    // 更新用户信息
    async updateUser() {
      const { id, email, mobile } = this.updateUserForm
      const res = await this.$http.put(`/users/${id}`,{
        email,
        mobile
      })
      console.log(res)
      const { data, meta } = res.data
      if( meta.status === 200 ){
        const editUser = this.userList.find(item => item.id === id)
        editUser.email = data.email
        editUser.mobile = data.mobile
        this.updateFormVisible = false
      }
      
    }
  }
}
</script>

<style scoped>
.userNav {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #d4dae0;
}
</style>
