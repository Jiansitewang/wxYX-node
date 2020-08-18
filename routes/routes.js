const router = require('koa-router')({
  prefix: '/Wak'
})
const controllers = require('../controllers/controller')

router.get('/index/index', controllers.home.home)

module.exports = router
