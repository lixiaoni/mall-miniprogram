// pages/cloudOrder/orderDetail/orderDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  getData() {
    app.http.getRequest("/api/yunstore/order/"+this.data.num).then(res => {
      if (res.success) {
        this.setData({
          msg: res.obj
        })
      }
    })
  },
  buy(){
    wx.login({
      success: (res) => {
        if (res.code) {
          console.log(res.code)
          this.getOpenid(res.code);
        }
      }
    })
  },
  getOpenid(code) {
    wx.request({
      url: 'https://pay.youlife.me/api/pay',
      method: 'POST',
      data: {
        "channel": "wx_pay",
        "currency": "CNY",
        "code": code,
        "goodsInfo": "小云店购买",
        "orderNumber": this.data.num,
        "payWay": "wx_mini_app_pay",
        "tradeType": "JSAPI"
      },
      header: {
        "appNumber": "APP002",
      },
      success: (res) => {
        if (res.data.code == 0) {
          this.payment(res.data.obj.payData);
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      },
      fail: (e) => {
        console.log(e);
      }
    })
  },
    payment(res) {
      console.log(res)
      wx.requestPayment({
        "timeStamp": res.timeStamp,
        "package": res.package,
        "paySign": res.paySign,
        "signType": res.signType,
        "nonceStr": res.nonceStr,
        success: (res)=> {
          console.log(res)

        },
        fail:(err)=>{
          console.log(err)

        },
        complete:(res)=>{
          setTimeout(()=>{
            this.getData();            
          },1000)
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      num:options.num
    })
    this.getData();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

})