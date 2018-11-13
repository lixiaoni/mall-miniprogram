// pages/work/shopList/shopList.js
const app = getApp();
import Api from '../../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tab: [
      { name: "全部", type: 'all', check: true },
      { name: "待验证", type: 'wait', check: false },
      { name: "已验证", type: 'already', check: false },
      { name: "已冻结", type: 'freeze', check: false }
    ],
    isHideLoadMore: true,
    val: "", //搜索内容
    inputVal: "",
    baseUrl: app.globalData.imageUrl
  },

  // 切换TAB
  switchTab(e) {
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index;
    this.data.tab.forEach((el, i) => {
      if (i == index) {
        this.setData({
          ['tab[' + i + '].check']: true
        })
      } else {
        this.setData({
          ['tab[' + i + '].check']: false
        })
      }
    })
    this.getList(true);
  },

  // 监听
  watchInput(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  //搜索
  search() {
    this.setData({
      val: this.data.inputVal
    })
    this.getList(true)
  },
  getList(re) {
    //类
    let obj = {};
    // this.data.tab.forEach((el) => {
    //   if (el.check) {
    //     switch (el.type) {
    //       case "wait":
    //         obj.authStatus = 0; break;
    //       case "already":
    //         obj.authStatus = 1; break;
    //       case "freeze":
    //         obj.freeze = 1; break;
    //     }
    //   }
    // })

    // obj.keyword = this.data.val

    this.setData({
      isHideLoadMore: false
    })
    let timer = setTimeout(() => {
      this.setData({
        isHideLoadMore: true
      })
    }, 10000)

    let next = true;
    if (re) {
      app.pageRequest.pageData.pageNum = 0;
      next = false;
    }
    let fun ;
    let listType = this.data.type
    if (listType == "floor"){
      fun = Api.floorStoreList;
      obj.floorCode = this.data.floor;
    } else if (listType == 'admin'){
      fun = Api.floorAdminStoreList;
      obj.userId = this.data.user;
    }
    fun(obj, next).then((res) => {
      clearTimeout(timer);
      this.setData({
        isHideLoadMore: true
      })
      let listData = [];
      if (listType == 'admin') {
        listData = res.obj.data.result;
      }else{
        listData = res.obj.result;
      }

      if (re) {
        // let count = res.obj.count;
        // let arr = this.data.tab;
        // arr.forEach((el) => {
        //   // { name: "全部", type: 'all', check: true },
        //   // { name: "待验证", type: 'wait', check: false },
        //   // { name: "已验证", type: 'already', check: false },
        //   // { name: "已冻结", type: 'freeze', check: false }
        //   switch (el.type) {
        //     case "all": el.num = count.total; break;
        //     case "wait": el.num = count.verifyNum; break;
        //     case "already": el.num = count.passNum; break;
        //     case "freeze": el.num = count.freezeNum; break;
        //   }
        // })

        
        this.setData({
          list: listData,
          // tab: arr
        })
        return
      }
      if (res.success && listData.length > 0) {
        this.setData({
          list: this.data.list.concat(listData)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (options.floorCode){
      this.setData({
        floor: options.floorCode,
        type:'floor'
      })
    }
    if(options.user) {
      this.setData({
        user: options.user,
        type: 'admin'
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
    this.getList(true);
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
    this.getList();
  },


})