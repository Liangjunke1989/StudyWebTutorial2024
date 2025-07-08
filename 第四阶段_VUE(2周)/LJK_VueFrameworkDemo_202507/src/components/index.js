// 通用组件库入口文件
// 自动导入所有组件

// 基础组件
export { default as BaseButton } from './base/BaseButton.vue'
export { default as BaseInput } from './base/BaseInput.vue'
export { default as BaseModal } from './base/BaseModal.vue'
export { default as BaseCard } from './base/BaseCard.vue'
export { default as BaseTable } from './base/BaseTable.vue'
export { default as BasePagination } from './base/BasePagination.vue'
export { default as BaseLoading } from './base/BaseLoading.vue'
export { default as BaseEmpty } from './base/BaseEmpty.vue'

// 表单组件
export { default as FormItem } from './form/FormItem.vue'
export { default as FormGroup } from './form/FormGroup.vue'
export { default as SearchForm } from './form/SearchForm.vue'

// 数据展示组件
export { default as DataTable } from './data/DataTable.vue'
export { default as DataChart } from './data/DataChart.vue'
export { default as DataList } from './data/DataList.vue'

// 反馈组件
export { default as AlertMessage } from './feedback/AlertMessage.vue'
export { default as ConfirmDialog } from './feedback/ConfirmDialog.vue'
export { default as NotificationToast } from './feedback/NotificationToast.vue'

// 导航组件
export { default as BreadcrumbNav } from './navigation/BreadcrumbNav.vue'
export { default as TabsNav } from './navigation/TabsNav.vue'
export { default as SidebarNav } from './navigation/SidebarNav.vue'

// 组件安装插件
export const installComponents = (app) => {
  // 这里可以全局注册组件
  // app.component('BaseButton', BaseButton)
  // app.component('BaseInput', BaseInput)
  // ... 其他组件
}

export default {
  install: installComponents
} 