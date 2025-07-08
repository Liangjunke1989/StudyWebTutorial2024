/**
 * 通用类型定义
 */

/**
 * 选项类型
 * @typedef {Object} Option
 * @property {string|number} value - 选项值
 * @property {string} label - 选项标签
 * @property {boolean} [disabled] - 是否禁用
 * @property {*} [data] - 额外数据
 */

/**
 * 树形节点类型
 * @typedef {Object} TreeNode
 * @property {string|number} id - 节点ID
 * @property {string} label - 节点标签
 * @property {string|number} [parentId] - 父节点ID
 * @property {TreeNode[]} [children] - 子节点列表
 * @property {boolean} [disabled] - 是否禁用
 * @property {boolean} [expanded] - 是否展开
 * @property {boolean} [selected] - 是否选中
 * @property {*} [data] - 额外数据
 */

/**
 * 表单字段类型
 * @typedef {Object} FormField
 * @property {string} name - 字段名
 * @property {string} label - 字段标签
 * @property {string} type - 字段类型
 * @property {*} [defaultValue] - 默认值
 * @property {boolean} [required] - 是否必填
 * @property {boolean} [disabled] - 是否禁用
 * @property {string} [placeholder] - 占位符
 * @property {Array} [options] - 选项列表
 * @property {Object} [rules] - 验证规则
 * @property {*} [props] - 额外属性
 */

/**
 * 表格列配置
 * @typedef {Object} TableColumn
 * @property {string} key - 列键名
 * @property {string} title - 列标题
 * @property {string} [dataIndex] - 数据索引
 * @property {number} [width] - 列宽度
 * @property {boolean} [sortable] - 是否可排序
 * @property {boolean} [filterable] - 是否可筛选
 * @property {string} [align] - 对齐方式
 * @property {boolean} [fixed] - 是否固定
 * @property {Function} [render] - 自定义渲染函数
 */

/**
 * 菜单项类型
 * @typedef {Object} MenuItem
 * @property {string} id - 菜单ID
 * @property {string} title - 菜单标题
 * @property {string} [icon] - 图标
 * @property {string} [path] - 路由路径
 * @property {string} [component] - 组件路径
 * @property {boolean} [hidden] - 是否隐藏
 * @property {boolean} [disabled] - 是否禁用
 * @property {MenuItem[]} [children] - 子菜单
 * @property {Object} [meta] - 元信息
 */

/**
 * 面包屑项类型
 * @typedef {Object} BreadcrumbItem
 * @property {string} title - 标题
 * @property {string} [path] - 路径
 * @property {boolean} [disabled] - 是否禁用
 */

/**
 * 标签页类型
 * @typedef {Object} TabItem
 * @property {string} key - 标签键
 * @property {string} title - 标签标题
 * @property {string} path - 路由路径
 * @property {boolean} [closable] - 是否可关闭
 * @property {Object} [meta] - 元信息
 */

// 主题类型
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

// 设备类型
export const DEVICES = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

// 语言类型
export const LANGUAGES = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US'
}

// 排序方式
export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
} 