Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    show:false,
    isShow:false,
    showHide:true,
    showDp:true,
    // tab切换 
    currentTab: 0,
    result: [
      {
        id: 1,
        thumb: '/image/s5.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.01
      },
      {
        id: 2,
        thumb: '/image/s6.png',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      },
      {
        id: 1,
        thumb: '/image/wytjimg.png',
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
        id: 2,
        thumb: 'null',
        title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
        price: 0.02
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addTip:function(){
    this.setData({
      show:true
    })
  },
  confirm:function(){
    this.setData({
      show: false,
      isShow:true,
    })
  },
  editFun:function(){
    this.setData({
      showHide: false,
    })
  }, 
  closeShow: function() {
    this.setData({
      showHide: true,
      showDp:true
    })
  }, 
  editDp: function () {
    this.setData({
      showDp: false,
    })
  }, 
  onLoad: function () {
    var that = this;
    // wx.navigateToMiniProgram({
    //   appId: 'wx339cc894ccbde5ab',
    //   path: 'pages/index/index?id=123',
    //   extraData: {
    //     foo: 'bar'
    //   },
    //   envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },


  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        result: [
          {
            id: 2,
            thumb: '/image/s5.png',
            title: '周大福 艳丽动人 18K金镶坦桑石 V103235',
            price: 0.02
          }
        ],

      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },
  searchBtn(e) {
    this.setData({
      result:[]
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },


})