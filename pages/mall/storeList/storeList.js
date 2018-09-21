const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    baseUrl: wx.getStorageSync('baseUrl'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo: function (index) {
    var _this = this,
      dataList = []
    Api.storeLook()
      .then(res => {
        var obj = res.obj
        dataList.push(obj)
        wx.setNavigationBarTitle({
          title:obj.name
        })
        dataList=dataList[index].storeGoodsList
        console.log(dataList)
        _this.setData({
          dataList: dataList,
          showFavorite: true
        })
      })

  },
  onLoad: function (options) {
    var _this = this
    this.getInfo(options.index)
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