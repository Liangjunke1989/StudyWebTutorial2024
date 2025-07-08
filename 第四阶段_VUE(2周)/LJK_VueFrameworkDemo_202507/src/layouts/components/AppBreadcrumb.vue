<template>
  <nav class="app-breadcrumb" v-if="items && items.length > 0">
    <ol class="breadcrumb-list">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === items.length - 1 }"
      >
        <router-link 
          v-if="item.path && index < items.length - 1"
          :to="item.path"
          class="breadcrumb-link"
        >
          <span class="breadcrumb-icon" v-if="item.icon">
            {{ getIcon(item.icon) }}
          </span>
          {{ item.title }}
        </router-link>
        
        <span v-else class="breadcrumb-text">
          <span class="breadcrumb-icon" v-if="item.icon">
            {{ getIcon(item.icon) }}
          </span>
          {{ item.title }}
        </span>
        
        <span 
          v-if="index < items.length - 1" 
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup() {
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
      getIcon
    }
  }
}
</script>

<style scoped>
.app-breadcrumb {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.breadcrumb-link {
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-link:hover {
  color: #40a9ff;
}

.breadcrumb-text {
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-item.active .breadcrumb-text {
  color: #333;
  font-weight: 500;
}

.breadcrumb-separator {
  color: #ccc;
  margin: 0 8px;
  font-size: 12px;
}

.breadcrumb-icon {
  font-size: 12px;
}

@media (max-width: 768px) {
  .breadcrumb-list {
    font-size: 12px;
  }
  
  .breadcrumb-separator {
    margin: 0 4px;
  }
}
</style> 