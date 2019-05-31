import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import ElementUI from 'element-ui'
import './assets/styles/index.scss'
import './assets/icon/iconfont.css'
import './permission'

/** 生产提示关闭 */
Vue.config.productionTip = false
/** 注册 element 组件 */
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
