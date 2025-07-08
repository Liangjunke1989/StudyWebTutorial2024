<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1 class="page-title">个人设置</h1>
      <p class="page-subtitle">管理您的账户偏好和隐私设置</p>
    </div>

    <div class="settings-content">
      <div class="settings-sidebar">
        <div class="settings-menu">
          <div 
            v-for="section in settingSections" 
            :key="section.key"
            :class="['menu-item', { active: activeSection === section.key }]"
            @click="activeSection = section.key"
          >
            <span class="menu-icon">{{ section.icon }}</span>
            <span class="menu-label">{{ section.label }}</span>
          </div>
        </div>
      </div>

      <div class="settings-main">
        <!-- 基本设置 -->
        <div v-if="activeSection === 'basic'" class="settings-section">
          <h2 class="section-title">基本设置</h2>
          
          <div class="setting-item">
            <label class="setting-label">显示语言</label>
            <select v-model="settings.language" class="setting-select">
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
              <option value="ja-JP">日本語</option>
            </select>
          </div>

          <div class="setting-item">
            <label class="setting-label">时区</label>
            <select v-model="settings.timezone" class="setting-select">
              <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
              <option value="America/New_York">美国东部时间 (UTC-5)</option>
              <option value="Europe/London">英国时间 (UTC+0)</option>
            </select>
          </div>

          <div class="setting-item">
            <label class="setting-label">日期格式</label>
            <select v-model="settings.dateFormat" class="setting-select">
              <option value="YYYY-MM-DD">2024-01-01</option>
              <option value="MM/DD/YYYY">01/01/2024</option>
              <option value="DD/MM/YYYY">01/01/2024</option>
            </select>
          </div>
        </div>

        <!-- 外观设置 -->
        <div v-if="activeSection === 'appearance'" class="settings-section">
          <h2 class="section-title">外观设置</h2>
          
          <div class="setting-item">
            <label class="setting-label">主题模式</label>
            <div class="theme-options">
              <div 
                v-for="theme in themeOptions" 
                :key="theme.value"
                :class="['theme-option', { active: settings.theme === theme.value }]"
                @click="settings.theme = theme.value"
              >
                <div class="theme-preview" :class="theme.value">
                  <div class="theme-header"></div>
                  <div class="theme-content"></div>
                </div>
                <span class="theme-label">{{ theme.label }}</span>
              </div>
            </div>
          </div>

          <div class="setting-item">
            <label class="setting-label">主色调</label>
            <div class="color-options">
              <div 
                v-for="color in colorOptions" 
                :key="color.value"
                :class="['color-option', { active: settings.primaryColor === color.value }]"
                :style="{ backgroundColor: color.color }"
                @click="settings.primaryColor = color.value"
              >
                <span v-if="settings.primaryColor === color.value">✓</span>
              </div>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.compactMode"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                紧凑模式
              </label>
              <p class="setting-description">启用紧凑模式以显示更多内容</p>
            </div>
          </div>
        </div>

        <!-- 通知设置 -->
        <div v-if="activeSection === 'notifications'" class="settings-section">
          <h2 class="section-title">通知设置</h2>
          
          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.emailNotifications"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                邮件通知
              </label>
              <p class="setting-description">接收重要更新和消息的邮件通知</p>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.browserNotifications"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                浏览器通知
              </label>
              <p class="setting-description">在浏览器中显示实时通知</p>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.soundNotifications"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                声音提醒
              </label>
              <p class="setting-description">播放声音提醒新消息</p>
            </div>
          </div>
        </div>

        <!-- 隐私设置 -->
        <div v-if="activeSection === 'privacy'" class="settings-section">
          <h2 class="section-title">隐私设置</h2>
          
          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.profileVisible"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                公开个人资料
              </label>
              <p class="setting-description">允许其他用户查看您的个人资料</p>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.activityVisible"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                显示活动状态
              </label>
              <p class="setting-description">显示您的在线状态和最后活动时间</p>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-switch">
              <label class="switch-label">
                <input 
                  type="checkbox" 
                  v-model="settings.dataCollection"
                  class="switch-input"
                />
                <span class="switch-slider"></span>
                数据收集
              </label>
              <p class="setting-description">允许收集使用数据以改善服务</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="settings-actions">
          <BaseButton 
            type="primary" 
            @click="handleSave"
            :loading="saving"
          >
            保存设置
          </BaseButton>
          <BaseButton 
            type="outline" 
            @click="handleReset"
          >
            重置设置
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useAppStore } from '@/stores/modules/app'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'UserSettings',
  components: {
    BaseButton
  },
  setup() {
    const userStore = useUserStore()
    const appStore = useAppStore()
    
    const activeSection = ref('basic')
    const saving = ref(false)
    
    const settings = reactive({
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      dateFormat: 'YYYY-MM-DD',
      theme: 'light',
      primaryColor: 'blue',
      compactMode: false,
      emailNotifications: true,
      browserNotifications: true,
      soundNotifications: false,
      profileVisible: true,
      activityVisible: true,
      dataCollection: true
    })

    const settingSections = [
      { key: 'basic', label: '基本设置', icon: '⚙️' },
      { key: 'appearance', label: '外观设置', icon: '🎨' },
      { key: 'notifications', label: '通知设置', icon: '🔔' },
      { key: 'privacy', label: '隐私设置', icon: '🔒' }
    ]

    const themeOptions = [
      { value: 'light', label: '浅色' },
      { value: 'dark', label: '深色' },
      { value: 'auto', label: '自动' }
    ]

    const colorOptions = [
      { value: 'blue', color: '#1890ff' },
      { value: 'green', color: '#52c41a' },
      { value: 'red', color: '#f5222d' },
      { value: 'orange', color: '#fa8c16' },
      { value: 'purple', color: '#722ed1' }
    ]

    const handleSave = async () => {
      saving.value = true
      try {
        // 保存设置到后端
        await userStore.updateSettings(settings)
        
        // 应用主题设置
        appStore.setTheme(settings.theme)
        
        // 显示成功消息
        console.log('设置已保存')
      } catch (error) {
        console.error('保存设置失败:', error)
      } finally {
        saving.value = false
      }
    }

    const handleReset = () => {
      // 重置为默认设置
      Object.assign(settings, {
        language: 'zh-CN',
        timezone: 'Asia/Shanghai',
        dateFormat: 'YYYY-MM-DD',
        theme: 'light',
        primaryColor: 'blue',
        compactMode: false,
        emailNotifications: true,
        browserNotifications: true,
        soundNotifications: false,
        profileVisible: true,
        activityVisible: true,
        dataCollection: true
      })
    }

    const loadSettings = async () => {
      try {
        const userSettings = await userStore.getSettings()
        Object.assign(settings, userSettings)
      } catch (error) {
        console.error('加载设置失败:', error)
      }
    }

    onMounted(() => {
      loadSettings()
    })

    return {
      activeSection,
      saving,
      settings,
      settingSections,
      themeOptions,
      colorOptions,
      handleSave,
      handleReset
    }
  }
}
</script>

<style scoped>
.settings-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-header {
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-color-secondary);
}

.settings-content {
  display: flex;
  gap: 32px;
  background: var(--bg-color-container);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.settings-sidebar {
  width: 240px;
  background: var(--bg-color-sidebar);
  border-right: 1px solid var(--border-color);
}

.settings-menu {
  padding: 16px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: var(--bg-color-hover);
}

.menu-item.active {
  background: var(--primary-color-light);
  border-left-color: var(--primary-color);
  color: var(--primary-color);
}

.menu-icon {
  margin-right: 12px;
  font-size: 16px;
}

.menu-label {
  font-size: 14px;
  font-weight: 500;
}

.settings-main {
  flex: 1;
  padding: 32px;
}

.settings-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: 24px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--border-color);
}

.setting-item {
  margin-bottom: 24px;
}

.setting-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: 8px;
}

.setting-select {
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background: var(--bg-color-input);
  color: var(--text-color-primary);
}

.theme-options {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-option:hover {
  border-color: var(--primary-color-light);
}

.theme-option.active {
  border-color: var(--primary-color);
  background: var(--primary-color-light);
}

.theme-preview {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.theme-preview.light {
  background: #ffffff;
}

.theme-preview.dark {
  background: #1f1f1f;
}

.theme-preview.auto {
  background: linear-gradient(90deg, #ffffff 50%, #1f1f1f 50%);
}

.theme-header {
  height: 12px;
  background: var(--bg-color-header);
}

.theme-content {
  height: 28px;
  background: var(--bg-color-content);
}

.theme-label {
  font-size: 12px;
  color: var(--text-color-secondary);
}

.color-options {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.color-option {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: var(--text-color-primary);
  box-shadow: 0 0 0 2px var(--bg-color-container);
}

.setting-switch {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.switch-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color-primary);
}

.switch-input {
  display: none;
}

.switch-slider {
  width: 44px;
  height: 24px;
  background: var(--bg-color-disabled);
  border-radius: 12px;
  position: relative;
  transition: all 0.2s ease;
}

.switch-slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.switch-input:checked + .switch-slider {
  background: var(--primary-color);
}

.switch-input:checked + .switch-slider::before {
  transform: translateX(20px);
}

.setting-description {
  font-size: 12px;
  color: var(--text-color-secondary);
  margin: 0;
}

.settings-actions {
  display: flex;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .settings-content {
    flex-direction: column;
  }
  
  .settings-sidebar {
    width: 100%;
  }
  
  .settings-menu {
    display: flex;
    overflow-x: auto;
    padding: 16px;
  }
  
  .menu-item {
    flex-shrink: 0;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .menu-item.active {
    border-left: none;
    border-bottom-color: var(--primary-color);
  }
}
</style> 