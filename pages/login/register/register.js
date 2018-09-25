const app = getApp(); 
// pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //登录按钮样式class
    btnID: "loginBtnDis",
    //获取验证码按钮
    buttonTimer: "获取验证码",
    btnSec: '60',
    disabled: false,
    //电话
    telephone: "",
    //验证码
    verificationCode: "",
    //密码
    password: '',
    //密码是否可见
    ifhide: true,
    //密码图片src
    see: '/image/pass-hide.png',
    tip:""
  },
  register(){
    if (!this.testTel()) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
      })
      return;
    }
    if (this.data.verificationCode.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
      })
      return;
    }
    if (this.data.password.length < 6 || this.data.password.length > 16) {
      wx.showToast({
        title: '密码必须是6 - 16位的数字或字母',
        icon: 'none'
      })
      return
    }

    let obj = {
      mobile : this.data.telephone,
      password : this.data.password,
      smsCode : this.data.verificationCode
    }

    app.http.postRequest("/api/user/register", obj, { 'content-type': 'application/x-www-form-urlencoded' }).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })
    })

  },
  //显示隐藏密码
  showHide() {
    let b = !this.data.ifhide;
    this.setData({
      ifhide: b
    })
    if (b) {
      this.setData({
        see: '/image/pass-hide.png'
      })
    } else {
      this.setData({
        see: '/image/pass-show.png'
      })
    }
  },
  showPage(){
    this.loginCom.showPage();
  },
  //存入手机号
  savePhone(e) {
    this.setData({
      telephone: e.detail.value
    })
    this.checkComplete();
  },
  //存入验证码
  saveCode(e) {
    this.setData({
      verificationCode: e.detail.value
    })
    this.checkComplete();
  },
  //存入密码
  savePass(e) {
    this.setData({
      password: e.detail.value
    })
    this.checkComplete();
  },
  //判断是否输入完整
  checkComplete() {
    if (this.data.telephone.length > 0 && this.data.verificationCode.length > 0 && this.data.password.length > 0) {
        this.setData({
          btnID: 'loginBtnAc'
        })
        return
      }
      
    this.setData({
      btnID: 'loginBtnDis'
    })
  },
  //获取验证码
  getCode() {
    if (!this.testTel()) {
      wx.showToast({
        title: '请输入正确手机号码',
        icon: 'none',
      })
    } else {
      app.http.getRequest("/api/smsCode", { mobile: this.data.telephone }).then(res => {

      })
      //获取验证码倒计时
      let sec = this.data.btnSec;
      this.setData({
        buttonTimer: sec + "s",
        disabled: true
      })
      let timer = setInterval(() => {
        sec--;
        this.setData({
          buttonTimer: sec + "s"
        })

        if (sec <= 1) {
          clearInterval(timer)
          this.setData({
            buttonTimer: "获取验证码",
            disabled: false
          })
        }
      }, 1000)
    }
  }, 
  testTel() {
    let phone = this.data.telephone;
    if (!phone || phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
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
    //获得dialog组件
    this.loginCom = this.selectComponent("#login");
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