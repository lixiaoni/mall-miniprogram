// pages/floor/addAdmin/addAdmin.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    check:false,
    register:false
  },
  input(e){
    let val = e.detail.value;
    this.setData({
      value:val,
      register:false,
      check:false
    })
  },
  check(){
    if(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.value)){
      app.http.getRequest("/api/user/mobileexist/" + this.data.value).then((res)=>{
        //已注册
        this.setData({
          register: true,
          check:true
        })
      }).catch(e=>{
        if(e.data.code == 2) {
          //没注册
          this.setData({
            register: false,
            check: true
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入正确手机号',
        icon:'none'
      })
    }
  },
  //添加管理员
  create(){
    if (this.data.check && this.data.register){
      if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.data.value)) {
        app.http.postRequest("/admin/floor/malluser/add",{
          phone:this.data.value,
          mallCode: app.http.mallCode
        }).then((res)=>{
            wx.showToast({
              title: res.message,
              icon:'none'
            })
        })
      }
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

})