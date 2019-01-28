import Api from '../../../utils/api.js'
import { formatTime} from '../../../utils/util.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.imageUrl,
    goodsNum:'',
    orders: '',
    purchaseOrders: '',
    storeNum: '',
    todaySaleNum: 0,
    todayDate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMes:function(){
    var _this=this,
      isSuperAdmin = this.data.isSuperAdmin
    if (isSuperAdmin){
      Api.superAdminWork()
        .then(res => {
          _this.formateData(res)
        })
    }else{
      Api.workIndex()
        .then(res => {
          _this.formateData(res)
        })
    }
  },
  formateData(res){
    var obj = res.obj;
    this.setData({
      goodsNum: obj.goodsNum,
      orders: obj.orders,
      purchaseOrders: obj.purchaseOrders,
      storeNum: obj.storeNum,
      todaySaleNum: (obj.todaySaleNum).toFixed(2),
      statisticsData: obj
    })
    // 楼层数据
    if(obj.user.userFloors){
      let floor = obj.user.userFloors;
      let floorArr = [];
      floor.forEach(el=>{
        //座
        let str = el.name;
        //楼层
        if (el.childList){
          el.childList.forEach(f=>{
            str = el.name;
            str += f.floorNum;
            floorArr.push(str);
          })
        }else{
          floorArr.push(str);
        }
      })
      this.setData({
        floorList: floorArr
      })
    }
  },
  goHome: function () {
    wx.switchTab({
      url: '../../page/user/user'
    })
  },
  onLoad: function (options) {
    this.getUser()
    this.setData({
      isSuperAdmin: wx.getStorageSync("isSuperAdmin"),
      todayDate: formatTime(new Date(), true)
    })
  },
  goDerm: function () {
    wx.navigateTo({
      url: '../../page/mallIcon/mallIcon',
    })
  },
  getUser() {
    Api.isAdmin({})
      .then(res => {
        var obj = res.obj
        wx.setStorageSync("isSuperAdmin", obj.isSuperAdmin)
        wx.setStorageSync("isFloorAdmin", obj.isFloorAdmin)
        this.setData({
          isSuperAdmin: obj.isSuperAdmin,
          isFloorAdmin: obj.isFloorAdmin
        })
      })
    Api.getUserInfo().then((res) => {
      if (res.success) {
        this.setData({
          user: res.obj,
          hasUser: true,
        })
      } else {
        this.setData({
          user: "",
          hasUser: false,
        })
      }
    }).catch(e => {
      this.setData({
        user: "",
        hasUser: false,
      })
    })
  },
  showMore(){
    this.setData({
      showMore: !this.data.showMore
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
    this.getMes()
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