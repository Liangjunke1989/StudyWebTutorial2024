/**
 * Pinia状态管理主入口文件
 */

import { createPinia } from 'pinia'

// 创建pinia实例
export const pinia = createPinia()

// 导出所有store
export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'
export { usePermissionStore } from './modules/permission'
export { useSettingsStore } from './modules/settings'

export default pinia 