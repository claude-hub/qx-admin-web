/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'

/**
 * 用户api接口
 */
export class RoleApi {
  static roles (params) {
    return server.get('/admin/sysRole/list', params)
  }
}
