<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    
    <div class="input-container">
      <span v-if="prefixIcon" class="input-prefix-icon">
        <component :is="prefixIcon" />
      </span>
      
      <input
        :id="inputId"
        ref="inputRef"
        :class="inputClasses"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <span v-if="suffixIcon || clearable" class="input-suffix-icon">
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          class="input-clear-btn"
          @click="handleClear"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <component v-else-if="suffixIcon" :is="suffixIcon" />
      </span>
    </div>
    
    <div v-if="showWordCount" class="input-word-count">
      {{ currentLength }}/{{ maxlength }}
    </div>
    
    <div v-if="error || hint" class="input-message">
      <span v-if="error" class="input-error">{{ error }}</span>
      <span v-else-if="hint" class="input-hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const props = defineProps({
  // v-model 值
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // 输入框类型
  type: {
    type: String,
    default: 'text'
  },
  // 标签
  label: {
    type: String,
    default: ''
  },
  // 占位符
  placeholder: {
    type: String,
    default: ''
  },
  // 是否必填
  required: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  // 最大长度
  maxlength: {
    type: Number,
    default: null
  },
  // 是否显示字数统计
  showWordCount: {
    type: Boolean,
    default: false
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: false
  },
  // 前缀图标
  prefixIcon: {
    type: [String, Object],
    default: null
  },
  // 后缀图标
  suffixIcon: {
    type: [String, Object],
    default: null
  },
  // 错误信息
  error: {
    type: String,
    default: ''
  },
  // 提示信息
  hint: {
    type: String,
    default: ''
  },
  // 尺寸
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  // 自动完成
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear', 'keydown'])

const inputRef = ref(null)
const isFocused = ref(false)

// 生成唯一ID
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

// 当前字符长度
const currentLength = computed(() => {
  return String(props.modelValue || '').length
})

// 输入框样式类
const inputClasses = computed(() => {
  return [
    'input-field',
    `input-${props.size}`,
    {
      'input-error': props.error,
      'input-disabled': props.disabled,
      'input-readonly': props.readonly,
      'input-focused': isFocused.value,
      'input-has-prefix': props.prefixIcon,
      'input-has-suffix': props.suffixIcon || props.clearable
    }
  ]
})

// 处理输入
const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
}

// 处理聚焦
const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

// 处理失焦
const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

// 处理清空
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 处理键盘事件
const handleKeydown = (event) => {
  emit('keydown', event)
}

// 聚焦方法
const focus = () => {
  inputRef.value?.focus()
}

// 失焦方法
const blur = () => {
  inputRef.value?.blur()
}

// 暴露方法
defineExpose({
  focus,
  blur,
  inputRef
})
</script>

<style scoped>
.input-wrapper {
  @apply w-full;
}

.input-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.input-required {
  @apply text-red-500 ml-1;
}

.input-container {
  @apply relative;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200;
}

/* 尺寸变体 */
.input-small {
  @apply px-2 py-1 text-sm;
}

.input-medium {
  @apply px-3 py-2 text-base;
}

.input-large {
  @apply px-4 py-3 text-lg;
}

/* 状态样式 */
.input-error {
  @apply border-red-300 focus:ring-red-500 focus:border-red-500;
}

.input-disabled {
  @apply bg-gray-100 text-gray-500 cursor-not-allowed;
}

.input-readonly {
  @apply bg-gray-50 cursor-default;
}

.input-focused {
  @apply ring-2 ring-blue-500 border-blue-500;
}

/* 图标样式 */
.input-has-prefix {
  @apply pl-10;
}

.input-has-suffix {
  @apply pr-10;
}

.input-prefix-icon,
.input-suffix-icon {
  @apply absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none;
}

.input-prefix-icon {
  @apply left-3;
}

.input-suffix-icon {
  @apply right-3;
}

.input-clear-btn {
  @apply pointer-events-auto text-gray-400 hover:text-gray-600 focus:outline-none;
}

/* 字数统计 */
.input-word-count {
  @apply text-xs text-gray-500 mt-1 text-right;
}

/* 消息提示 */
.input-message {
  @apply mt-1 text-sm;
}

.input-error {
  @apply text-red-600;
}

.input-hint {
  @apply text-gray-500;
}

/* 暗色主题 */
.dark .input-label {
  @apply text-gray-300;
}

.dark .input-field {
  @apply bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400;
}

.dark .input-disabled {
  @apply bg-gray-700 text-gray-400;
}

.dark .input-readonly {
  @apply bg-gray-700;
}

.dark .input-word-count {
  @apply text-gray-400;
}

.dark .input-hint {
  @apply text-gray-400;
}
</style> 