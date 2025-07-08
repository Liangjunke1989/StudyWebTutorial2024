<template>
  <div class="about-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">关于我们</h1>
        <p class="page-subtitle">了解我们的故事、团队和愿景</p>
      </div>
    </div>

    <!-- Company Info Section -->
    <section class="company-section">
      <div class="container">
        <div class="company-content">
          <div class="company-text">
            <h2 class="section-title">我们的故事</h2>
            <p class="company-description">
              我们是一家专注于现代化前端技术的创新公司，致力于为客户提供最优质的用户体验和技术解决方案。
              自成立以来，我们始终坚持技术创新，追求卓越品质。
            </p>
            <p class="company-description">
              我们的团队由经验丰富的前端工程师、设计师和产品经理组成，拥有丰富的项目经验和深厚的技术积累。
              我们相信技术的力量，也相信团队合作的重要性。
            </p>
            <div class="company-stats">
              <div class="stat-item">
                <div class="stat-number">{{ stats.projects }}</div>
                <div class="stat-label">完成项目</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ stats.clients }}</div>
                <div class="stat-label">服务客户</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ stats.experience }}</div>
                <div class="stat-label">年经验</div>
              </div>
            </div>
          </div>
          <div class="company-image">
            <div class="image-placeholder">
              <svg width="500" height="400" viewBox="0 0 500 400" fill="none">
                <rect width="500" height="400" fill="#f8f9fa" rx="12"/>
                <circle cx="250" cy="200" r="80" fill="#1890ff" opacity="0.1"/>
                <circle cx="250" cy="200" r="50" fill="#1890ff" opacity="0.3"/>
                <circle cx="250" cy="200" r="25" fill="#1890ff"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">核心价值观</h2>
          <p class="section-subtitle">指导我们前进的核心理念</p>
        </div>
        <div class="values-grid">
          <div class="value-card" v-for="value in values" :key="value.id">
            <div class="value-icon">
              <component :is="value.icon" />
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">团队成员</h2>
          <p class="section-subtitle">认识我们优秀的团队</p>
        </div>
        <div class="team-grid">
          <div class="team-card" v-for="member in teamMembers" :key="member.id">
            <div class="member-avatar">
              <img :src="member.avatar" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
              <p class="member-description">{{ member.description }}</p>
              <div class="member-skills">
                <span 
                  v-for="skill in member.skills" 
                  :key="skill"
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <h2 class="section-title">联系我们</h2>
            <p class="contact-description">
              有任何问题或合作需求，欢迎随时与我们联系
            </p>
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <div class="contact-label">地址</div>
                  <div class="contact-value">北京市朝阳区科技园区</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <div class="contact-label">电话</div>
                  <div class="contact-value">+86 138 0013 8000</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div class="contact-text">
                  <div class="contact-label">邮箱</div>
                  <div class="contact-value">contact@example.com</div>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-form">
            <h3 class="form-title">发送消息</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <BaseInput
                  v-model="form.name"
                  label="姓名"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div class="form-group">
                <BaseInput
                  v-model="form.email"
                  label="邮箱"
                  type="email"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>
              <div class="form-group">
                <BaseInput
                  v-model="form.subject"
                  label="主题"
                  placeholder="请输入消息主题"
                  required
                />
              </div>
              <div class="form-group">
                <label class="form-label">消息内容</label>
                <textarea
                  v-model="form.message"
                  class="form-textarea"
                  placeholder="请输入您的消息内容"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div class="form-actions">
                <BaseButton
                  type="primary"
                  size="large"
                  :loading="submitting"
                  html-type="submit"
                >
                  发送消息
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { BaseInput, BaseButton } from '@/components'

// 统计数据
const stats = ref({
  projects: '100+',
  clients: '50+',
  experience: '5+'
})

// 核心价值观
const values = ref([
  {
    id: 1,
    icon: 'InnovationIcon',
    title: '创新',
    description: '持续探索新技术，推动行业发展'
  },
  {
    id: 2,
    icon: 'QualityIcon',
    title: '品质',
    description: '严格把控每一个细节，确保最高品质'
  },
  {
    id: 3,
    icon: 'TeamworkIcon',
    title: '合作',
    description: '团队协作，共同创造更大价值'
  },
  {
    id: 4,
    icon: 'IntegrityIcon',
    title: '诚信',
    description: '诚实守信，建立长期合作关系'
  }
])

// 团队成员
const teamMembers = ref([
  {
    id: 1,
    name: '张三',
    position: '前端架构师',
    description: '10年前端开发经验，专注于Vue.js生态',
    avatar: 'https://via.placeholder.com/120x120?text=张三',
    skills: ['Vue.js', 'React', 'TypeScript', '架构设计']
  },
  {
    id: 2,
    name: '李四',
    position: 'UI/UX设计师',
    description: '资深设计师，擅长用户体验设计',
    avatar: 'https://via.placeholder.com/120x120?text=李四',
    skills: ['UI设计', 'UX设计', 'Figma', '用户研究']
  },
  {
    id: 3,
    name: '王五',
    position: '全栈工程师',
    description: '全栈开发专家，熟悉多种技术栈',
    avatar: 'https://via.placeholder.com/120x120?text=王五',
    skills: ['Node.js', 'Vue.js', 'Python', 'Docker']
  },
  {
    id: 4,
    name: '赵六',
    position: '产品经理',
    description: '产品规划专家，深度理解用户需求',
    avatar: 'https://via.placeholder.com/120x120?text=赵六',
    skills: ['产品设计', '需求分析', '项目管理', '用户调研']
  }
])

// 联系表单
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitting = ref(false)

// 表单提交
const handleSubmit = async () => {
  submitting.value = true
  
  try {
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 重置表单
    Object.keys(form).forEach(key => {
      form[key] = ''
    })
    
    alert('消息发送成功！我们会尽快回复您。')
  } catch (error) {
    console.error('提交失败:', error)
    alert('发送失败，请稍后重试。')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Company Section */
.company-section {
  padding: 80px 0;
}

.company-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.company-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.company-stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.image-placeholder {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

/* Values Section */
.values-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-top: 1rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.value-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.value-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: 80px 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.team-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  overflow: hidden;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.member-position {
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 1rem;
}

.member-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.member-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background: var(--color-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Contact Section */
.contact-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-label {
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.contact-value {
  color: var(--color-text-secondary);
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-actions {
  margin-top: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .company-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .company-stats {
    justify-content: center;
  }

  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style> 