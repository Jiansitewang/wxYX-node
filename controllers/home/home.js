const { mysql } = require('../../mysql')

module.exports = async (ctx) => {
  // 轮播图数据
  const banner = await mysql('nideshop_ad').where({
    ad_position_id: 1
  }).select()
  //导航栏数据
  const channel = await mysql('nideshop_channel').select()
  //品牌商品数据
  const brand = await mysql('nideshop_brand').where({
    is_new: 1
  }).orderBy('new_sort_order','asc').limit(4).select()
  //新品首发
  const newGoods = await mysql('nideshop_goods').whereIn('id',[1181000,1135002,1134030,1134032]).andWhere('is_new',1).select()
  //人气推荐
  const hotGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price','goods_brief').where({is_hot:1}).limit(5).select()
  //专题精选
  const topicList = await mysql('nideshop_topic').limit(3).select()
  //好物列表
  const categoryList = await mysql('nideshop_category').where({
    parent_id:0
  }).select()
  const newCategoryList = []

  for (let i = 0;i < categoryList.length;i++){
    let item = categoryList[i]
    let childCategory = await mysql('nideshop_category').where({
      parent_id: item.id
    }).column('id').select()

    //RowDataPacket对象转化为数组
    childCategory = childCategory.map((item) =>{
      return item.id
    })
    //在goods表中找到符合childCategory的ID的商品
    const categoryGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price').whereIn('category_id',childCategory).limit(7).select()
    newCategoryList.push({
      'id': item.id,
      'name': item.name,
      'goodsList': categoryGoods
    })
  }


  ctx.body = {
    'banner': banner,
    'channel': channel,
    'brand': brand,
    'newGoods': newGoods,
    'hotGoods': hotGoods,
    'topicList': topicList,
    'newCategoryList': newCategoryList,
  }
}
