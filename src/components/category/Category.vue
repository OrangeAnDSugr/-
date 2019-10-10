<template>
  <div>
    <el-table :data="goodsCateTable" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="cat_name" label="分类名称" width="280">
      </el-table-column>
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
  </div>
</template>

<script src="./script.js"></script>
<style></style>
