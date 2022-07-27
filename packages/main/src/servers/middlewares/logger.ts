import Koa from 'koa'

export default async function(ctx: Koa.Context, next: Koa.Next) {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}
