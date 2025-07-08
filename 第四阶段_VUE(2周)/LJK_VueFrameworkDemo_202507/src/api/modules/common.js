/**
 * 通用API模块
 */

import request from '../request'

// 获取系统配置
export const getSystemConfig = () => {
  return request.get('/api/common/config')
}

// 文件上传
export const uploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return request('/api/common/upload', {
    method: 'POST',
    body: formData,
    headers: {} // 让浏览器自动设置Content-Type
  })
}

// 获取字典数据
export const getDictData = (type) => {
  return request.get('/api/common/dict', { type })
}

// 发送短信验证码
export const sendSmsCode = (phone) => {
  return request.post('/api/common/sms', { phone })
}

// 获取地区数据
export const getRegionData = (parentId = 0) => {
  return request.get('/api/common/region', { parentId })
} 