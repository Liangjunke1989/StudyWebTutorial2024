/**
 * 设置状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 状态
  const theme = ref('light')
  const language = ref('zh-CN')
  const sidebarCollapsed = ref(false)
  const notifications = ref({
    email: true,
    push: true,
    sms: false,
    marketing: false
  })
  const layout = ref({
    fixedHeader: true,
    fixedSidebar: true,
    showBreadcrumb: true,
    showTags: true
  })
  const appearance = ref({
    colorScheme: 'blue',
    fontSize: 'medium',
    borderRadius: 'medium'
  })

  // 计算属性
  const isDarkMode = computed(() => theme.value === 'dark')
  const isLightMode = computed(() => theme.value === 'light')
  const currentLanguage = computed(() => language.value)
  const isSidebarCollapsed = computed(() => sidebarCollapsed.value)

  // 动作
  const setTheme = (newTheme) => {
    theme.value = newTheme
    // 更新 DOM 的 data-theme 属性
    document.documentElement.setAttribute('data-theme', newTheme)
    // 保存到本地存储
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const setLanguage = (newLanguage) => {
    language.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed.value))
  }

  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed))
  }

  const updateNotifications = (newNotifications) => {
    notifications.value = { ...notifications.value, ...newNotifications }
    localStorage.setItem('notifications', JSON.stringify(notifications.value))
  }

  const updateLayout = (newLayout) => {
    layout.value = { ...layout.value, ...newLayout }
    localStorage.setItem('layout', JSON.stringify(layout.value))
  }

  const updateAppearance = (newAppearance) => {
    appearance.value = { ...appearance.value, ...newAppearance }
    localStorage.setItem('appearance', JSON.stringify(appearance.value))
  }

  const resetSettings = () => {
    theme.value = 'light'
    language.value = 'zh-CN'
    sidebarCollapsed.value = false
    notifications.value = {
      email: true,
      push: true,
      sms: false,
      marketing: false
    }
    layout.value = {
      fixedHeader: true,
      fixedSidebar: true,
      showBreadcrumb: true,
      showTags: true
    }
    appearance.value = {
      colorScheme: 'blue',
      fontSize: 'medium',
      borderRadius: 'medium'
    }
    
    // 清除本地存储
    localStorage.removeItem('theme')
    localStorage.removeItem('language')
    localStorage.removeItem('sidebarCollapsed')
    localStorage.removeItem('notifications')
    localStorage.removeItem('layout')
    localStorage.removeItem('appearance')
    
    // 更新 DOM
    document.documentElement.setAttribute('data-theme', 'light')
  }

  const initSettings = () => {
    // 从本地存储加载设置
    const savedTheme = localStorage.getItem('theme')
    const savedLanguage = localStorage.getItem('language')
    const savedSidebarCollapsed = localStorage.getItem('sidebarCollapsed')
    const savedNotifications = localStorage.getItem('notifications')
    const savedLayout = localStorage.getItem('layout')
    const savedAppearance = localStorage.getItem('appearance')

    if (savedTheme) {
      theme.value = savedTheme
      document.documentElement.setAttribute('data-theme', savedTheme)
    }

    if (savedLanguage) {
      language.value = savedLanguage
    }

    if (savedSidebarCollapsed) {
      sidebarCollapsed.value = JSON.parse(savedSidebarCollapsed)
    }

    if (savedNotifications) {
      notifications.value = JSON.parse(savedNotifications)
    }

    if (savedLayout) {
      layout.value = JSON.parse(savedLayout)
    }

    if (savedAppearance) {
      appearance.value = JSON.parse(savedAppearance)
    }
  }

  const exportSettings = () => {
    return {
      theme: theme.value,
      language: language.value,
      sidebarCollapsed: sidebarCollapsed.value,
      notifications: notifications.value,
      layout: layout.value,
      appearance: appearance.value
    }
  }

  const importSettings = (settings) => {
    if (settings.theme) setTheme(settings.theme)
    if (settings.language) setLanguage(settings.language)
    if (typeof settings.sidebarCollapsed === 'boolean') setSidebarCollapsed(settings.sidebarCollapsed)
    if (settings.notifications) updateNotifications(settings.notifications)
    if (settings.layout) updateLayout(settings.layout)
    if (settings.appearance) updateAppearance(settings.appearance)
  }

  return {
    // 状态
    theme,
    language,
    sidebarCollapsed,
    notifications,
    layout,
    appearance,
    
    // 计算属性
    isDarkMode,
    isLightMode,
    currentLanguage,
    isSidebarCollapsed,
    
    // 动作
    setTheme,
    toggleTheme,
    setLanguage,
    toggleSidebar,
    setSidebarCollapsed,
    updateNotifications,
    updateLayout,
    updateAppearance,
    resetSettings,
    initSettings,
    exportSettings,
    importSettings
  }
}) 