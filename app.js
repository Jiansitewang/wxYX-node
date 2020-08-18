const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/',(ctx,next)=>{
  ctx.body = 'hello world'
})

app.use(router.routes())

app.listen(3010,()=>{
  console.log('server is started at port 3010')
})
