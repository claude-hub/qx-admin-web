import {server} from '@/tools/server'

/**
 * 用户api接口
 */
export class UserApi {
  static login(params) {
    return server.post('/admin/auth/sign_in', params)
  }
}
