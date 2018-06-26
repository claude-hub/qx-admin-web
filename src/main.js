import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/styles/index.scss'
import './assets/icon/iconfont.css'

/** 生产提示关闭 */
Vue.config.productionTip = false
/** 注册 element 组件 */
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
