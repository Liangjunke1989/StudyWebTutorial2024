<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎使用 Vue 3 应用</h1>
        <p class="hero-subtitle">现代化的企业级前端解决方案</p>
        <div class="hero-actions">
          <BaseButton type="primary" size="large" @click="handleGetStarted">
            立即开始
          </BaseButton>
          <BaseButton type="outline" size="large" @click="handleLearnMore">
            了解更多
          </BaseButton>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-placeholder">
          <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
            <rect width="400" height="300" fill="#f0f2f5" rx="8"/>
            <circle cx="200" cy="150" r="50" fill="#1890ff" opacity="0.2"/>
            <circle cx="200" cy="150" r="30" fill="#1890ff" opacity="0.4"/>
            <circle cx="200" cy="150" r="15" fill="#1890ff"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.id">
          <div class="stat-icon">
            <component :is="stat.icon" />
          </div>
          <div class="stat-content">
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">核心特性</h2>
        <p class="section-subtitle">现代化的开发体验和最佳实践</p>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon">
            <component :is="feature.icon" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="actions-section">
      <div class="section-header">
        <h2 class="section-title">快速操作</h2>
      </div>
      <div class="actions-grid">
        <BaseCard 
          v-for="action in quickActions" 
          :key="action.id"
          class="action-card"
          hoverable
          @click="handleActionClick(action)"
        >
          <div class="action-content">
            <div class="action-icon">
              <component :is="action.icon" />
            </div>
            <h3 class="action-title">{{ action.title }}</h3>
            <p class="action-description">{{ action.description }}</p>
          </div>
        </BaseCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton, BaseCard } from '@/components'

const router = useRouter()

// 统计数据
const stats = ref([
  {
    id: 1,
    icon: 'UserIcon',
    value: '1,234',
    label: '用户数量'
  },
  {
    id: 2,
    icon: 'ChartIcon',
    value: '5,678',
    label: '访问量'
  },
  {
    id: 3,
    icon: 'StarIcon',
    value: '98%',
    label: '满意度'
  },
  {
    id: 4,
    icon: 'TrendingIcon',
    value: '24/7',
    label: '在线服务'
  }
])

// 特性列表
const features = ref([
  {
    id: 1,
    icon: 'LightningIcon',
    title: '高性能',
    description: '基于 Vue 3 Composition API，提供更好的性能和开发体验'
  },
  {
    id: 2,
    icon: 'ShieldIcon',
    title: '类型安全',
    description: '完整的 TypeScript 支持，提供更好的代码提示和错误检查'
  },
  {
    id: 3,
    icon: 'ComponentIcon',
    title: '组件化',
    description: '丰富的组件库，支持自定义主题和国际化'
  },
  {
    id: 4,
    icon: 'ResponsiveIcon',
    title: '响应式',
    description: '完美适配各种设备，提供一致的用户体验'
  },
  {
    id: 5,
    icon: 'PluginIcon',
    title: '插件生态',
    description: '丰富的插件生态系统，满足各种业务需求'
  },
  {
    id: 6,
    icon: 'CloudIcon',
    title: '云原生',
    description: '支持容器化部署，轻松扩展和维护'
  }
])

// 快速操作
const quickActions = ref([
  {
    id: 1,
    icon: 'PlusIcon',
    title: '创建项目',
    description: '快速创建新的项目',
    action: 'create-project'
  },
  {
    id: 2,
    icon: 'SettingsIcon',
    title: '系统设置',
    description: '配置系统参数',
    action: 'settings'
  },
  {
    id: 3,
    icon: 'DocumentIcon',
    title: '查看文档',
    description: '阅读详细文档',
    action: 'documentation'
  },
  {
    id: 4,
    icon: 'SupportIcon',
    title: '技术支持',
    description: '获取技术帮助',
    action: 'support'
  }
])

// 事件处理
const handleGetStarted = () => {
  router.push('/user/profile')
}

const handleLearnMore = () => {
  router.push('/about')
}

const handleActionClick = (action) => {
  console.log('Action clicked:', action.action)
  // 根据不同的操作执行不同的逻辑
  switch (action.action) {
    case 'create-project':
      // 创建项目逻辑
      break
    case 'settings':
      router.push('/user/settings')
      break
    case 'documentation':
      // 打开文档
      break
    case 'support':
      // 打开支持页面
      break
  }
}

onMounted(() => {
  // 组件挂载后的逻辑
  console.log('Home page mounted')
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 60px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-placeholder {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

/* Stats Section */
.stats-section {
  margin-bottom: 80px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* Features Section */
.features-section {
  margin-bottom: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.feature-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Actions Section */
.actions-section {
  margin-bottom: 80px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.action-card {
  cursor: pointer;
  transition: all 0.2s;
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-content {
  text-align: center;
  padding: 1rem;
}

.action-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}

.action-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.action-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 40px 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-actions {
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .stats-grid,
  .features-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style> 