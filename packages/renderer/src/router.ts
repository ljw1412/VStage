import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/@/pages/Home/index.vue'
import Guide from '/@/pages/Guide/index.vue'
import Setting from '/@/pages/Setting/index.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'AppGuide' }
  },
  {
    path: '/guide',
    name: 'AppGuide',
    component: Guide,
    meta: { title: '启动向导' }
  },
  {
    path: '/home',
    name: 'AppHome',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/setting',
    name: 'AppSetting',
    component: () => Setting,
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
