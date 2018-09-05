import {
  mallIndexUrl,
  goodsSerUrl,
  storeLookUrl,
  favoriteUrl,
  firstCodeUrl,
  childCategoryCodeUrl,
  storeSerListUrl
} from './constUrl.js'
const app = getApp()
/**mall首页**/
function mallIndex(data) {
  return app.http.getRequest(mallIndexUrl, data)
}
/**商品搜索**/
function goodsSer(data) {
  return app.pageRequest.pageGet(goodsSerUrl, data)
}
/**关注推荐**/
function storeLook(data) {
  return app.http.getRequest(storeLookUrl, data)
}
/**关注列表**/
function favorite(data) {
  return app.pageRequest.pageGet(favoriteUrl, data)
}
/**分类一级**/
function firstCode(data) {
  return app.http.getRequest(firstCodeUrl, data)
}
/**子分类**/
function childCategoryCode(data) {
  return app.http.getRequest(childCategoryCodeUrl, data)
}
/**店铺搜索**/
function storeSerList(data) {
  return app.pageRequest.pageGet(storeSerListUrl, data)
}
module.exports = {
  mallIndex: mallIndex,
  goodsSer: goodsSer,
  storeLook: storeLook,
  favorite: favorite,
  firstCode: firstCode,
  childCategoryCode:childCategoryCode,
  storeSerList:storeSerList
}
