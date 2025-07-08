<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-illustration">
        <div class="error-number">404</div>
        <div class="error-icon">🔍</div>
      </div>
      
      <div class="error-content">
        <h1 class="error-title">页面不存在</h1>
        <p class="error-description">
          抱歉，您访问的页面不存在或已被删除。
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
        
        <div class="error-links">
          <p class="links-title">您可能想要访问：</p>
          <div class="links-list">
            <router-link to="/home" class="error-link">
              <span class="link-icon">🏠</span>
              <span class="link-text">首页</span>
            </router-link>
            <router-link to="/about" class="error-link">
              <span class="link-icon">ℹ️</span>
              <span class="link-text">关于我们</span>
            </router-link>
            <router-link to="/user/profile" class="error-link">
              <span class="link-icon">👤</span>
              <span class="link-text">个人中心</span>
            </router-link>
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
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

.error-links {
  border-top: 1px solid #ecf0f1;
  padding-top: 30px;
}

.links-title {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 20px 0;
}

.links-list {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.error-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #34495e;
  transition: all 0.3s ease;
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 80px;
}

.error-link:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  color: #3498db;
}

.link-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.link-text {
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
  
  .links-list {
    gap: 16px;
  }
}
</style> 