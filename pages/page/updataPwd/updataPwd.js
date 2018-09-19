// pages/updataPwd/updataPwd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    old:"",
    new:"",
    re:""
  },
  watchInput(e){
    let val = e.detail.value,
        type = e.currentTarget.dataset.type,
        obj = {};

    switch(type){
      case "old" : 
      obj = {
        old: val
      }
      break;
      case "new":
        obj = {
          new: val
        }
        break;
      case "re":
        obj = {
          re: val
        }
        break;
    }
    this.setData(obj);
  },
  sure(){
    let newpass = this.data.new,
        re = this.data.re,
        old = this.data.old;
    if (newpass == re & newpass!=""){
      app.http['_headerGet']["content-type"] = "application/x-www-form-urlencoded";
      app.http.postRequest("/oauth/authentication/changepassword",{
        oldPassword: old,
        newPassword: newpass
      }).then((res)=>{
        wx.showToast({
          title: res.message,
          icon:'none'
        })
      })
    }else{
      wx.showToast({
        title: '两次输入不一致',
        icon:'none'
      })
    }    
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