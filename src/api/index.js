/***
 * @description api接口的统一出口
 * 根据api接口功能 划分为 多个模块 有利于多人协作开发
 */
// 注册或登录接口
import registerOrLogin from './registerOrLogin/registerOrLogin'
import budget from './budget/budget'

// 导出接口
export default {
  registerOrLogin, // 注册或登录接口模块
  budget // 基金预算接口模块
}
