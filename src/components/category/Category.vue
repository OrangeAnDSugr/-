<template>
  <div>
    <!-- 面包屑导航头部 -->
    <el-breadcrumb separator="/" class="goodNav">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="showAddCategoryDialog">添加分类</el-button>
    <!-- 数据表格 -->
    <el-table :data="goodsCateTable" stripe style="width: 100%" v-loading="loading">
      <!-- 树形控件结构 -->
      <el-table-tree-column tree-key="cat_id" level-key="cat_level" parent-key="cat_pid" child-key="children" :indent-size="30" file-icon="icon icon-file" folder-icon="el-icon-folder" prop="cat_name" label="分类名称" width="280"></el-table-tree-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="180">
        <template slot-scope="scope">
          <el-row v-if="!scope.row.cat_deleted">无效</el-row>
          <el-row v-else>有效</el-row>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="菜单级别" width="180">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" @current-change="goAnotherPage">
    </el-pagination>
    <!-- 添加分类对话框 -->
    <el-dialog title="收货地址" :visible.sync="addDialogVisible">
      <el-form :model="addCategoryForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="addCategoryForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称" :label-width="formLabelWidth">
          <el-cascader :options="addCategoryForm.categoryList" :props="addCategoryForm.options" :v-model="addCategoryForm.categoriesSelectedOptions"
          clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent="addCategory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./script.js"></script>
<style lang="less">
.goodNav {
  margin-bottom: 10px;
  padding: 15px;
  background-color: #d4dae0;
}
</style>
