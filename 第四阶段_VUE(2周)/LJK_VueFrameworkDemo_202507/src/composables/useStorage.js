/**
 * 本地存储相关的Composable
 */

import { ref, watch } from 'vue'

export function useStorage(key, defaultValue = null, storage = localStorage) {
  // 从存储中读取初始值
  const read = () => {
    try {
      const item = storage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error)
      return defaultValue
    }
  }
  
  // 写入存储
  const write = (value) => {
    try {
      if (value === null || value === undefined) {
        storage.removeItem(key)
      } else {
        storage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error(`Error writing ${key} to storage:`, error)
    }
  }
  
  // 创建响应式引用
  const storedValue = ref(read())
  
  // 监听值的变化并同步到存储
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )
  
  // 移除存储项
  const remove = () => {
    storage.removeItem(key)
    storedValue.value = defaultValue
  }
  
  return {
    value: storedValue,
    remove
  }
}

// 专门用于localStorage的快捷方法
export function useLocalStorage(key, defaultValue = null) {
  return useStorage(key, defaultValue, localStorage)
}

// 专门用于sessionStorage的快捷方法
export function useSessionStorage(key, defaultValue = null) {
  return useStorage(key, defaultValue, sessionStorage)
} 