/**
 * 用户相关API
 */

import request from '../request'

// 用户登录
export const login = (data) => {
  return request.post('/api/user/login', data)
}

// 用户注册
export const register = (data) => {
  return request.post('/api/user/register', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/api/user/info')
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request.put('/api/user/info', data)
}

// 用户登出
export const logout = () => {
  return request.post('/api/user/logout')
}

// 修改密码
export const changePassword = (data) => {
  return request.put('/api/user/password', data)
} 