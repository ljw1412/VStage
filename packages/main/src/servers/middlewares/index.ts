import Koa from 'koa'
import logger from './logger'

const middlewares = [logger]

export default function loadMiddlewares(app: Koa) {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}
