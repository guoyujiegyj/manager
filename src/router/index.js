import Vue from 'vue'

import Router from 'vue-router'
// 登录组件
import Login from '@/components/login/Login'

// home组件
import Home from '@/components/home/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: Home
    }
  ]
})
