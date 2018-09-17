import AuthHandler from './authHandler.js';
/**
 请求
 */
class request {
  constructor() {
      this._baseUrl = 'https://mall.youlife.me',
      this._headerGet = { 'content-type': 'application/json' },
      this._headerPost = { "Content-Type": "application/json;charset=UTF-8" },
      this.mallCode = 1000,
      this.newData = {},
      this.authHandler = new AuthHandler()
  }
  /**
   * PUT类型的网络请求
   */
  putRequest(url, data) {
    return this.requestAll(url, data, 'PUT')
  }
  /**
   * GET类型的网络请求
   */
  getRequest(url, data) {
    return this.requestAll(url, data, 'GET')
  }
  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data) {
    return this.requestAll(url, data, 'DELETE')
  }
  /**
   * POST类型的网络请求
   */
  postRequest(url, data) {
    return this.requestAll(url, data, 'POST')
  }
  /**
   * 解析URL
   */
  analysisUrl(url, data) {
    for (var key in data) {
      url = url.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), data[key]);
    }
    return url
  }
  /**
   * 网络请求
   */
  requestAll(url, data, method) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      if (Array.isArray(data) || data == undefined) {
        this.newData.mallCode = this.mallCode
        url = this.analysisUrl(url, this.newData)
      } else {

        data.mallCode = this.mallCode
        url = this.analysisUrl(url, data)
      }
      this.authHandler.getTokenOrRefresh().then(token=>{
        if (token) {
          this._headerGet['Authorization'] = token;
        } else {
          delete this._headerGet['Authorization'];
        }
        
       this._headerGet['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWNlbnNlIjoibWFkZSBieSB5b3V3ZSIsInVzZXJfbmFtZSI6IjEzNjgxNTQ3NDQwIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTUzNzI1OTQ5NywidXNlcklkIjoiNzlmM2JiZjg2YzA1Y2Q4NTQyNmIxNWQ3YjAwMzY3YWIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWQ1MWNmNzgtOTVkNC00YzUyLWI0ODctNzg3MWQ5MTY0NWY0IiwiY2xpZW50X2lkIjoiQmVpSmluZ0JhaVJvbmdTaGlNYW9DbGllbnQifQ.DhSaIP8ew13B3x1BJxAdDEO1oqhDpCOUfWhTMTd-4tw';
      wx.request({
        url: this._baseUrl + url,
        data: data,
        header: this._headerGet,
        method: method,
        success: (res => {
          let pages = getCurrentPages()
          let curPage = pages[pages.length - 1]
          this.__page = curPage
          if (res.statusCode === 200) {
            resolve(res.data)
            // curPage.onShow()
            // curPage.onLoad()
          } else if (res.statusCode === 401) {
            curPage.loginCom = curPage.selectComponent("#login");
            curPage.loginCom.showPage();
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