// pages/mall/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    // history: ["阿迪", "T恤", "短袖"],
    hot: ["羽绒服", "毛衣", "短袖"],
    value:'',
    hot1: ["耐克", "only", "杰克琼斯", "安踏"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })

    }
  },
  keywordHandle:function(e){
    var value = e.target.dataset.name
    this.goSerList(value)
  },
  goSerList:function(name){
    if (this.data.currentTab == 0) {
      wx.navigateTo({
        url: '../seaList/seaList?name='+name,
      })
    } else {
      wx.navigateTo({
        url: '../store/store?name='+name,
      })
    }
  },
  searchBtn: function (e) {
    var name = this.data.value
    this.goSerList(name)
  },
  changeValue:function(e){
    var val = e.detail.value
    this.setData({
      value:val
    })
  },
  // removeAll() {
    // this.setData({
    //   history: []
    // });
  // },
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
  bindDownLoad: function () {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

})