<template>
  <div class="users-management">
    <div class="page-header">
      <h1 class="page-title">用户管理</h1>
      <p class="page-subtitle">管理系统用户和权限</p>
    </div>

    <!-- 操作工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <BaseButton type="primary" @click="handleAddUser">
          <span class="btn-icon">➕</span>
          添加用户
        </BaseButton>
        <BaseButton type="outline" @click="handleExportUsers">
          <span class="btn-icon">📤</span>
          导出用户
        </BaseButton>
      </div>
      <div class="toolbar-right">
        <BaseInput
          v-model="searchQuery"
          placeholder="搜索用户..."
          prefix-icon="search"
          class="search-input"
          @input="handleSearch"
        />
        <select v-model="statusFilter" class="status-filter">
          <option value="">全部状态</option>
          <option value="active">激活</option>
          <option value="inactive">未激活</option>
          <option value="banned">已封禁</option>
        </select>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" @change="handleSelectAll" :checked="isAllSelected">
            </th>
            <th>用户信息</th>
            <th>角色</th>
            <th>状态</th>
            <th>注册时间</th>
            <th>最后登录</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
            <td>
              <input 
                type="checkbox" 
                :checked="selectedUsers.includes(user.id)"
                @change="handleSelectUser(user.id)"
              >
            </td>
            <td>
              <div class="user-info">
                <img :src="user.avatar" :alt="user.name" class="user-avatar">
                <div class="user-details">
                  <div class="user-name">{{ user.name }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <span :class="['role-badge', user.role]">
                {{ getRoleLabel(user.role) }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', user.status]">
                {{ getStatusLabel(user.status) }}
              </span>
            </td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>{{ formatDate(user.lastLoginAt) }}</td>
            <td>
              <div class="action-buttons">
                <button 
                  class="action-btn edit" 
                  @click="handleEditUser(user)"
                  title="编辑"
                >
                  ✏️
                </button>
                <button 
                  class="action-btn delete" 
                  @click="handleDeleteUser(user)"
                  title="删除"
                >
                  🗑️
                </button>
                <button 
                  class="action-btn reset" 
                  @click="handleResetPassword(user)"
                  title="重置密码"
                >
                  🔑
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <div class="pagination-info">
        显示 {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalUsers) }} 条，共 {{ totalUsers }} 条
      </div>
      <div class="pagination-controls">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </button>
        <button 
          v-for="page in visiblePages" 
          :key="page"
          :class="['page-btn', { active: page === currentPage }]"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </button>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 用户编辑模态框 -->
    <div v-if="showEditModal" class="modal-overlay" @click="handleCloseModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingUser.id ? '编辑用户' : '添加用户' }}</h3>
          <button class="close-btn" @click="handleCloseModal">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSaveUser">
            <div class="form-group">
              <label>用户名</label>
              <BaseInput v-model="editingUser.name" placeholder="请输入用户名" />
            </div>
            <div class="form-group">
              <label>邮箱</label>
              <BaseInput v-model="editingUser.email" type="email" placeholder="请输入邮箱" />
            </div>
            <div class="form-group">
              <label>角色</label>
              <select v-model="editingUser.role" class="form-select">
                <option value="user">普通用户</option>
                <option value="admin">管理员</option>
                <option value="moderator">版主</option>
              </select>
            </div>
            <div class="form-group">
              <label>状态</label>
              <select v-model="editingUser.status" class="form-select">
                <option value="active">激活</option>
                <option value="inactive">未激活</option>
                <option value="banned">已封禁</option>
              </select>
            </div>
            <div class="form-actions">
              <BaseButton type="outline" @click="handleCloseModal">取消</BaseButton>
              <BaseButton type="primary" @click="handleSaveUser">保存</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { BaseButton, BaseInput } from '@/components'

// 响应式数据
const users = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const selectedUsers = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const totalUsers = ref(0)
const loading = ref(false)
const showEditModal = ref(false)
const editingUser = ref({})

// 计算属性
const filteredUsers = computed(() => {
  let filtered = users.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }

  // 状态过滤
  if (statusFilter.value) {
    filtered = filtered.filter(user => user.status === statusFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(totalUsers.value / pageSize.value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const isAllSelected = computed(() => {
  return filteredUsers.value.length > 0 && 
         selectedUsers.value.length === filteredUsers.value.length
})

// 方法
const loadUsers = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟用户数据
    users.value = [
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        role: 'admin',
        status: 'active',
        avatar: 'https://via.placeholder.com/40',
        createdAt: '2024-01-15T10:30:00Z',
        lastLoginAt: '2024-01-20T14:20:00Z'
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        role: 'user',
        status: 'active',
        avatar: 'https://via.placeholder.com/40',
        createdAt: '2024-01-16T09:15:00Z',
        lastLoginAt: '2024-01-19T16:45:00Z'
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        role: 'moderator',
        status: 'inactive',
        avatar: 'https://via.placeholder.com/40',
        createdAt: '2024-01-17T11:20:00Z',
        lastLoginAt: '2024-01-18T13:30:00Z'
      }
    ]
    
    totalUsers.value = users.value.length
  } catch (error) {
    console.error('加载用户失败:', error)
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleSelectAll = () => {
  if (isAllSelected.value) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = filteredUsers.value.map(user => user.id)
  }
}

const handleSelectUser = (userId) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
}

const handleAddUser = () => {
  editingUser.value = {
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  }
  showEditModal.value = true
}

const handleEditUser = (user) => {
  editingUser.value = { ...user }
  showEditModal.value = true
}

const handleDeleteUser = (user) => {
  if (confirm(`确定要删除用户 ${user.name} 吗？`)) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      users.value.splice(index, 1)
      totalUsers.value--
    }
  }
}

const handleResetPassword = (user) => {
  if (confirm(`确定要重置用户 ${user.name} 的密码吗？`)) {
    alert('密码重置邮件已发送')
  }
}

const handleCloseModal = () => {
  showEditModal.value = false
  editingUser.value = {}
}

const handleSaveUser = () => {
  if (editingUser.value.id) {
    // 更新用户
    const index = users.value.findIndex(u => u.id === editingUser.value.id)
    if (index > -1) {
      users.value[index] = { ...editingUser.value }
    }
  } else {
    // 添加新用户
    const newUser = {
      ...editingUser.value,
      id: Date.now(),
      avatar: 'https://via.placeholder.com/40',
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    }
    users.value.push(newUser)
    totalUsers.value++
  }
  
  handleCloseModal()
}

const handleExportUsers = () => {
  alert('导出功能开发中...')
}

const getRoleLabel = (role) => {
  const labels = {
    admin: '管理员',
    user: '普通用户',
    moderator: '版主'
  }
  return labels[role] || role
}

const getStatusLabel = (status) => {
  const labels = {
    active: '激活',
    inactive: '未激活',
    banned: '已封禁'
  }
  return labels[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 生命周期
onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.users-management {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
}

.toolbar-left {
  display: flex;
  gap: 12px;
}

.toolbar-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.status-filter {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  font-size: 14px;
}

.users-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.users-table table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.users-table th {
  background: #fafafa;
  font-weight: 600;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: #333;
}

.user-email {
  font-size: 12px;
  color: #666;
}

.role-badge,
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.role-badge.admin {
  background: #fff2e8;
  color: #fa541c;
}

.role-badge.user {
  background: #f6ffed;
  color: #52c41a;
}

.role-badge.moderator {
  background: #e6f7ff;
  color: #1890ff;
}

.status-badge.active {
  background: #f6ffed;
  color: #52c41a;
}

.status-badge.inactive {
  background: #fff7e6;
  color: #fa8c16;
}

.status-badge.banned {
  background: #fff2f0;
  color: #ff4d4f;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 8px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e6f7ff;
}

.action-btn.delete:hover {
  background: #fff2f0;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}

.pagination-controls {
  display: flex;
  gap: 8px;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #40a9ff;
  color: #40a9ff;
}

.page-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
}

.form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-icon {
  margin-right: 4px;
}
</style> 