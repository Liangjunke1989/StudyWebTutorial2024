<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1 class="page-title">管理控制台</h1>
      <p class="page-subtitle">系统概览和管理工具</p>
    </div>

    <!-- 统计概览 -->
    <div class="stats-overview">
      <div class="stat-card">
        <div class="stat-icon users">👥</div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.totalUsers }}</h3>
          <p class="stat-label">总用户数</p>
          <span class="stat-change positive">+{{ stats.newUsers }} 新增</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orders">📦</div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.totalOrders }}</h3>
          <p class="stat-label">总订单数</p>
          <span class="stat-change positive">+{{ stats.newOrders }} 今日</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">💰</div>
        <div class="stat-content">
          <h3 class="stat-number">¥{{ formatNumber(stats.totalRevenue) }}</h3>
          <p class="stat-label">总收入</p>
          <span class="stat-change positive">+{{ stats.revenueGrowth }}%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon activity">📊</div>
        <div class="stat-content">
          <h3 class="stat-number">{{ stats.activeUsers }}</h3>
          <p class="stat-label">活跃用户</p>
          <span class="stat-change">在线中</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="dashboard-content">
      <!-- 左侧内容 -->
      <div class="content-left">
        <!-- 最近活动 -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3 class="card-title">最近活动</h3>
            <BaseButton type="text" size="small">查看全部</BaseButton>
          </div>
          <div class="activity-list">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-icon" :class="activity.type">
                {{ activity.icon }}
              </div>
              <div class="activity-content">
                <p class="activity-text">{{ activity.description }}</p>
                <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 系统状态 -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3 class="card-title">系统状态</h3>
            <span class="status-indicator online">运行正常</span>
          </div>
          <div class="system-metrics">
            <div class="metric-item">
              <span class="metric-label">CPU 使用率</span>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: systemStatus.cpu + '%' }"></div>
              </div>
              <span class="metric-value">{{ systemStatus.cpu }}%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">内存使用率</span>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: systemStatus.memory + '%' }"></div>
              </div>
              <span class="metric-value">{{ systemStatus.memory }}%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">磁盘使用率</span>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: systemStatus.disk + '%' }"></div>
              </div>
              <span class="metric-value">{{ systemStatus.disk }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="content-right">
        <!-- 快速操作 -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3 class="card-title">快速操作</h3>
          </div>
          <div class="quick-actions">
            <BaseButton 
              v-for="action in quickActions" 
              :key="action.key"
              :type="action.type"
              class="action-button"
              @click="handleQuickAction(action.key)"
            >
              <span class="action-icon">{{ action.icon }}</span>
              {{ action.label }}
            </BaseButton>
          </div>
        </div>

        <!-- 待办事项 -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3 class="card-title">待办事项</h3>
            <BaseButton type="text" size="small">管理</BaseButton>
          </div>
          <div class="todo-list">
            <div 
              v-for="todo in todoList" 
              :key="todo.id"
              class="todo-item"
            >
              <input 
                type="checkbox" 
                :checked="todo.completed"
                @change="toggleTodo(todo.id)"
                class="todo-checkbox"
              />
              <span :class="['todo-text', { completed: todo.completed }]">
                {{ todo.text }}
              </span>
              <span class="todo-priority" :class="todo.priority">
                {{ todo.priority }}
              </span>
            </div>
          </div>
        </div>

        <!-- 通知中心 -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3 class="card-title">通知中心</h3>
            <span class="notification-count">{{ notifications.length }}</span>
          </div>
          <div class="notification-list">
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="notification-item"
              :class="{ unread: !notification.read }"
            >
              <div class="notification-icon" :class="notification.type">
                {{ notification.icon }}
              </div>
              <div class="notification-content">
                <p class="notification-text">{{ notification.message }}</p>
                <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { formatNumber, formatTime } from '@/utils/format'

export default {
  name: 'AdminDashboard',
  components: {
    BaseButton
  },
  setup() {
    const stats = reactive({
      totalUsers: 12580,
      newUsers: 234,
      totalOrders: 8942,
      newOrders: 67,
      totalRevenue: 1250000,
      revenueGrowth: 15.8,
      activeUsers: 1456
    })

    const systemStatus = reactive({
      cpu: 45,
      memory: 68,
      disk: 32
    })

    const recentActivities = ref([
      {
        id: 1,
        type: 'user',
        icon: '👤',
        description: '新用户注册：张三',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: 2,
        type: 'order',
        icon: '📦',
        description: '新订单创建：#12345',
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: 3,
        type: 'system',
        icon: '⚙️',
        description: '系统备份完成',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 4,
        type: 'alert',
        icon: '⚠️',
        description: '服务器负载过高',
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      }
    ])

    const quickActions = [
      { key: 'add-user', label: '添加用户', icon: '👤', type: 'primary' },
      { key: 'system-backup', label: '系统备份', icon: '💾', type: 'outline' },
      { key: 'send-notification', label: '发送通知', icon: '📢', type: 'outline' },
      { key: 'generate-report', label: '生成报告', icon: '📊', type: 'outline' }
    ]

    const todoList = ref([
      { id: 1, text: '审核用户反馈', completed: false, priority: 'high' },
      { id: 2, text: '更新系统文档', completed: false, priority: 'medium' },
      { id: 3, text: '检查服务器状态', completed: true, priority: 'low' },
      { id: 4, text: '处理退款申请', completed: false, priority: 'high' }
    ])

    const notifications = ref([
      {
        id: 1,
        type: 'warning',
        icon: '⚠️',
        message: '服务器CPU使用率过高',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'info',
        icon: 'ℹ️',
        message: '系统维护将在今晚进行',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        type: 'success',
        icon: '✅',
        message: '数据备份成功完成',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true
      }
    ])

    const handleQuickAction = (actionKey) => {
      console.log('执行快速操作:', actionKey)
      // 这里可以添加具体的操作逻辑
    }

    const toggleTodo = (todoId) => {
      const todo = todoList.value.find(t => t.id === todoId)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    const loadDashboardData = async () => {
      // 模拟加载数据
      try {
        // 这里可以调用 API 获取实际数据
        console.log('加载管理面板数据...')
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      stats,
      systemStatus,
      recentActivities,
      quickActions,
      todoList,
      notifications,
      formatNumber,
      formatTime,
      handleQuickAction,
      toggleTodo
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-color-secondary);
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--bg-color-container);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-icon.users {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-icon.orders {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-icon.activity {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--text-color-secondary);
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
}

.stat-change.positive {
  color: var(--success-color);
  background: var(--success-color-light);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.dashboard-card {
  background: var(--bg-color-container);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-card);
  margin-bottom: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.status-indicator {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-indicator.online {
  color: var(--success-color);
  background: var(--success-color-light);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.activity-item:hover {
  background: var(--bg-color-hover);
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: var(--bg-color-secondary);
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: var(--text-color-secondary);
}

.system-metrics {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.metric-label {
  font-size: 14px;
  color: var(--text-color-secondary);
  min-width: 80px;
}

.metric-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-color-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
  transition: width 0.3s ease;
}

.metric-value {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-color-primary);
  min-width: 40px;
  text-align: right;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  height: auto;
}

.action-icon {
  font-size: 20px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.todo-item:hover {
  background: var(--bg-color-hover);
}

.todo-checkbox {
  width: 16px;
  height: 16px;
}

.todo-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-color-primary);
}

.todo-text.completed {
  text-decoration: line-through;
  color: var(--text-color-secondary);
}

.todo-priority {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
}

.todo-priority.high {
  color: var(--error-color);
  background: var(--error-color-light);
}

.todo-priority.medium {
  color: var(--warning-color);
  background: var(--warning-color-light);
}

.todo-priority.low {
  color: var(--success-color);
  background: var(--success-color-light);
}

.notification-count {
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.notification-item:hover {
  background: var(--bg-color-hover);
}

.notification-item.unread {
  background: var(--primary-color-light);
  border-left: 3px solid var(--primary-color);
}

.notification-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: var(--bg-color-secondary);
}

.notification-content {
  flex: 1;
}

.notification-text {
  font-size: 14px;
  color: var(--text-color-primary);
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: var(--text-color-secondary);
}

@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 16px;
  }
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 16px;
  }
}
</style> 