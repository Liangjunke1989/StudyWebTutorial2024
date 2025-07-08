<template>
  <div class="base-empty">
    <div class="empty-icon">
      📭
    </div>
    <div class="empty-text">
      {{ text }}
    </div>
    <div v-if="showAction" class="empty-action">
      <slot name="action">
        <button class="empty-btn" @click="$emit('action')">
          {{ actionText }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseEmpty',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    actionText: {
      type: String,
      default: '重新加载'
    },
    showAction: {
      type: Boolean,
      default: false
    }
  },
  emits: ['action']
}
</script>

<style scoped>
.base-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-text {
  color: var(--text-color-secondary);
  font-size: 14px;
  margin-bottom: 16px;
}

.empty-btn {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.empty-btn:hover {
  background-color: var(--primary-hover-color);
}
</style> 