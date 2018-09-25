import AuthHandler from './authHandler.js';
import {
  baseUrl,
  mallCode
} from './const.js'
/**
 请求
 */
class request {
  constructor() {
      this._baseUrl = baseUrl,
      this.defaultHeader = { 'content-type': 'application/json;charset=UTF-8' },
      this.mallCode = mallCode,
      this.authHandler = new AuthHandler()
  }
  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header) {
    return this.requestAll(url, data, 'PUT', header)
  }
  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header) {
    return this.requestAll(url, data, 'GET', header)
  }
  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header) {
    return this.requestAll(url, data, 'DELETE', header)
  }
  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header) {
    return this.requestAll(url, data, 'POST', header)
  }
  /**
   * 解析URL
   */
  analysisUrl(url, data) {
    if (data == undefined || data == null){
        return url;
    }
    for (var key in data) {
      url = url.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), data[key]);
    }
    return url
  }
  /**
   * 网络请求
   */
  requestAll(url, data, method,customHeader) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      url = this.analysisUrl(url, data);
      var header = (customHeader === undefined || customHeader == null || customHeader == "") ? this.defaultHeader : customHeader;
      this.authHandler.getTokenOrRefresh().then(token=>{
        if (token) {
          header['Authorization'] = token;
        } else {
          delete header['Authorization'];
        }
      wx.request({
        url: this._baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          let pages = getCurrentPages()
          let curPage = pages[pages.length - 1]
          this.__page = curPage
          if (res.statusCode === 200) {
            if(res.data.code == 0){
              resolve(res.data);
            }else if (res.data.code == 1){
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
              reject(res);
            }else{
              reject(res);
            }
          } else if (res.statusCode === 401) {
            curPage.loginCom = curPage.selectComponent("#login");
            curPage.loginCom.showPage();
            reject(res)
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              this._errorHandler(res)
            }
            reject(res)
          }  
          }),
          complete: function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
          }
        })
      });

    })
      
  }
}
export default request