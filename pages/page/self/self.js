// pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻...', price: '1200', small: '约1.66mm*0.23cm', image: '/image/s5.png', num: 4, selected: true },
      { id: 2, title: '周大福新款珠宝', price: '1200', small: '14号', image: '/image/s6.png', num: 1, selected: true }
    ],
    status5: true,
    status6: true,
    status7: true,
    status8: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status == 6) {
      this.setData({
        status6: false,
      })
    } else if (options.status == 7) {
      this.setData({
        status7: false,
      })
    } else if (options.status == 8) {
      this.setData({
        status8: false,
      })
    }else if (options.status == 5) {
      this.setData({
        status5: false
      })
    }
  },
  // 取件码
  closeAlert2: function () {
    var that = this;
    that.setData({
      show4: true,
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


})