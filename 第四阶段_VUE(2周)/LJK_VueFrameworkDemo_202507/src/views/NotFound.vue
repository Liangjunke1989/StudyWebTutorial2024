<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="not-found-content">
        <div class="error-illustration">
          <div class="error-code">404</div>
          <div class="error-icon">🔍</div>
        </div>
        
        <div class="error-text">
          <h1 class="error-title">页面未找到</h1>
          <p class="error-message">
            抱歉，您访问的页面不存在或已被移除。
          </p>
          <p class="error-suggestion">
            请检查URL是否正确，或者返回首页继续浏览。
          </p>
        </div>
        
        <div class="error-actions">
          <BaseButton 
            type="primary" 
            size="large"
            @click="handleGoHome"
          >
            返回首页
          </BaseButton>
          
          <BaseButton 
            type="outline" 
            size="large"
            @click="handleGoBack"
          >
            返回上页
          </BaseButton>
        </div>
        
        <div class="helpful-links">
          <h3>您可能在寻找：</h3>
          <ul class="link-list">
            <li>
              <router-link to="/" class="helpful-link">
                🏠 首页
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="helpful-link">
                ℹ️ 关于我们
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard" class="helpful-link">
                📊 仪表盘
              </router-link>
            </li>
            <li>
              <router-link to="/profile" class="helpful-link">
                👤 个人资料
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { BaseButton } from '@/components'

const router = useRouter()

// 返回首页
const handleGoHome = () => {
  router.push('/')
}

// 返回上一页
const handleGoBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.not-found-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.not-found-content {
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.error-illustration {
  margin-bottom: 32px;
  position: relative;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  color: #e1e4e8;
  line-height: 1;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

.error-text {
  margin-bottom: 32px;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.error-message {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.6;
}

.error-suggestion {
  font-size: 14px;
  color: #888;
  line-height: 1.6;
  margin: 0;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.helpful-links {
  text-align: left;
  max-width: 300px;
  margin: 0 auto;
}

.helpful-links h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-align: center;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-bottom: 8px;
}

.helpful-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  color: #666;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 14px;
}

.helpful-link:hover {
  background: #f5f5f5;
  color: var(--primary-color);
  transform: translateX(4px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-content {
    padding: 32px 24px;
  }
  
  .error-code {
    font-size: 80px;
  }
  
  .error-icon {
    font-size: 32px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .not-found-page {
    padding: 16px;
  }
  
  .not-found-content {
    padding: 24px 16px;
  }
  
  .error-code {
    font-size: 60px;
  }
  
  .error-title {
    font-size: 20px;
  }
}
</style> 