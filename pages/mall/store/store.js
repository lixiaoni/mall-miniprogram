const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    stTab:0,
    baseUrl: app.globalData.imageUrl,
    floorTab:-1,
    serHide:false,
    dataList:[],
    value:'',
    floorserList:[],
    floorList:[],
    childList: [],
    childListLast:[],
    balconyCode:'',
    floorCode:'',
    floorAreaCode:'',
    isShow:true
  },
   isPurchaser:function(index){
     var arr = Api.getPurchaserStoreIds()
    if(arr.indexOf(index)!=-1){
      return true
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getFloorSer:function(){
    var _this=this
    Api.floorStore()
      .then(res => {
        var arr=res.obj
        arr.unshift({ name: "全部楼座", code: "000", childList:[]})
        _this.setData({
          floorserList:arr
        })
      })
  },
  onLoad: function (options) {
    this.getFloorSer()
    if (options.name){
      this.setData({
        value: options.name
      })
      this.getList({ keyword: options.name})
    }else{
      this.getList()
    }
  },
  // tab切换
  swichNav: function (e) {
    var that = this,
    serHide=this.data.serHide
    if (serHide==false){
      that.setData({
        serHide: true
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  serFloorNav:function(e){
    var that = this,
      indexFloor=e.target.dataset.current,
      childList = this.data.childList,
      index = this.data.stTab,
      code = e.target.dataset.code
    if (this.data.floorTab === indexFloor) {
      return false;
    } else {
      that.setData({
        floorTab: indexFloor,
        childListLast: [],
        floorCode:code,
        childListLast: childList[indexFloor].childList
      })
    }
  },
  serNav: function (e) {
    var that = this,
      floorserList = this.data.floorserList,
      floorserListNew=[],
      childList=[],
      index = e.target.dataset.current,
      balconyCode = e.target.dataset.code
      that.setData({
        floorList:[]
      })
    if (floorserList[index].childList.length==0){
      that.setData({
        isShow:true
      })
    }else{
      that.setData({
        isShow: false
      })
    }
    if (this.data.stTab === index) {
      return false;
    } else {
      that.setData({
        stTab: index,
        childList: floorserList[index].childList,
        balconyCode: balconyCode
      })

    }
  },
  getList: function (data, nextPage){
    var   _this = this
    Api.storeSerList(data,nextPage)
      .then(res => {
      if(res.obj!==null){
    
        var dataList = res.obj.result
        for (var i = 0; i < dataList.length; i++) {
          if (_this.isPurchaser(dataList[i].storeId)) {
            dataList[i].isPurchaser = true
          } else {
            dataList[i].isPurchaser = false
          }
        }
        var newArr=[],
          datas = _this.data.dataList
          newArr = app.pageRequest.addDataList(datas, dataList)
        _this.setData({
          dataList: newArr,
        })
       }else{
        wx.showToast({
          title: '暂无更多了！',
          icon: 'none',
          duration: 2000
        })
       }
        _this.setData({
          serHide: false,
        })
      })
  },
  changeValue:function(e){
    this.setData({
      value: e.detail.value
    })
  },
  searchBtn: function (e) {
    this.setData({
      dataList: []
    })
    this.getList({ keyword: this.data.value, mallCode: 1000})
  },
  serChildFloorNav:function(e){
    var _this=this,
      balconyCode = this.data.balconyCode,
      floorCode = this.data.floorCode,
      floorAreaCode = e.target.dataset.code
    _this.setData({
      dataList:[],
      floorAreaCode: floorAreaCode
    })
    this.getList({ keyword: this.data.value, balconyCode: balconyCode, floorCode: floorCode, floorAreaCode: floorAreaCode})
  },
  allFloorNav:function(){
    var  floorCode = this.data.floorCode
    this.setData({
      dataList: [],
    })
    this.getList({ keyword: this.data.value, balconyCode: this.data.balconyCode, floorCode: floorCode})
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
  bindDownLoad:function(){
    var _this = this,
      balconyCode = this.data.balconyCode,
      floorCode = this.data.floorCode,
      floorAreaCode = this.data.floorAreaCode
    this.getList({ keyword: this.data.value, mallCode: 1000, balconyCode: balconyCode, floorCode: floorCode, floorAreaCode: floorAreaCode },true)
  },
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})