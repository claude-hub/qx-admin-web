import { server } from '@/tools/server'

/**
 * 用户api接口
 */
export class UserApi {
  static login (params) {
    return server({
      url: '/admin/auth/sign_in',
      method: 'post',
      params: params
    })
  }
  static getUserList (params) {
    return server({
      url: '/admin/sysUser/list',
      method: 'get',
      params: params
    })
  }
}
