import Cookies from 'js-cookie'
const sessionStorage = window.sessionStorage;

export class Auth {
  static setUserMenu(value = {}) {
    return sessionStorage.setItem('user.userMenu', JSON.stringify(value))
  }

  static getUserMenu() {
    return JSON.parse(sessionStorage.getItem('user.userMenu'))
  }

  static removeUserMenu() {
    return sessionStorage.removeItem('user.userMenu')
  }

  static setUserInfo(value = {}) {
    return sessionStorage.setItem('user.userInfo', JSON.stringify(value))
  }

  static getUserInfo() {
    return JSON.parse(sessionStorage.getItem('user.userInfo'))
  }

  static removeUserInfo() {
    return sessionStorage.removeItem('user.userInfo')
  }

  static setAccountPwd(value = {}) {
    return sessionStorage.setItem('user.accountPwd', JSON.stringify(value))
  }

  static getAccountPwd() {
    return JSON.parse(sessionStorage.getItem('user.accountPwd'))
  }

  static removeAccountPwd() {
    return sessionStorage.removeItem('user.accountPwd')
  }

  static setLogin() {
    return sessionStorage.setItem('user.isLogin', true)
  }

  static getLogin() {
    return !!sessionStorage.getItem('user.isLogin')
  }

  static removeLogin() {
    return sessionStorage.removeItem('user.isLogin')
  }

  static setToken(value) {
    return Cookies.set('user.token', value)
  }

  static getToken() {
    return Cookies.get('user.token')
  }

  static removeToken() {
    return Cookies.remove('user.token')
  }
}
