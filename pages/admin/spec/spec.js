// pages/spec/spec.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 返回上一页
  goback:function(){
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];  
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      mydata: [{ "name":"颜色","attr": ["米白色", "黄色", "香槟色"] }, {"name": "尺码","attr":["均码", "S", "M"] }, { "name":"库存","attr":[100] }]                       // 假数据
    })
    wx.navigateBack({
      data:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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