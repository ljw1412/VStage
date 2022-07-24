
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

export default defineComponent({
  name: 'App',

  components: { AppTitleBar }
})
</script>

<style>
body {
  color: var(--app-color-text);
  background-color: var(--app-color-bg);
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
