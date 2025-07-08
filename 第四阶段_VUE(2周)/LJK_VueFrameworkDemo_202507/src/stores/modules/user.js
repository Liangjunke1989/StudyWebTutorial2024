/**
 * 用户状态管理模块
 */

import { defineStore } from 'pinia'
import { userApi } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    userInfo: null,
    // 认证token
    token: localStorage.getItem('token') || '',
    // 用户权限
    permissions: [],
    // 用户角色
    roles: [],
    // 登录状态
    isLoggedIn: false
  }),

  getters: {
    // 是否已登录
    isAuthenticated: (state) => !!state.token,
    // 是否是管理员
    isAdmin: (state) => state.roles.includes('admin'),
    // 用户头像
    avatar: (state) => state.userInfo?.avatar || '/default-avatar.png',
    // 用户名称
    username: (state) => state.userInfo?.username || '未知用户',
    // 用户邮箱
    email: (state) => state.userInfo?.email || ''
  },

  actions: {
    // 设置token
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },

    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      this.permissions = userInfo.permissions || []
      this.roles = userInfo.roles || []
      this.isLoggedIn = true
    },

    // 用户登录
    async login(credentials) {
      try {
        const response = await userApi.login(credentials)
        const { token, user } = response.data
        
        this.setToken(token)
        this.setUserInfo(user)
        
        return response
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const response = await userApi.getUserInfo()
        this.setUserInfo(response.data)
        return response
      } catch (error) {
        console.error('Fetch user info failed:', error)
        // 如果获取用户信息失败，清除登录状态
        this.logout()
        throw error
      }
    },

    // 用户登出
    async logout() {
      try {
        if (this.token) {
          await userApi.logout()
        }
      } catch (error) {
        console.error('Logout failed:', error)
      } finally {
        // 清理状态
        this.token = ''
        this.userInfo = null
        this.permissions = []
        this.roles = []
        this.isLoggedIn = false
        
        // 清理本地存储
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },

    // 更新用户信息
    async updateUserInfo(userInfo) {
      try {
        const response = await userApi.updateUserInfo(userInfo)
        this.setUserInfo(response.data)
        return response
      } catch (error) {
        console.error('Update user info failed:', error)
        throw error
      }
    },

    // 检查权限
    hasPermission(permission) {
      return this.permissions.includes(permission)
    },

    // 检查角色
    hasRole(role) {
      return this.roles.includes(role)
    },

    // 重置状态
    resetState() {
      this.$reset()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  // 持久化配置
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['userInfo', 'token', 'permissions', 'roles', 'isLoggedIn']
  }
}) 