<template>
  <header class="app-title-bar app-drag">
    <div class="app-logo">
      <img src="/app-logo.png" />
    </div>
    <div class="app-title">{{ title }}</div>
    <app-controls :close-confirm="!$route.meta.subWindow"></app-controls>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppControls from './AppControls.vue'

export default defineComponent({
  name: 'AppTitleBar',

  components: {
    AppControls
  },

  computed: {
    title() {
      return this.$route.meta.title || ''
    }
  }
})
</script>

<style lang="scss">
.app-title-bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--app-theme);

  .app-logo {
    width: 220px;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    background: var(--color-fill-1);
    text-align: center;
    img {
      height: 100%;
    }
  }

  .app-title {
    margin-left: 20px;
    font-size: 24px;
  }

  .app-controls {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
