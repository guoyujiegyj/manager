// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// ui组件导入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/base.css'
// 使用moment.js插件进行日期过滤。npm i moment
import moment from 'moment'

// 导入自定义的http插件。
import MyHttp from '@/plugins/http.js'
// 创建全局过滤器。
Vue.filter('fmtdate', (v) => {
  // 日期过滤。
  return moment(v).format('YYYY/MM/DD')
})

// 使用UI组件
Vue.use(ElementUI)

// 使用自定义的http插件。
Vue.use(MyHttp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
