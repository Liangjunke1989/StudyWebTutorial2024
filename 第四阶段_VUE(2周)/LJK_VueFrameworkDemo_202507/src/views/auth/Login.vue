<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="login-title">欢迎回来</h1>
        <p class="login-subtitle">请登录您的账户</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <BaseInput
            v-model="loginForm.username"
            type="text"
            label="用户名"
            placeholder="请输入用户名"
            :error="errors.username"
            prefix-icon="user"
            required
          />
        </div>

        <div class="form-group">
          <BaseInput
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            label="密码"
            placeholder="请输入密码"
            :error="errors.password"
            prefix-icon="lock"
            required
          >
            <template #suffix>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
              >
                <span v-if="showPassword">👁️</span>
                <span v-else>🔒</span>
              </button>
            </template>
          </BaseInput>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input
              v-model="loginForm.rememberMe"
              type="checkbox"
              class="checkbox"
            />
            <span class="checkbox-label">记住我</span>
          </label>
          <router-link to="/auth/forgot-password" class="forgot-password">
            忘记密码？
          </router-link>
        </div>

        <BaseButton
          type="primary"
          size="large"
          :loading="loading"
          :disabled="!isFormValid"
          class="login-button"
        >
          登录
        </BaseButton>

        <div class="login-footer">
          <p class="register-link">
            还没有账户？
            <router-link to="/auth/register">立即注册</router-link>
          </p>
        </div>
      </form>

      <div class="social-login">
        <div class="divider">
          <span>或使用第三方登录</span>
        </div>
        <div class="social-buttons">
          <button @click="handleSocialLogin('wechat')" class="social-btn wechat">
            <span>微信</span>
          </button>
          <button @click="handleSocialLogin('qq')" class="social-btn qq">
            <span>QQ</span>
          </button>
          <button @click="handleSocialLogin('weibo')" class="social-btn weibo">
            <span>微博</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { BaseInput, BaseButton } from '@/components'
import { isValidEmail, isValidPhone } from '@/utils/validate'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 表单验证错误
const errors = reactive({
  username: '',
  password: ''
})

// 组件状态
const loading = ref(false)
const showPassword = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return loginForm.username.trim() && 
         loginForm.password.trim() && 
         !errors.username && 
         !errors.password
})

// 验证表单
const validateForm = () => {
  errors.username = ''
  errors.password = ''

  if (!loginForm.username.trim()) {
    errors.username = '请输入用户名'
    return false
  }

  if (!loginForm.password.trim()) {
    errors.password = '请输入密码'
    return false
  }

  if (loginForm.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    return false
  }

  return true
}

// 处理登录
const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    await userStore.login({
      username: loginForm.username,
      password: loginForm.password,
      rememberMe: loginForm.rememberMe
    })

    // 登录成功，重定向到目标页面或首页
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  } catch (error) {
    console.error('登录失败:', error)
    // 显示错误信息
    if (error.message.includes('用户名')) {
      errors.username = error.message
    } else if (error.message.includes('密码')) {
      errors.password = error.message
    }
  } finally {
    loading.value = false
  }
}

// 处理第三方登录
const handleSocialLogin = (provider) => {
  console.log('第三方登录:', provider)
  // 实现第三方登录逻辑
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.login-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.checkbox {
  margin-right: 8px;
}

.forgot-password {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: var(--primary-color-hover);
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
}

.register-link {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.register-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  color: var(--primary-color-hover);
}

.social-login {
  margin-top: 32px;
}

.divider {
  position: relative;
  text-align: center;
  margin-bottom: 24px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  flex: 1;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.social-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  font-size: 14px;
}

.password-toggle:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 24px;
  }
  
  .login-title {
    font-size: 24px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
