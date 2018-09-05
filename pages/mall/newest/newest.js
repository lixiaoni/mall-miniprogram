const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    activities:[],
    mallChosenGoods:[]
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
  getList:function(){
    var _this=this
    Api.mallIndex()
      .then(res => {
        const obj=res.obj
        _this.setData({
          movies: obj.banners,
          activities: obj.activities,
          mallChosenGoods: obj.mallChosenGoods
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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