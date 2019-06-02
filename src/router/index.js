import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'clinetindex',
    //   component: () => import('../view/client/home/index'),
    // },
    {
      path: '/',
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
          path: '/admin/dept',
          name: 'deptmanage',
          component: () => import('../view/admin/dept/index')
        },
        {
          path: '/sys/log',
          name: 'logmanage',
          component: () => import('../view/admin/log/index')
        },
        {
          path: '/sys/gen',
          name: 'gencode',
          component: () => import('../view/admin/gen/index')
        },
        {
          path: '/admin/user/edit',
          name: 'edituser',
          component: () => import('../view/admin/user/eidt')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../view/admin/order/index')
        }
      ]
    },
    // {
    //   path: '/admin/login',
    //   name: 'login',
    //   component: () => import('../view/admin/login/index')
    // }
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/admin/login/index')
    }
  ]
})

export default router
