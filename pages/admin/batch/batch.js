const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasList: true, 
    datas: [],
    allSelected:false,
    storeId: 123,
    pageNum: 1,
    pageSize: 20,
    setCode:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
      storeId = this.data.storeId,
      pageNum = this.data.pageNum,
      pageSize = this.data.pageSize
    app.http.getRequest('/admin/shop/store/'+storeId+'/goods?pageNum='+pageNum+'&pageSize='+pageSize)
      .then(res => {
        var detailList = res.obj.result
        _this.setData({
          datas: detailList,
        })
      })
  },
   remove(val){
    var index = indexOf(val);
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
      this.remove(goodId)
    }
    datas[index].selected = !selected;
    this.setData({
      datas: datas,
      setCode:arr
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})