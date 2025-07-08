/**
 * 数据验证工具函数
 */

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式（中国）
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号码（中国）
 * @param {string} idCard - 身份证号码
 * @returns {boolean} 是否有效
 */
export const isValidIdCard = (idCard) => {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 验证URL格式
 * @param {string} url - URL地址
 * @returns {boolean} 是否有效
 */
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证IP地址格式
 * @param {string} ip - IP地址
 * @returns {boolean} 是否有效
 */
export const isValidIP = (ip) => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

/**
 * 验证密码强度
 * @param {string} password - 密码
 * @returns {object} 验证结果
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    score: 0,
    feedback: []
  }

  if (!password) {
    result.feedback.push('密码不能为空')
    return result
  }

  if (password.length < 8) {
    result.feedback.push('密码长度至少8位')
  } else {
    result.score += 1
  }

  if (!/[a-z]/.test(password)) {
    result.feedback.push('密码需包含小写字母')
  } else {
    result.score += 1
  }

  if (!/[A-Z]/.test(password)) {
    result.feedback.push('密码需包含大写字母')
  } else {
    result.score += 1
  }

  if (!/\d/.test(password)) {
    result.feedback.push('密码需包含数字')
  } else {
    result.score += 1
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.feedback.push('密码需包含特殊字符')
  } else {
    result.score += 1
  }

  result.isValid = result.score >= 3
  return result
}

/**
 * 验证中文姓名
 * @param {string} name - 姓名
 * @returns {boolean} 是否有效
 */
export const isValidChineseName = (name) => {
  const nameRegex = /^[\u4e00-\u9fa5]{2,4}$/
  return nameRegex.test(name)
}

/**
 * 验证银行卡号
 * @param {string} cardNumber - 银行卡号
 * @returns {boolean} 是否有效
 */
export const isValidBankCard = (cardNumber) => {
  const cardRegex = /^\d{16,19}$/
  if (!cardRegex.test(cardNumber)) return false

  // Luhn算法验证
  let sum = 0
  let alternate = false
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let n = parseInt(cardNumber.charAt(i), 10)
    if (alternate) {
      n *= 2
      if (n > 9) n = (n % 10) + 1
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

/**
 * 验证数字范围
 * @param {number} value - 数值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 是否在范围内
 */
export const isInRange = (value, min, max) => {
  return value >= min && value <= max
}

/**
 * 验证字符串长度
 * @param {string} str - 字符串
 * @param {number} minLength - 最小长度
 * @param {number} maxLength - 最大长度
 * @returns {boolean} 是否在长度范围内
 */
export const isValidLength = (str, minLength, maxLength) => {
  const length = str ? str.length : 0
  return length >= minLength && length <= maxLength
}

/**
 * 验证必填字段
 * @param {any} value - 值
 * @returns {boolean} 是否有效
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

/**
 * 验证正整数
 * @param {any} value - 值
 * @returns {boolean} 是否为正整数
 */
export const isPositiveInteger = (value) => {
  return /^[1-9]\d*$/.test(value)
}

/**
 * 验证非负整数
 * @param {any} value - 值
 * @returns {boolean} 是否为非负整数
 */
export const isNonNegativeInteger = (value) => {
  return /^(0|[1-9]\d*)$/.test(value)
}

/**
 * 验证数字
 * @param {any} value - 值
 * @returns {boolean} 是否为数字
 */
export const isNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

/**
 * 验证日期格式
 * @param {string} date - 日期字符串
 * @param {string} format - 日期格式，默认 'YYYY-MM-DD'
 * @returns {boolean} 是否有效
 */
export const isValidDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return false
  
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return false
  
  // 简单的格式验证
  if (format === 'YYYY-MM-DD') {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
  }
  
  return true
}

/**
 * 验证时间格式
 * @param {string} time - 时间字符串
 * @returns {boolean} 是否有效
 */
export const isValidTime = (time) => {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)
}

/**
 * 验证颜色值（十六进制）
 * @param {string} color - 颜色值
 * @returns {boolean} 是否有效
 */
export const isValidHexColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

/**
 * 表单验证器
 */
export class FormValidator {
  constructor() {
    this.rules = {}
    this.errors = {}
  }

  /**
   * 添加验证规则
   * @param {string} field - 字段名
   * @param {Array} rules - 验证规则数组
   */
  addRule(field, rules) {
    this.rules[field] = rules
  }

  /**
   * 验证单个字段
   * @param {string} field - 字段名
   * @param {any} value - 字段值
   * @returns {boolean} 是否通过验证
   */
  validateField(field, value) {
    const fieldRules = this.rules[field]
    if (!fieldRules) return true

    this.errors[field] = []

    for (const rule of fieldRules) {
      const { validator, message } = rule
      if (!validator(value)) {
        this.errors[field].push(message)
      }
    }

    return this.errors[field].length === 0
  }

  /**
   * 验证所有字段
   * @param {object} data - 数据对象
   * @returns {boolean} 是否通过验证
   */
  validate(data) {
    let isValid = true
    this.errors = {}

    for (const field in this.rules) {
      const fieldValid = this.validateField(field, data[field])
      if (!fieldValid) {
        isValid = false
      }
    }

    return isValid
  }

  /**
   * 获取错误信息
   * @param {string} field - 字段名
   * @returns {Array} 错误信息数组
   */
  getErrors(field) {
    return this.errors[field] || []
  }

  /**
   * 获取所有错误信息
   * @returns {object} 所有错误信息
   */
  getAllErrors() {
    return this.errors
  }

  /**
   * 清除错误信息
   * @param {string} field - 字段名，不传则清除所有
   */
  clearErrors(field) {
    if (field) {
      delete this.errors[field]
    } else {
      this.errors = {}
    }
  }
}

/**
 * 创建验证器实例
 * @returns {FormValidator} 验证器实例
 */
export const createValidator = () => {
  return new FormValidator()
} 