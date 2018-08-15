var utils = require("../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    colorData: ["DA2728", "25A5EC", "1CB72E", "C63278","FBA82A"],
    showColor:"333",
    changeFont:false,
    changeColor:false,
    pics: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 图片上传
  chooseImage: function () {
  
    var _this = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        var imgSrc = res.tempFilePaths;
        console.log(imgSrc)
        pics = pics.concat(imgSrc);
        // 控制触发添加图片的最多时隐藏
        _this.setData({
          pics: pics
        })
        // var tempFilePaths = res.tempFilePaths
        // wx.uploadFile({
        //   url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        // header: {
        //   "Content-Type": "multipart/form-data"
        // }
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     //do something
        //   }
        // })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 字体加粗 
  changeFont:function(){
    this.setData({
      changeFont:true
    })
  },
  // 改变颜色
  showColor:function(){
    this.setData({
      showColor:false
    })
  },
  changeColor:function(e){
    this.setData({
      showColor: e.target.dataset.index
    })
  },
  // 添加图片
  changeImg:function(){

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

  },

})