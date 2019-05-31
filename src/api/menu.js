import {server} from '@/tools/server'

/**
 * 用户api接口
 */
export class MenuApi {
  static userMenu(params) {
    return server.get('/admin/sysMenu/userMenus', params)
  }
}
