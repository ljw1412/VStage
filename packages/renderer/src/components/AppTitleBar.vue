<template>
  <header class="app-title-bar app-drag">
    <div class="app-logo">
      <img src="/app-logo.png" />
    </div>
    <svg class="triangle" width="30" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0 C30 0 20 60 0 60 L30 60 L30 0 Z" />
    </svg>
    <div class="app-title">{{ title }}</div>
    <app-controls :close-confirm="!$route.meta.subWindow">
      <template #prepend>
        <div class="ctrl-btn ctrl-theme cursor-pointer" @click="changeTheme">
          <component :is="theme === 'dark' ? 'icon-moon' : 'icon-sun'"></component>
        </div>
      </template>
    </app-controls>
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
    theme() {
      return window.$global.config.theme
    },

    title() {
      return this.$route.meta.title || ''
    }
  },

  methods: {
    changeTheme() {
      window.$theme.set(this.theme === 'dark' ? '' : 'dark')
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
  color: #ffffff;
  background-color: var(--app-theme);

  .app-logo {
    width: 220px;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.2);
    text-align: center;
    img {
      height: 100%;
      padding-left: 12px;
    }
  }

  .app-title {
    margin-left: 8px;
    font-size: 24px;
  }

  .triangle {
    fill: rgba(255, 255, 255, 0.2);
    transform: rotate(180deg);
  }

  .app-controls {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
