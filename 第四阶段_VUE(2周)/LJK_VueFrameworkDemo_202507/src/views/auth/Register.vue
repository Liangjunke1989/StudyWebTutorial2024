<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <h1 class="register-title">创建账户</h1>
        <p class="register-subtitle">加入我们，开始您的旅程</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <BaseInput
            v-model="registerForm.username"
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
            v-model="registerForm.email"
            type="email"
            label="邮箱"
            placeholder="请输入邮箱地址"
            :error="errors.email"
            prefix-icon="mail"
            required
          />
        </div>

        <div class="form-group">
          <BaseInput
            v-model="registerForm.password"
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

        <div class="form-group">
          <BaseInput
            v-model="registerForm.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            label="确认密码"
            placeholder="请再次输入密码"
            :error="errors.confirmPassword"
            prefix-icon="lock"
            required
          >
            <template #suffix>
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="password-toggle"
              >
                <span v-if="showConfirmPassword">👁️</span>
                <span v-else>🔒</span>
              </button>
            </template>
          </BaseInput>
        </div>

        <div class="form-group">
          <label class="agreement">
            <input
              v-model="registerForm.agreeTerms"
              type="checkbox"
              class="checkbox"
              required
            />
            <span class="checkbox-label">
              我已阅读并同意
              <a href="#" class="terms-link">《用户协议》</a>
              和
              <a href="#" class="terms-link">《隐私政策》</a>
            </span>
          </label>
        </div>

        <BaseButton
          type="primary"
          size="large"
          :loading="loading"
          :disabled="!isFormValid"
          class="register-button"
        >
          注册
        </BaseButton>

        <div class="register-footer">
          <p class="login-link">
            已有账户？
            <router-link to="/auth/login">立即登录</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { BaseInput, BaseButton } from '@/components'
import { isValidEmail } from '@/utils/validate'

const router = useRouter()
const userStore = useUserStore()

// 表单数据
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// 表单验证错误
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 组件状态
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return registerForm.username.trim() && 
         registerForm.email.trim() && 
         registerForm.password.trim() && 
         registerForm.confirmPassword.trim() && 
         registerForm.agreeTerms &&
         !errors.username && 
         !errors.email && 
         !errors.password && 
         !errors.confirmPassword
})

// 验证表单
const validateForm = () => {
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!registerForm.username.trim()) {
    errors.username = '请输入用户名'
    return false
  }

  if (registerForm.username.length < 3) {
    errors.username = '用户名长度不能少于3位'
    return false
  }

  if (!registerForm.email.trim()) {
    errors.email = '请输入邮箱地址'
    return false
  }

  if (!isValidEmail(registerForm.email)) {
    errors.email = '请输入有效的邮箱地址'
    return false
  }

  if (!registerForm.password.trim()) {
    errors.password = '请输入密码'
    return false
  }

  if (registerForm.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    return false
  }

  if (!registerForm.confirmPassword.trim()) {
    errors.confirmPassword = '请确认密码'
    return false
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    errors.confirmPassword = '两次输入的密码不一致'
    return false
  }

  return true
}

// 处理注册
const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true
  
  try {
    await userStore.register({
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password
    })

    // 注册成功，重定向到登录页面
    router.push('/auth/login')
  } catch (error) {
    console.error('注册失败:', error)
    // 显示错误信息
    if (error.message.includes('用户名')) {
      errors.username = error.message
    } else if (error.message.includes('邮箱')) {
      errors.email = error.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.register-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.register-form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

.agreement {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.checkbox {
  margin-right: 8px;
  margin-top: 2px;
  flex-shrink: 0;
}

.terms-link {
  color: var(--primary-color);
  text-decoration: none;
}

.terms-link:hover {
  color: var(--primary-color-hover);
}

.register-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
}

.register-footer {
  text-align: center;
  margin-top: 24px;
}

.login-link {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  color: var(--primary-color-hover);
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
  .register-container {
    padding: 24px;
  }
  
  .register-title {
    font-size: 24px;
  }
}
</style> 