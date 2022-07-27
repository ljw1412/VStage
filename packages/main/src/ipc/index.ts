import WindowAction from './windowAction'
import NetAction from './netAction'

const IpcActions = [WindowAction, NetAction]

function bind() {
  IpcActions.forEach(action => {
    action.bind()
  })
}

function unbind() {
  IpcActions.forEach(action => {
    action.unbind()
  })
}

export default { bind, unbind }
