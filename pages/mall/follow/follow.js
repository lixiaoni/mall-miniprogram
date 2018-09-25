const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    storeList:[],
    result:[],
    dataList:[],
    showFavorite:false,
    limitShow:false,
    baseUrl: app.globalData.imageUrl,
    token:wx.getStorageSync('access_token')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo:function(){
    var _this=this,
      storeList=[]
    Api.storeLook()
    .then(res=>{
      var obj = res.obj
      storeList.push(obj)
      _this.setData({
        storeList: storeList,
        showFavorite:true
      })
    })
    
  },
  getFavorite:function(nextPage){
    var _this = this
    Api.favorite(nextPage)
      .then(res => {
        var obj=res.obj
       if(obj!=null){
         _this.setData({
           result: obj.result
         })
       }else{
         _this.getInfo()
         _this.setData({
           showFavorite: true
         })
       }
      })
  },
  onLoad: function (options) {
   
  },
  // tab切换
  swichNav: function (e) {
    var that = this,
      index = e.target.dataset.current
    if(this.data.currentTab === index) {
      return false;
    } else {
        that.setData({
          currentTab:index,
          result:[]
        },function(){
          app.pageRequest.pageData.pageNum = 0
          if(index==0){
            this.getFavorite(false)
          }else{
            Api.news()
              .then(res => {
                var detailList = res.obj.result,
                  datas = that.data.result,
                  totalCount = res.obj.totalCount,
                  newArr = app.pageRequest.addDataList(datas, detailList)
                that.setData({
                  result: newArr,
                })
              })
          }
        })

    }
  },
  bindDownLoad:function(){

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
    this.getFavorite()
    
  },
  goStore:function(){
    wx.navigateTo({
      url: '../store/store',
    })
  },
  moreList: function (e) {
    var index = e.target.dataset.index
    wx.navigateTo({
      url: '../storeList/storeList?index=' + index,
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
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var index = this.data.currentTab
    if(index==0){
      this.getFavorite(true)
    }else{
      Api.news()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})