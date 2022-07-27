import WindowAction from './windowAction'
import NetAction from './netAction'
import Serveraction from './serverAction'

const IpcActions = [WindowAction, NetAction, Serveraction]

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
