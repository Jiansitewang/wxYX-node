const router = require('koa-router')({
  prefix: '/wak'
})
const controllers = require('../controllers/controller')

// 首页相关
router.get('/index/index', controllers.home.home)
//搜索商品页面相关
router.get('/search/indexAction',controllers.search.search.indexAction)//获取搜索历史记录
router.get('/search/showTips',controllers.search.search.showTips)//搜索提示
router.post('/search/addHistoryAction',controllers.search.search.addHistoryAction)//添加搜索历史记录
router.post('/search/clearHistoryAction',controllers.search.search.clearHistoryAction)//清除搜索历史
module.exports = router
