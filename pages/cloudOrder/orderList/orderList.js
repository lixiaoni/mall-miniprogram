// pages/cloudOrder/orderList/orderList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [
      { name: "全部", type: 'all', check: true },
      { name: "待付款", type: 'unpaid', check: false },
      { name: "已付款", type: 'paid', check: false },
      { name: "已取消", type: 'cancelled', check: false }
    ],
    list:[],
    which: 'all',
    payCode: "",
    openModal: false
  },
  watchInput(e) {
    let val = e.detail.value;
    this.setData({
      payCode: val
    })
  },
  sureOpen() {
    let num = this.data.num,
      payCode = this.data.payCode.trim();
    if(!payCode){
      wx.showToast({
        title: '请输入支付交易单号',
        icon:'none'
      })
      return
    }
    app.http.postRequest("/admin/ystore/order/" + num + "/uploadpayvoucher", {
      payVoucher: payCode
    }, { 'content-type': 'application/x-www-form-urlencoded' }).then(res => {
      wx.showToast({
        title: res.message,
        icon:'none'
      })
      if(res.success){
        this.closeModal()
      }
    })
  },
  openStore(e) {
    this.setData({
      payCode: "",
      openModal: true,
      num: e.currentTarget.dataset.num
    })
  },
  closeModal(){
    this.setData({
      openModal: false
    })
  },
  // 切换TAB
  switchTab(e) {
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index;
    this.data.tab.forEach((el, i) => {
      if (i == index) {
        this.setData({
          ['tab[' + i + '].check']: true,
          which:el.type
        })
      } else {
        this.setData({
          ['tab[' + i + '].check']: false
        })
      }
    })
    this.getList(true);
  },
  getList(re) {
    if(re){
      app.pageRequest.pageData.pageNum = 0;
      this.setData({
        list:[]
      })
    }
    app.pageRequest.pageGet("/admin/ystore/order/merchant/" + this.data.which).then(res => {
      if (!res.success) { return }
      this.setData({
        list: this.data.list.concat(res.obj.result)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})