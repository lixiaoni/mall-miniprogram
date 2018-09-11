import {
  mallIndexUrl,
  goodsSerUrl,
  storeLookUrl,
  favoriteUrl,
  firstCodeUrl,
  childCategoryCodeUrl,
  storeSerListUrl,
  addressListUrl,
  addressDeleteUrl,
  floorStoreUrl
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
function storeLook() {
  return app.http.getRequest(storeLookUrl)
}
/**关注列表**/
function favorite() {
  return app.pageRequest.pageGet(favoriteUrl)
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
/**小云店搜索**/
function floorStore(data) {
  return app.http.getRequest(floorStoreUrl, data)
}
/**获取用户地址列表**/
function addressList(data) {
  return app.http.getRequest(addressListUrl, data)
}
/**地址 删除**/
function addressDelete(data) {
  return app.http.deleteRequest(addressDeleteUrl, data)
}
module.exports = {
  mallIndex: mallIndex,
  goodsSer: goodsSer,
  storeLook: storeLook,
  favorite: favorite,
  firstCode: firstCode,
  childCategoryCode:childCategoryCode,
  storeSerList:storeSerList,
  floorStore: floorStore,
  addressList: addressList,
  addressDelete: addressDelete
}
