<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <p class="copyright">
          © {{ currentYear }} Vue App. All rights reserved.
        </p>
      </div>
      
      <div class="footer-right">
        <div class="footer-links">
          <a href="#" class="footer-link">关于我们</a>
          <a href="#" class="footer-link">隐私政策</a>
          <a href="#" class="footer-link">服务条款</a>
          <a href="#" class="footer-link">联系我们</a>
        </div>
        
        <div class="footer-version">
          <span class="version-text">Version {{ version }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    const version = '1.0.0'
    
    return {
      currentYear,
      version
    }
  }
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 16px 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-left {
  flex: 1;
}

.copyright {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #1890ff;
}

.footer-version {
  color: #999;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .footer-right {
    flex-direction: column;
    gap: 12px;
  }
  
  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
}
</style> 