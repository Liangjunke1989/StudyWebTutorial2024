/**
 * 防抖相关的Composable
 */

import { ref, watch, onUnmounted } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)
  let timeoutId = null
  
  const updateDebouncedValue = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      debouncedValue.value = value.value
    }, delay)
  }
  
  // 监听原始值的变化
  watch(value, updateDebouncedValue, { immediate: true })
  
  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })
  
  return debouncedValue
}

// 防抖函数
export function useDebounceFn(fn, delay = 300) {
  let timeoutId = null
  
  const debouncedFn = (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }
  
  onUnmounted(() => {
    cancel()
  })
  
  return {
    debouncedFn,
    cancel
  }
} 