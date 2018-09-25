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
  addressInfoUrl,
  floorStoreUrl,
  addressDefaultUrl,
  saveAddressUrl,
  editAddressUrl,
  newsUrl,
  workIndexUrl,
  superAdminWorkUrl,
  isAdminUrl,
  identityUserUrl
} from './constUrl.js'

import {
  mallCode
} from './const.js'

const app = getApp()
/**mall首页**/
function mallIndex(data) {
  data = initMallCode(data);
  return app.http.getRequest(mallIndexUrl, data)
}
/**超级管理员工作台首页**/
function superAdminWork(data) {
  data = initMallCode(data);
  return app.http.getRequest(superAdminWorkUrl, data)
}
/**用户身份判断**/
function identityUser(data) {
  return app.http.getRequest(identityUserUrl, data)
}
/**工作台首页**/
function workIndex(data) {
  return app.http.getRequest(workIndexUrl, data)
}
/**商品搜索**/
function goodsSer(data) {
  data = initMallCode(data);
  return app.pageRequest.pageGet(goodsSerUrl, data)
}
/**最近上新**/
function news(data) {
  data = initMallCode(data);
  return app.pageRequest.pageGet(newsUrl, data)
}
/**关注推荐**/
function storeLook() {
  data = initMallCode();
  return app.http.getRequest(storeLookUrl,data)
}
/**判断是否是超级管理员**/
function isAdmin() {
  data = initMallCode();
  return app.http.getRequest(isAdminUrl, data)
}
/**关注列表**/
function favorite(nextPage) {
  return app.pageRequest.pageGet(favoriteUrl,{},nextPage)
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
  data = initMallCode(data);
  return app.pageRequest.pageGet(storeSerListUrl, data)
}
/**小云店搜索**/
function floorStore(data) {
  data = initMallCode(data);
  return app.http.getRequest(floorStoreUrl, data)
}
/**获取用户地址列表**/
function addressList(data) {
  return app.http.getRequest(addressListUrl, data)
}
/**默认用户地址**/
function addressDefault(data) {
  return app.http.getRequest(addressDefaultUrl, data)
}

  /**编辑地址**/
  function editAddress(data) {
    return app.http.putRequest(editAddressUrl, data)
  }
/**地址 删除**/
function addressDelete(data) {
  return app.http.deleteRequest(addressDeleteUrl, data)
}
/**地址添加**/
function saveAddress(data) {
  return app.http.postRequest(saveAddressUrl, data)
}
/**地址详情**/
function addressInfo(data) {
  return app.http.getRequest(addressInfoUrl, data)
}
/**
 * 初始化mallcode
 */
function initMallCode(data){
  if(data ==null||data==undefined ){
    data = {};
  }
  data.mallCode= mallCode;
  return data;
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
  addressDefault: addressDefault,
  addressDelete: addressDelete,
  saveAddress: saveAddress,
  addressInfo: addressInfo,
  editAddress: editAddress,
  addressDelete: addressDelete,
  news: news,
  workIndex: workIndex,
  superAdminWork: superAdminWork,
  isAdmin: isAdmin,
  identityUser:identityUser
}
