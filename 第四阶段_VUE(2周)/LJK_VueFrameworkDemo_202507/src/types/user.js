/**
 * 用户相关类型定义
 */

/**
 * 用户信息类型
 * @typedef {Object} UserInfo
 * @property {number} id - 用户ID
 * @property {string} username - 用户名
 * @property {string} email - 邮箱
 * @property {string} avatar - 头像URL
 * @property {string} phone - 手机号
 * @property {string} nickname - 昵称
 * @property {string} gender - 性别 ('male' | 'female' | 'other')
 * @property {string} status - 状态 ('active' | 'inactive' | 'banned')
 * @property {string[]} roles - 角色列表
 * @property {string[]} permissions - 权限列表
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */

/**
 * 登录请求参数
 * @typedef {Object} LoginParams
 * @property {string} username - 用户名或邮箱
 * @property {string} password - 密码
 * @property {string} [captcha] - 验证码
 * @property {boolean} [remember] - 记住登录状态
 */

/**
 * 登录响应数据
 * @typedef {Object} LoginResponse
 * @property {string} token - 访问令牌
 * @property {string} refreshToken - 刷新令牌
 * @property {UserInfo} user - 用户信息
 * @property {number} expiresIn - 过期时间（秒）
 */

/**
 * 注册请求参数
 * @typedef {Object} RegisterParams
 * @property {string} username - 用户名
 * @property {string} email - 邮箱
 * @property {string} password - 密码
 * @property {string} confirmPassword - 确认密码
 * @property {string} phone - 手机号
 * @property {string} [captcha] - 验证码
 */

/**
 * 用户更新参数
 * @typedef {Object} UpdateUserParams
 * @property {string} [nickname] - 昵称
 * @property {string} [email] - 邮箱
 * @property {string} [phone] - 手机号
 * @property {string} [avatar] - 头像URL
 * @property {string} [gender] - 性别
 */

/**
 * 修改密码参数
 * @typedef {Object} ChangePasswordParams
 * @property {string} oldPassword - 旧密码
 * @property {string} newPassword - 新密码
 * @property {string} confirmPassword - 确认新密码
 */

// 用户角色枚举
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}

// 用户状态枚举
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned'
}

// 性别枚举
export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other'
} 