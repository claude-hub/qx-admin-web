/**
 * user
 */

import {LoginApi} from '@/view/admin/login/login-api';
import {Msg} from '@/tools/message';
import {Auth} from './auth';

const defaultUser = {login: '', password: '', remember: false};

export default {
  state: {
    /** token */
    token: Auth.getToken() || null,
    /** 用户登陆角色信息 */
    userInfo: Auth.getUserInfo() || {},
    /** 用户登陆账户密码 */
    accountPwd: Auth.getAccountPwd() || defaultUser,
    /** 是否登陆 */
    isLogin: Auth.getLogin() || false,
    /** 角色权限点 */
    roles: ['admin'],
    /** 用户菜单列表 **/
    userMenu: Auth.getUserMenu() || {},
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED(state, data) {
      if (data.params.remember) {
        state.accountPwd = data.params;
        Auth.setAccountPwd(data.params)
      }
      state.token = data.data.data.currentToken;
      state.userInfo = {};
      state.isLogin = true;
      state.userMenu = {};
      Auth.setUserMenu(data.data.data.menus)
      Auth.setUserInfo(data.data.data);
      Auth.setLogin();
      Auth.setToken(data.data.data.currentToken)
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      state.token = null;
      state.userInfo = {};
      state.accountPwd = {};
      state.isLogin = false;
      Auth.removeAccountPwd();
      Auth.removeUserInfo();
      Auth.removeLogin();
      Auth.removeToken();
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 登录 */
    LoginByUsername({commit}, params) {
      return new Promise((resolve, reject) => {
        LoginApi.login(params).then((res) => {
          Msg.success('登录成功');
          commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params});
          resolve()
        }).catch(err => {
          console.log('%c 身份被服务器拒绝', 'color:#fa8c16');
          Msg.error(err);
          commit('ACCOUNT_LOGOUT_FAILURE');
        })
      })
    },
    /** 登出 */
    accountLogoutSubmit({commit}) {
      return new Promise((resolve, reject) => {
        LoginApi.logout().then(res => {
          commit('ACCOUNT_LOGOUT_FAILURE');
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
