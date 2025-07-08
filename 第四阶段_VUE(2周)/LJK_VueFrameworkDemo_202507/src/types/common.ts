// 通用类型定义

/**
 * 基础响应结构
 */
export interface BaseResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page: number
  pageSize: number
  total?: number
}

/**
 * 分页响应数据
 */
export interface PaginationResponse<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 排序参数
 */
export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

/**
 * 筛选参数
 */
export interface FilterParams {
  [key: string]: any
}

/**
 * 搜索参数
 */
export interface SearchParams extends PaginationParams {
  keyword?: string
  sort?: SortParams
  filters?: FilterParams
}

/**
 * 选项类型
 */
export interface Option {
  label: string
  value: string | number
  disabled?: boolean
  children?: Option[]
}

/**
 * 键值对类型
 */
export interface KeyValue {
  [key: string]: any
}

/**
 * ID 类型
 */
export type ID = string | number

/**
 * 时间戳类型
 */
export type Timestamp = number

/**
 * 状态类型
 */
export type Status = 'active' | 'inactive' | 'pending' | 'disabled'

/**
 * 主题类型
 */
export type Theme = 'light' | 'dark' | 'auto'

/**
 * 语言类型
 */
export type Language = 'zh-CN' | 'en-US'

/**
 * 尺寸类型
 */
export type Size = 'small' | 'medium' | 'large'

/**
 * 颜色类型
 */
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

/**
 * 位置类型
 */
export type Position = 'top' | 'bottom' | 'left' | 'right'

/**
 * 对齐方式
 */
export type Align = 'left' | 'center' | 'right'

/**
 * 加载状态
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * 文件类型
 */
export interface FileInfo {
  name: string
  size: number
  type: string
  url?: string
  lastModified?: number
}

/**
 * 地址信息
 */
export interface Address {
  province: string
  city: string
  district: string
  detail: string
  zipCode?: string
}

/**
 * 联系方式
 */
export interface Contact {
  phone?: string
  email?: string
  address?: Address
}

/**
 * 树形结构
 */
export interface TreeNode {
  id: ID
  label: string
  children?: TreeNode[]
  parent?: ID
  level?: number
  expanded?: boolean
  selected?: boolean
  disabled?: boolean
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: ID
  label: string
  icon?: string
  path?: string
  children?: MenuItem[]
  disabled?: boolean
  hidden?: boolean
  meta?: KeyValue
}

/**
 * 面包屑项
 */
export interface BreadcrumbItem {
  label: string
  path?: string
  disabled?: boolean
}

/**
 * 标签页
 */
export interface TabItem {
  id: ID
  label: string
  content?: string
  closable?: boolean
  disabled?: boolean
}

/**
 * 通知消息
 */
export interface Notification {
  id: ID
  title: string
  message: string
  type: Color
  duration?: number
  closable?: boolean
  timestamp: Timestamp
}

/**
 * 错误信息
 */
export interface ErrorInfo {
  code: number
  message: string
  details?: string
  timestamp: Timestamp
  stack?: string
}

/**
 * 环境变量
 */
export interface Env {
  NODE_ENV: 'development' | 'production' | 'test'
  BASE_URL: string
  API_URL: string
  [key: string]: any
}

/**
 * 配置项
 */
export interface Config {
  api: {
    baseURL: string
    timeout: number
  }
  app: {
    name: string
    version: string
  }
  [key: string]: any
}

/**
 * 可选类型工具
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 必需类型工具
 */
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 深度只读类型
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
} 