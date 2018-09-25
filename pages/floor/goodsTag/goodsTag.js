// pages/floor/choseAdmin/choseAdmin.js
const app = getApp();
let timmer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
    tags: []
  },
  chose(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.tags[index].isSlected) {
      app.http.deleteRequest("/admin/floor/floortag/" + e.currentTarget.dataset.id + "/" + this.data.code).then((res) => {
        if (res.code == 1) {
          this.setData({
            ['tags[' + index + '].isSlected']: false
          })
        }
      })
    } else {
      app.http.getRequest("/admin/floor/floortag/" + e.currentTarget.dataset.id + "/allocation/" + this.data.code).then((res) => {
        if (res.code == 1) {
          this.setData({
            ['tags[' + index + '].isSlected']: true
          })
        }
      })
    }
  },
  //创建新标签
  newTag(){
    wx.navigateTo({
      url: '../addTag/addTag?code='+this.data.code,
    })
  },
  //搜索
  serch(c) {
    clearTimeout(timmer);
    let val = c.detail.value.trim();
    timmer = setTimeout(()=>{
      this.getList({
        tagName: val
      });
    },1000)
  },
  //获取标签列表
  getList(obj) {
    let send = obj ? obj : {};
    send.mallCode = app.http.mallCode;
    //获取已选中的管理员，存起来
    app.http.getRequest("/admin/floor/malltag/{{floorCode}}/tags", { floorCode: this.data.code}).then((own) => {
      let myAdmin = own.obj ? own.obj:[];
      let adminObj = {};
      for (let i = 0; i < myAdmin.length; i++) {
        adminObj[myAdmin[i].tagCode] = true;
      }
      // this.setData({
      //   myAdmin: adminObj
      // })
      //获取所有管理员，并加上选中标识
      app.http.postRequest("/admin/floor/malltag/tags", send).then((res) => {
        let all = res.obj;
        for (let j = 0; j < all.length; j++) {
          if (adminObj[all[j].tagCode]) {
            all[j].isSlected = true;
          } else {
            all[j].isSlected = false;
          }
        }
        this.setData({
          tags: all
        })
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.code //delit
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
    this.getList()
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