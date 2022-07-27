import { createApp } from 'vue'
import App from '/@/App.vue'
import router from '/@/router'
import themeHelper from '/@/utils/theme'
import globalApi from '/@/stores/global'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

import '@arco-design/web-vue/dist/arco.css'
import '/@/styles/preset/index.scss'
import '/@/styles/other/common.css'

window.$theme = themeHelper
window.$global = globalApi

themeHelper.init()

createApp(App)
  .use(router)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .mount('#app')

if (import.meta.env.MODE === 'development') {
  console.log(window.$global)
}
