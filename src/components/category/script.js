import ElTreeGrid from 'element-tree-grid'
export default {
  data() {
    return {
      goodsCateTable: [],
      pageSize: 10,
      curPage: 1,
      loading: false,
      total: -1,
      addDialogVisible: false,
      formLabelWidth: '100px',
      addCategoryForm: {
        cat_name: '',
        cat_pid: -1,
        cat_level: -1,
        categoryList: [],
        categoriesSelectedOptions: [],
        options: {
          checkStrictly: true,
          value: 'cat_id',
          label: 'cat_name'
        }
      }
    }
  },
  created() {
    this.getCategoryList()
    this.getCategoryAddList()
  },
  methods: {
    async getCategoryList(curPage = 1) {
      this.loading = true
      const res = await this.$http.get('/categories', {
        params: {
          pagenum: curPage,
          pagesize: this.pageSize
        }
      })
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodsCateTable = data.result
        this.total = data.total
        this.loading = false
      }
    },
    // 去往当前页
    goAnotherPage(curPage) {
      this.curPage = curPage
      this.getCategoryList(curPage)
    },
    showAddCategoryDialog() {
      this.addDialogVisible = true
    },
    async getCategoryAddList() {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.addCategoryForm.categoryList = data
      }
    },
    // 添加分类
    async addCategory() {
      const {
        cat_name: catName,
        categoriesSelectedOptions
      } = this.addCategoryForm
      const catPid =
        categoriesSelectedOptions[categoriesSelectedOptions.length - 1]
      const catLevel = categoriesSelectedOptions.length
      const res = await this.$http.post('/categories', {
        cat_pid: catPid,
        cat_name: catName,
        cat_level: catLevel
      })
      console.log(res)
      const { meta, data } = res.data
      if (meta.status === 201) {
        this.getCategoryList(this.curPage)
        this.addDialogVisible = false
      }
    }
  },
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  }
}
