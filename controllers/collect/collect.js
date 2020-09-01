const {mysql} = require('../../mysql')
//添加商品收藏
async function addCollect(ctx){
  const{openId,goodsId} = ctx.request.body
  const isCollected = await mysql('nideshop_collect').where({
    'user_id': openId,
    'value_id': goodsId
  }).select()
  if (isCollected.length === 0){
    await mysql('nideshop_collect').insert({
      'user_id': openId,
      'value_id': goodsId
    })
    ctx.body = {
      data: 'collected'
    }
  } else {
    await mysql('nideshop_collect').where({
      'user_id': openId,
      'value_id': goodsId
    }).del()
    ctx.body = {
      data: 'uncollectd'
    }
  }
}

module.exports = {
  addCollect
}
