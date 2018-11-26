// pages/floor/adminDetail/adminDetail.js
const app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifPart:true,
    userId:'',
    //信息
    src:"",
    name:"",
    phoneNum:"",
    wx:"",
    part:"",
    code:"",
    manage:[],
    baseUrl: app.globalData.imageUrl,
    defaultHead: app.globalData.defaultHeadPic,
  },
  loadPage(){
    app.http.getRequest("/admin/floor/malluser/userfloor/"+this.data.userId).then((res)=>{
      let obj = res.obj;
      this.setData({
        src: obj.headPic ? this.data.baseUrl + obj.headPic : this.data.defaultHead,
        name: obj.name,
        phoneNum: obj.phone,
        part: obj.deptName,
        code: obj.referralCode,
        manage: obj.userFloors,
        wx:obj.wechatNumber
      })

      if (obj.userFloors){
        let all = 0;
        obj.userFloors.forEach(el => {
          el.childList.forEach(floor=>{
            if (floor.childList.length == 0 || !floor.childList){
              all += floor.storeCount;
            }else{
              floor.childList.forEach(area=>{
                all += area.storeCount
              })
            }
          })
        })
        this.setData({
          allFloorNum:all
        })
      }

    })
  },
  //电话
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },
  //设置
  setting(){
    wx.navigateTo({
      url: '../editAdmin/editAdmin?userId=' + this.data.userId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.code
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

})