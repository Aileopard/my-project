// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router' // 导入路由文件
import store from './store' // 导入vuex文件
import api from './api' // 导入api接口

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = api // 将api挂载到vue原型上

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 路由
  store, // vuex
  api, // 发送axios请求
  components: { App },
  template: '<App/>'
})
