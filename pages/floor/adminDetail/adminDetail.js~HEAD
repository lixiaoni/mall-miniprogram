// pages/floor/adminDetail/adminDetail.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifPart:true,
    userId:'',
    //信息
    src:"",
    name:"",
    phoneNum:"",
    wx:"",
    part:"",
    code:"",
    manage:[]
  },
  loadPage(){
    app.http.getRequest("/admin/floor/malluser/userfloor/"+this.data.userId).then((res)=>{
      let obj = res.obj;
      this.setData({
        src: obj.headPic ? obj.headPic :"/image/41.png",
        name: obj.name,
        phoneNum: obj.phone,
        part: obj.deptName,
        code: obj.referralCode,
        manage: obj.userFloors,
        wx:obj.wechatNumber
      })
    })
  },
  //电话
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },
  //设置
  setting(){
    wx.navigateTo({
      url: '../editAdmin/editAdmin?userId=' + this.data.userId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.code
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
    this.loadPage();
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