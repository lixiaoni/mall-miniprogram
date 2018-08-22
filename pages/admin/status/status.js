// pages/status/status.js
var recordStartX = 0;
var currentOffsetX = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    alertTab:0,
    hidden:true,
    detailList: [
      { id: 1, title: '周大福 绝色系列 热情似火 18K金镶红宝石钻...', price: '1200', small: '约1.66mm*0.23cm', image: '/image/s5.png', num: 4, selected: true },
      { id: 2, title: '周大福新款珠宝', price: '1200', small: '14号', image: '/image/s6.png', num: 1, selected: true }
    ],
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
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(e.target.dataset.current==3){
        that.setData({
          hidden:false,
          currentTab: e.target.dataset.current,
        })
      }else{
        that.setData({
          currentTab: e.target.dataset.current,
          hidden: true,
        })
      }
      
    }
  },
  /**
 * 删除
 */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let detailList = this.data.detailList;
    detailList.splice(index, 1);
    this.setData({
      detailList: detailList
    });
    if (!detailList.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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