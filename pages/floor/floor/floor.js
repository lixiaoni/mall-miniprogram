// pages/login/floor/floor.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    //添加
    editSpec:false,
    watchInput: false,
    value:"",
    //新名字
    newName:"",
    //操作菜单
    showMenu:false,
    companyLogo:"/image/dp.png",
    moreSrc: "/image/moreO.png",
    companyName:"",
    floorList: []
  },
  more(){
    this.setData({
      showMenu:true
    })
  },
  closeShow(){
    this.setData({
      showMenu: false
    })
  },
  createFloor(){
    this.setData({
      editSpec:"new",
      value:""
    })
  },
  // 监听input
  watchInput: function (event) {
    if (event.detail.value == '') {
      this.setData({
        watchInput: false
      })
    } else {
      if (this.data.editSpec == "new"){
        this.setData({
          watchInput: true,
          value: event.detail.value
        })
      }else{
        this.setData({
          watchInput: true,
          newName: event.detail.value
        })
      }
      
    }
  },
  // 取消
  cancel: function () {
    this.setData({
      watchInput:false,
      editSpec:false
    })
  },  
  newFloor(){
    if (this.data.value.trim() == ""){
      return
    }
    
    app.http.postRequest("/admin/floor/add",{
      mallCode: app.http.mallCode,
      parentCode:this.data.id,
      type:2,
      floorNum: this.data.value.trim(),
      name:""
    }).then(()=>{
      this.loadPage()
      
      this.setData({
        watchInput: false,
        value: "",
        editSpec: false
      })
    })
  },
  //改名字
  changeName(){
    if (this.data.newName.trim() == "") {
      return
    }
    let id = this.data.id;
    app.http.requestAll("/admin/floor/update",{
      code: id,
      name: this.data.newName.trim()
    },'put').then((res) => {
      if (res.code == 1){
        this.setData({
          id,
          companyName: this.data.newName.trim(),
          editSpec:false
        })
      }
    })
  },
  showName(){
    this.setData({
      editSpec: "name",
      newName: "",
      watchInput: false
    })
  },
  //加载页面
  loadPage(){
    let id = this.data.id;
    app.http.getRequest("/admin/floor/sublist/" + id).then((res) => {
      this.setData({
        floorList: res.obj,
        id
      })
    })
  },
  toFloorDetail(e){
    console.log()
    wx.navigateTo({
      url: '../floorDetail/floorDetail?code=' + e.currentTarget.dataset.code,
    })
  },
  toAreaDetail(e){
    wx.navigateTo({
      url: '../areaDetail/areaDetail?code=' + e.currentTarget.dataset.code,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.id = 10;
    this.setData({
      id: options.id,
      companyName: options.name 
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