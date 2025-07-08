// 测试环境配置
export default {
  // API 配置
  api: {
    baseURL: 'http://test-api.example.com',
    timeout: 10000,
    withCredentials: true
  },

  // 数据库配置（如果需要）
  database: {
    host: 'test-db.example.com',
    port: 3306,
    name: 'vue_demo_test'
  },

  // 日志配置
  log: {
    level: 'info',
    console: true,
    remote: true
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
    enable: true,
    sampleRate: 0.5, // 50% 采样率
    maxEntries: 50
  },

  // 错误监控
  errorTracking: {
    enable: true,
    dsn: 'https://your-sentry-dsn@sentry.io/test-project-id',
    environment: 'testing',
    sampleRate: 1.0,
    tracesSampleRate: 0.5
  },

  // 缓存配置
  cache: {
    timeout: 2 * 60 * 1000, // 2分钟
    maxAge: 10 * 60 * 1000, // 10分钟
    storage: 'sessionStorage'
  },

  // 模拟数据
  mock: {
    enabled: true,
    delay: 200 // 较短的模拟延迟
  },

  // 测试配置
  test: {
    enabled: true,
    coverage: true,
    e2e: true,
    unit: true
  },

  // 代理配置
  proxy: {
    '/api': {
      target: 'http://test-api.example.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },

  // 开发服务器配置
  devServer: {
    host: 'localhost',
    port: 5174,
    open: false,
    cors: true
  },

  // 测试数据配置
  testData: {
    enabled: true,
    autoGenerate: true,
    seedData: true
  }
} 