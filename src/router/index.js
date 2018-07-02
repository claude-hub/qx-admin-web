import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'clinetindex',
      component: () => import('../view/client/home/index'),
    },
    {
      path: '/admin',
      name: 'adminindex',
      component: () => import('../view/admin/home/index'),
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import('../view/admin/login/index')
    }
  ]
})

export default router
