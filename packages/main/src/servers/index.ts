import Koa from 'koa'
import { Server } from 'http'
import loadMiddlewares from './middlewares'
import loadRouters from './routers'

const app = new Koa()
let mPort = -1
let server: null | Server = null

// 加载中间件
loadMiddlewares(app)
// 加载路由
loadRouters(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export async function startServer(port: number) {
  if (server && server.listening) {
    console.error(`[端口=${mPort}]服务已启动`)
    return Promise.resolve({
      success: false,
      message: `[端口=${mPort}]服务已启动`
    })
  }
  return new Promise((resolve, reject) => {
    server = app.listen(port)
    server.once('listening', () => {
      console.log(`[端口=${port}]服务启动`)
      mPort = port
      resolve({ success: true, message: `[端口=${port}]服务启动` })
    })
    server.on('error', error => {
      console.error(error)
      resolve({ success: false, message: error.message })
    })
  })
}

export function stopServer() {
  if (!server) {
    console.error('服务未启动')
    return
  }
  server.close(err => {
    if (err) {
      console.error('关闭服务失败', err)
      return
    }
    server = null
    mPort = -1
  })
}
