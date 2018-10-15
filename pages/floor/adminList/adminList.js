// pages/floor/choseAdmin/choseAdmin.js
const app = getApp();
let timmer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyLogo: "/image/dp.png",
    companyName: "百荣世贸商城",
    louName:"百荣世贸一期",
    //楼层选择
    louName: "",
    louList: [],
    choseLou: false,//选择楼层
    bigComName: true,//公司名显示
    admin:[],
    baseUrl: app.globalData.imageUrl
  },
  chose(e){
 
  },
  call(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '../addAdmin/addAdmin',
    })
  },
  returnCom() {
    this.setData({
      bigComName: true,
      choseLou: false
    })
    this.getList();
  },
  showLou() {
    this.setData({
      bigComName: false
    })
  },
  choseLou(e) {
    this.getList({ floorCode: e.currentTarget.dataset.code })
    this.setData({
      choseLou: true,
      louName: e.currentTarget.dataset.name
    })
  },
  serch(c){
    clearTimeout(timmer);
    timmer = setTimeout(()=>{
      let val = c.detail.value.trim();
      this.getList({
        name: val
      })
    },1000)
  },
  //获取展示管理员列表
  getList(obj) {
    let send = obj ? obj : {};
    send.mallCode = app.http.mallCode;
   
      //获取所有管理员，并加上选中标识
      app.http.postRequest("/admin/floor/malluser/mallusers", send).then((res) => {
        let all = res.obj;
        this.setData({
          admin: all,
          loaded: true
        })
      })

  },
  toDetail(e){
    wx.navigateTo({
      url: '../adminDetail/adminDetail?code='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    
    //楼层
    app.http.getRequest("/admin/floor/balcony/1").then((res) => {
      this.setData({
        louList: res.obj
      })
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