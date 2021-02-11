/**
 * @description 封装axios 请求拦截、响应拦截、错误统一处理
 * @date 2021-01-10
 * @author leo-zu
 * */
import axios from 'axios'
import baseUrl from '../config/constant'
import router from '../router/index'
import { Message } from 'element-ui' // 引入全局提示 Toast也是全局提示组件
// import QS from 'qs'
import store from '../store/index'

/**
 * @description 提示函数
 * 禁止点击蒙层，显示一秒后关闭
 */
const tip = msg => {
  Message({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * @description 跳转登录页面
 * 携带当前页面路由，在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * @description 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401：未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403：token过期  清楚token并跳转登录页
    case 403:
      tip('登录过去，请重新登录')
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404 请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 请求超时时间
axios.defaults.withCredentials = true
// post请求时，加上请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // application/json;charset=UTF-8
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Methods'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true'

// 创建服务
const service = axios.create({
  timeout: 1000000, // 请求超时
  baseURL: baseUrl, // url = base url + request url
  withCredentials: true // 当跨域请求时，发送cookies
})

/**
 * @description 请求拦截器
 * 每次请求钱，如果存在token则在请求头中携带token
 */
service.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后，我们可以在响应拦截器中，根据状态码进行一些统一的操作
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  error => {
    Promise.reject(error)
    console.log(error)
  }
)

/**
 * @description 响应拦截器
 */
service.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不是2xx
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg：请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetWork', false)
      console.log('断网了')
    }
  }
)

// 导出
export default service
