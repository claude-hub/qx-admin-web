import {server} from '@/tools/server'

/**
 * 登陆
 */
export class LoginApi {
  static login(params) {
    return server.post('/admin/auth/sign_in', params)
  }
}
