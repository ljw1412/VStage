import { ipcMain } from 'electron'
import { isPortOccupied } from '../utils/net'

const channel = 'net'

const handleListener: IpcInvokeListener = async (e, type, data) => {
  if (type === 'checkPort') {
    // 返回是否可以使用
    return await !isPortOccupied(data.port)
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
