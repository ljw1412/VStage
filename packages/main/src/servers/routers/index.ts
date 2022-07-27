import Koa from 'koa'
import view from './view'

const routers = [view]

export default function loadRouters(app: Koa) {
  routers.forEach(router => {
    app.use(router.routes()).use(router.allowedMethods())
  })
}
