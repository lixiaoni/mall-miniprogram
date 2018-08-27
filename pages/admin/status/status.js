const app = getApp();
var recordStartX = 0;
var currentOffsetX = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: -1,
    alertTab:0,
    hidden:true,
    storeId:123,
    keyword:'',
    currentTabSer:0,
    showXl:true,
    list:[],
    pageNum :1,
    totalCount:'',
    pageSize :20,
    sImg:'/image/xl.png',
    detailList: [],
    alertData:["全部商品","引用商品","自建商品"],
  },
  recordStart: function (e) {
    this.setData({
      leftVal: ''
    });
    var index1 = this.data.index;
    recordStartX = e.touches[0].clientX;
    var detailList = this.data.detailList;
    if (index1 != undefined) {
      detailList[index1].offsetX =0;
    }
    var index = e.currentTarget.dataset.index
    currentOffsetX = this.data.detailList[index].offsetX;
  }
  ,
  recordMove: function (e) {
    var detailList = this.data.detailList;
    var index = e.currentTarget.dataset.index
    var item = detailList[index];
    var x = e.touches[0].clientX;
    var mx = recordStartX - x;
    var result = currentOffsetX - mx;
    if (result >= -80 && result <= 0) {
      item.offsetX = result;
    }
    this.setData({
      detailList: detailList
    });
  }
  ,
  recordEnd: function (e) {
    var detailList = this.data.detailList;
    var index = e.currentTarget.dataset.index
    var item = detailList[index];
    this.setData({
      index: index
    });
    if (item.offsetX < -40) {
      item.offsetX = -80;

    } else {
      item.offsetX = 0;

    }
    this.setData({
      detailList: detailList
    });
  },
  swichNav: function (e) {
    var that = this;
    console.log(e.target.dataset.current)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(e.target.dataset.current==3){
        that.setData({
          hidden:false,
          currentTab: e.target.dataset.current,
          sImg:'/image/xl1.png'
        })
      }else{
        that.setData({
          currentTab: e.target.dataset.current,
          sImg: '/image/xl.png'
        })
      }
      
    }
  },
  // 筛选
  // showXl:function(){
  //   this.setData({
  //     showXl:false,
  //   })
  // },
  alertNav:function(e){
    var that = this;
    if (that.data.alertTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        alertTab: e.target.dataset.current,
      })

    }
  },
  swichSer:function(e){
    var that = this;
    if (that.data.currentTabSer === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTabSer: e.target.dataset.current,
      })

    }
  },
  hideSer:function(){
    var that = this,
      storeId = this.data.storeId
    app.http.getRequest('/admin/shop/customcategory/store/'+storeId)
      .then(res => {
        const obj = res.obj
        console.log(obj)
        that.setData({
          list: obj
        })
      })
    this.setData({
      hidden: true,
    })
  },
  /**
 * 删除
 */
  deleteList(e) {
    const index = e.currentTarget.dataset.index,
      goodId = e.currentTarget.dataset.id
    let detailList = this.data.detailList;
    detailList.splice(index, 1);
    this.setData({
      detailList: detailList
    });
    if (!detailList.length) {
      this.setData({
        hasList: false
      });
    }
    app.http.deleteRequest('/admin/shop/goods/'+goodId)
      .then(res => {
       console.log(res)
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 2000
        })
      })
   
  },
  // 下架
  changeStatus:function(e){
    const goodId = e.currentTarget.dataset.id,
          index = e.currentTarget.dataset.index,
          storeId=this.data.storeId,
          _this=this,
          detailList = this.data.detailList,
          goodsIdList=[]
    goodsIdList.push(goodId)
    app.http.postRequest('/admin/shop/store/' + storeId + '/goods/status/on',JSON.stringify(goodsIdList))
      .then(res => {
        detailList[index].status="1"
        _this.setData({
          detailList: detailList,
        })
        wx.showToast({
          title: '上架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  upStatus:function(e){
    const goodId = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      storeId = this.data.storeId,
      _this = this,
      detailList = this.data.detailList,
      goodsIdList = []
    goodsIdList.push(goodId)
    console.log(goodsIdList)
    app.http.postRequest('/admin/shop/store/'+storeId+'/goods/status/off', JSON.stringify(goodsIdList))
      .then(res => {
        detailList[index].status = "0"
        _this.setData({
          detailList: detailList,
        })
        wx.showToast({
          title: '下架成功',
          icon: 'none',
          duration: 2000
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this,
      storeId = this.data.storeId ,
      keyword = this.data.keyword,
      pageNum = this.data.pageNum ,
      pageSize = this.data.pageSize 
    app.http.getRequest('/admin/shop/store/'+storeId+'/goods?keyword='+keyword+'&pageNum='+pageNum+'&pageSize='+pageSize)
      .then(res => {
        var detailList = res.obj.result
        console.log(res)
        _this.setData({
          detailList: detailList,
          totalCount: res.obj.totalCount
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var that = this,
    //   storeId = this.data.storeId
    // app.http.getRequest('/admin/shop/customCategory/' + storeId)
    //   .then(res => {
    //     const obj = res.obj
    //     obj.unshift({ name: "全部商品",customCategoryCode:"0000"})
    //     console.log(obj)
    //     that.setData({
    //       list: obj
    //     })
    //   })
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