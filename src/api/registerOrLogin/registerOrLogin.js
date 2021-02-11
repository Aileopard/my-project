/**
 * @description 注册和登录接口
 * @date 2021-01-10
 * @author leo-zu
 * */
import http from '../../utils/http'
import base from '../base' // 引入axios封装
import qs from 'qs' // 引入 nup install qs

/**
 * @description 注册接口
 * @type {{register(*=): Promise<AxiosResponse<any>>}}
 */
const register = {
  register (params) {
    return http.post(`${base.common}/register`, qs.stringify(params))
  }
}

/**
 * @description 登录接口
 * @method post
 * @type {{login(*)}}
 */
const login = {
  login (params) {
    console.log('param' + params)
    return http.post(`${base.common}/api/login`, JSON.stringify(params),
      {headers: {'Content-Type': 'application/json;charset=UTF-8'}
      })
  }
}

/**
 * @description 获取用户信息
 * @method get
 * @type {{getUserById(*=): Promise<AxiosResponse<any>>}}
 */
// eslint-disable-next-line no-unused-vars
const getUserById = {
  getUserById (params) {
    console.log('param' + params.id)
    return http.get(`${base.common}/getUserById`, qs.stringify(params.id))
  }
}

export default {
  register, // 注册
  login // 登录
}
