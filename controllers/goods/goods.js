const {mysql} = require('../../mysql')

//商品详情页
async function goodsDetail(ctx){
  const goodsId = ctx.query.id
  const openId = ctx.query.openId
  //goods数据
  const info = await mysql('nideshop_goods').where({
    id: goodsId
  }).select()
  //goods图片
  const gallery = await mysql('nideshop_goods_gallery').where({
    'goods_id': goodsId
  })
  //商品参数
  const attribute = await mysql('nideshop_goods_attribute').column('nideshop_goods_attribute.value','nideshop_attribute.name').leftJoin('nideshop_attribute','nideshop_goods_attribute.attribute_id','nideshop_attribute.id').where({
    'nideshop_goods_attribute.goods_id': goodsId
  }).select()
  //常见问题
  const problem = await mysql('nideshop_goods_issue').select()
  //大家都在看
  const goodsList = await mysql('nideshop_goods').where({
    'category_id': info[0].category_id
  }).select()
  //是否收藏
  const isCollected = await mysql('nideshop_collect').where({
    'user_id': openId,
    'value_id': goodsId
  }).select()
  let collected = false
  if (isCollected.length > 0){
    collected = true
  }
  //判断该用户的购物车里是否含有此商品
  const oldNumber = await mysql('nideshop_cart').where({
    'user_id': openId
  }).column('number').select()
  let allNumber = 0
  if (oldNumber.length > 0 ){
    for (let i=0; i < oldNumber.length; i++){
      const element = oldNumber[i]
      allNumber +=element.number
    }
  }

  ctx.body = {
    'info': info[0] || [],
    'gallery': gallery,
    'attribute' : attribute,
    'problem':problem,
    'goodsList': goodsList,
    'collected': collected,
    'allNumber': allNumber
  }
}
//首页分类导航
async function navGoodsData(ctx){
  const navId = ctx.query.navId
  let navGoods = []
  if (navId){
    navGoods = await mysql('nideshop_goods').where({
      'category_id': navId
    }).select()
    const currentNav = await mysql('nideshop_category').where({
      'id': navId
    }).select()
    if (navGoods.length === 0){
      let subIds = await mysql('nideshop_category').where({
        'parent_id': navId
      }).column('id').select()
      if (subIds.length !== 0){
        subIds = subIds.map((item) => {
          return item.id
        })
      }
      navGoods = await mysql('nideshop_goods').whereIn('category_id',subIds).limit(50).select()
    }
    ctx.body = {
      data: navGoods,
      currentNav: currentNav[0]
    }
  }
}

module.exports = {
  goodsDetail,
  navGoodsData
}
