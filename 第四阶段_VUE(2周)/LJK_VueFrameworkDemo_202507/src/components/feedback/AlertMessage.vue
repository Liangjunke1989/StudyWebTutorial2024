<template>
  <div v-if="visible" class="alert-message" :class="type">
    <span class="alert-icon">{{ getIcon() }}</span>
    <span class="alert-text">{{ message }}</span>
    <button v-if="closable" class="alert-close" @click="handleClose">×</button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: String,
    type: {
      type: String,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  methods: {
    getIcon() {
      const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
      }
      return icons[this.type] || icons.info
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.alert-message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.alert-message.success {
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.alert-message.warning {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  color: #faad14;
}

.alert-message.error {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
}

.alert-message.info {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  color: #1890ff;
}

.alert-icon {
  margin-right: 8px;
}

.alert-text {
  flex: 1;
}

.alert-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
}
</style> 