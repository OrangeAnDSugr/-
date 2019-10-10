<template>
  <div>
    <!-- 角色面包屑导航 -->
    <el-breadcrumb separator="/" class="userNav">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 角色表单 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="index" width="50" label="编号">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-if="scope.row.children.length === 0">
            暂无权限
          </el-row>
          <el-row v-else v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="4">
              <el-tag closable type="primary" @close="delOneRight(scope.row.id,level1.id)">
                {{level1.authName}}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="4">
                  <el-tag closable type="success" @close="delOneRight(scope.row.id,level2.id)">
                    {{level2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag closable type="warning" v-for="level3 in level2.children" :key="level3.id" @close="delOneRight(scope.row.id,level3.id)">
                    {{level3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName">
      </el-table-column>
      <el-table-column label="描述" prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="showUpdatRoleseDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delRole(scope.row.id)"></el-button>
          <el-button type="success" plain icon="el-icon-check" size="mini" @click="showAllotDialog(scope.row.children,scope.row.id)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色" :visible.sync="showUpdateRolesDialog">
      <el-form :model="updateRolesForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="updateRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="updateRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdateRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click.prevent="updateRoles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限模态框 -->
    <el-dialog title="分配权限" :visible.sync="showAllotRightsDialog">
      <el-tree :data="rightsTree" ref="rightsTrees" show-checkbox node-key="id" default-expanded-all="true" :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAllotRightsDialog = false">取 消</el-button>
        <el-button type="primary" @click.prevent="updateRoleRights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.less" lang="less"></style>
