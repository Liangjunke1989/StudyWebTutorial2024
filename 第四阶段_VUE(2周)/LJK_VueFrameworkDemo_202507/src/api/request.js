/**
 * HTTP请求封装
 * 基于fetch API的请求库
 */

// 基础配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const TIMEOUT = 10000

/**
 * 请求拦截器
 */
const requestInterceptor = (config) => {
  // 添加认证token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    }
  }
  
  // 添加默认headers
  config.headers = {
    'Content-Type': 'application/json',
    ...config.headers
  }
  
  return config
}

/**
 * 响应拦截器
 */
const responseInterceptor = async (response) => {
  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.status}`)
    error.status = response.status
    error.statusText = response.statusText
    throw error
  }
  
  const data = await response.json()
  
  // 统一处理业务错误
  if (data.code && data.code !== 200) {
    const error = new Error(data.message || '请求失败')
    error.code = data.code
    throw error
  }
  
  return data
}

/**
 * 基础请求方法
 */
const request = async (url, options = {}) => {
  const config = {
    method: 'GET',
    ...options,
    headers: {
      ...options.headers
    }
  }
  
  // 请求拦截
  const interceptedConfig = requestInterceptor(config)
  
  // 处理URL
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  
  // 处理请求体
  if (config.data && config.method !== 'GET') {
    config.body = JSON.stringify(config.data)
  }
  
  try {
    const response = await fetch(fullUrl, {
      ...interceptedConfig,
      signal: AbortSignal.timeout(TIMEOUT)
    })
    
    return await responseInterceptor(response)
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

// 常用请求方法
request.get = (url, params, options) => {
  const searchParams = new URLSearchParams(params)
  const fullUrl = params ? `${url}?${searchParams}` : url
  return request(fullUrl, { ...options, method: 'GET' })
}

request.post = (url, data, options) => {
  return request(url, { ...options, method: 'POST', data })
}

request.put = (url, data, options) => {
  return request(url, { ...options, method: 'PUT', data })
}

request.delete = (url, options) => {
  return request(url, { ...options, method: 'DELETE' })
}

export default request 