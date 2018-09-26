// pages/floor/floorDetail/floorDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
    floorName:"", //所属层名
    companyLogo: "/image/dp.png",
    companyName: "",
    areaTitle: "",
    storeNum:0,
    admin: null,
    tag:[],
    //修改弹窗
    areaModal:false,
    newAreaName:"",
    //删除弹层
    delModal:false
  },
  //标签
  moreTag(){
    wx.navigateTo({
      url: '../goodsTag/goodsTag?code=' + this.data.code,
    })
  },
  //记载页面
  loadPage(obj){
    app.http.getRequest("/admin/floor/areainfo/" + this.data.code).then((res) => {
      let lou = res.obj;
      let floor = lou.childList[0];
      let area = floor.childList[0];
      
      let send = {
        companyName: lou.name,
        areaTitle: area.name,
        admin: area.userList,
        tag: area.tags,
        storeNum: area.storeCount,
        floorName: floor.floorNum+" "+floor.name
      } 
      if(obj){
        let newSend = {};
        for(let i=0;i<obj.length;i++){
          newSend[obj[i]] = send[obj[i]];
        }
        this.setData(newSend)
      }else{
        this.setData(send)
      }
      
    })
  },
  //管理员
  choseAdmin() {
    wx.navigateTo({
      url: '../choseAdmin/choseAdmin?code=' + this.data.code,
    })
  },
  //编辑
  editArea(){
    this.setData({
      areaModal:true,
      newAreaName:""
    })
  },
  watchInput: function (e) {
    let name = e.detail.value; 
    this.setData({
      newAreaName:name
    })
  },  
  newName(){
    if (this.data.newAreaName.trim() !== ""){
      app.http.requestAll("/admin/floor/update", {
        code: this.data.code,
        name: this.data.newAreaName
      },"put").then((res)=>{
        this.setData({
          areaModal: false
        })
        if (res.code == 1){
          this.loadPage(['areaTitle'])
          wx.showToast({
            title: res.message,
            icon: "none"
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入分区新名字',
        icon:"none"
      })
    }
  
  },
  cancel(){
    this.setData({
      areaModal: false,
      delModal:false
    })
  },
  //删除
  delArea(){
    this.setData({
      delModal: true
    })
  },
  sureDel(){
    app.http.deleteRequest("/admin/floor/" + this.data.code).then((res) => {
      wx.showToast({
        title: res.message,
        icon:'none'
      })
      this.setData({
        delModal: false
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code:options.code
      //code:30,//delit
      
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