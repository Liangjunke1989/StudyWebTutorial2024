/**
 * 应用状态管理模块
 */

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 侧边栏状态
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    // 设备类型
    device: 'desktop', // desktop, tablet, mobile
    // 主题
    theme: 'light', // light, dark
    // 语言
    language: 'zh-CN',
    // 页面加载状态
    loading: false,
    // 全局错误信息
    error: null,
    // 应用配置
    config: {
      title: 'LJK_VueFrameworkDemo_202507',
      version: '1.0.0',
      author: 'LJK',
      description: 'Vue 3 学习项目'
    },
    // 面包屑导航
    breadcrumbs: [],
    // 标签页
    tabs: []
  }),

  getters: {
    // 是否移动端
    isMobile: (state) => state.device === 'mobile',
    // 是否平板
    isTablet: (state) => state.device === 'tablet',
    // 是否桌面端
    isDesktop: (state) => state.device === 'desktop',
    // 是否暗色主题
    isDark: (state) => state.theme === 'dark',
    // 侧边栏是否打开
    sidebarOpened: (state) => state.sidebar.opened
  },

  actions: {
    // 切换侧边栏
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },

    // 关闭侧边栏
    closeSidebar(withoutAnimation = false) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },

    // 打开侧边栏
    openSidebar(withoutAnimation = false) {
      this.sidebar.opened = true
      this.sidebar.withoutAnimation = withoutAnimation
    },

    // 设置设备类型
    setDevice(device) {
      this.device = device
    },

    // 切换主题
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      // 应用主题到document
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    // 设置主题
    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute('data-theme', theme)
    },

    // 设置语言
    setLanguage(language) {
      this.language = language
    },

    // 设置加载状态
    setLoading(loading) {
      this.loading = loading
    },

    // 设置错误信息
    setError(error) {
      this.error = error
    },

    // 清除错误信息
    clearError() {
      this.error = null
    },

    // 设置面包屑
    setBreadcrumbs(breadcrumbs) {
      this.breadcrumbs = breadcrumbs
    },

    // 添加标签页
    addTab(tab) {
      const existingTab = this.tabs.find(t => t.path === tab.path)
      if (!existingTab) {
        this.tabs.push(tab)
      }
    },

    // 移除标签页
    removeTab(path) {
      const index = this.tabs.findIndex(t => t.path === path)
      if (index > -1) {
        this.tabs.splice(index, 1)
      }
    },

    // 清除所有标签页
    clearTabs() {
      this.tabs = []
    },

    // 初始化应用
    initApp() {
      // 设置主题
      const savedTheme = localStorage.getItem('theme') || 'light'
      this.setTheme(savedTheme)

      // 设置语言
      const savedLanguage = localStorage.getItem('language') || 'zh-CN'
      this.setLanguage(savedLanguage)

      // 检测设备类型
      this.detectDevice()
    },

    // 检测设备类型
    detectDevice() {
      const width = window.innerWidth
      if (width < 768) {
        this.setDevice('mobile')
      } else if (width < 1024) {
        this.setDevice('tablet')
      } else {
        this.setDevice('desktop')
      }
    }
  },

  // 持久化配置
  persist: {
    key: 'app-store',
    storage: localStorage,
    paths: ['sidebar', 'theme', 'language']
  }
})
