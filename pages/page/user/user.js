import Api from '../../../utils/api.js'
import authHandler from '../../../utils/authHandler.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUser:false,
    isStoreOwner:'',
    showCloud:false,
    storeNature:''
  },
  
  showLogin(){
    this.selectComponent("#login").showPage();
  },
  businessFriend:function(){
    if (!authHandler.isLogin()){
      this.showLogin()
    }else{
      wx.navigateTo({
        url: '../../businessFriend/index/index',
      })
    }
  },
  getUser(){
    Api.isAdmin({})
      .then(res => {
        var obj=res.obj
        wx.setStorageSync("isSuperAdmin", obj.isSuperAdmin)
        wx.setStorageSync("isFloorAdmin", obj.isFloorAdmin)
        this.setData({
          isSuperAdmin: obj.isSuperAdmin,
          isFloorAdmin: obj.isFloorAdmin
        })
      })
    app.http.getRequest("/api/user/byuserid").then((res)=>{
      if (res.success){
        var isStoreOwner = res.obj.isStoreOwner
          if (isStoreOwner){
            this.setData({
              user: res.obj,
              storeNature: res.obj.storeNature
            })
          }
          this.setData({
            user: res.obj,
            hasUser: true,
            isStoreOwner: res.obj.isStoreOwner
          })
          //小云点订单列表
        if (this.data.user.id == "cbced730cc43cead0592fbdd5ef10f99"){
          this.setData({
            showCloud:true
          })
        }else{
          this.setData({
            showCloud: false
          })
        }
      }else{
        this.setData({
          user: "",
          hasUser: false,
          isStoreOwner:false,
          showCloud: false
        })
      }
    }).catch(e=>{
      this.setData({
        user: "",
        hasUser: false,
        isStoreOwner: false,
        showCloud: false        
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baseUrl: app.globalData.imageUrl
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


})