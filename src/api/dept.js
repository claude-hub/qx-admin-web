/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'
import qs from "qs";

/**
 * 用户api接口
 */
export class DeptApi {
  static deptTree () {
    return server.get('/admin/sysDept/tree')
  }
  static addDept (params) {
    return server.post('/admin/sysDept/add', qs.stringify(params, { indices: false }))
  }

  static editDept (params) {
    return server.put('/admin/sysDept/update', qs.stringify(params, { indices: false }))
  }
}
