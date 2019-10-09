// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import axios from 'axios'

Vue.use(ElementUI)
// 将axios添加到Vue的原型中,避免多次引入axios插件
Vue.prototype.$http = axios
// 给请求地址配置公共路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 请求拦截器 在请求中拦截 给不是login的请求加上请求头Authorization
axios.interceptors.request.use(
  config => {
    if (!config.url.endsWith('/login')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    // Authorization
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
// 在响应中拦截
// 给状态码是401的响应转到登录页
axios.interceptors.response.use(
  response => {
    if (response.data.meta.status === 401) {
      router.push('/login')
      localStorage.removeItem('token')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
