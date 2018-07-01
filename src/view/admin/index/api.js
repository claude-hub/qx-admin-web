import {server} from '@/tools/server'

/**
 * 登陆
 */
export class IndexApi {

  static menus(params) {
    return server.get('/admin/auth/menu', params)
  }
}
