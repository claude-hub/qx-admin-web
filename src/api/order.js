import { server } from '@/tools/server'
import qs from 'qs'

export class OrderApi {
  static orders (params) {
    return server({
      url: '/admin/sysOrder/list',
      method: 'get',
      params: params
    })
  }
  static addOrder (params) {
    return server.post('/admin/sysOrder/add', qs.stringify(params, { indices: false }))
  }
  static editOrder (params) {
    return server.put('/admin/sysOrder/update', qs.stringify(params, { indices: false }))
  }
  static delOrder (params) {
    return server.post('/admin/sysOrder/delete', qs.stringify(params, { indices: false }))
  }
}
