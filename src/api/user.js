import { server } from '@/tools/server'
import qs from 'qs'

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
  static addUser (params) {
    return server.post('/admin/sysUser/add', qs.stringify(params, { indices: false }))
  }
  static delUser (params) {
    return server.post('/admin/sysUser/delete', qs.stringify(params, { indices: false }))
  }
  static editUser (params) {
    return server.put('/admin/sysUser/update', qs.stringify(params, { indices: false }))
  }
}
