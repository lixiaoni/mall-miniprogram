import Api from '../../../utils/api.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUser:false,
    isStoreOwner:''
  },
  showLogin(){
    this.selectComponent("#login").showPage();
  },
  getUser(){
    Api.isAdmin({})
      .then(res => {
        var obj=res.obj
        wx.setStorage({
          key: 'isSuperAdmin',
          data: obj.isSuperAdmin,
        })
      })
    app.http.getRequest("/api/user/byuserid").then((res)=>{
      if (res.success){
          this.setData({
            user: res.obj,
            hasUser: true,
            isStoreOwner: res.obj.isStoreOwner
          })
      }
    }).catch(e=>{
      this.setData({
        user: "",
        hasUser: false
      })
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
    this.getUser(); 
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