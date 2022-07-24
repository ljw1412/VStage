import { ipcMain, BrowserWindow } from 'electron'

const channel = 'window.action'

const handleListener: IpcInvokeListener = (e, type, data) => {
  // @ts-ignore
  const win = e.sender.getOwnerBrowserWindow() as BrowserWindow
  if (!win) return
  if (type === 'min') {
    win.minimize()
  } else if (type === 'max') {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  } else {
    win.close()
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
