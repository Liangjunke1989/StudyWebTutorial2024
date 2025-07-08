// 开发环境配置
export default {
  // API 配置
  api: {
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    withCredentials: true
  },

  // 数据库配置（如果需要）
  database: {
    host: 'localhost',
    port: 3306,
    name: 'vue_demo_dev'
  },

  // 日志配置
  log: {
    level: 'debug',
    console: true,
    remote: false
  },

  // 调试配置
  debug: {
    enabled: true,
    showDevTools: true,
    logRequests: true,
    logResponses: true,
    logErrors: true
  },

  // 性能监控
  performance: {
    enable: false,
    sampleRate: 1.0 // 100% 采样率
  },

  // 错误监控
  errorTracking: {
    enable: false,
    dsn: '',
    environment: 'development'
  },

  // 缓存配置
  cache: {
    timeout: 1 * 60 * 1000, // 1分钟
    maxAge: 5 * 60 * 1000, // 5分钟
    storage: 'sessionStorage' // 开发环境使用 sessionStorage
  },

  // 模拟数据
  mock: {
    enabled: true,
    delay: 500 // 模拟网络延迟
  },

  // 热重载配置
  hmr: {
    enabled: true,
    port: 24678
  },

  // 代理配置
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },

  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: 5173,
    open: true,
    cors: true
  }
} 