<template>
  <div class="default-layout">
    <!-- 头部导航 -->
    <AppHeader 
      :collapsed="collapsed"
      @toggle-sidebar="toggleSidebar"
    />
    
    <div class="layout-content">
      <!-- 侧边栏 -->
      <AppSidebar 
        :collapsed="collapsed"
        :menus="menus"
      />
      
      <!-- 主内容区 -->
      <main class="main-content" :class="{ 'sidebar-collapsed': collapsed }">
        <!-- 面包屑导航 -->
        <AppBreadcrumb :items="breadcrumbs" />
        
        <!-- 页面内容 -->
        <div class="page-content">
          <router-view />
        </div>
      </main>
    </div>
    
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppBreadcrumb from './components/AppBreadcrumb.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar,
    AppBreadcrumb,
    AppFooter
  },
  setup() {
    const appStore = useAppStore()
    
    // 侧边栏折叠状态
    const collapsed = computed(() => !appStore.sidebarOpened)
    
    // 切换侧边栏
    const toggleSidebar = () => {
      appStore.toggleSidebar()
    }
    
    // 菜单数据
    const menus = ref([
      {
        id: 'home',
        title: '首页',
        icon: 'home',
        path: '/home'
      },
      {
        id: 'components',
        title: '组件',
        icon: 'component',
        children: [
          {
            id: 'button',
            title: '按钮',
            path: '/components/button'
          },
          {
            id: 'form',
            title: '表单',
            path: '/components/form'
          }
        ]
      }
    ])
    
    // 面包屑数据
    const breadcrumbs = computed(() => appStore.breadcrumbs)
    
    return {
      collapsed,
      toggleSidebar,
      menus,
      breadcrumbs
    }
  }
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  background-color: #f5f5f5;
}

.main-content.sidebar-collapsed {
  margin-left: 64px;
}

.page-content {
  padding: 20px;
  min-height: calc(100vh - 120px);
  background-color: white;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style> 