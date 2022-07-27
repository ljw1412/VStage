import { ipcMain, BrowserWindow } from 'electron'
import { startServer, stopServer } from '../servers'

const channel = 'server'

const handleListener: IpcInvokeListener = async (e, type, data) => {
  if (type === 'start') {
    console.log('尝试启动服务:', data)

    const { port } = data
    if (typeof port === 'number') {
      return await startServer(port)
    }
  }
}

function bind() {
  ipcMain.handle(channel, handleListener)
}
function unbind() {
  ipcMain.removeHandler(channel)
  console.log(`${channel} 结束监听`)
}

export default {
  bind,
  unbind
}
