const { mysql } = require('../../mysql')

async function getNav(ctx){
  const navId = ctx.query.id

  const currentNav = await mysql('nideshop_category').where({
    'id': navId
  }).select()
  const navData = await mysql('nideshop_category').where({
    'parent_id': currentNav[0].parent_id
  }).select()
  ctx.body ={
    navData,
    currentNav: currentNav[0]
  }
}

module.exports = {
  getNav
}
