import { BrowserWindow, IpcMainEvent } from 'electron'

const WINDOW_STATE_CHANGE_CHANNEL = 'window_state_change'
const WINDOW_STATE_EVENTS = [
  'maximize',
  'unmaximize',
  'minimize',
  'restore',
  'focus',
  'blur'
]

const WINDOW_STATE_LISTENERS = WINDOW_STATE_EVENTS.reduce((obj, eventName) => {
  obj[eventName] = function(e: IpcMainEvent) {
    e.sender.send(WINDOW_STATE_CHANGE_CHANNEL, eventName)
  }
  return obj
}, {} as Record<string, (e: IpcMainEvent) => void>)

function bind(win: BrowserWindow) {
  WINDOW_STATE_EVENTS.forEach(name => {
    // @ts-ignore
    win.on(name, WINDOW_STATE_LISTENERS[name])
  })
  console.log('[通用事件监听器] 启动监听')
}

function unbind(win: BrowserWindow) {
  WINDOW_STATE_EVENTS.forEach(name => {
    win.off(name, WINDOW_STATE_LISTENERS[name])
  })
  console.log('[通用事件监听器] 停止监听')
}

export default { bind, unbind }
