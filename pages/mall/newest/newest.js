const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    activities:[],
    mallChosenGoods:[],
    baseUrl: app.globalData.imageUrl,
  },
  getUrl: function () {
    wx.navigateToMiniProgram({
      appId: 'wx6241529c7dc70d51',
      path: 'pages/page/goodsDetails/goodsDetails?id=sdfsfdfd',
      extraData: { user_id: 111 },
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })

  },
   isPurchaser:function(index){
     var arr = Api.getPurchaserStoreIds()
    if(arr.indexOf(index)!=-1){
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
    this.getList()
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