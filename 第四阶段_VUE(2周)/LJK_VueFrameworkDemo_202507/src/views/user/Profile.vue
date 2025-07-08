<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1 class="page-title">个人资料</h1>
      <p class="page-subtitle">管理您的账户信息和偏好设置</p>
    </div>

    <div class="profile-content">
      <div class="profile-sidebar">
        <div class="profile-avatar">
          <img :src="userInfo.avatar || '/default-avatar.png'" :alt="userInfo.username" />
          <button @click="handleAvatarUpload" class="avatar-upload-btn">
            <span>更换头像</span>
          </button>
        </div>
        <div class="profile-info">
          <h3>{{ userInfo.username }}</h3>
          <p>{{ userInfo.email }}</p>
          <span class="user-role">{{ userInfo.role }}</span>
        </div>
      </div>

      <div class="profile-main">
        <div class="profile-section">
          <h2 class="section-title">基本信息</h2>
          <form @submit.prevent="handleUpdateProfile" class="profile-form">
            <div class="form-row">
              <div class="form-group">
                <BaseInput
                  v-model="profileForm.username"
                  label="用户名"
                  placeholder="请输入用户名"
                  :error="errors.username"
                  required
                />
              </div>
              <div class="form-group">
                <BaseInput
                  v-model="profileForm.email"
                  type="email"
                  label="邮箱"
                  placeholder="请输入邮箱地址"
                  :error="errors.email"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <BaseInput
                  v-model="profileForm.phone"
                  type="tel"
                  label="手机号"
                  placeholder="请输入手机号"
                  :error="errors.phone"
                />
              </div>
              <div class="form-group">
                <BaseInput
                  v-model="profileForm.nickname"
                  label="昵称"
                  placeholder="请输入昵称"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">个人简介</label>
              <textarea
                v-model="profileForm.bio"
                class="form-textarea"
                placeholder="介绍一下自己吧..."
                rows="4"
              ></textarea>
            </div>

            <div class="form-actions">
              <BaseButton
                type="primary"
                :loading="loading"
                :disabled="!isFormValid"
              >
                保存更改
              </BaseButton>
              <BaseButton
                type="outline"
                @click="handleReset"
              >
                重置
              </BaseButton>
            </div>
          </form>
        </div>

        <div class="profile-section">
          <h2 class="section-title">密码设置</h2>
          <form @submit.prevent="handleChangePassword" class="password-form">
            <div class="form-group">
              <BaseInput
                v-model="passwordForm.currentPassword"
                type="password"
                label="当前密码"
                placeholder="请输入当前密码"
                :error="passwordErrors.currentPassword"
                required
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="passwordForm.newPassword"
                type="password"
                label="新密码"
                placeholder="请输入新密码"
                :error="passwordErrors.newPassword"
                required
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="passwordForm.confirmPassword"
                type="password"
                label="确认新密码"
                placeholder="请再次输入新密码"
                :error="passwordErrors.confirmPassword"
                required
              />
            </div>

            <div class="form-actions">
              <BaseButton
                type="primary"
                :loading="passwordLoading"
                :disabled="!isPasswordFormValid"
              >
                修改密码
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { BaseInput, BaseButton } from '@/components'
import { isValidEmail, isValidPhone } from '@/utils/validate'

const userStore = useUserStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 表单数据
const profileForm = reactive({
  username: '',
  email: '',
  phone: '',
  nickname: '',
  bio: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证错误
const errors = reactive({
  username: '',
  email: '',
  phone: ''
})

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 组件状态
const loading = ref(false)
const passwordLoading = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return profileForm.username.trim() && 
         profileForm.email.trim() && 
         !errors.username && 
         !errors.email && 
         !errors.phone
})

const isPasswordFormValid = computed(() => {
  return passwordForm.currentPassword.trim() && 
         passwordForm.newPassword.trim() && 
         passwordForm.confirmPassword.trim() && 
         !passwordErrors.currentPassword && 
         !passwordErrors.newPassword && 
         !passwordErrors.confirmPassword
})

// 初始化表单数据
const initializeForm = () => {
  profileForm.username = userInfo.value.username || ''
  profileForm.email = userInfo.value.email || ''
  profileForm.phone = userInfo.value.phone || ''
  profileForm.nickname = userInfo.value.nickname || ''
  profileForm.bio = userInfo.value.bio || ''
}

// 验证个人资料表单
const validateProfileForm = () => {
  errors.username = ''
  errors.email = ''
  errors.phone = ''

  if (!profileForm.username.trim()) {
    errors.username = '请输入用户名'
    return false
  }

  if (!profileForm.email.trim()) {
    errors.email = '请输入邮箱地址'
    return false
  }

  if (!isValidEmail(profileForm.email)) {
    errors.email = '请输入有效的邮箱地址'
    return false
  }

  if (profileForm.phone && !isValidPhone(profileForm.phone)) {
    errors.phone = '请输入有效的手机号'
    return false
  }

  return true
}

// 验证密码表单
const validatePasswordForm = () => {
  passwordErrors.currentPassword = ''
  passwordErrors.newPassword = ''
  passwordErrors.confirmPassword = ''

  if (!passwordForm.currentPassword.trim()) {
    passwordErrors.currentPassword = '请输入当前密码'
    return false
  }

  if (!passwordForm.newPassword.trim()) {
    passwordErrors.newPassword = '请输入新密码'
    return false
  }

  if (passwordForm.newPassword.length < 6) {
    passwordErrors.newPassword = '密码长度不能少于6位'
    return false
  }

  if (!passwordForm.confirmPassword.trim()) {
    passwordErrors.confirmPassword = '请确认新密码'
    return false
  }

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = '两次输入的密码不一致'
    return false
  }

  return true
}

// 处理更新个人资料
const handleUpdateProfile = async () => {
  if (!validateProfileForm()) return

  loading.value = true
  
  try {
    await userStore.updateProfile(profileForm)
    // 显示成功消息
    console.log('个人资料更新成功')
  } catch (error) {
    console.error('更新失败:', error)
  } finally {
    loading.value = false
  }
}

// 处理修改密码
const handleChangePassword = async () => {
  if (!validatePasswordForm()) return

  passwordLoading.value = true
  
  try {
    await userStore.changePassword(passwordForm)
    // 清空表单
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    console.log('密码修改成功')
  } catch (error) {
    console.error('密码修改失败:', error)
  } finally {
    passwordLoading.value = false
  }
}

// 处理重置表单
const handleReset = () => {
  initializeForm()
}

// 处理头像上传
const handleAvatarUpload = () => {
  // 实现头像上传逻辑
  console.log('上传头像')
}

// 组件挂载时初始化
onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.profile-header {
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

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
}

.profile-sidebar {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.profile-avatar {
  text-align: center;
  margin-bottom: 24px;
}

.profile-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f0f0;
}

.avatar-upload-btn {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.avatar-upload-btn:hover {
  background: var(--primary-color-hover);
}

.profile-info {
  text-align: center;
}

.profile-info h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.profile-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  background: #e8f4fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.profile-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.profile-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.profile-form,
.password-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .profile-page {
    padding: 16px;
  }
}
</style> 