import axios from 'axios'
import router from '@/router'
import {store} from '@/store'

export const server = axios.create({
  baseURL: `${process.env.BASE_API}/api`,
  timeout: 1000 * 30,
  withCredentials: true,
})

/**
 * 请求拦截
 */
server.interceptors.request.use(config => {
  const {token} = store.getters;
  if (token != null) {
    config.headers['Authorization'] = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
server.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    router.push({name: 'login'})
  }
  return response
}, error => {
  return Promise.reject(error)
})
