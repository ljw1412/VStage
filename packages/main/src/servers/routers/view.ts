import KoaRouter from 'koa-router'
const router = new KoaRouter()

router.get('/', (ctx, next) => {
  ctx.body = { code: 0, message: '服务已启动' }
})

export default router
