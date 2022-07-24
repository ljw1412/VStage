import { useLocalStorage, get } from '@vueuse/core'

const CONFIG_STORE_KEY = 'app-config'

export default get(
  useLocalStorage(CONFIG_STORE_KEY, {
    theme: ''
  })
)
