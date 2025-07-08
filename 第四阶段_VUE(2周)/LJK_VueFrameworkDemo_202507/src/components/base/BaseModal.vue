<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div 
        v-if="modelValue" 
        class="modal-overlay"
        @click.self="handleOverlayClick"
      >
        <div 
          class="modal"
          :style="modalStyle"
          @click.stop
        >
          <!-- 模态框头部 -->
          <div v-if="showHeader" class="modal-header">
            <slot name="header">
              <h3 class="modal-title">{{ title }}</h3>
            </slot>
            <button 
              v-if="showClose"
              class="modal-close"
              @click="handleClose"
            >
              ✕
            </button>
          </div>

          <!-- 模态框内容 -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- 模态框底部 -->
          <div v-if="showFooter" class="modal-footer">
            <slot name="footer">
              <BaseButton 
                type="outline" 
                @click="handleCancel"
              >
                {{ cancelText }}
              </BaseButton>
              <BaseButton 
                type="primary" 
                @click="handleConfirm"
                :loading="confirmLoading"
              >
                {{ confirmText }}
              </BaseButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'BaseModal',
  components: {
    BaseButton
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: [String, Number],
      default: 520
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'confirm', 'cancel', 'close'],
  setup(props, { emit }) {
    const modalStyle = computed(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width
    }))

    const handleClose = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    const handleConfirm = () => {
      emit('confirm')
    }

    const handleCancel = () => {
      emit('cancel')
      handleClose()
    }

    const handleOverlayClick = () => {
      if (props.closeOnOverlay) {
        handleClose()
      }
    }

    return {
      modalStyle,
      handleClose,
      handleConfirm,
      handleCancel,
      handleOverlayClick
    }
  }
}
</script>

<style scoped>
.modal-overlay {
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

.modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-color-secondary);
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background-color: var(--bg-color-light);
  color: var(--text-color);
}

.modal-body {
  padding: 16px;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.8);
}
</style> 