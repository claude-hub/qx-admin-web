/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'
import qs from 'qs'

export class RoleApi {
  static roles (params) {
    return server({
      url: '/admin/sysRole/list',
      method: 'get',
      params: params
    })
  }
  static addRole (params) {
    return server.post('/admin/sysRole/add', qs.stringify(params, { indices: false }))
  }
  static editRole (params) {
    return server.put('/admin/sysRole/update', qs.stringify(params, { indices: false }))
  }
  static delRole (params) {
    return server.post('/admin/sysRole/delete', qs.stringify(params, { indices: false }))
  }
  static addRolePerms (params) {
    return server.post('/admin/sysRole/rolePermissions', qs.stringify(params, { indices: false }))
  }
}
