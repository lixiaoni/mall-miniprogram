import http from './utils/http.js'
import pageRequest from './utils/pageRequest.js'
import AuthHandler from './utils/authHandler.js'
App({
  onLaunch: function (options) {
    // 购物车
    // wx.setTabBarItem({
    //   index: 1,
    //   text: 'text',
    //   iconPath: '/image/clo.png',
    //   selectedIconPath: '/image/clo.png'
    // })
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that = this;
   
  },
  globalData: {
    userInfo: null,
    skin: "normal"
  },
  http: new http(),
  pageRequest: new pageRequest(),
  authHandler: new AuthHandler()
});


