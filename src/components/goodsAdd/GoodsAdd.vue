<template>
  <div>
    <el-row>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </el-row>
    <el-tabs tab-position="left" @tab-click="tabStep" v-model="tabName">
      <el-tab-pane label="基本信息" name="basic">
        <el-form ref="goodsAddForm" :model="goodsAddForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsAddForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsAddForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsAddForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsAddForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="goodsAddForm.goods_cat" :options="categoriesList" @change="handleChange" :props="{label: 'cat_name'}">
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <template>
              <el-radio v-model="goodsAddForm.is_promote" :label="true">是</el-radio>
              <el-radio v-model="goodsAddForm.is_promote" :label="false">否</el-radio>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goNextStep(1,'goodsImg')">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="goodsImg">
        <el-upload class="upload-demo" 
        action="http://localhost:8888/api/private/v1/upload" 
        :on-success="handleSuccess" :headers="uploadHeaders"
        :file-list="goodsAddForm.fileList" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="primary" class="uploadImgButton" @click="goNextStep(2,'goodsContent')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="goodsContent">
        <quill-editor v-model="goodsAddForm.introduce" class="editBox">
        </quill-editor>
        <el-button type="primary" class="uploadImgButton" @click="addGood">确认提交</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./script.js"></script>

<style lang="less">
.uploadImgButton {
  margin-top: 50px;
}
.quill-editor {
  background-color: #fff;

  .ql-container {
    min-height: 300px;
  }
}
</style>
