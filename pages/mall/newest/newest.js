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
    retailStore: ["S1000096", "S1000367", "S1000334", "S1000327"],
    purchaserStoreIds:'',
    activities:[],
    activitiesLength:0,
    mallChosenGoods:[],
    goodsSmall: app.globalData.goodsSmall,
    logo: app.globalData.logo,
    storeCover: app.globalData.storeCover, 
    baseUrl: app.globalData.imageUrl,
    imageWidth: wx.getSystemInfoSync().windowWidth-80
  },
  // 跳转小程序
  toMiniProgram(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 2)
  },
  toMiniProgram1(e) {
    const data = e.currentTarget.dataset
    app.jumpMiniprogram.toMiniProgram(data, 1)
  },
  scroll:function(e){
    var scrollWidth = e.detail.scrollWidth,
      scrollLeft=e.detail.scrollLeft,
      activitiesLength = this.data.activitiesLength,
      activities = this.data.activities
    if (scrollWidth - scrollLeft<500){
      var newArr = activities.concat(activities)
      this.setData({
        activities: newArr
      })
    }
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
        var activities = obj.activities
        var retailStore = this.data.retailStore
        for (var i = 0; i < activities.length;i++){
          activities[i].data = JSON.parse(activities[i].url)
          if (retailStore.indexOf(activities[i].data.storeId)!="-1"){
            activities[i].data.nature=2
          }else{
            activities[i].data.nature = 1
          }
        }
        _this.setData({
          movies: obj.banners,
          activities: activities,
          activitiesLength: activities.length,
          mallChosenGoods: arrMall
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.mallNickname +"优选"
    })
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