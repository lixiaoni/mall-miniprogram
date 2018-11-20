import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsNum:'',
    orders: '',
    purchaseOrders: '',
    storeNum: '',
    todaySaleNum: 0,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMes:function(){
    var _this=this,
      isSuperAdmin = this.data.isSuperAdmin
    if (isSuperAdmin){
      Api.superAdminWork()
        .then(res => {
          var obj = res.obj
          _this.setData({
            goodsNum: obj.goodsNum,
            orders: obj.orders,
            purchaseOrders: obj.purchaseOrders,
            storeNum: obj.storeNum,
            todaySaleNum: (obj.todaySaleNum).toFixed(2),
          })
        })
    }else{
      Api.workIndex()
        .then(res => {
          var obj = res.obj
          _this.setData({
            goodsNum: obj.goodsNum,
            orders: obj.orders,
            purchaseOrders: obj.purchaseOrders,
            storeNum: obj.storeNum,
            todaySaleNum: (obj.todaySaleNum).toFixed(2),
          })
        })
    }
  },
  goHome: function () {
    wx.switchTab({
      url: '../../page/user/user'
    })
  },
  onLoad: function (options) {
    this.setData({
      isSuperAdmin: wx.getStorageSync("isSuperAdmin")
    })
  },
  goDerm: function () {
    wx.navigateTo({
      url: '../../page/mallIcon/mallIcon',
    })
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
    this.getMes()
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

})