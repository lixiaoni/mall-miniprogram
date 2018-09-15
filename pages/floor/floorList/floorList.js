// pages/floor/floorList/floorList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    list:[],
    showMenu:false,
    cName:"",
     //添加
    editSpec: false,
    watchInput: false,
    //新名字
    newName: ""
  },
 
  showMenu(e){
    this.setData({
      showMenu:true,
      id: e.currentTarget.dataset.id,
      cName: e.currentTarget.dataset.name
    })
  },
  closeShow(){
    this.setData({
      showMenu: false
    })
  },
  getList(){
    app.http.getRequest("/admin/floor/balcony/1").then((res) => {
      this.setData({
        list: res.obj
      })
    })
  },
  //重命名
  // 监听input
  watchInput: function (event) {
    if (event.detail.value == '') {
      this.setData({
        watchInput: false
      })
    } else {
      if (this.data.editSpec == "new") {
        this.setData({
          watchInput: true,
          value: event.detail.value
        })
      } else {
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
      watchInput: false,
      editSpec: false
    })
  },  
  //改名字
  changeName() {
    if (this.data.newName.trim() == "") {
      return
    }
    let id = this.data.id;
    app.http.requestAll("/admin/floor/update", {
      code: id,
      name: this.data.newName.trim()
    }, 'put').then((res) => {
      if (res.code == 1) {
        this.setData({
          id,
          companyName: this.data.newName.trim(),
          editSpec: false
        })

        this.getList()
      }
    })
  },
  showName() {
    this.setData({
      editSpec: "name",
      newName: "",
      watchInput: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getList()
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