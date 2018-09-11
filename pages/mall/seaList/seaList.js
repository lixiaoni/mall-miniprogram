const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    goodsList:[],
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  emptyVal:function(){
    this.setData({
      value:''
    })
  },
  getSerList:function(name){
    var _this = this,
      sortType='',
      currentTab = this.data.currentTab
    wx.setNavigationBarTitle({
      title: name
    })
    if (currentTab==0){
      sortType ='multiple'
    } else if (currentTab == 1) {
      sortType = 'sales'
    } else if (currentTab == 2) {
      sortType = 'prices_asc'
    }
    this.setData({
      value:name
    })
    Api.goodsSer({keyword: name, sortType: sortType})
      .then(res => {
        const obj = res.obj
        _this.setData({
          goodsList:obj,
          value:name
        })
        console.log(res)
      })
  },
  searchBtn: function (e) {
    app.pageRequest.pageData.pageNum = 0
    var name = e.detail.value
    this.getSerList(e.detail.value)
  },
  onLoad: function (options) {
    if (options.name){
      this.getSerList(options.name)
    }else{
      this.getSerList('')
    }
    
  },
  swichNav: function (e) {
    var that = this;
    app.pageRequest.pageData.pageNum = 0
    this.getSerList(this.data.value)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
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
    app.pageRequest.pageData.pageNum = 0
    this.getSerList(this.data.value)
  },

  bindDownLoad: function () {
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSerList(this.data.value)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})