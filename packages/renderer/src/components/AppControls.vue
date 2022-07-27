<template>
  <div class="app-controls app-no-drag">
    <slot name="prepend"></slot>
    <a-divider v-if="$slots.prepend" direction="vertical" />
    <div class="ctrl-btn ctrl-min" @click="action('min')">
      <icon-minus />
    </div>
    <div class="ctrl-btn ctrl-max" @click="action('max')">
      <component :is="isMaximized ? 'icon-shrink' : 'icon-expand'"></component>
    </div>
    <div class="ctrl-btn ctrl-close" :class="{ 'is-closing': isClosing }" @click="action('close')">
      <icon-close />
    </div>
  </div>
</template>

<script lang="ts">
import { IpcRendererEvent } from 'electron'
import { defineComponent } from 'vue'
import { ipcInvoke, ipcOff, ipcOn } from '/@/utils/electron'

export default defineComponent({
  name: 'AppControls',

  props: { closeConfirm: Boolean },

  data() {
    return {
      isClosing: false,
      isMaximized: false
    }
  },

  created() {
    ipcOn('window_state_change', this.windowStateChange)
  },

  beforeUnmount() {
    ipcOff('window_state_change', this.windowStateChange)
  },

  methods: {
    action(action: 'min' | 'max' | 'close' | 'hide') {
      if (action === 'close' && this.closeConfirm) {
        this.isClosing = true
        this.$modal.confirm({
          title: '确认退出',
          content: 'Master~ 您真的要走了吗？',
          maskClosable: false,
          modalStyle: { textAlign: 'center' },
          onOk: () => { ipcInvoke('window.action', action) },
          onBeforeClose: () => { this.isClosing = false }
        })
        return
      }
      ipcInvoke('window.action', action)
    },

    windowStateChange(e: IpcRendererEvent, type: string) {

      if (type === 'maximize') {
        this.isMaximized = true
      } else if (type === 'unmaximize') {
        this.isMaximized = false
      }
    }
  }
})
</script>

<style lang="scss">
.app-controls {
  display: flex;
  align-items: center;

  .ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    font-size: 24px;
    flex-shrink: 0;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &.ctrl-close {
      &:hover {
        background-color: var(--color-danger-light-4);
      }

      &.is-closing,
      &:active {
        background-color: #f95a44;
      }
    }
  }
}
</style>
