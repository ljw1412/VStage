import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/@/pages/Home/index.vue'

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/setting',
    name: 'AppSetting',
    component: () => import('/@/pages/Setting/index.vue'),
    meta: { title: '设置' }
  } // Lazy load route component
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  window.$global.setTitle((to.meta.title as string) || '')
  next()
})

if (import.meta.env.MODE === 'development') {
  router.afterEach((to, from) => {
    const tofrom = ['[To]', to, '\n[From]', from]
    console.groupCollapsed(
      '%c[CurrentRoute]',
      'color: #168cff;',
      window.location.href
    )
    console.log(...tofrom)
    console.groupEnd()
  })
}

export default router
