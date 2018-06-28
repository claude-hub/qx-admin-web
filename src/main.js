import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
// import baseServer from '@/tools/server'
import ElementUI from 'element-ui'
import './assets/styles/index.scss'
import './assets/icon/iconfont.css'

/** 生产提示关闭 */
Vue.config.productionTip = false
/** 注册 element 组件 */
Vue.use(ElementUI)

// 挂载全局
// Vue.prototype.$server = baseServer // axios请求方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
