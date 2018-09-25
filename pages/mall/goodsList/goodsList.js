const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    baseUrl: app.globalData.imageUrl,

  },
  isPurchaser: function (index) {
    var arr = wx.getStorageSync('purchaserStoreIds')
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    if (options.index){
      var index = options.index
      Api.mallIndex()
        .then(res => {
          const obj = res.obj
          const goodsList= obj.mallChosenGoods[index].goodsList
          for (var j = 0; j < goodsList.length; j++) {
            if (j < 5) {
              if (_this.isPurchaser(goodsList[j].storeId)) {
                goodsList[j].isPurchaser = true
              } else {
                goodsList[j].isPurchaser = false
              }
            }
          }
          _this.setData({
            goodsList: goodsList
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
      _this.getSerList(options.code)
     
    }
  },
  getSerList(code){
    Api.goodsSer({ mallCode: 1000, categoryCode: code})
      .then(res => {
        const obj = res.obj
        _this.setData({
          goodsList: obj
        })
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