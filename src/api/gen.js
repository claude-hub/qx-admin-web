/**
 * @author Cloudy
 * Date:
 */
import { server } from '@/tools/server'

export class GenApi {
  static getTables () {
    return server.get('/gen/tables')
  }
  static codeGen (type, tables) {
    window.location.href = window.location.origin + '/gen/code/' + type + '/' + tables
  }
}
