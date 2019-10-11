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

const router = new Router({
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
          path: '/rights',
          component: Right
        },
        {
          path: '/roles',
          component: Role
        }
      ]
    }
  ]
})
// 全局前置守卫 ：在 路由配置起作用之前调用。
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    // 去登录页面不需要验证token。
    next()
  } else {
    // 如果是非login页，只要有token，就正常进行路由跳转，
    if (token) {
      next()
    } else {
      // 如果没有token，调到登录页面。
      router.push('/login')
      this.$message.warning('请先登录')
    }
  }
})
export default router
