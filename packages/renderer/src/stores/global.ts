import { useTitle, get, set } from '@vueuse/core'
import { ref, computed } from 'vue'

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

export default {
  setTitle
}
