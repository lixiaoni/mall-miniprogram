const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    stTab:0,
    floorTab:0,
    serHide:false,
    dataList:[],
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.name){
      this.setData({
        value: options.name
      })
      this.getList(options.name)
    }
  },
  // tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        serHide:true
      })

    }
  },
  serNav: function (e) {
    var that = this;
    if (this.data.stTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        stTab: e.target.dataset.current
      })

    }
  },
  getList:function(name){
    var name =name,
      _this = this
    Api.storeSerList({ keyword: name })
      .then(res => {
        console.log(res)
        _this.setData({
          dataList: res.obj
        })
      })
  },
  searchBtn: function (e) {
    this.getList(e.detail.value)
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