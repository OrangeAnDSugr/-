<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="goodsList" stripe style="width: 100%">
      <el-table-column type="index" width="50" label="顺序" :v-loading="loading">
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="380">
      </el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="180">
      </el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | date('YYYY年MM月DD日') }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script src="./script.js">
</script>

<style>
</style>
