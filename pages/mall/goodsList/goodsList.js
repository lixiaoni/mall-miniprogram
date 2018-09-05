const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    app.pageRequest.pageData.pageNum = 0
    if (options.index){
      var index = options.index
      Api.mallIndex({ mallCode: 1000 })
        .then(res => {
          const obj = res.obj
          _this.setData({
            goodsList: obj.mallChosenGoods[index].goodsList
          })
          wx.setNavigationBarTitle({
            title: obj.mallChosenGoods[index].name
          })
        })
    }
    if(options.code){
      wx.setNavigationBarTitle({
        title: options.keyword
      })
      Api.goodsSer({ mallCode: 1000, keyword: options.keyword, categoryCode: options.code})
        .then(res => {
          const obj = res.obj
          _this.setData({
            goodsList: obj
          })
        })
    }
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