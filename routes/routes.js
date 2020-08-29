const router = require('koa-router')({
  prefix: '/wak'
})
const controllers = require('../controllers/controller')

// 首页相关
router.get('/index/index', controllers.home.home)
//搜索商品页面相关
router.get('/search/indexAction',controllers.search.search.indexAction)
router.post('/search/addHistoryAction',controllers.search.search.addHistoryAction)
module.exports = router
