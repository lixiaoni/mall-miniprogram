/**
 请求
 */
class request {
  constructor() {
    this._baseUrl = 'https://xyk-doctor.com',
    this._headerGet = {'content-type': 'application/json'},
    this._headerPost = { "Content-Type": "application/json;charset=UTF-8"}
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data) {
    return  this.requestAll(url, data, 'GET')
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
   * 网络请求
   */
  requestAll(url, data, method) {
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: "正在加载",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this._baseUrl+url,
        data: data,
        header:this._headerGet,
        method: method,
        success: (res => {
        if(res.statusCode === 200) {
        //200: 服务端业务处理正常结束
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
      fail: (res => {
        if (this._errorHandler != null) {
          this._errorHandler(res)
        }
        reject(res)
      }),
        // success: function (res) {
        //   if (res.statusCode == 200) {
        //     success(res.data)
        //   } else {
        //     console.log("请求成功，返回信息：" + res.statusCode)
        //   }
        // },
        // fail: function (err) {
        //   console.log('请求失败：' + err)
        // },
        complete: function () {
          wx.hideLoading()
          wx.hideNavigationBarLoading()
        }
      })
    })
  }
}

export default request