/**
 * 认证相关的Composable
 */

import { ref, computed } from 'vue'
import { userApi } from '@/api'

const user = ref(null)
const token = ref(localStorage.getItem('token'))
const isLoading = ref(false)

export function useAuth() {
  // 计算属性
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  
  // 登录
  const login = async (credentials) => {
    try {
      isLoading.value = true
      const response = await userApi.login(credentials)
      
      token.value = response.data.token
      user.value = response.data.user
      
      // 存储到localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  // 登出
  const logout = async () => {
    try {
      await userApi.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      // 清理本地数据
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
  
  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await userApi.getUserInfo()
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return response
    } catch (error) {
      console.error('Fetch user info failed:', error)
      throw error
    }
  }
  
  // 初始化用户信息
  const initAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Parse stored user failed:', error)
        localStorage.removeItem('user')
      }
    }
  }
  
  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    fetchUserInfo,
    initAuth
  }
} 