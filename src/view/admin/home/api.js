import {server} from '@/tools/server'

/**
 * 登陆
 */
export class IndexApi {

  static userMenus(params) {
    return server.get('/admin/auth/menu', params)
  }
}
