import {setStore, getStore, removeStore} from '@/tools/storage'

const common = {
  state: {
    /** 默认首页路由、名字 **/
    defaultHomePage: {
      name: '首页',
      path: '/admin'
    },
    /** 菜单是否缩放 **/
    isCollapse: false,
    /** 是否全屏 **/
    isFullScreen: false,
    /** 是否锁屏 **/
    isLock: getStore('isLock') || false,
    /**锁屏密码**/
    lockPassword: getStore('lockPassword'),
    /** 主题色 **/
    theme: getStore('theme') || '#409EFF',
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULL_SCREEN: (state, action) => {
      state.isFullScreen = !state.isFullScreen
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore('isLock', state.isLock)
    },
    SET_THEME: (state, color) => {
      state.theme = color
      setStore('theme', state.theme)
    },
    SET_LOCK_PASSWORD: (state, lockPassword) => {
      state.lockPassword = lockPassword
      setStore('lockPassword', state.lockPassword)
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore('lockPassword')
      removeStore('isLock')
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    SetCollapseState({commit}) {
      commit('SET_COLLAPSE')
    },
    SetFullScreen({commit}) {
      commit('SET_FULL_SCREEN')
    }
  }
}
export default common
