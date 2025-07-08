<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed }">
    <div class="sidebar-header">
      <div class="logo">
        <img src="/vite.svg" alt="Logo" v-if="!collapsed" />
        <span v-if="!collapsed">Vue App</span>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="nav-menu">
        <li 
          v-for="menu in menus" 
          :key="menu.id"
          class="nav-item"
          :class="{ 'has-children': menu.children }"
        >
          <router-link 
            v-if="!menu.children" 
            :to="menu.path"
            class="nav-link"
            :class="{ active: isActive(menu.path) }"
          >
            <span class="nav-icon">{{ getIcon(menu.icon) }}</span>
            <span class="nav-text" v-if="!collapsed">{{ menu.title }}</span>
          </router-link>
          
          <div v-else class="nav-group">
            <div 
              class="nav-group-title"
              @click="toggleGroup(menu.id)"
              :class="{ active: expandedGroups.includes(menu.id) }"
            >
              <span class="nav-icon">{{ getIcon(menu.icon) }}</span>
              <span class="nav-text" v-if="!collapsed">{{ menu.title }}</span>
              <span class="nav-arrow" v-if="!collapsed">
                {{ expandedGroups.includes(menu.id) ? '▼' : '▶' }}
              </span>
            </div>
            
            <ul 
              v-if="!collapsed && expandedGroups.includes(menu.id)"
              class="nav-submenu"
            >
              <li v-for="child in menu.children" :key="child.id">
                <router-link 
                  :to="child.path"
                  class="nav-link submenu-link"
                  :class="{ active: isActive(child.path) }"
                >
                  <span class="nav-text">{{ child.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'AppSidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute()
    const expandedGroups = ref(['components'])
    
    const toggleGroup = (groupId) => {
      const index = expandedGroups.value.indexOf(groupId)
      if (index > -1) {
        expandedGroups.value.splice(index, 1)
      } else {
        expandedGroups.value.push(groupId)
      }
    }
    
    const isActive = (path) => {
      return route.path === path
    }
    
    const getIcon = (icon) => {
      const icons = {
        home: '🏠',
        component: '🧩',
        user: '👤',
        dashboard: '📊',
        settings: '⚙️',
        about: 'ℹ️'
      }
      return icons[icon] || '📄'
    }
    
    return {
      expandedGroups,
      toggleGroup,
      isActive,
      getIcon
    }
  }
}
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  background-color: #001529;
  color: white;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
}

.app-sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: bold;
}

.logo img {
  width: 32px;
  height: 32px;
}

.sidebar-nav {
  padding: 16px 0;
}

.nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: #1890ff;
  color: white;
}

.nav-icon {
  font-size: 16px;
  margin-right: 12px;
  min-width: 16px;
}

.nav-text {
  flex: 1;
}

.nav-group-title {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-group-title:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-group-title.active {
  color: white;
}

.nav-arrow {
  font-size: 12px;
  margin-left: auto;
}

.nav-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

.submenu-link {
  padding-left: 48px;
  font-size: 14px;
}

.collapsed .nav-text,
.collapsed .nav-arrow {
  display: none;
}

.collapsed .nav-icon {
  margin-right: 0;
}

.collapsed .nav-link,
.collapsed .nav-group-title {
  justify-content: center;
  padding: 12px;
}

@media (max-width: 768px) {
  .app-sidebar {
    transform: translateX(-100%);
  }
  
  .app-sidebar.mobile-open {
    transform: translateX(0);
  }
}
</style> 