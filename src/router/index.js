import Vue from 'vue'

import Router from 'vue-router'
// 登录组件
import Login from '@/components/login/Login'

// home组件
import Home from '@/components/home/Home'

import Users from '@/components/users/Users'

import Right from '@/components/right/Right'
import Role from '@/components/right/Role'

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
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/right',
          component: Right
        },
        {
          path: '/role',
          component: Role
        }
      ]
    }
  ]
})
