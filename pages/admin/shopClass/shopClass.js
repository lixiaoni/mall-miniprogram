const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    show:false,
    watchInput: false,
    storeId:123,
    shouTitile:false,
    codeArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.code){
    var code=options.code
      var arr = code.split(',');
     this.setData({
       shouTitile:true,
       codeArr:arr
     })
    }
    var that = this,
      storeId = this.data.storeId
    app.http.getRequest('/admin/shop/customcategory/store/'+storeId)
        .then(res => {
          const obj = res.obj
          that.setData({
            dataList: obj
          })
        })
  },
  /**
     * 当前商品选中事件
     */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let dataList = this.data.dataList;
    const selected = dataList[index].selected;
    dataList[index].selected = !selected;
    this.setData({
      dataList: dataList
    });
  },
  // 确定
  comfirmFun(e){
    var dataList = this.data.dataList,
        strCode='',
        codeList=[];
    for(var i=0;i<dataList.length;i++){
      if (dataList[i].selected){
        codeList.push({ name: dataList[i].name, customCategoryCode:dataList[i].customCategoryCode})
        strCode = dataList[i].customCategoryCode
      }
    }
    if (this.data.shouTitile) {
      var customCategoryCode =
        app.http.postRequest('/admin/shop/goods/customcategory/'+strCode+'/goods', JSON.stringify(this.data.codeArr))
          .then(res => {
            wx.showToast({
              title: '分类成功',
              icon: 'none',
              duration: 2000
            })
          })
    }
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      codeList: codeList
    })
    wx.navigateBack({
      data: 1
    })
  },
  // 取消
  cancel: function () {
    this.setData({
      show: false
    })
  },
  // 新建分类
  addClass: function (e) {
    this.setData({
      show: true,
      value: ''
    })
  },
  confirm:function(){
    var _this=this,
        tempArr={},
        name=this.data.value
    tempArr.name = name
    tempArr.storeId=2
    app.http.postRequest('/admin/shop/customCategory/save', JSON.stringify(tempArr))
      .then(res => {
        wx.showToast({
          title: '新建成功',
          duration: 1000,
          mask: true
        })
        _this.cancel()
      })
  },
  // 监听input
  watchInput: function (event) {
    if (event.detail.value == '') {
      this.setData({
        watchInput: false
      })
    } else {
      this.setData({
        watchInput: true,
        value: event.detail.value
      })
    }
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