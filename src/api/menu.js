import { server } from '@/tools/server'
import qs from "qs";

/**
 * 用户api接口
 */
export class MenuApi {
  static userMenu (params) {
    return server.get('/admin/sysMenu/userMenus', params)
  }

  static roleMenu(id) {
    return server.get(`/admin/sysMenu/roleMenus?id=${id}`)
  }
  /**
   * 树形菜单
   */
  static menuTree (params) {
    return server.get('/admin/sysMenu/tree', params)
  }

  static addMenu (params) {
    return server.post('/admin/sysMenu/add', qs.stringify(params, { indices: false }))
  }

  static editMenu (params) {
    return server.put('/admin/sysMenu/update', qs.stringify(params, { indices: false }))
  }

  static delMenu (params) {
    return server.post('/admin/sysMenu/delete', qs.stringify(params, { indices: false }))
  }
}
