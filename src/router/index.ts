// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/appLogin.vue'),
    meta: { title: '青琦农供 - 登录' },
  },
  // 主布局
  {
    path: '/',
    component: () => import('../views/appLayout.vue'),
    redirect: '/home', // 默认进入首页
    children: [
      // 首页
      {
        path: 'home', // 子路由不要加 '/'
        name: 'home',
        component: () => import('../views/appHome.vue'),
        meta: { title: '青琦农供 - 首页' },
      },
      // 商家管理
      {
        path: 'merchant/list',
        name: 'merchantList',
        component: () => import('../views/merchant/merchantList.vue'),
        meta: { title: '青琦农供 - 商家管理列表' },
      },
      // 可以按需放开其他页面
      {
        //审核
        path: 'merchant/audit',
        name: 'merchantAudit',
        component: () => import('../views/merchant/merchantAudit.vue'),
      },
      {
        //统计
        path: 'merchant/statistics',
        name: 'merchantStatistics',
        component: () => import('../views/merchant/merchantStatistics.vue'),
      },
      {
        path: 'user/list',
        name: 'userList',
        component: () => import('../views/user/userList.vue'),
      },
      {
        path: 'user/permission',
        name: 'userPermission',
        component: () => import('../views/user/userPermission.vue'),
      },
      {
        path: 'system/config',
        name: 'systemConfig',
        component: () => import('../views/system/systemConfig.vue'),
      },
      //订单管理
      {
        path: 'shop/list',
        name: 'shopList',
        component: () => import('../views/shop/shopList.vue'),
      },
    ],
  },
  // 404 页面（可选）
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound.vue'), // 你可以自己建个 404 页面
  // },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫：未登录不能访问首页
router.beforeEach((to, from) => {
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    return '/login'
  }
  return true
})

export default router
