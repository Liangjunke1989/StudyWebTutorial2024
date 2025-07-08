// 配置文件入口
// 根据环境变量导出不同的配置

import development from './env/development'
import production from './env/production'
import testing from './env/testing'

// 环境配置映射
const configs = {
  development,
  production,
  testing
}

// 获取当前环境
const env = import.meta.env.MODE || 'development'

// 导出当前环境的配置
const config = configs[env] || configs.development

// 通用配置
const commonConfig = {
  // 应用信息
  app: {
    name: 'Vue Demo App',
    version: '1.0.0',
    description: '基于 Vue 3 的企业级应用示例'
  },

  // 存储配置
  storage: {
    prefix: 'vue_demo_',
    keys: {
      token: 'auth_token',
      userInfo: 'user_info',
      settings: 'user_settings',
      theme: 'app_theme',
      language: 'app_language'
    }
  },

  // 分页配置
  pagination: {
    defaultPageSize: 10,
    pageSizes: [10, 20, 50, 100],
    showSizeChanger: true,
    showQuickJumper: true
  },

  // 上传配置
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    acceptTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxCount: 5
  },

  // 表格配置
  table: {
    defaultPageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: true
  },

  // 主题配置
  theme: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    info: '#1890ff'
  },

  // 国际化配置
  i18n: {
    defaultLocale: 'zh-CN',
    fallbackLocale: 'en-US',
    availableLocales: ['zh-CN', 'en-US']
  },

  // 路由配置
  router: {
    mode: 'history',
    base: '/',
    scrollBehavior: true
  },

  // 缓存配置
  cache: {
    timeout: 5 * 60 * 1000, // 5分钟
    maxAge: 30 * 60 * 1000, // 30分钟
    storage: 'localStorage' // localStorage | sessionStorage
  },

  // 请求配置
  request: {
    timeout: 10000,
    retryCount: 3,
    retryDelay: 1000
  },

  // 日志配置
  log: {
    level: env === 'production' ? 'error' : 'debug',
    console: env !== 'production',
    remote: env === 'production'
  },

  // 性能监控
  performance: {
    enable: env === 'production',
    sampleRate: 0.1, // 10% 采样率
    maxEntries: 100
  },

  // 错误监控
  errorTracking: {
    enable: env === 'production',
    dsn: '', // Sentry DSN
    environment: env
  }
}

// 合并配置
export default {
  ...commonConfig,
  ...config,
  env
}

// 导出环境检查函数
export const isDevelopment = () => env === 'development'
export const isProduction = () => env === 'production'
export const isTesting = () => env === 'testing'

// 导出配置获取函数
export const getConfig = (key, defaultValue = null) => {
  const keys = key.split('.')
  let result = { ...commonConfig, ...config }
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k]
    } else {
      return defaultValue
    }
  }
  
  return result
} 