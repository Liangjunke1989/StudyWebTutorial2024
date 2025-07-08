<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-illustration">
        <div class="error-number">500</div>
        <div class="error-icon">⚠️</div>
      </div>
      
      <div class="error-content">
        <h1 class="error-title">服务器错误</h1>
        <p class="error-description">
          抱歉，服务器遇到了一个错误，无法完成您的请求。我们正在努力修复这个问题。
        </p>
        
        <div class="error-actions">
          <BaseButton 
            type="primary" 
            @click="refreshPage"
            class="action-btn"
          >
            🔄 刷新页面
          </BaseButton>
          <BaseButton 
            type="outline" 
            @click="goHome"
            class="action-btn"
          >
            🏠 返回首页
          </BaseButton>
        </div>
        
        <div class="error-details">
          <div class="details-header">
            <span class="details-icon">🔧</span>
            <span class="details-title">可能的解决方案</span>
          </div>
          <ul class="details-list">
            <li>刷新页面重试</li>
            <li>检查网络连接</li>
            <li>稍后再试</li>
            <li>联系技术支持</li>
          </ul>
        </div>
        
        <div class="error-contact">
          <p class="contact-text">
            如果问题持续存在，请联系我们：
          </p>
          <div class="contact-info">
            <span class="contact-item">
              📧 support@example.com
            </span>
            <span class="contact-item">
              📞 400-123-4567
            </span>
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

const refreshPage = () => {
  window.location.reload()
}

const goHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
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
  background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
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
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
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

.error-details {
  border-top: 1px solid #ecf0f1;
  padding-top: 30px;
  margin-bottom: 30px;
}

.details-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.details-icon {
  font-size: 20px;
}

.details-title {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.details-list li {
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  color: #495057;
  font-size: 14px;
  position: relative;
  padding-left: 40px;
}

.details-list li::before {
  content: "✓";
  position: absolute;
  left: 16px;
  color: #28a745;
  font-weight: bold;
}

.error-contact {
  border-top: 1px solid #ecf0f1;
  padding-top: 30px;
}

.contact-text {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 16px 0;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #e3f2fd;
  border-radius: 20px;
  color: #1976d2;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: #bbdefb;
  transform: translateY(-2px);
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
  
  .contact-info {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  
  .details-list li {
    padding-left: 32px;
  }
  
  .details-list li::before {
    left: 12px;
  }
}
</style> 