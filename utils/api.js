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
  identityUserUrl,
  removeDefaultUrl,
  adminMallStoreListUrl,
  purchaserStoreUrl,
  resetPasswordUrl,
  phoneMessageUrl,
  registerUrl,
  registerPhoneMsgUrl,
  changeIconUrl,
  userFloorInfoUrl
} from './constUrl.js'

import {
  mallCode
} from './const.js'

import AuthHandler from './authHandler.js';

const app = getApp()
/**判断是否为空**/
function isEmpty(str) {
  if (str == '' || str == undefined || str == null) {
    return false
  } else {
    return true
  }
}
/**提示**/
function showToast(message) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  })
}
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
/**取消默认地址**/
function removeDefault(data) {
  return app.http.putRequest(removeDefaultUrl, data)
}
/**商品搜索**/
function goodsSer(data, nextPage) {
  data = initMallCode(data);
  return app.pageRequest.pageGet(goodsSerUrl, data, nextPage)
}
/**最近上新**/
function news(data, nextPage) {
  data = initMallCode(data);
  return app.pageRequest.pageGet(newsUrl, data, nextPage)
}
/**关注推荐**/
function storeLook(data) {
  data = initMallCode();
  return app.http.getRequest(storeLookUrl, data)
}
/**判断是否是超级管理员**/
function isAdmin(data) {
  data = initMallCode(data);
  return app.http.getRequest(isAdminUrl, data)
}
/**超级管理员小云店管理**/
function adminShopList(data,nextPage){
  data = initMallCode(data);
  return app.pageRequest.pageGet(adminMallStoreListUrl, data, nextPage)
}
/**关注列表**/
function favorite(nextPage) {
  return app.pageRequest.pageGet(favoriteUrl, {}, nextPage)
}
/**上传图片**/
function uploadImage(types) {
  return app.http.chooseImageUpload(types)
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
function storeSerList(data, nextPage) {
  data = initMallCode(data);
  return app.pageRequest.pageGet(storeSerListUrl, data, nextPage)
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
/**重置密码**/
function resetPassword(data){
  return app.http.postRequest(resetPasswordUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**短信验证码**/
function phoneMessage(data){
  return app.http.getRequest(phoneMessageUrl, data)
}
/**注册**/
function register(data){
  return app.http.postRequest(registerUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
/**注册短信验证码**/
function registerPhoneMsg(data){
  return app.http.getRequest(registerPhoneMsgUrl, data)
}

/**
 * 获取用户对应进货商列表
 */
function getPurchaserStoreIds() {
    //如果用户没有登录，则返回空
    if (!AuthHandler.isLogin()) {
      return [];
    }
  return new Promise((resolve, reject) => {
    app.http.getRequest(purchaserStoreUrl).then((res) => {
      resolve(res.obj);
    });
  });
}

/**
 * 初始化mallcode
 */
function initMallCode(data) {
  if (data == null || data == undefined) {
    data = {};
  }
  data.mallCode = mallCode;
  return data;
}

// 获取用户楼层信息
function userFloorInfo(data){
  return app.http.getRequest(userFloorInfoUrl, data)
}
// 裁剪图片跳转
function toCuttingImg(url, quality) {
  // quality为true截图质量高
  if (url) {
    let add = '../upload/upload?src=' + url;
    quality ? add += "&quality=true" : "";
    wx.navigateTo({
      url: add,
    })
  }
}
// 修改头像
function changeIcon(data) {
  return app.http.putRequest(changeIconUrl, data, { 'content-type': 'application/x-www-form-urlencoded' })
}
module.exports = {
  showToast: showToast,
  isEmpty: isEmpty,
  changeIcon: changeIcon,
  toCuttingImg: toCuttingImg,
  userFloorInfo: userFloorInfo,
  mallIndex: mallIndex,
  goodsSer: goodsSer,
  storeLook: storeLook,
  favorite: favorite,
  uploadImage: uploadImage,
  firstCode: firstCode,
  childCategoryCode: childCategoryCode,
  storeSerList: storeSerList,
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
  removeDefault:removeDefault,
  identityUser:identityUser,
  adminShopList: adminShopList,
  getPurchaserStoreIds: getPurchaserStoreIds,
  resetPassword: resetPassword,
  phoneMessage: phoneMessage,
  register: register,
  registerPhoneMsg: registerPhoneMsg
}
