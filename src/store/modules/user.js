import { setStore, getStore, removeStore,
  setCookies, getCookies, removeCookies } from '@/tools/storage'
import { UserApi } from '@/api/user'
import { MenuApi } from '@/api/menu'
import { Msg } from '@/tools/message'

const user = {
  state: {
    /** token */
    token: getCookies('token') || null,
    /** 用户登陆角色信息 */
    userInfo: getStore('userInfo') || {},
    /** 是否登陆 */
    isLogin: getStore('isLogin') || false,
    /** 权限列表 */
    permissions: getStore('permissions') || [],
    /** 用户菜单列表 **/
    userMenu: getStore('userMenu') || []
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    SET_TOKEN (state, current_token) {
      state.token = current_token
      setCookies('token', current_token)
    },
    SET_USER_INFO (state, user_info) {
      state.userInfo = user_info
      setStore('userInfo', user_info)
    },
    SET_PERMISSIONS (state, permissions) {
      state.permissions = permissions
      setStore('permissions', permissions)
    },
    SET_MENU (state, userMenu) {
      state.userMenu = userMenu
      setStore('userMenu', userMenu)
    },
    REMOVE_TOKEN (state) {
      removeCookies('token')
    },
    REMOVE_MENU_MSG (state) {
      removeStore('userInfo')
      removeStore('permissions')
      removeStore('openedPages')
      removeStore('currentPage')
      removeStore('userMenu')
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 根据用户名登录 */
    LoginByUsername ({ commit }, params) {
      return new Promise((resolve, reject) => {
        UserApi.login(params).then((res) => {
          const data = res.data.data
          commit('SET_TOKEN', data.currentToken)
          commit('SET_USER_INFO', data)
          commit('SET_PERMISSIONS', data.permissions)
          resolve()
        }).catch(err => {
          Msg.error(err)
          reject(err)
        })
      })
    },
    /** 获取用户动态菜单 */
    GetUserMenu ({ commit }, params) {
      return new Promise((resolve, reject) => {
        MenuApi.userMenu().then((res) => {
          commit('SET_MENU', res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    LogOut ({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_MENU_MSG')
    }
  }
}
export default user
