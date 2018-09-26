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
          fail:function(e){
            reject(e)
          },
          complete: function () {
            wx.hideLoading()
            wx.hideNavigationBarLoading()
          }
        })
      });

    })
      
  }

  /**
   * 上传图片
   */
  chooseImageUpload(types) {
    return this.chooseImage(types)
  }
  chooseImage(types) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 6,
        sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          var imgSrc = res.tempFilePaths;
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'https://mall.youlife.me/base/image',
            filePath: tempFilePaths[0],
            // method:"PUT",
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoibWFkZSBieSB5b3V3ZSIsInVzZXJfbmFtZSI6IjEzNjgxNTQ3NDQwIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTUzNzI1OTQ5NywidXNlcklkIjoiNzlmM2JiZjg2YzA1Y2Q4NTQyNmIxNWQ3YjAwMzY3YWIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWQ1MWNmNzgtOTVkNC00YzUyLWI0ODctNzg3MWQ5MTY0NWY0IiwiY2xpZW50X2lkIjoiQmVpSmluZ0JhaVJvbmdTaGlNYW9DbGllbnQifQ.DhSaIP8ew13B3x1BJxAdDEO1oqhDpCOUfWhTMTd-4tw'
            },
            formData: {
              'type': types
            },
            success: (res => {
              console.log(res)
              if (res.statusCode === 200) {
                resolve(res.data)
              } else {
                //其它错误，提示用户错误信息
                if (this._errorHandler != null) {
                  //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
                  this._errorHandler(res)
                }
                reject(res)
              }
            }),
          })
        },
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        }),
        complete: function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}
export default request