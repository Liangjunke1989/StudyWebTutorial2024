/**
 * 数据格式化工具函数
 */

/**
 * 格式化数字，添加千分位分隔符
 * @param {number} num - 要格式化的数字
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的数字字符串
 */
export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0'
  }
  
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * 格式化货币
 * @param {number} amount - 金额
 * @param {string} currency - 货币符号
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的货币字符串
 */
export const formatCurrency = (amount, currency = '¥', decimals = 2) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0.00`
  }
  
  const formatted = formatNumber(amount, decimals)
  return `${currency}${formatted}`
}

/**
 * 格式化百分比
 * @param {number} value - 数值
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的百分比字符串
 */
export const formatPercent = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%'
  }
  
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}

/**
 * 格式化时间
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式化字符串
 * @returns {string} 格式化后的时间字符串
 */
export const formatTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化相对时间
 * @param {Date|string|number} date - 日期
 * @returns {string} 相对时间字符串
 */
export const formatRelativeTime = (date) => {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = day * 365
  
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < month) {
    return `${Math.floor(diff / week)}周前`
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`
  } else {
    return `${Math.floor(diff / year)}年前`
  }
}

/**
 * 格式化手机号
 * @param {string} phone - 手机号
 * @returns {string} 格式化后的手机号
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  }
  
  return phone
}

/**
 * 格式化身份证号
 * @param {string} idCard - 身份证号
 * @param {boolean} mask - 是否脱敏
 * @returns {string} 格式化后的身份证号
 */
export const formatIdCard = (idCard, mask = false) => {
  if (!idCard) return ''
  
  if (mask) {
    return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
  }
  
  return idCard.replace(/(\d{6})(\d{8})(\d{4})/, '$1 $2 $3')
}

/**
 * 格式化银行卡号
 * @param {string} cardNumber - 银行卡号
 * @param {boolean} mask - 是否脱敏
 * @returns {string} 格式化后的银行卡号
 */
export const formatBankCard = (cardNumber, mask = false) => {
  if (!cardNumber) return ''
  
  const cleaned = cardNumber.replace(/\D/g, '')
  
  if (mask) {
    return cleaned.replace(/(\d{4})\d+(\d{4})/, '$1 **** **** $2')
  }
  
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * 格式化地址
 * @param {object} address - 地址对象
 * @returns {string} 格式化后的地址字符串
 */
export const formatAddress = (address) => {
  if (!address) return ''
  
  const { province, city, district, detail } = address
  
  return [province, city, district, detail]
    .filter(Boolean)
    .join(' ')
}

/**
 * 格式化姓名（脱敏）
 * @param {string} name - 姓名
 * @returns {string} 脱敏后的姓名
 */
export const formatNameMask = (name) => {
  if (!name) return ''
  
  if (name.length <= 2) {
    return name.charAt(0) + '*'
  }
  
  return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1)
}

/**
 * 格式化邮箱（脱敏）
 * @param {string} email - 邮箱
 * @returns {string} 脱敏后的邮箱
 */
export const formatEmailMask = (email) => {
  if (!email) return ''
  
  const [username, domain] = email.split('@')
  if (!username || !domain) return email
  
  const maskedUsername = username.charAt(0) + '*'.repeat(Math.max(0, username.length - 2)) + username.charAt(username.length - 1)
  
  return `${maskedUsername}@${domain}`
}

/**
 * 格式化数组为字符串
 * @param {Array} arr - 数组
 * @param {string} separator - 分隔符
 * @returns {string} 格式化后的字符串
 */
export const formatArray = (arr, separator = ', ') => {
  if (!Array.isArray(arr)) return ''
  
  return arr.filter(Boolean).join(separator)
}

/**
 * 格式化对象为查询字符串
 * @param {object} obj - 对象
 * @returns {string} 查询字符串
 */
export const formatQuery = (obj) => {
  if (!obj || typeof obj !== 'object') return ''
  
  const params = new URLSearchParams()
  
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (value !== null && value !== undefined && value !== '') {
      params.append(key, String(value))
    }
  })
  
  return params.toString()
} 