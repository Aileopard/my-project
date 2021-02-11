/**
 * @description 预算接口模块
 */
import http from '../../utils/http'
import base from '../base' // 引入axios封装
// import str from 'str'
// import qs from 'qs' // 引入 nup install qs

const budgetModel = {
  getALLDeptInfo (param) {
    // 后端使用@RequestBody，前端请求头必须为json，并且请求参数要转换为json字符串
    var b = {imCustNo: param}
    return http.post(`${base.common}/api/getCorpByImCustNo`, b,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
  },
  saveBudgetDeptInfo (param) {
    return http.post(`${base.common}/api/saveBudgetDeptInfo`, JSON.stringify(param),
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
  }
}

export default {
  budgetModel
}
