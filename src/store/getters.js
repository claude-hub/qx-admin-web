export const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  userMenu: state => state.user.userMenu,
  isCollapse: state => state.common.isCollapse,
  isFullScreen: state => state.common.isFullScreen,
  isLock: state => state.common.isLock,
  lockPassword: state => state.common.lockPassword,
  theme: state => state.common.theme,
  defaultHomePage: state => state.common.defaultHomePage,
  openedPages: state => state.page.openedPages,
  currentPage: state => state.page.currentPage,
};
