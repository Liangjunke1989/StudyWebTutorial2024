<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="btn-loading">
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/>
      </svg>
    </span>
    <span v-if="icon && !loading" :class="iconClasses">
      <component :is="icon" />
    </span>
    <span v-if="$slots.default" class="btn-text">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 按钮类型
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'text'].includes(value)
  },
  // 按钮大小
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否加载中
  loading: {
    type: Boolean,
    default: false
  },
  // 按钮类型
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  // 图标
  icon: {
    type: [String, Object],
    default: null
  },
  // 图标位置
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  // 是否圆角
  rounded: {
    type: Boolean,
    default: false
  },
  // 是否块级元素
  block: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    {
      'btn-disabled': props.disabled,
      'btn-loading': props.loading,
      'btn-rounded': props.rounded,
      'btn-block': props.block,
      'btn-icon-only': props.icon && !props.$slots?.default
    }
  ]
})

const iconClasses = computed(() => {
  return [
    'btn-icon',
    `btn-icon-${props.iconPosition}`
  ]
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer;
}

.btn:disabled,
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn-loading {
  @apply cursor-not-allowed;
}

/* 尺寸变体 */
.btn-small {
  @apply px-3 py-1.5 text-xs;
}

.btn-medium {
  @apply px-4 py-2 text-sm;
}

.btn-large {
  @apply px-6 py-3 text-base;
}

/* 颜色变体 */
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.btn-secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
}

.btn-success {
  @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
}

.btn-warning {
  @apply bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.btn-info {
  @apply bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500;
}

.btn-text {
  @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent;
}

/* 其他样式 */
.btn-rounded {
  @apply rounded-full;
}

.btn-block {
  @apply w-full;
}

.btn-icon-only {
  @apply p-2;
}

.btn-loading {
  @apply mr-2;
}

.btn-icon {
  @apply w-4 h-4;
}

.btn-icon-left {
  @apply mr-2;
}

.btn-icon-right {
  @apply ml-2;
}

.btn-text .btn-text {
  @apply text-inherit;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 暗色主题 */
.dark .btn-text {
  @apply text-gray-300 hover:bg-gray-800;
}
</style> 