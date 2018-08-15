Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [
      {
        id: 1,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.01
      },
      {
        id: 2,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      },
      {
        id: 1,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.01
      },
      {
        id: 2,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      }
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
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