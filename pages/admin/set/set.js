// pages/admin/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsListData: [{
      "goodsSpecificationValueVOList": [
        {
          "specValueCode": "18082113164999216652",
          "specValueName": "黄色"
        },
        {
          "specValueCode": "180821131649992ba35f",
          "specValueName": "蓝色"
        }
      ],
      "specCode": "1808211316499746b6e4",
      "specName": "颜色"
    },
    {
      "goodsSpecificationValueVOList": [
        {
          "specValueCode": "180821131649992b0154",
          "specValueName": "M"
        },
        {
          "specValueCode": "18082113164999254ab5",
          "specValueName": "L"
        }
      ],
      "specCode": "180821131649992996b2",
      "specName": "尺寸"
    }],
    goodsSkuVOList:[],
    skuListAll:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this,
        goodsListData = this.data.goodsListData,
        skuList0=[],
        skuList1=[],
        skuListAll=[]
    skuList0 = goodsListData[0].goodsSpecificationValueVOList
    skuList1 = goodsListData[1].goodsSpecificationValueVOList
    for (var i = 0; i < skuList0.length;i++){
      for (var j = 0; j < skuList1.length; j++) {
        console.log(skuList0[i].specValueName)
        skuListAll.push({ specValueName: skuList0[i].specValueName, specValueCode: skuList1[j].specValueName, specValueCodeList: [skuList0[i].specValueCode, skuList1[j].specValueCode], marketPrice: '', sellPrice: '', stockNumber: '', wholesalePrice:''})
      }
    }
    console.log(skuListAll)
    _this.setData({
      skuListAll: skuListAll
    })
  },
  goback:function(){
    wx.navigateTo({
      url: '../addGoods/addGoods'
    })
  },
  setFun:function(e){
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      code:3453453 
    })
    wx.navigateBack({
      data: 1
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