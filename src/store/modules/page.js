import {setStore, getStore, removeStore} from '@/tools/storage'

const page = {
  state: {
    openedPages: getStore('openedPages') || [],
    currentPage: getStore('currentPage') || {},
  },
  actions: {
    /** 更改当前打开的页面的状态 **/
    SetPageState({commit}, params) {
      commit('ADD_PAGE_LIST', params)
      commit('SET_CURRENT_PAGE', params)
    },
    /** 显示上一个打开的页面 **/
    ShowPrePage({commit}, params) {
      commit('SHOW_PRE_PAGE', params)
    }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    /** 添加到打开的页面的session数组中 **/
    ADD_PAGE_LIST: (state, page) => {
      if (state.openedPages.some(item => item.path === page.path)) return
      state.openedPages.push({
        name: page.name,
        path: page.path
      })
      setStore('openedPages', state.openedPages)
    },
    /** 重新设置当前打开页 **/
    SET_CURRENT_PAGE: (state, currentPage) => {
      if (state.currentPage.path === currentPage.path) return
      //先清空数组，再赋值
      state.currentPage = {}
      state.currentPage = currentPage
      setStore('currentPage', state.currentPage)
    },
    SHOW_PRE_PAGE: (state, currentPage) => {
      state.openedPages.forEach((item, index) => {
        if (item.path == currentPage.path) {
          state.openedPages.splice(index, 1)
          state.currentPage = {}
          state.currentPage = state.openedPages[index] || state.openedPages[index - 1]
          setStore('openedPages', state.openedPages)
          setStore('currentPage', state.currentPage)
        }
      })
    }
  }
}
export default page
