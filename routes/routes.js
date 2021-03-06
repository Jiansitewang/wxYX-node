const router = require('koa-router')({
  prefix: '/wak'
})
const controllers = require('../controllers/controller')

// 首页相关
router.get('/index/index', controllers.home.home)
//首页商品分类nav相关
router.get('/navList/nav',controllers.navList.navList.getNav)

//搜索商品页面相关
router.get('/search/indexAction',controllers.search.search.indexAction)//获取搜索历史记录
router.get('/search/showTips',controllers.search.search.showTips)//搜索提示
router.post('/search/addHistoryAction',controllers.search.search.addHistoryAction)//添加搜索历史记录
router.post('/search/clearHistoryAction',controllers.search.search.clearHistoryAction)//清除搜索历史
//商品相关
router.get('/goods/goodsDetail',controllers.goods.goods.goodsDetail)
router.get('navGoods/navGoodsData',controllers.goods.goods.navGoodsData)

//收藏相关
router.post('/collect/addCollect',controllers.collect.collect.addCollect)

//订单相关
router.post('/order/submitAction',controllers.order.order.submitAction)

//购物车
router.post('/cart/addCart',controllers.cart.cart.addCart)

module.exports = router
