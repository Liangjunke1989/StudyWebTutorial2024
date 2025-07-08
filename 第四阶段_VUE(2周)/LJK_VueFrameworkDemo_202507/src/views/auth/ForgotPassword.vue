<template>
  <div class="forgot-password-page">
    <div class="forgot-password-container">
      <div class="forgot-password-header">
        <h1 class="forgot-password-title">忘记密码</h1>
        <p class="forgot-password-subtitle">请输入您的邮箱地址，我们将发送重置链接</p>
      </div>

      <!-- 步骤指示器 -->
      <div class="steps-indicator">
        <div :class="['step', { active: currentStep >= 1, completed: currentStep > 1 }]">
          <div class="step-number">1</div>
          <div class="step-label">输入邮箱</div>
        </div>
        <div class="step-line"></div>
        <div :class="['step', { active: currentStep >= 2, completed: currentStep > 2 }]">
          <div class="step-number">2</div>
          <div class="step-label">验证邮箱</div>
        </div>
        <div class="step-line"></div>
        <div :class="['step', { active: currentStep >= 3 }]">
          <div class="step-number">3</div>
          <div class="step-label">重置密码</div>
        </div>
      </div>

      <!-- 步骤1: 输入邮箱 -->
      <div v-if="currentStep === 1" class="step-content">
        <form @submit.prevent="handleSendResetEmail" class="forgot-password-form">
          <div class="form-group">
            <BaseInput
              v-model="email"
              type="email"
              label="邮箱地址"
              placeholder="请输入您的注册邮箱"
              :error="errors.email"
              prefix-icon="email"
              required
            />
          </div>

          <BaseButton 
            type="primary" 
            size="large" 
            :loading="loading"
            :disabled="!email || !isValidEmail(email)"
            class="submit-btn"
          >
            发送重置链接
          </BaseButton>
        </form>

        <div class="form-footer">
          <p class="back-to-login">
            想起密码了？
            <router-link to="/auth/login" class="login-link">
              立即登录
            </router-link>
          </p>
        </div>
      </div>

      <!-- 步骤2: 邮箱验证成功 -->
      <div v-if="currentStep === 2" class="step-content">
        <div class="success-message">
          <div class="success-icon">📧</div>
          <h2 class="success-title">邮件已发送</h2>
          <p class="success-text">
            我们已向 <strong>{{ email }}</strong> 发送了密码重置链接
          </p>
          <p class="success-instruction">
            请检查您的邮箱（包括垃圾邮件文件夹），点击链接重置密码
          </p>
        </div>

        <div class="resend-section">
          <p class="resend-text">没有收到邮件？</p>
          <BaseButton 
            type="outline" 
            :loading="resendLoading"
            :disabled="resendCountdown > 0"
            @click="handleResendEmail"
            class="resend-btn"
          >
            {{ resendCountdown > 0 ? `${resendCountdown}秒后重发` : '重新发送' }}
          </BaseButton>
        </div>

        <div class="form-footer">
          <BaseButton 
            type="text" 
            @click="handleBackToStep1"
            class="back-btn"
          >
            ← 返回修改邮箱
          </BaseButton>
        </div>
      </div>

      <!-- 步骤3: 重置密码 (通常是通过邮件链接访问) -->
      <div v-if="currentStep === 3" class="step-content">
        <form @submit.prevent="handleResetPassword" class="reset-password-form">
          <div class="form-group">
            <BaseInput
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              label="新密码"
              placeholder="请输入新密码"
              :error="errors.newPassword"
              prefix-icon="lock"
              :suffix-icon="showNewPassword ? 'eye-off' : 'eye'"
              @suffix-click="showNewPassword = !showNewPassword"
              required
            />
          </div>

          <div class="form-group">
            <BaseInput
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="确认密码"
              placeholder="请再次输入新密码"
              :error="errors.confirmPassword"
              prefix-icon="lock"
              :suffix-icon="showConfirmPassword ? 'eye-off' : 'eye'"
              @suffix-click="showConfirmPassword = !showConfirmPassword"
              required
            />
          </div>

          <!-- 密码强度指示器 -->
          <div class="password-strength">
            <div class="strength-label">密码强度：</div>
            <div class="strength-bar">
              <div 
                :class="['strength-fill', passwordStrength.level]"
                :style="{ width: passwordStrength.percentage + '%' }"
              ></div>
            </div>
            <div :class="['strength-text', passwordStrength.level]">
              {{ passwordStrength.text }}
            </div>
          </div>

          <BaseButton 
            type="primary" 
            size="large" 
            :loading="loading"
            :disabled="!canResetPassword"
            class="submit-btn"
          >
            重置密码
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseButton, BaseInput } from '@/components'
import { isValidEmail } from '@/utils/validate'

const router = useRouter()
const route = useRoute()

// 当前步骤
const currentStep = ref(1)

// 表单数据
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 显示密码状态
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// 加载状态
const loading = ref(false)
const resendLoading = ref(false)

// 重发倒计时
const resendCountdown = ref(0)
let resendTimer = null

// 表单错误
const errors = ref({
  email: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码强度计算
const passwordStrength = computed(() => {
  if (!newPassword.value) {
    return { level: 'weak', percentage: 0, text: '请输入密码' }
  }

  let score = 0
  const password = newPassword.value

  // 长度检查
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 25

  // 复杂度检查
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 15
  if (/[^A-Za-z0-9]/.test(password)) score += 15

  if (score < 40) {
    return { level: 'weak', percentage: score, text: '弱' }
  } else if (score < 70) {
    return { level: 'medium', percentage: score, text: '中等' }
  } else {
    return { level: 'strong', percentage: score, text: '强' }
  }
})

// 是否可以重置密码
const canResetPassword = computed(() => {
  return newPassword.value && 
         confirmPassword.value && 
         newPassword.value === confirmPassword.value &&
         passwordStrength.value.level !== 'weak'
})

// 发送重置邮件
const handleSendResetEmail = async () => {
  // 清除错误
  errors.value.email = ''

  // 验证邮箱
  if (!email.value) {
    errors.value.email = '请输入邮箱地址'
    return
  }

  if (!isValidEmail(email.value)) {
    errors.value.email = '请输入有效的邮箱地址'
    return
  }

  loading.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 成功后进入下一步
    currentStep.value = 2
    startResendCountdown()
    
    console.log('密码重置邮件已发送到:', email.value)
  } catch (error) {
    errors.value.email = '发送失败，请稍后重试'
    console.error('发送重置邮件失败:', error)
  } finally {
    loading.value = false
  }
}

// 重新发送邮件
const handleResendEmail = async () => {
  resendLoading.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    startResendCountdown()
    console.log('重置邮件已重新发送')
  } catch (error) {
    console.error('重新发送失败:', error)
  } finally {
    resendLoading.value = false
  }
}

// 开始重发倒计时
const startResendCountdown = () => {
  resendCountdown.value = 60
  resendTimer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(resendTimer)
    }
  }, 1000)
}

// 返回第一步
const handleBackToStep1 = () => {
  currentStep.value = 1
  clearInterval(resendTimer)
  resendCountdown.value = 0
}

// 重置密码
const handleResetPassword = async () => {
  // 清除错误
  errors.value.newPassword = ''
  errors.value.confirmPassword = ''

  // 验证密码
  if (!newPassword.value) {
    errors.value.newPassword = '请输入新密码'
    return
  }

  if (passwordStrength.value.level === 'weak') {
    errors.value.newPassword = '密码强度太弱，请设置更复杂的密码'
    return
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = '请确认密码'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = '两次输入的密码不一致'
    return
  }

  loading.value = true

  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 重置成功，跳转到登录页
    router.push({
      path: '/auth/login',
      query: { message: 'password-reset-success' }
    })
    
    console.log('密码重置成功')
  } catch (error) {
    errors.value.newPassword = '重置失败，请稍后重试'
    console.error('密码重置失败:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载时检查是否有重置令牌
onMounted(() => {
  // 如果URL中有重置令牌，直接跳到第三步
  if (route.query.token) {
    currentStep.value = 3
  }
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (resendTimer) {
    clearInterval(resendTimer)
  }
})
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.forgot-password-container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 32px;
}

.forgot-password-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.forgot-password-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.steps-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  background: #e1e4e8;
  color: #666;
  transition: all 0.3s;
}

.step.active .step-number {
  background: var(--primary-color);
  color: white;
}

.step.completed .step-number {
  background: #4caf50;
  color: white;
}

.step-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--primary-color);
}

.step-line {
  width: 60px;
  height: 2px;
  background: #e1e4e8;
  margin: 0 16px;
}

.step-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.forgot-password-form,
.reset-password-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.submit-btn {
  width: 100%;
  margin-bottom: 16px;
}

.form-footer {
  text-align: center;
}

.back-to-login {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.login-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

.success-message {
  text-align: center;
  margin-bottom: 32px;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.success-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.success-text {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
}

.success-instruction {
  font-size: 14px;
  color: #888;
  line-height: 1.5;
  margin: 0;
}

.resend-section {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.resend-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.resend-btn {
  min-width: 120px;
}

.back-btn {
  color: #666;
  padding: 8px 0;
}

.password-strength {
  margin-bottom: 20px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.strength-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.strength-bar {
  height: 4px;
  background: #e1e4e8;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s;
}

.strength-fill.weak {
  background: #f44336;
}

.strength-fill.medium {
  background: #ff9800;
}

.strength-fill.strong {
  background: #4caf50;
}

.strength-text {
  font-size: 12px;
  font-weight: 500;
}

.strength-text.weak {
  color: #f44336;
}

.strength-text.medium {
  color: #ff9800;
}

.strength-text.strong {
  color: #4caf50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .forgot-password-container {
    padding: 24px;
  }
  
  .forgot-password-title {
    font-size: 24px;
  }
  
  .steps-indicator {
    margin-bottom: 32px;
  }
  
  .step-line {
    width: 40px;
    margin: 0 12px;
  }
  
  .success-icon {
    font-size: 48px;
  }
}

@media (max-width: 480px) {
  .forgot-password-page {
    padding: 16px;
  }
  
  .forgot-password-container {
    padding: 20px;
  }
  
  .forgot-password-title {
    font-size: 20px;
  }
  
  .step-line {
    width: 30px;
    margin: 0 8px;
  }
}
</style> 