// pages/work/shopDetail/shopDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1认证 2冻结 3解冻
    state: ""
  },

  //认证
  authentication(){
    app.http.getRequest("/admin/floor/store/pass/" + this.data.id).then((res)=>{
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if(res.success){
        this.setData({
          state : 2
        })
      }
    })
  },
  //冻结
  freeze(){
    app.http.getRequest("/admin/floor/store/freeze/" + this.data.id).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if (res.success) {
        this.setData({
          state: 3
        })
      }
    })
  },
  //解冻
  unfreeze(){
    app.http.getRequest("/admin/floor/store/unfreeze/" + this.data.id).then((res) => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
      if (res.success) {
        this.setData({
          state: 2
        })
      }
    })
  },
  //打电话
  callMeMaybe(){
    if (this.data.store.servicePhone){
      wx.makePhoneCall({
        phoneNumber: this.data.store.servicePhone
      })
    }
  },
  getData(){
    app.http.getRequest("/admin/mall/store/flooradmin/"+this.data.id+"/info").then((res)=>{
      this.setData({
        store : res.obj.store[0].store,
        goodsList: res.obj.store[0].goodsList,
        count: res.obj.countData,
        floor: res.obj.floor
      })
      
      let status = this.data.floor.authStatus;
      let freeze = this.data.floor.freeze;
      let obj = {};
      if (status == 1){
        //认证状态 0 未认证 1 已认证
        if(freeze == 1){
          obj = {state:3}
        }else{
          obj = { state: 2 }
        }
      }else if(status == 0){
        obj = { state: 1}
      }
      this.setData(obj)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})