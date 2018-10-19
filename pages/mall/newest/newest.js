const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,
    dotsBoll: true,
    interval: 2000,
    duration: 1000,
    current: 0,
    movies: [],
    purchaserStoreIds:'',
    activities:[],
    mallChosenGoods:[],
    goodsSmall: app.globalData.goodsSmall,
    logo: app.globalData.logo,
    storeCover: app.globalData.storeCover, 
    baseUrl: app.globalData.imageUrl,
  },
  intervalChange: function (e) {//自动切换时间间隔
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {//滑动动画时长
    duration: e.detail.value
  },
  changeIndicatorDots: function (e) {//是否显示小圆圈
    this.setData({
      dotsBoll: !this.data.dotsBoll
    })
  },
  changeAutoplay: function (e) {//是否自动播放
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  swipclick: function (e) {//点击图片触发事件
  },
  bindchange: function (e) {//轮播图发生改变
    this.setData({
      current: e.detail.current
    })
  },
  isPurchaser: function (index) {
    var arr = this.data.purchaserStoreIds
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  getList:function(){
    var _this=this
    Api.mallIndex()
      .then(res => {
        const obj=res.obj
        const arrMall = obj.mallChosenGoods
        for (var i = 0; i < arrMall.length;i++){
          var goodsList = arrMall[i].goodsList
          for (var j = 0; j < goodsList.length;j++){
            if(j<5){
              if (_this.isPurchaser(goodsList[j].storeId)) {
                goodsList[j].isPurchaser = true
              } else {
                goodsList[j].isPurchaser = false
              }
            }
          }
        }
        _this.setData({
          movies: obj.banners,
          activities: obj.activities,
          mallChosenGoods: arrMall
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  moreList:function(e){
    var index = e.target.dataset.index
    wx.navigateTo({
      url: '../goodsList/goodsList?index='+index,
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
    var _this = this
    Api.getPurchaserStoreIds()
      .then(res => {
        _this.setData({
          purchaserStoreIds: res
        }, function () {
          _this.getList()
        })
      })
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
    this.onShow()
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
       * 用户点击右上角分享
       */
  onShareAppMessage: function (res) {

  }

})