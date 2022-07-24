import { Message, Modal } from '@arco-design/web-vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: typeof Message
    $modal: typeof Modal
  }
}
