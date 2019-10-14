import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data() {
    return {
      active: 0,
      tabName: 'basic',
      goodsAddForm: {
        goods_name: '',
        introduce: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        is_promote: false,
        fileList: []
      },
      categoriesList: [],
      uploadHeaders: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created() {
    this.getAllCategories()
  },
  methods: {
    // 获取所有商品分类列表数据
    async getAllCategories() {
      const res = await this.$http.get('/categories', {
        params: {
          type: 3
        }
      })
      // console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.categoriesList = data
      }
    },
    // 去往下一步骤
    goNextStep(step, tabName) {
      this.active = step
      this.tabName = tabName
    },
    tabStep(tab, event) {
      console.log(tab, event)
      if (tab.label === '基本信息') {
        this.active = 0
      } else if (tab.label === '商品图片') {
        this.active = 1
      } else if (tab.label === '商品内容') {
        this.active = 2
      }
    },
    handleSuccess(response, file, fileList) {
      const { data, meta } = response
      if (meta.status === 200) {
        this.goodsAddForm.fileList.push({
          pic: data.tmp_path
        })
      }
    },
    // 提交添加商品
    async addGood() {
      const goodsAddForm = {
        ...this.goodsAddForm,
        goods_cat: this.categoriesList.join(',')
      }
      const res = await this.$http.post('/goods', goodsAddForm)
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 201) {
        this.$router.push('/home/goods')
      }
    },
    handleChange(value) {
      console.log(value)
    }
  },
  components: {
    quillEditor
  }
}
