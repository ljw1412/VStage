
<template>
  <div class="app-container">
    <app-title-bar></app-title-bar>
    <main id="app-main" class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppTitleBar from './components/AppTitleBar.vue'
import { IpcRendererEvent } from 'electron'
import { ipcOff, ipcOn } from './utils/electron'

export default defineComponent({
  name: 'App',

  components: { AppTitleBar },

  created() {
    ipcOn('window_state_change', this.windowStateChange)
  },

  beforeUnmount() {
    ipcOff('window_state_change', this.windowStateChange)
  },

  methods: {
    windowStateChange(e: IpcRendererEvent, type: string) {
      if (['focus', 'blur'].includes(type)) {
        document.body.setAttribute('win-state', type)
      }
    }
  }
})
</script>

<style>
body {
  color: var(--app-color-text);
  background-color: var(--app-color-bg);
  transition: opacity 0.2s ease-in-out;
}

body[win-state="blur"] {
  opacity: 0.5;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;
  overflow: hidden;
}

.app-title-bar {
  flex-shrink: 0;
}

.app-main {
  /* height: calc(100%- var(--title-bar-height)); */
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
