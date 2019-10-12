export default {
  data() {
    return {
      goodsList: [],
      curPage: 1,
      pagesize: 10,
      total: 0,
      loading: false
    }
  },
  created() {
    // console.log(this.$route.params)
    const page = this.$route.params.page
    this.getGoodsList(page)
  },
  watch: {
    $route(to) {
      console.log(to.params.page)
      const page = to.params.page
      this.getGoodsList(page)
    }
  },
  methods: {
    async getGoodsList(curPage = 1) {
      this.loading = true
      const res = await this.$http.get('/goods', {
        params: {
          pagenum: curPage,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.total = data.total
        this.goodsList = data.goods
      }
    },
    changePage(curPage) {
      this.$router.push(`/home/goods/${curPage}`)
    }
  }
}
