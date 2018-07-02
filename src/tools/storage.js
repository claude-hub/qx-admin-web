import Cookies from 'js-cookie'

const sessionStorage = window.sessionStorage;

/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return;
  return JSON.parse(sessionStorage.getItem(name));
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  sessionStorage.removeItem(name);
}

/**
 * 存储Cookies
 */
export const setCookies = (name, content) => {
  return Cookies.set(name, content)
}

/**
 * 获取Cookies
 */
export const getCookies = (name) => {
  return Cookies.get(name)
}

/**
 * 删除Cookies
 */
export const removeCookies = (name) => {
  return Cookies.remove(name)
}
