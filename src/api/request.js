import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'
import router from '@/router'
import Cookies from 'js-cookie'


// let loadingInstance = null

const instance = axios.create({
  timeout: 10000,
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
})
// 'Content-Type
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

let httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时',
}

instance.interceptors.request.use(
  (config) => {
    let token = Cookies.get('token')
    // loadingInstance = Loading.service({
    //   spinner: 'fa fa-spinner fa-spin fa-3x fa-fw',
    //   text: '拼命加载中...',
    // })
    if (token != undefined) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    Message({
      message: '错误',
      type: 'error',
    })
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // console.log('响应拦截response ', response);
    // loadingInstance.close()
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      Message({
        message: response.data.message,
        type: 'error',
      })
      return Promise.reject(response.data.message)
    }
  },
  (error) => {
    // console.log('响应拦截error ', error);
    // loadingInstance.close()
    if (error.response) {
      // 根据请求失败的http状态码去给用户相应的提示
      let tips =
        error.response.status in httpCode ?
          httpCode[error.response.status] :
          error.response.data.message
      Message({
        message: tips,
        type: 'error',
      })
      if (error.response.status === 401) {
        // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
        router.push({
          path: `/login`,
        })
      }
      return Promise.reject(error)
    } else {
      Message({
        message: '请求超时, 请刷新重试',
        type: 'error',
      })
      return Promise.reject(new Error('请求超时, 请刷新重试'))
    }
  }
)

export const request = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      ...config,
    })
      .then((response) => {
        // console.log('response ', response);
        resolve(response)
      })
      .catch((error) => {
        // console.log('error ', error);
        reject(error)
      })
  })
}

export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
      ...config,
    })
      .then((response) => {
        // console.log('response ', response);
        resolve(response)
      })
      .catch((error) => {
        // console.log('error ', error);
        reject(error)
      })
  })
}