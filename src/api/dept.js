/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'

/**
 * 用户api接口
 */
export class DeptApi {
  static deptTree () {
    return server.get('/admin/sysDept/tree')
  }
}
