<template>
  <div class="app-controls app-no-drag">
    <div class="ctrl-btn ctrl-min" @click="action('min')">
      <icon-minus />
    </div>
    <div class="ctrl-btn ctrl-max" @click="action('max')">
      <component :is="isMaximized ? 'icon-shrink' : 'icon-expand'"></component>
    </div>
    <div class="ctrl-btn ctrl-close" @click="action('close')">
      <icon-close />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ipcInvoke } from '/@/utils/electron'

export default defineComponent({
  name: 'AppControls',

  props: { closeConfirm: Boolean },

  data() {
    return {
      isMaximized: false
    }
  },

  methods: {
    action(action: 'min' | 'max' | 'close' | 'hide') {
      if (action === 'close' && this.closeConfirm) {
        this.$modal.confirm({
          title: '确认退出',
          content: 'Master~ 您真的要走了吗？',
          maskClosable: false,
          modalStyle: { textAlign: 'center' },
          onOk: () => { ipcInvoke('window.action', action) }
        })
        return
      }
      ipcInvoke('window.action', action)
    }
  }
})
</script>

<style lang="scss">
.app-controls {
  display: flex;

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
      background-color: var(--color-fill-3);
    }

    &.ctrl-close {
      &:hover {
        background-color: var(--color-danger-light-4);
      }
      &:active {
        background-color: #f95a44;
      }
    }
  }
}
</style>
