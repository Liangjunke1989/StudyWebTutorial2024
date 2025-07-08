/**
 * 请求相关的Composable
 */

import { ref, onUnmounted } from 'vue'

export function useRequest(requestFn, options = {}) {
  const {
    immediate = false,
    onSuccess,
    onError,
    defaultData = null
  } = options
  
  const data = ref(defaultData)
  const loading = ref(false)
  const error = ref(null)
  const abortController = ref(null)
  
  // 执行请求
  const execute = async (...args) => {
    try {
      loading.value = true
      error.value = null
      
      // 取消之前的请求
      if (abortController.value) {
        abortController.value.abort()
      }
      
      abortController.value = new AbortController()
      
      const result = await requestFn(...args, {
        signal: abortController.value.signal
      })
      
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err
        onError?.(err)
        throw err
      }
    } finally {
      loading.value = false
    }
  }
  
  // 取消请求
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort()
    }
  }
  
  // 重置状态
  const reset = () => {
    data.value = defaultData
    loading.value = false
    error.value = null
  }
  
  // 立即执行
  if (immediate) {
    execute()
  }
  
  // 组件卸载时取消请求
  onUnmounted(() => {
    cancel()
  })
  
  return {
    data,
    loading,
    error,
    execute,
    cancel,
    reset
  }
} 