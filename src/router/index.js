import Vue from 'vue'
import Router from 'vue-router'

// @表示src的绝对路由

import Login from '@/components/Login'
import Home from '@/components/Home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
     redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
