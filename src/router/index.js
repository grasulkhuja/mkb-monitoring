import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
      layout: 'content',
      requiresAuth: true,
    },
    redirect: {
      name: 'reports-add',
    },
  },
  {
    path: '/reports/add',
    name: 'reports-add',
    component: () => import('@/views/reports/AddReportView.vue'),
    meta: {
      title: 'Add Report',
      layout: 'content',
      requiresAuth: true,
    },
  },
  {
    path: '/reports/list',
    name: 'reports-list',
    component: () => import('@/views/reports/ReportsListView.vue'),
    meta: {
      title: 'ReportsListView',
      layout: 'content',
      requiresAuth: true,
    },
  },
  // {
  //   path: '/office',
  //   name: 'office',
  //   component: () => import('@/views/OfficeView.vue'),
  //   meta: {
  //     title: 'Office',
  //     layout: 'content',
  //     requiresAuth: true,
  //   },
  //   beforeEnter(to, from, next) {
  //     if (!store.state.office.officeType) return next({ name: 'home' })
  //     return next()
  //   },
  // },
  // {
  //   path: '/front-office',
  //   name: 'front-office',
  //   component: () => import('@/views/FrontOfficeView.vue'),
  //   meta: {
  //     title: 'Front Office',
  //     layout: 'content',
  //     requiresAuth: true,
  //   },
  //   beforeEnter(to, from, next) {
  //     if (!store.state.office.officeType) return next({ name: 'home' })
  //     return next()
  //   },
  // },
  // {
  //   path: '/back-office',
  //   name: 'back-office',
  //   component: () => import('@/views/BackOfficeView.vue'),
  //   meta: {
  //     title: 'Back Office',
  //     layout: 'content',
  //     requiresAuth: true,
  //   },
  //   beforeEnter(to, from, next) {
  //     if (!store.state.office.officeType) return next({ name: 'home' })
  //     return next()
  //   },
  // },
  {
    path: '/auth-login',
    name: 'auth-login',
    component: () => import('@/views/Auth/LoginView.vue'),
    meta: {
      title: 'Login',
      layout: 'blank',
      requiresAuth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth-login']
  const isAuthenticated = localStorage.getItem('access')
  const authRequired = !publicPages.includes(to.path)
  if (authRequired && !isAuthenticated) return next({ name: 'auth-login' })
  return next()
})

export default router
