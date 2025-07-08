// 生产环境配置
export default {
  // API 配置
  api: {
    baseURL: 'https://api.example.com',
    timeout: 15000,
    withCredentials: false
  },

  // 数据库配置（如果需要）
  database: {
    host: 'prod-db.example.com',
    port: 3306,
    name: 'vue_demo_prod'
  },

  // 日志配置
  log: {
    level: 'error',
    console: false,
    remote: true
  },

  // 调试配置
  debug: {
    enabled: false,
    showDevTools: false,
    logRequests: false,
    logResponses: false,
    logErrors: true
  },

  // 性能监控
  performance: {
    enable: true,
    sampleRate: 0.1, // 10% 采样率
    maxEntries: 100
  },

  // 错误监控
  errorTracking: {
    enable: true,
    dsn: 'https://your-sentry-dsn@sentry.io/project-id',
    environment: 'production',
    sampleRate: 1.0,
    tracesSampleRate: 0.1
  },

  // 缓存配置
  cache: {
    timeout: 10 * 60 * 1000, // 10分钟
    maxAge: 60 * 60 * 1000, // 1小时
    storage: 'localStorage'
  },

  // 模拟数据
  mock: {
    enabled: false,
    delay: 0
  },

  // CDN 配置
  cdn: {
    enabled: true,
    domain: 'https://cdn.example.com',
    version: '1.0.0'
  },

  // 安全配置
  security: {
    enableCSP: true,
    enableHTTPS: true,
    enableHSTS: true
  },

  // 压缩配置
  compression: {
    enabled: true,
    algorithm: 'gzip',
    threshold: 1024
  },

  // 静态资源配置
  assets: {
    publicPath: 'https://cdn.example.com/assets/',
    version: '1.0.0',
    cacheBusting: true
  },

  // 分析配置
  analytics: {
    enabled: true,
    trackingId: 'GA-TRACKING-ID',
    anonymizeIp: true
  },

  // 服务端渲染配置（如果使用）
  ssr: {
    enabled: false,
    port: 3000,
    host: '0.0.0.0'
  }
} 