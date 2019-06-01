import { server } from '@/tools/server'

/**
 * 用户api接口
 */
export class MenuApi {
  static userMenu (params) {
    return server.get('/admin/sysMenu/userMenus', params)
  }

  /**
   * 树形菜单
   */
  static menuTree (params) {
    return server.get('/admin/sysMenu/tree', params)
  }
}
