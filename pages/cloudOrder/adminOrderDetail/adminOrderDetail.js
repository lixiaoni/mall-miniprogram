// pages/cloudOrder/orderDetail/orderDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCode:""
  },

  call(e){
    let tel = e.currentTarget.dataset.tel;
    if(!tel){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: tel 
    })
  },
  getData(){
    app.http.getRequest("/admin/ystore/order/byordernumber/"+this.data.num).then(res=>{
      wx.showToast({
        title: res.message,
        icon:'none'
      })
      if(res.success){
        this.setData({
          msg: res.obj
        })
      }
    })
  },
  //开通
  watchInput(e) {
    let val = e.detail.value;
    this.setData({
      payCode: val
    })
  },
  sureOpen() {
    let num = this.data.num,
      payCode = this.data.payCode.trim();
    if (!payCode) {
      wx.showToast({
        title: '请输入支付交易单号',
        icon: 'none'
      })
      return
    }
    app.http.postRequest("/admin/ystore/order/" + num + "/uploadpayvoucher", {
      payVoucher: payCode
    }, { 'content-type': 'application/x-www-form-urlencoded' }).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if (res.success) {
        this.closeModal()
      }
    })
  },
  openStore(e) {
    this.setData({
      payCode: "",
      openModal: true
    })
  },
  closeModal() {
    this.setData({
      openModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      num:options.num
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})