const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: true, 
    datas: [],
    currentTab:-1,
    allSelected:false,
    goodsStatus:'',
    setCode:[],
    showBottom:true,
    numSle:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.getList()
  },
getList:function(){
  var _this = this
  app.pageRequest.pageGet('/admin/shop/store/{{storeId}}/goods', {})
    .then(res => {
      var detailList = res.obj.result,
        datas = _this.data.datas,
        totalCount = res.obj.totalCount,
        newArr = app.pageRequest.addDataList(datas, detailList)
      _this.setData({
        datas: newArr,
      })
    })
},
 indexOf(val,arr){
    for(var i = 0; i<arr.length; i++){
      if (arr[i] == val) { return i; }
    }
    return -1;
  },
   remove(val,arr){
    var index = this.indexOf(val,arr);
    if(index > -1){ arr.splice(index, 1); }
  },
  selectList(e) {
    const index = e.currentTarget.dataset.index,
          goodId = e.currentTarget.dataset.id,
          datas = this.data.datas,
          arr = this.data.setCode
    const selected = datas[index].selected;
    if (!datas[index].selected){
      arr.push(goodId)
    }else{
      this.remove(goodId,arr)
    }
    datas[index].selected = !selected;
    this.setData({
      datas: datas,
      setCode:arr,
      numSle:arr.length
    });
  },
  selectAll(e){
    var data = this.data.datas,
        selectAllStatus = this.data.selectAllStatus,
       arr = this.data.setCode
    for (var i = 0; i < data.length;i++){
      if (selectAllStatus) {
        data[i].selected =false
      }else{
        data[i].selected = true
        arr.push(goodId)
      }
    }
    this.setData({
      datas: data,
      setCode: arr,
      selectAllStatus:!selectAllStatus
    })
  },
  // 分类至
  addClass:function(){
    var code = this.data.setCode
    wx.navigateTo({
      url: '../shopClass/shopClass?code='+code,
    })
  },
  // 切换
  swichNav: function (e) {
    var that = this,
      status = e.target.dataset.index
    app.pageRequest.pageData.pageNum = 0
    that.setData({
      goodsStatus: status,
      showBottom:false,
      setCode:[],
      numSle:0,
      pageNum:1
    })
    this.classCode()
    if (e.target.dataset.current==2){
      that.setData({
        showBottom:true
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  classCode: function () {
    var _this = this,
      goodsStatus = this.data.goodsStatus
    app.pageRequest.pageGet('/admin/shop/goods/{{storeId}}/goods/status/{{goodsStatus}}', { goodsStatus: goodsStatus,customCategoryCodes:''})
      .then(res => {
        var detailList = res.obj.result,
          datas = _this.data.datas,
          newArr = app.pageRequest.addDataList(datas, detailList)
        _this.setData({
          datas: newArr,
        })
      })
  },
  // 下架
  changeStatus: function (e) {
    const _this = this,
      datas = this.data.datas,
      newArr=[],
      goodsIdList = this.data.setCode
    if (goodsIdList.length==0){return}
    app.http.postRequest('/admin/shop/store/{{storeId}}/goods/status/on',goodsIdList)
      .then(res => {
        for (var i = 0; i < datas.length; i++) {
          if (this.IsInArray(goodsIdList, datas[i].id)) {
            datas[i].status = "1"
          } else {
            newArr.push(datas[i])
          }
        }
        _this.setData({
          datas: newArr,
        })
        wx.showToast({
          title: '上架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  IsInArray:function(arr, val) {
    var testStr = ',' + arr.join(",") + ",";
    return testStr.indexOf("," + val + ",") != -1;
  },
  upStatus: function (e) {
    const _this = this,
          datas = this.data.datas,
          newArr=[],
          goodsIdList = this.data.setCode
    if (goodsIdList.length == 0) { return }
    app.http.postRequest('/admin/shop/store/{{storeId}}/goods/status/off',goodsIdList)
      .then(res => {
        for (var i = 0; i < datas.length; i++) {
          if (this.IsInArray(goodsIdList, datas[i].id)) {
            datas[i].status = "0"
          }else{
            newArr.push(datas[i])
          }
        }
        _this.setData({
          datas: newArr,
        })
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000
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
    this.setData({
      currentTab: -1
    })
    app.pageRequest.pageData.pageNum = 0
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this,
      goodsStatus = this.data.goodsStatus
    if (goodsStatus == '') {
      that.getList()
    } else {
      this.classCode()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})