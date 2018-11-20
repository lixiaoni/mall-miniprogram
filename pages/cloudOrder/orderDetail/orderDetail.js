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
    wx.navigateTo({
      url: '../cloudPay/cloudPay?order=' + this.data.num,
    })
    // wx.login({
    //   success:(res)=>{
    //     if (res.code) {
    //       console.log(res.code)
    //       this.getOpenid(res.code);
    //     }
    //   }
    // })
    
  },
  getOpenid(code){
    app.http.getRequest("/api/user/wx/APP001/obtain/openid",{jsCode:code}).then(res=>{
      this.payment(res)
    }).catch(e=>{

    })
  },
  payment(res){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: '',
      success:function(res){

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