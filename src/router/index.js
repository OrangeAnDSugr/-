import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Users from '@/components/users/Users'
import Roles from '@/components/roles/Roles'
import Rights from '@/components/rights/Rights'
import Category from '@/components/category/Category'
import Goods from '@/components/goods/Goods'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: 'users', component: Users },
        { path: 'roles', component: Roles },
        { path: 'rights', component: Rights },
        { path: 'category', component: Category },
        { path: 'goods/:page?', component: Goods }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
  if (to.path === from.path) {
    console.log('1')
    return false
  }
})
export default router
