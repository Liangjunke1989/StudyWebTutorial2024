<template>
  <div v-if="visible" class="confirm-dialog-overlay">
    <div class="confirm-dialog">
      <div class="dialog-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="dialog-body">
        <p>{{ message }}</p>
      </div>
      <div class="dialog-footer">
        <button class="btn secondary" @click="handleCancel">取消</button>
        <button class="btn primary" @click="handleConfirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    visible: Boolean,
    title: String,
    message: String
  },
  emits: ['confirm', 'cancel'],
  methods: {
    handleConfirm() {
      this.$emit('confirm')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.confirm-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background: white;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
}

.dialog-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.dialog-body {
  padding: 16px;
}

.dialog-footer {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style> 