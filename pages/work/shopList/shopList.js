// pages/work/shopList/shopList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    tab:[
      {name:"全部",type:'all',check:true},
      { name: "待验证", type: 'wait', check: false },
      { name: "已验证", type: 'already', check: false },
      { name: "已冻结", type: 'freeze', check: false }
    ],
    isHideLoadMore:true
  },

  // 切换TAB
  switchTab(e){
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index;
    this.data.tab.forEach((el,i)=>{
      if(i == index){
        this.setData({
          ['tab['+i+'].check'] : true
        })
      }else{
        this.setData({
          ['tab[' + i + '].check']: false
        })
      }
    })
    this.getList(true);
  },

  // 监听
  watchInput(e){
    this.setData({
      val : e.detail.value
    })
  },
  //搜索
  search(){

  },
  getList(re){
    //类
    let obj = {};
    this.data.tab.forEach((el)=>{
      if (el.check){
        switch(el.type){
          case  "wait" : 
            obj.authStatus = 0;break;
          case "already" :
            obj.authStatus = 1;break;
          case "freeze" :
            obj.freeze = 1;break;         
        }
      }
    })
    

    this.setData({
      isHideLoadMore:false
    })
    let timer = setTimeout(()=>{
      this.setData({
        isHideLoadMore: true
      })  
    },10000)

    if (re) {
      app.pageRequest.pageData.pageNum = 0;
    }
    app.pageRequest.pageGet("/admin/mall/store/storelist", obj).then((res)=>{
      clearTimeout(timer);
      this.setData({
        isHideLoadMore: true
      })
      if (re) {
        this.setData({
          list: res.obj.result
        })
        return
      }
      if (res.success && res.obj.result.length>0){
        this.setData({
          list: this.data.list.concat(res.obj.result)
        })
      }
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
    this.getList();

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})