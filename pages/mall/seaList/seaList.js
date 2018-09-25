const app = getApp();
import Api from '../../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    goodsList:[],
    baseUrl: app.globalData.imageUrl,
    value:'',
    priceShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  emptyVal:function(){
    this.setData({
      value:''
    })
  },
  isPurchaser: function (index) {
    var arr = wx.getStorageSync('purchaserStoreIds')
    if (arr.indexOf(index) != -1) {
      return true
    }
  },
  getSerList: function (name, nextPage){
    var _this = this,
      sortType='',
      currentTab = this.data.currentTab,
      priceShow = this.data.priceShow
    wx.setNavigationBarTitle({
      title: name
    })
    if (currentTab==0){
      sortType ='multiple'
    } else if (currentTab == 1) {
      sortType = 'sales'
    } else if (currentTab == 2) {
      if (priceShow){
        sortType = 'prices_asc'
      }else{
        sortType = 'prices_desc'
      }
    }
    this.setData({
      value:name
    })
    Api.goodsSer({ keyword: name, sortType: sortType }, nextPage)
      .then(res => {
        const obj = res.obj
   
        if(obj.length!=0){
          var goodsList =obj
          for (var i = 0; i < goodsList.length; i++) {
            if (_this.isPurchaser(goodsList[i].storeId)) {
              goodsList[i].isPurchaser = true
            } else {
              goodsList[i].isPurchaser = false
            }
        }
          var  datas = _this.data.goodsList,
            newArr = app.pageRequest.addDataList(datas, goodsList)
          _this.setData({
            goodsList: newArr,
            value: name
          })
        }else{
          wx.showToast({
            title: '暂无更多了！',
            icon: 'none',
            duration: 2000
          })
        }

      })
  },
  searchBtn: function (e) {
    app.pageRequest.pageData.pageNum = 0
    var name = e.detail.value
    this.getSerList(e.detail.value)
  },
  onLoad: function (options) {
    if (options.name){
      this.getSerList(options.name)
    }else{
      this.getSerList('')
    }
    
  },
  swichNav: function (e) {
    var that = this,
      priceShow = this.data.priceShow
    if (this.data.currentTab === e.target.dataset.current) {
      if (this.data.currentTab==2){
        if (priceShow){
          that.setData({
            goodsList: [],
            priceShow: false
          })
        }else{
          that.setData({
            goodsList: [],
            priceShow: true
          })
        }
        that.getSerList(that.data.value)
      }
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      },function(){
        that.setData({
          goodsList:[]
        })
        that.getSerList(that.data.value)
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

  bindDownLoad: function () {
    this.getSerList(this.data.value,true)
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