export default {
  data() {
    return {
      roleList: [],
      // 控制编辑角色对话框的显示
      showUpdateRolesDialog: false,
      updateRolesForm: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '120px',
      // 权限树形数据
      rightsTree: [],
      // 展示分配权限模态框
      showAllotRightsDialog: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前角色id
      curRoleId: -1
    }
  },
  created() {
    this.getRoleList()
    this.getAllRightsTree()
  },
  methods: {
    // 获取所有角色数据
    async getRoleList() {
      const res = await this.$http.get('/roles')
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    async getAllRightsTree() {
      const res = await this.$http.get('/rights/tree')
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.rightsTree = data
      }
    },
    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('您确认删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$http.delete(`/roles/${id}`)
        const { meta } = res.data
        if (meta.status === 200) {
          const index = this.roleList.findIndex(item => item.id === id)
          this.roleList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 点击显示编辑角色对话框
    showUpdatRoleseDialog(data) {
      this.showUpdateRolesDialog = true
      for (const key in this.updateRolesForm) {
        this.updateRolesForm[key] = data[key]
      }
    },
    // 编辑角色
    async updateRoles() {
      const { id, roleName, roleDesc } = this.updateRolesForm
      // console.log(id)
      const res = await this.$http.put(`/roles/${id}`, {
        roleDesc,
        roleName
      })
      const { meta } = res.data
      if (meta.status === 200) {
        const index = this.roleList.findIndex(item => item.id === id)
        this.roleList[index].roleName = roleName
        this.roleList[index].roleDesc = roleDesc
        this.showUpdateRolesDialog = false
      }
    },
    // 删除指定角色的权限
    async delOneRight(roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      const { meta, data } = res.data
      if (meta.status === 200) {
        const curRole = this.roleList.find(item => item.id === roleId)
        curRole.children = data
        this.$message({
          message: '取消权限成功',
          type: 'success'
        })
      }
    },
    // 展示分配权限模态框
    showAllotDialog(rightsRole, id) {
      this.showAllotRightsDialog = true
      this.curRoleId = id
      const rolesId = []
      this.$nextTick(_ => {
        rightsRole.forEach(item1 => {
          item1.children.forEach(item2 => {
            item2.children.forEach(item3 => {
              rolesId.push(item3.id)
            })
          })
        })
        this.$refs.rightsTrees.setCheckedKeys(rolesId)
      })
    },
    updateRoleRights() {
      const checkedKeys = this.$refs.rightsTrees.getCheckedKeys()
      const halfCheckedKeys = this.$refs.rightsTrees.getHalfCheckedKeys()
      const allKeys = [...checkedKeys, ...halfCheckedKeys]
      this.$http
        .post(`/roles/${this.curRoleId}/rights`, {
          rids: allKeys.join(',')
        })
        .then(res => {
          console.log(res)
          const { meta } = res.data
          if (meta.status === 200) {
            this.$message({
              message: meta.msg,
              type: 'success'
            })
            this.showAllotRightsDialog = false
            this.getRoleList()
          }
        })
    }
  }
}
