const Koa = require('koa')
const app = new Koa()
const config = require('./config')
const router = require('./routes/routes')
const bodyParser = require('koa-bodyparser')
//引入解析请求体中间件
app.use(bodyParser())
//引入路由
app.use(router.routes())

app.listen(config.port,()=>{
  console.log(`server is started at port ${(config.port)}`)
})
