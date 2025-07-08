/**
 * 权限状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const permissions = ref([])
  const roles = ref([])
  const routes = ref([])
  const dynamicRoutes = ref([])

  // 计算属性
  const hasPermission = computed(() => {
    return (permission) => {
      return permissions.value.includes(permission)
    }
  })

  const hasRole = computed(() => {
    return (role) => {
      return roles.value.includes(role)
    }
  })

  const hasAnyPermission = computed(() => {
    return (permissionList) => {
      return permissionList.some(permission => permissions.value.includes(permission))
    }
  })

  const hasAllPermissions = computed(() => {
    return (permissionList) => {
      return permissionList.every(permission => permissions.value.includes(permission))
    }
  })

  // 动作
  const setPermissions = (newPermissions) => {
    permissions.value = newPermissions || []
  }

  const setRoles = (newRoles) => {
    roles.value = newRoles || []
  }

  const setRoutes = (newRoutes) => {
    routes.value = newRoutes || []
  }

  const addPermission = (permission) => {
    if (!permissions.value.includes(permission)) {
      permissions.value.push(permission)
    }
  }

  const removePermission = (permission) => {
    const index = permissions.value.indexOf(permission)
    if (index > -1) {
      permissions.value.splice(index, 1)
    }
  }

  const addRole = (role) => {
    if (!roles.value.includes(role)) {
      roles.value.push(role)
    }
  }

  const removeRole = (role) => {
    const index = roles.value.indexOf(role)
    if (index > -1) {
      roles.value.splice(index, 1)
    }
  }

  const generateRoutes = async (userRoles) => {
    // 根据用户角色生成动态路由
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, userRoles)
    dynamicRoutes.value = accessedRoutes
    return accessedRoutes
  }

  const clearPermissions = () => {
    permissions.value = []
    roles.value = []
    routes.value = []
    dynamicRoutes.value = []
  }

  // 过滤异步路由
  const filterAsyncRoutes = (routes, roles) => {
    const res = []
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermissionForRoute(tmp, roles)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })
    return res
  }

  // 检查路由权限
  const hasPermissionForRoute = (route, roles) => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    }
    return true
  }

  return {
    // 状态
    permissions,
    roles,
    routes,
    dynamicRoutes,
    
    // 计算属性
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    
    // 动作
    setPermissions,
    setRoles,
    setRoutes,
    addPermission,
    removePermission,
    addRole,
    removeRole,
    generateRoutes,
    clearPermissions
  }
})

// 异步路由配置
const asyncRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: '管理后台',
      roles: ['admin', 'super_admin']
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: {
          title: '管理控制台',
          roles: ['admin', 'super_admin']
        }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/Users.vue'),
        meta: {
          title: '用户管理',
          roles: ['admin', 'super_admin']
        }
      }
    ]
  }
] 