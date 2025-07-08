/**
 * API相关类型定义
 */

/**
 * API响应基础结构
 * @typedef {Object} ApiResponse
 * @property {number} code - 状态码
 * @property {string} message - 响应消息
 * @property {*} data - 响应数据
 * @property {boolean} success - 是否成功
 * @property {string} timestamp - 时间戳
 */

/**
 * 分页请求参数
 * @typedef {Object} PaginationParams
 * @property {number} page - 页码
 * @property {number} pageSize - 每页条数
 * @property {string} [sortBy] - 排序字段
 * @property {string} [sortOrder] - 排序方式 ('asc' | 'desc')
 */

/**
 * 分页响应数据
 * @typedef {Object} PaginationResponse
 * @property {Array} list - 数据列表
 * @property {number} total - 总条数
 * @property {number} page - 当前页码
 * @property {number} pageSize - 每页条数
 * @property {number} totalPages - 总页数
 * @property {boolean} hasNext - 是否有下一页
 * @property {boolean} hasPrev - 是否有上一页
 */

/**
 * 请求配置
 * @typedef {Object} RequestConfig
 * @property {string} url - 请求URL
 * @property {string} method - 请求方法
 * @property {Object} [headers] - 请求头
 * @property {*} [data] - 请求数据
 * @property {Object} [params] - URL参数
 * @property {number} [timeout] - 超时时间
 * @property {AbortSignal} [signal] - 取消信号
 */

/**
 * 文件上传参数
 * @typedef {Object} UploadParams
 * @property {File} file - 文件对象
 * @property {string} [filename] - 文件名
 * @property {string} [folder] - 上传目录
 * @property {Object} [meta] - 元数据
 */

/**
 * 文件上传响应
 * @typedef {Object} UploadResponse
 * @property {string} url - 文件URL
 * @property {string} filename - 文件名
 * @property {number} size - 文件大小
 * @property {string} type - 文件类型
 * @property {string} hash - 文件哈希
 */

// HTTP状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

// 请求方法
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}

// 内容类型
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM: 'application/x-www-form-urlencoded',
  MULTIPART: 'multipart/form-data',
  TEXT: 'text/plain'
} 