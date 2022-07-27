<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useLocalStorage, get } from '@vueuse/core'
import { reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ipcInvoke } from '/@/utils/electron'

const router = useRouter()
console.log(router)
const defaultConfig = { port: 12138, auto: false }
const localConfig = useLocalStorage('server-config', { ...defaultConfig })
const config = reactive({ ...defaultConfig })
const server = reactive({ loading: false, message: '' })

for (const key in config) {
  const value = get(localConfig, key as keyof typeof config)
  if (value !== undefined) {
    // @ts-ignore
    config[key] = value
  }
}

if (localConfig.value.auto) {
  startServer()
}


function updateLocalConfig() {
  for (const key in localConfig.value) {
    const value = config[key as keyof typeof config]
    if (value !== undefined) {
      // @ts-ignore
      localConfig.value[key] = value
    }
  }
}

async function startServer() {
  console.log('startServer', config)
  updateLocalConfig()
  server.loading = true
  server.message = '启动中'
  const { success, message } = await ipcInvoke('server', 'start', toRaw(config))

  if (success) {
    server.loading = false
    Message.success('服务启动成功')
    router.replace({ name: 'AppHome' })
  } else {
    server.loading = false
    Message.error(message)
  }
}

</script>

<template>
  <div class="app-guide">
    <a-card class="config-card" :bordered="false" hoverable>
      <p class="mb-20 pb-16 fs-16 font-weight-500">
        <icon-tool class="mr-4" />基础配置项
      </p>
      <a-form :model="config" :disabled="server.loading">
        <a-form-item label="服务端口" help="请输入合法范围内的端口(推荐:1024-48000)">
          <a-input-number
            v-model="config.port"
            placeholder="范围:1024-48000"
            :min="1024"
            :max="48000"
          ></a-input-number>
        </a-form-item>
      </a-form>
      <a-divider />
      <div class="submit-wrapper mb-4">
        <a-checkbox v-model="config.auto" class="mr-8" :disabled="server.loading">下次自动启动</a-checkbox>
        <a-button type="primary" :loading="server.loading" @click="startServer()">启动服务</a-button>
      </div>
    </a-card>
    <a-card v-show="server.loading" class="loading-card" :bordered="false" hoverable>
      <div class="info">
        <a-spin />
        <p class="fs-12 mt-8">{{ server.message }}</p>
      </div>
    </a-card>
  </div>
</template>

<style lang="scss">
.app-guide {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  .config-card {
    margin: auto;
    width: 500px;
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
  }

  .loading-card {
    position: absolute;
    width: 500px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    .arco-card-body {
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .info {
      margin: auto;
      text-align: center;
    }
  }
}
</style>
