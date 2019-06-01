/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
}

export const initMenu = (router, menu) => {
  if (menu.length === 0) {
    return
  }
  router.addRoutes(formatRoutes(menu))
}
/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace('#', '').replace(port, '')}}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}
/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
  } else {
    value = $route.path
  }
  return value
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener('fullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('msfullscreenchange', function (e) {
    listen()
  })
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
