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
    showFavorite:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo:function(){
    var _this=this,
      storeList=[]
    Api.storeLook({ mallCode: 1000})
    .then(res=>{
      const obj = res.obj
      storeList.push(obj)
      _this.setData({
        storeList: storeList
      })
    })
    
  },
  getFavorite:function(){
    var _this = this
    Api.favorite({ mallCode: 1000 })
      .then(res => {
        const obj = res.obj
       if(obj.result.length==0){
         _this.getInfo()
         _this.setData({
           showFavorite:true
         })
       }
        _this.setData({
          result: obj.result
        })
      })
  },
  onLoad: function (options) {
    this.getFavorite()
  },
  // tab切换
  swichNav: function (e) {
    var that = this;
    if(this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
        that.setData({
          currentTab: e.target.dataset.current
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