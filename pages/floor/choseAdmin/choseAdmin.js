// pages/floor/choseAdmin/choseAdmin.js
const app = getApp();
let timmer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loaded:false,
    code:"",
    companyLogo: "/image/dp.png",
    companyName: "百荣世贸商城",
    //楼层选择
    louName:"",
    louList:[],
    choseLou: false,//选择楼层
    bigComName: true,//公司名显示
    admin:[],
    ballBack: [
      '#ffa515',
      '#fa69ab',
      '#22d8bc',
      '#c572ef',
      '#9ad85a'
    ],
  },
  chose(e){
    let index = e.currentTarget.dataset.index;
    if (this.data.admin[index].isSlected){
      app.http.deleteRequest("/admin/floor/userfloor/" + this.data.code + "/" + e.currentTarget.dataset.id).then((res)=>{
          this.setData({
            ['admin[' + index + '].isSlected']: false
          })
      })
    }else{
      app.http.getRequest("/admin/floor/userfloor/" + this.data.code + "/allocation/" + e.currentTarget.dataset.id).then((res) => {
          this.setData({
            ['admin['+index+'].isSlected'] : true
          })
      })
    }
  },
  //获取展示管理员列表
  getList(obj){
    let send = obj?obj:{};
    send.mallCode = app.http.mallCode;
    //获取已选中的管理员，存起来
    app.http.postRequest("/admin/floor/malluser/mallusers", { floorCode: this.data.code, mallCode: app.http.mallCode }).then((own) => {//delit
      let myAdmin = own.obj ? own.obj:[];
      let adminObj = {};
      for (let i = 0; i < myAdmin.length; i++) {
        adminObj[myAdmin[i].userId] = true;
      }
      // this.setData({
      //   myAdmin: adminObj
      // })
      //获取所有管理员，并加上选中标识
      app.http.postRequest("/admin/floor/malluser/mallusers", send).then((res) => {
          let all = res.obj;
          for(let j = 0;j< all.length;j++){
            if (adminObj[all[j].userId]){
              all[j].isSlected = true;
            }else{
              all[j].isSlected = false;
            }
          }
          this.setData({
            admin:all,
            loaded:true
          })
      })
    })
   
  },
  returnCom(){
    this.setData({
      bigComName: true,
      choseLou:false
    })
    this.getList();
  },
  showLou(){
    this.setData({
      bigComName: false
    })
  },
  choseLou(e){
    this.getList({ floorCode: e.currentTarget.dataset.code})
    this.setData({
      choseLou:true,
      louName: e.currentTarget.dataset.name
    })
  },
  serch(c){
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      let val = c.detail.value.trim();
      this.getList({
        name: val
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })
    this.getList()
    //楼层筛选列表
    app.http.getRequest("/admin/floor/balcony/1").then((res) => {
      this.setData({
        louList: res.obj
      })
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