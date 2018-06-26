import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../view/index/index'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login/index')
    }
  ]
})
