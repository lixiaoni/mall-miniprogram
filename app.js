import http from './utils/http.js'
import pageRequest from './utils/pageRequest.js'
import AuthHandler from './utils/authHandler.js'
import { imageUrl} from './utils/const.js'
App({
  onLaunch: function (options) {
    var that = this;
  },
  globalData: {
    userInfo: null,
    skin: "normal",
    imageUrl:imageUrl,
    companyIcon: "/image/dp.png",
  },
  http: new http(),
  pageRequest: new pageRequest(),
  authHandler: new AuthHandler()
});


