import { useTitle, get, set } from '@vueuse/core'
import { ref, computed } from 'vue'
import config from './config'

export const title = ref('')
export function setTitle(t: string) {
  set(title, t)
}

useTitle(
  computed(() => {
    return get(title)
      ? `${get(title)} - ${import.meta.env.VITE_APP_TITLE}`
      : import.meta.env.VITE_APP_TITLE
  })
)

export default { config, setTitle }
