import {server} from '@/tools/server'

/**
 * 登陆
 */
export class LoginApi {

  static login(params) {
    return server.post('/admin/auth/sign_in', params)

    // this.$http({
    //   url: this.$http.adornUrl('/sys/login'),
    //   method: 'post',
    //   data: this.$http.adornData({
    //     'username': this.dataForm.userName,
    //     'password': this.dataForm.password,
    //     'uuid': this.dataForm.uuid,
    //     'captcha': this.dataForm.captcha
    //   })
    // })

    // var a = this.$http.post('/api/admin/auth/sign_in', params)
    // return this.$http.post('/api/admin/auth/sign_in', params)
    // var b = http
    // var a = http.connection
    // console.log(http.connection)
    // return http.connection.post('/api/admin/auth/sign_in', params)
  }
}
