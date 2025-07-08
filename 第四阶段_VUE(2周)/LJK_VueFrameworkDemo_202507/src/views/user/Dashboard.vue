<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1 class="page-title">仪表盘</h1>
      <p class="page-subtitle">欢迎回来，{{ userInfo.username }}！</p>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ stats.totalProjects }}</h3>
          <p>项目总数</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>{{ stats.completedTasks }}</h3>
          <p>完成任务</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⏰</div>
        <div class="stat-content">
          <h3>{{ stats.pendingTasks }}</h3>
          <p>待办任务</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>{{ stats.teamMembers }}</h3>
          <p>团队成员</p>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="dashboard-content">
      <!-- 最近项目 -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">最近项目</h2>
          <BaseButton type="outline" size="small" @click="handleViewAllProjects">
            查看全部
          </BaseButton>
        </div>
        
        <div class="projects-grid">
          <div 
            v-for="project in recentProjects" 
            :key="project.id"
            class="project-card"
            @click="handleProjectClick(project)"
          >
            <div class="project-header">
              <h3 class="project-title">{{ project.name }}</h3>
              <span :class="['project-status', project.status]">
                {{ getStatusText(project.status) }}
              </span>
            </div>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-footer">
              <div class="project-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill"
                    :style="{ width: project.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">{{ project.progress }}%</span>
              </div>
              <span class="project-date">{{ formatDate(project.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 待办任务 -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">待办任务</h2>
          <BaseButton type="outline" size="small" @click="handleViewAllTasks">
            查看全部
          </BaseButton>
        </div>
        
        <div class="tasks-list">
          <div 
            v-for="task in pendingTasksList" 
            :key="task.id"
            class="task-item"
          >
            <div class="task-checkbox">
              <input 
                type="checkbox" 
                :checked="task.completed"
                @change="handleTaskToggle(task)"
              />
            </div>
            <div class="task-content">
              <h4 class="task-title">{{ task.title }}</h4>
              <p class="task-description">{{ task.description }}</p>
              <div class="task-meta">
                <span :class="['task-priority', task.priority]">
                  {{ getPriorityText(task.priority) }}
                </span>
                <span class="task-due-date">{{ formatDate(task.dueDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">快速操作</h2>
        </div>
        
        <div class="quick-actions">
          <BaseButton 
            type="primary" 
            @click="handleCreateProject"
            class="action-btn"
          >
            <span class="action-icon">➕</span>
            创建项目
          </BaseButton>
          
          <BaseButton 
            type="outline" 
            @click="handleCreateTask"
            class="action-btn"
          >
            <span class="action-icon">📝</span>
            添加任务
          </BaseButton>
          
          <BaseButton 
            type="outline" 
            @click="handleInviteTeam"
            class="action-btn"
          >
            <span class="action-icon">👥</span>
            邀请成员
          </BaseButton>
          
          <BaseButton 
            type="outline" 
            @click="handleViewReports"
            class="action-btn"
          >
            <span class="action-icon">📊</span>
            查看报告
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { BaseButton } from '@/components'
import { formatDate } from '@/utils/format'

const router = useRouter()
const userStore = useUserStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 统计数据
const stats = ref({
  totalProjects: 12,
  completedTasks: 48,
  pendingTasks: 15,
  teamMembers: 8
})

// 最近项目
const recentProjects = ref([
  {
    id: 1,
    name: 'Vue 3 项目重构',
    description: '将现有项目升级到 Vue 3 并优化性能',
    status: 'active',
    progress: 75,
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: '移动端应用开发',
    description: '开发跨平台移动应用',
    status: 'planning',
    progress: 30,
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 3,
    name: '数据可视化平台',
    description: '构建企业级数据可视化解决方案',
    status: 'completed',
    progress: 100,
    updatedAt: new Date('2024-01-05')
  }
])

// 待办任务
const pendingTasksList = ref([
  {
    id: 1,
    title: '完成用户界面设计',
    description: '设计新的用户界面原型',
    priority: 'high',
    completed: false,
    dueDate: new Date('2024-01-20')
  },
  {
    id: 2,
    title: '编写API文档',
    description: '为新接口编写详细的API文档',
    priority: 'medium',
    completed: false,
    dueDate: new Date('2024-01-25')
  },
  {
    id: 3,
    title: '代码审查',
    description: '审查团队成员提交的代码',
    priority: 'low',
    completed: false,
    dueDate: new Date('2024-01-30')
  }
])

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    active: '进行中',
    planning: '计划中',
    completed: '已完成',
    paused: '已暂停'
  }
  return statusMap[status] || status
}

// 获取优先级文本
const getPriorityText = (priority) => {
  const priorityMap = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return priorityMap[priority] || priority
}

// 处理项目点击
const handleProjectClick = (project) => {
  router.push(`/projects/${project.id}`)
}

// 处理任务状态切换
const handleTaskToggle = (task) => {
  task.completed = !task.completed
  // 这里可以调用API更新任务状态
}

// 快速操作处理函数
const handleCreateProject = () => {
  router.push('/projects/create')
}

const handleCreateTask = () => {
  router.push('/tasks/create')
}

const handleInviteTeam = () => {
  router.push('/team/invite')
}

const handleViewReports = () => {
  router.push('/reports')
}

const handleViewAllProjects = () => {
  router.push('/projects')
}

const handleViewAllTasks = () => {
  router.push('/tasks')
}

// 组件挂载时加载数据
onMounted(() => {
  // 这里可以调用API加载真实数据
  console.log('Dashboard mounted')
})
</script>

<style scoped>
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.dashboard-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: #f0f2f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content h3 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.stat-content p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.project-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.project-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.project-status.active {
  background: #e8f5e8;
  color: #2e7d32;
}

.project-status.planning {
  background: #fff3e0;
  color: #f57c00;
}

.project-status.completed {
  background: #e3f2fd;
  color: #1976d2;
}

.project-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  width: 100px;
  height: 6px;
  background: #e1e4e8;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.project-date {
  font-size: 12px;
  color: #666;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
}

.task-checkbox input {
  margin: 0;
  transform: scale(1.2);
}

.task-content {
  flex: 1;
}

.task-title {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.task-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.task-priority {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.task-priority.high {
  background: #ffebee;
  color: #c62828;
}

.task-priority.medium {
  background: #fff3e0;
  color: #f57c00;
}

.task-priority.low {
  background: #e8f5e8;
  color: #2e7d32;
}

.task-due-date {
  font-size: 12px;
  color: #666;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  height: auto;
}

.action-icon {
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard-page {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style> 