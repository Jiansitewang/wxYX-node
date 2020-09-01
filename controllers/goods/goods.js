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
  ctx.body = {
    'info': info[0] || [],
    'gallery': gallery,
    'attribute' : attribute
  }
}

module.exports = {
  goodsDetail
}
