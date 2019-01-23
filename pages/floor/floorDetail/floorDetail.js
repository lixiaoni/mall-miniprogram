// pages/floor/floorDetail/floorDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delModal:false,
    admin:{},
    code:"",
    companyLogo: app.globalData.mallIcon,
    companyName: "",
    floorTitle: '',
    floorType: "",
    shopNum:0,
    area: [],
    tag:[],
    //编辑模态框
    editModal:false,
    floorName:"",
    floorNum:"",
    watchInput:false,
    //新建模态框
    areaModal:false,
    areaName:"",
    baseUrl: app.globalData.imageUrl,
    defaultHead: app.globalData.defaultHeadPic,
  },
  choseAdmin(){
    wx.navigateTo({
      url: '../choseAdmin/choseAdmin?code=' + this.data.code,
    })
  },
  // 编辑楼层
  editFloor(){
    this.setData({
      editModal: true,
      floorName: this.data.floorType ? this.data.floorType:"",
      floorNum: this.data.floorTitle ? this.data.floorTitle:"",
      watchInput: false
    })
  },
  //确认提交
  changeName(){
    if (this.data.watchInput){
      app.http.requestAll("/admin/floor/update",{
        code:this.data.code,
        name: this.data.floorName,
        floorNum: this.data.floorNum
      },"put").then((res)=>{
          this.setData({
            editModal: false
          })
          this.loadPart(['floorTitle', 'floorType'])
            wx.showToast({
              title: '修改成功',
              icon: 'none'
            })
      })
    }
  },
  // 监听input
  watchInput: function (event) {
    let id = event.currentTarget.id; 
    if (id == "num") {
        this.setData({
          floorNum: event.detail.value
        })
    } else if (id == "name") {
        this.setData({
          floorName: event.detail.value
        })
    } else if (id == "areaName"){
      this.setData({
        areaName: event.detail.value
      })
    }

    if (id == "num" || id == "name") {
      if (this.data.floorNum.trim() || this.data.floorName.trim() ){
        this.setData({
          watchInput:true
        })
      }else{
        this.setData({
          watchInput: false
        })
      }
    }else{
      if (this.data.areaName.trim()) {
        this.setData({
          watchInput: true
        })
      } else {
        this.setData({
          watchInput: false
        })
      }
    }
  },
  //删除楼层
  delFloor(){
    this.setData({
      delModal: true
    })
  },
  cancel(){
    this.setData({
      delModal: false,
      editModal:false,
      areaModal:false
    })
  },
  sureDel(){
    this.setData({
      delModal: false
    })
    app.http.deleteRequest("/admin/floor/" + this.data.code).then((res)=>{
      
      wx.showToast({
        title: res.message,
        icon:'none'
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        })
      },1000)
    })
  },
  //跳转tag
  toTag(){
    wx.navigateTo({
      url: '../goodsTag/goodsTag?code='+this.data.code
    })
  },
  toAreaDetail(e){
    wx.navigateTo({
      url: '../areaDetail/areaDetail?code=' + e.currentTarget.dataset.code + "&floor=" + this.data.floorTitle + " " + this.data.floorType
    })
  },
  //新建分区
  areaModal() {
    this.setData({
      areaModal: true,
      areaName: "",
      watchInput: false
    })
  },
  newArea(){
    if (this.data.watchInput) {
      this.setData({
        areaModal: false
      })
      app.http.postRequest("/admin/floor/add", {
        type:3,
        parentCode: this.data.code,
        name: this.data.areaName,
      }).then((res) => {
        this.loadPart(['area'])
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
          
      })
    }
  },
  loadPart(part){
    app.http.getRequest("/admin/floor/floorinfo/" + this.data.code).then((res) => {
      res = res.obj;
      let floor = res.childList[0];
      let data = {
        companyName: res.name, //楼座名字
        floorTitle: floor.floorNum,  //层数
        floorType: floor.name, //层名
        area: floor.childList, //区列表
        admin: floor.userList,  //管理员
        code: this.data.code, //层code
        tag: floor.tags,  //标签
        shopNum: floor.storeCount //商家
      };
      if(part){
        let newObj = {};
        for(var i=0;i<part.length;i++){
          newObj[part[i]] = data[part[i]]
        }
        this.setData(newObj)
        return;
      }
      this.setData(data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
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
    this.loadPart()
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