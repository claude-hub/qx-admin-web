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
      component: () => import('../view/admin/layout/index'),
      children: [
        {
          path: '/',
          name: 'adminhome',
          component: () => import('../view/admin/home/index')
        },
        {
          path: '/admin/user',
          name: 'usermanage',
          component: () => import('../view/admin/user/index')
        },
        {
          path: '/admin/role',
          name: 'rolemanage',
          component: () => import('../view/admin/role/index')
        },
        {
          path: '/admin/menu',
          name: 'menumanage',
          component: () => import('../view/admin/menu/index')
        },
        {
          path: '/admin/user/edit',
          name: 'edituser',
          component: () => import('../view/admin/user/eidt')
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'login',
      component: () => import('../view/admin/login/index')
    }
  ]
})

export default router
