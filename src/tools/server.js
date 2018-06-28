// import axios from 'axios'
// import qs from 'qs'
// import {store} from '../store'
//
// /**
//  * 请求类
//  */
// export class BaseApi {
//   servers;
//
//   /**
//    * 初始化servers
//    */
//   constructor() {
//     const headers = new Headers();
//     headers.set('App-Version', '0.1.0');
//     this.servers = axios.create({
//       baseURL: process.env.BASE_API,
//       headers,
//       timeout: 1,
//       withCredentials: true
//     });
//     this.servers.defaults.timeout = 5000;
//     this.servers.interceptors.request.use(function (config) {
//       return config
//     }, function (error) {
//       return Promise.reject(error || '网络繁忙，请稍候再试！');
//     });
//     this.servers.interceptors.response.use(function (response) {
//       return response
//     }, function (error) {
//       return Promise.reject(error.response || '网络繁忙，请稍候再试！');
//     })
//   }
//
//   /**
//    * fetch
//    * @param method
//    * @param url
//    * @param body
//    * @param fileList
//    * @param fileKey
//    * @returns {Promise<any>}
//    */
//   connection(method = 'GET', url, body, fileList, fileKey = 'files') {
//     this.getStatusToken();
//     if (typeof body !== 'object') body = {};
//     method = method.toLocaleLowerCase();
//     if (fileList && (fileList instanceof Array)) {
//       let headers = {'Content-Type': 'multipart/form-data'};
//       const param = new window.FormData();
//       for (const key in body) {
//         if (Object.prototype.hasOwnProperty.call(body, key)) param.append(key, body[key]);
//       }
//       fileList.forEach(file => param.append(fileKey, file));
//       return Promise.resolve(this.servers[method](url, param, {headers}))
//     }
//     if (method === 'get') {
//       url = `${url}?${qs.stringify(body)}`;
//       body = {}
//     }
//     return Promise.resolve(this.servers[method](url, body))
//   }
//
//   /**
//    * 设置token
//    * @param isLogin
//    * @param token
//    */
//   setToken({isLogin, token}) {
//     if (isLogin) {
//       this.servers.defaults.headers.common['Authorization'] = token;
//     }
//   }
//
//   /**
//    * 获取登录状态，token值
//    * @returns {{isLogin: string, token: string}}
//    */
//   getStatusToken() {
//     const {isLogin, token} = store.getters;
//     this.setToken({isLogin, token})
//   }
// }
//
// export const server = new BaseApi();

//
// import store from "../store";
// import axios from 'axios';
//
// export class BaseApi {
//   servers;
//   // 基服务
//   static get connection() {
//     let service = axios.create({
//       baseURL: `${process.env.BASE_API}/api`,
//       headers: {Token: server.getStatusToken, 'App-Version': '0.1.0'}
//     });
//
//     service.defaults.timeout = 12000;
//     return service;
//   }
//
//   /**
//    * 设置token
//    * @param isLogin
//    * @param token
//    */
//   setToken({isLogin, token}) {
//     if (isLogin) {
//       this.servers.defaults.headers.common['Authorization'] = 'Bearer '+ token;
//     }
//   }
//
//   /**
//    * 获取登录状态，token值
//    * @returns {{isLogin: string, token: string}}
//    */
//   getStatusToken() {
//     const {isLogin, token} = store.getters;
//     this.setToken({isLogin, token})
//   }
// }
// export const server = new BaseApi();


import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import {store} from '../store'
import qs from 'qs'
import merge from 'lodash/merge'

export const server = axios.create({
  baseURL: `${process.env.BASE_API}/api`,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
server.interceptors.request.use(config => {
  // config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  const {token} = store.getters;
  server.defaults.headers.common["Authorization"] = token;
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
server.interceptors.response.use(response => {
  console.log("response")
  if (response.data && response.data.code === 401) { // 401, token失效
    // Vue.cookie.delete('token')
    // router.options.isAddDynamicMenuRoutes = false
    router.push({name: 'login'})
  }
  return response
}, error => {
  return Promise.reject(error)
})


// /**
//  * 请求地址处理
//  * @param {*} actionName action方法名称
//  */
// server.adornUrl = (actionName) => {
//   console.log(13112)
//   // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
//   return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : process.env.BASE_API) + actionName
// }
//
// /**
//  * get请求参数处理
//  * @param {*} params 参数对象
//  * @param {*} openDefultParams 是否开启默认参数?
//  */
// server.adornParams = (params = {}, openDefultParams = true) => {
//   console.log(13112314)
//   var defaults = {
//     't': new Date().getTime()
//   }
//   return openDefultParams ? merge(defaults, params) : params
// }
//
// /**
//  * post请求数据处理
//  * @param {*} data 数据对象
//  * @param {*} openDefultdata 是否开启默认数据?
//  * @param {*} contentType 数据格式
//  *  json: 'application/json; charset=utf-8'
//  *  form: 'application/x-www-form-urlencoded; charset=utf-8'
//  */
// server.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
//   var defaults = {
//     't': new Date().getTime()
//   }
//   data = openDefultdata ? merge(defaults, data) : data
//   return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
// }
// export  default server
