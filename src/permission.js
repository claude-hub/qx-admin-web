import { getCookies } from './tools/storage'
import router from './router'

/** 路由控制 */
router.beforeEach((to, from, next) => {
  if (getCookies('token')) {
    next()
  } else {
    if (to.path === '/login') { // 如果是登录页面路径，就直接next()
      next()
    } else { // 不然就跳转到登录；
      next('/login')
    }
  }
})
