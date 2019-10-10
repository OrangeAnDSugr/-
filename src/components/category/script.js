import ElTreeGrid from 'element-tree-grid'
export default {
  data() {
    return {
      goodsCateTable: [],
      pageSize: 10,
      curPage: 1,
      loading: false
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList(curPage = 1) {
      this.loading = true
      const res = await this.$http.get('/categories', {
        params: {
          pagenum: curPage,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.goodsCateTable = data
        this.loading = false
      }
    }
  },
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  }
}
