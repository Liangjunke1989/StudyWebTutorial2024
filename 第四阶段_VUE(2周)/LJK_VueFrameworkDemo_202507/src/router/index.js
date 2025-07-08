import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'

// 导入布局组件
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

// 导入页面组件
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

// 路由配置
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'home',
          requiresAuth: false,
          keepAlive: true
        }
      },
      {
        path: 'about',
        name: 'About',
        component: About,
        meta: {
          title: '关于',
          icon: 'info',
          requiresAuth: false,
          keepAlive: false
        }
      }
    ]
  },
  
  // 认证相关路由
  {
    path: '/auth',
    component: BlankLayout,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        meta: {
          title: '登录',
          requiresAuth: false,
          hideInMenu: true
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        meta: {
          title: '注册',
          requiresAuth: false,
          hideInMenu: true
        }
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        meta: {
          title: '忘记密码',
          requiresAuth: false,
          hideInMenu: true
        }
      }
    ]
  },

  // 用户相关路由
  {
    path: '/user',
    component: DefaultLayout,
    redirect: '/user/profile',
    meta: {
      title: '用户中心',
      icon: 'user',
      requiresAuth: true
    },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/user/Profile.vue'),
        meta: {
          title: '个人资料',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'UserSettings',
        component: () => import('@/views/user/Settings.vue'),
        meta: {
          title: '个人设置',
          requiresAuth: true
        }
      }
    ]
  },

  // 管理后台路由
  {
    path: '/admin',
    component: DefaultLayout,
    redirect: '/admin/dashboard',
    meta: {
      title: '管理后台',
      icon: 'dashboard',
      requiresAuth: true,
      roles: ['admin']
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: {
          title: '控制台',
          requiresAuth: true,
          roles: ['admin']
        }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/Users.vue'),
        meta: {
          title: '用户管理',
          requiresAuth: true,
          roles: ['admin']
        }
      }
    ]
  },

  // 错误页面
  {
    path: '/error',
    component: BlankLayout,
    children: [
      {
        path: '404',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
          title: '页面不存在',
          hideInMenu: true
        }
      },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/error/403.vue'),
        meta: {
          title: '无权限访问',
          hideInMenu: true
        }
      },
      {
        path: '500',
        name: 'ServerError',
        component: () => import('@/views/error/500.vue'),
        meta: {
          title: '服务器错误',
          hideInMenu: true
        }
      }
    ]
  },

  // 重定向 404 页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Vue App` : 'Vue App'

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const userStore = useUserStore()
    
    // 检查用户是否已登录
    if (!userStore.isAuthenticated) {
      // 未登录，重定向到登录页
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
      return
    }

    // 检查用户角色权限
    if (to.meta.roles && to.meta.roles.length > 0) {
      const hasPermission = to.meta.roles.some(role => 
        userStore.userInfo.roles?.includes(role)
      )
      
      if (!hasPermission) {
        // 无权限，重定向到 403 页面
        next('/error/403')
        return
      }
    }
  }

  // 如果已登录用户访问登录页，重定向到首页
  if (to.path === '/auth/login') {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      next('/')
      return
    }
  }

  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 路由切换后的逻辑
  // 可以在这里添加页面访问统计等
})

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error)
})

export default router

// 导出路由配置，用于菜单生成
export { routes }

// 辅助函数：生成菜单数据
export const generateMenus = (routes, basePath = '') => {
  const menus = []
  
  routes.forEach(route => {
    if (route.meta?.hideInMenu) return
    
    const menu = {
      path: basePath + route.path,
      name: route.name,
      title: route.meta?.title || route.name,
      icon: route.meta?.icon,
      children: []
    }
    
    if (route.children && route.children.length > 0) {
      menu.children = generateMenus(route.children, menu.path === '/' ? '' : menu.path)
    }
    
    menus.push(menu)
  })
  
  return menus
}

// 辅助函数：检查路由权限
export const checkRoutePermission = (route, userRoles = []) => {
  if (!route.meta?.roles) return true
  return route.meta.roles.some(role => userRoles.includes(role))
}

// 辅助函数：获取面包屑
export const getBreadcrumbs = (route, routes = []) => {
  const breadcrumbs = []
  const pathArray = route.path.split('/').filter(Boolean)
  
  let currentPath = ''
  pathArray.forEach(path => {
    currentPath += `/${path}`
    const matchedRoute = findRouteByPath(currentPath, routes)
    if (matchedRoute && matchedRoute.meta?.title) {
      breadcrumbs.push({
        path: currentPath,
        title: matchedRoute.meta.title
      })
    }
  })
  
  return breadcrumbs
}

// 辅助函数：根据路径查找路由
const findRouteByPath = (path, routes) => {
  for (const route of routes) {
    if (route.path === path) {
      return route
    }
    if (route.children) {
      const found = findRouteByPath(path, route.children)
      if (found) return found
    }
  }
  return null
}
