/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'
import qs from 'qs'

export class LogApi {
  static logs (params) {
    return server({
      url: '/admin/sysLog/list',
      method: 'get',
      params: params
    })
  }
  static addLog (params) {
    return server.post('/admin/sysLog/add', qs.stringify(params, { indices: false }))
  }
  static editLog (params) {
    return server.put('/admin/sysLog/update', qs.stringify(params, { indices: false }))
  }
  static delLog (params) {
    return server.post('/admin/sysLog/delete', qs.stringify(params, { indices: false }))
  }
}
