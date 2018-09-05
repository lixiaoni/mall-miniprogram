const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    stTab:0,
    floorTab:-1,
    serHide:false,
    dataList:[],
    value:'',
    floorserList:[],
    floorList:[],
    childList:[],
    balconyCode:'',
    floorCode:'',
    floorAreaCode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getFloorSer:function(){
    var _this=this
    Api.floorStore({mallCode: 1000})
      .then(res => {
        _this.setData({
          floorserList:res.obj
        })
      })
  },
  onLoad: function (options) {
    console.log(options.name)
    if (options.name){
      this.setData({
        value: options.name
      })
      this.getList({ keyword: options.name})
    }
    this.getFloorSer()
    this.getList()
  },
  // tab切换
  swichNav: function (e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        serHide:true
      })

    }
  },
  serFloorNav:function(e){
    var that = this,
      indexFloor=e.target.dataset.current,
      floorserList = this.data.floorserList,
      index = this.data.stTab,
      code = e.target.dataset.code
    if (this.data.floorTab === indexFloor) {
      return false;
    } else {
      that.setData({
        floorTab: indexFloor,
        childList: [],
        floorCode:code,
        childList: floorserList[index - 1].childList[indexFloor].childList
      })
    }
  },
  serNav: function (e) {
    var that = this,
      floorserList = this.data.floorserList,
      floorserListNew=[],
      childList=[],
      index = e.target.dataset.current,
      balconyCode=''
      that.setData({
        floorList:[]
      })
    floorserListNew.push(floorserList[index - 1])
    if(index>0){
      balconyCode = floorserListNew[0].code
    }
    if (this.data.stTab === index) {
      return false;
    } else {
      that.setData({
        stTab: index,
        floorList: floorserListNew,
        childList: childList,
        balconyCode: balconyCode
      })

    }
  },
  getList:function(data){
    var   _this = this
    Api.storeSerList(data)
      .then(res => {
      if(res.obj!==null){
        var dataList = res.obj.result,
          datas = _this.data.dataList
        newArr = app.pageRequest.addDataList(datas, dataList)
       }
      if (app.pageRequest.pageData.pageNum == 1 && res.obj == null){
         var newArr=[]
       }
      if (app.pageRequest.pageData.pageNum > 1 && res.obj == null) {
        var newArr = this.data.dataList
      }

        _this.setData({
          dataList: newArr,
          serHide:false
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
    app.pageRequest.pageData.pageNum = 0
    this.getList({ keyword: this.data.value, mallCode: 1000})
  },
  serChildFloorNav:function(e){
    var _this=this,
      balconyCode = this.data.balconyCode,
      floorCode = this.data.floorCode,
      floorAreaCode = e.target.dataset.code
    app.pageRequest.pageData.pageNum = 0
    _this.setData({
      dataList:[],
      floorAreaCode: floorAreaCode
    })
    this.getList({ keyword: this.data.value, mallCode: 1000, balconyCode: balconyCode, floorCode: floorCode, floorAreaCode: floorAreaCode})
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
    this.setData({
      value:'',
    })
    app.pageRequest.pageData.pageNum = 0
    this.getList({mallCode: 1000})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bindDownLoad:function(){
    var _this = this,
      balconyCode = this.data.balconyCode,
      floorCode = this.data.floorCode,
      floorAreaCode = this.data.floorAreaCode
    this.getList({ keyword: this.data.value, mallCode: 1000, balconyCode: balconyCode, floorCode: floorCode, floorAreaCode: floorAreaCode })
  },
  onReachBottom: function () {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})