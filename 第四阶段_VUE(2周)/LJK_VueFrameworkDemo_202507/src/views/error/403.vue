<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-illustration">
        <div class="error-number">403</div>
        <div class="error-icon">🚫</div>
      </div>
      
      <div class="error-content">
        <h1 class="error-title">无权限访问</h1>
        <p class="error-description">
          抱歉，您没有权限访问此页面。请联系管理员获取相应权限。
        </p>
        
        <div class="error-actions">
          <BaseButton 
            type="primary" 
            @click="goHome"
            class="action-btn"
          >
            🏠 返回首页
          </BaseButton>
          <BaseButton 
            type="outline" 
            @click="goBack"
            class="action-btn"
          >
            ← 返回上页
          </BaseButton>
        </div>
        
        <div class="error-info">
          <div class="info-item">
            <span class="info-icon">👤</span>
            <span class="info-text">当前用户权限不足</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🔐</span>
            <span class="info-text">需要管理员权限</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📧</span>
            <span class="info-text">请联系系统管理员</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { BaseButton } from '@/components'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/home')
  }
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  padding: 20px;
}

.error-container {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
}

.error-illustration {
  padding: 40px 20px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  position: relative;
}

.error-number {
  font-size: 120px;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  line-height: 1;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: inline-block;
  animation: shake 1s infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.error-content {
  padding: 40px 30px;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;
}

.error-description {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.action-btn {
  min-width: 140px;
}

.error-info {
  border-top: 1px solid #ecf0f1;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #495057;
}

.info-icon {
  font-size: 20px;
}

.info-text {
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .error-number {
    font-size: 80px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .error-info {
    gap: 12px;
  }
  
  .info-item {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style> 