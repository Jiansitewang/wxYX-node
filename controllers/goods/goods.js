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

  ctx.body = {
    'info': info,
    'gallery': gallery
  }
}

module.exports = {
  goodsDetail
}
