<template>
  <header class="app-header">
    <div class="header-left">
      <!-- 菜单切换按钮 -->
      <button 
        class="menu-toggle"
        @click="$emit('toggle-sidebar')"
      >
        <span class="menu-icon">☰</span>
      </button>
      
      <!-- Logo -->
      <div class="logo">
        <img src="/vite.svg" alt="Logo" />
        <span class="title">StudyVueDemo</span>
      </div>
    </div>
    
    <div class="header-center">
      <!-- 搜索框 -->
      <div class="search-box">
        <input 
          type="text" 
          placeholder="搜索..."
          v-model="searchKeyword"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          🔍
        </button>
      </div>
    </div>
    
    <div class="header-right">
      <!-- 主题切换 -->
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
      
      <!-- 通知 -->
      <div class="notification">
        <button class="notification-btn">
          🔔
          <span class="badge" v-if="notificationCount > 0">
            {{ notificationCount }}
          </span>
        </button>
      </div>
      
      <!-- 用户菜单 -->
      <div class="user-menu">
        <div class="user-avatar" @click="toggleUserMenu">
          <img :src="userAvatar" :alt="username" />
        </div>
        
        <!-- 用户下拉菜单 -->
        <div class="user-dropdown" v-show="showUserMenu">
          <div class="user-info">
            <div class="username">{{ username }}</div>
            <div class="user-email">{{ userEmail }}</div>
          </div>
          <hr />
          <ul class="menu-list">
            <li @click="goToProfile">个人资料</li>
            <li @click="goToSettings">设置</li>
            <li @click="handleLogout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/stores'

export default {
  name: 'AppHeader',
  emits: ['toggle-sidebar'],
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const userStore = useUserStore()
    
    // 搜索相关
    const searchKeyword = ref('')
    
    // 用户菜单
    const showUserMenu = ref(false)
    
    // 通知数量
    const notificationCount = ref(3)
    
    // 计算属性
    const isDark = computed(() => appStore.isDark)
    const username = computed(() => userStore.username)
    const userEmail = computed(() => userStore.email)
    const userAvatar = computed(() => userStore.avatar)
    
    // 方法
    const toggleTheme = () => {
      appStore.toggleTheme()
    }
    
    const handleSearch = () => {
      if (searchKeyword.value.trim()) {
        router.push({
          path: '/search',
          query: { q: searchKeyword.value }
        })
      }
    }
    
    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }
    
    const goToProfile = () => {
      router.push('/profile')
      showUserMenu.value = false
    }
    
    const goToSettings = () => {
      router.push('/settings')
      showUserMenu.value = false
    }
    
    const handleLogout = async () => {
      await userStore.logout()
      router.push('/login')
      showUserMenu.value = false
    }
    
    return {
      searchKeyword,
      showUserMenu,
      notificationCount,
      isDark,
      username,
      userEmail,
      userAvatar,
      toggleTheme,
      handleSearch,
      toggleUserMenu,
      goToProfile,
      goToSettings,
      handleLogout
    }
  }
}
</script>

<style scoped>
.app-header {
  height: 64px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
}

.menu-toggle:hover {
  background-color: #f5f5f5;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: 0 20px;
}

.search-box {
  display: flex;
  width: 100%;
  max-width: 300px;
}

.search-box input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px 0 0 4px;
  outline: none;
}

.search-btn {
  padding: 8px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
}

.theme-toggle:hover {
  background-color: #f5f5f5;
}

.notification {
  position: relative;
}

.notification-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  position: relative;
}

.notification-btn:hover {
  background-color: #f5f5f5;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff4d4f;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.user-menu {
  position: relative;
}

.user-avatar {
  cursor: pointer;
}

.user-avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1001;
  margin-top: 8px;
}

.user-info {
  padding: 16px;
}

.username {
  font-weight: bold;
  margin-bottom: 4px;
}

.user-email {
  color: #666;
  font-size: 14px;
}

.menu-list {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

.menu-list li {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-list li:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .header-center {
    display: none;
  }
  
  .title {
    display: none;
  }
}
</style> 