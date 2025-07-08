/**
 * API层主入口文件
 * 统一管理所有API接口
 */

import request from './request'
import * as userApi from './modules/user'
import * as commonApi from './modules/common'

// 导出所有API模块
export {
  request,
  userApi,
  commonApi
}

// 默认导出
export default {
  request,
  user: userApi,
  common: commonApi
} 