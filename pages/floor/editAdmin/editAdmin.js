// pages/floor/editAdmin/editAdmin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    src:"",
    name:"",
    phoneNum:"",
    part:"",
    code:"",
    wechatNumber:"",
    //弹框
    mobel:false,
    change:'姓名',
    value:"" , //输入框
    //删除弹窗
    delModal:false
  },
  loadPage(){
    app.http.getRequest("/admin/floor/malluser/" + this.data.userId).then((res) => {
      let obj = res.obj;
      this.setData({
        src: obj.headPic ? obj.headPic : "/image/41.png",
        name: obj.name,
        phoneNum: obj.phone,
        part: obj.deptName ? obj.deptName : "",
        code: obj.referralCode ? obj.referralCode:"",
        wechatNumber: obj.wechatNumber ? obj.wechatNumber : "",
        id: obj.id
      })
    })
  },
  watchInput(e){
    let val = e.detail.value;
    this.setData({
      value:val
    })
  },
  sureChange(){
    if(this.data.value.trim()){
      let obj = {
        id: this.data.id
      };
      switch(this.data.change){
        case "姓名" : 
          obj.name = this.data.value;
          break;
        case "微信": 
          obj.wechatNumber = this.data.value;
        break;
        case "部门": 
          obj.deptName = this.data.value;
        break;
      }
      app.http.requestAll("/admin/floor/malluser/update", obj, "put").then((res)=>{
        this.setData({
          mobel: false
        })
        if(res.code == 1){
          this.loadPage();
          wx.showToast({
            title: res.message
          })
        }
      })
        
    }
  },
  cancel(){
    this.setData({
      mobel:false,
      delModal:false
    })
  },
  changeMobel(e){
    let type = '';
    switch (e.currentTarget.dataset.type) {
      case "name":
        type="姓名";
        break;
      case "wx":
        type = "微信";
        break;
      case "part":
        type = "部门";
        break;
    }
    this.setData({
      change:type,
      mobel:true,
      value:""
    })
  },
  // 删除
  del(){
    this.setData({
      delModal:true
    })
  },
  sureDel(){
    app.http.deleteRequest("/admin/floor/malluser"+this.data.userId).then((res)=>{
      if(res.code == 1){
        wx.redirectTo({
          url: '../adminList/adminList',
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },
  back(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId
      //userId: 123  //delit
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
    this.loadPage()
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