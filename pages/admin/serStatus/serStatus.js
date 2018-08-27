const app = getApp();
Page({
  data: {
    history: ["戒指", "项链", "钻戒"],
    hidden: false,
    storeId:'123',
    pageNum:30,
    pageSize:1,
    result: [],
    value: '',
    showResult: false,
    closeCont: false,
  },

  searchInput(e) {
    if (e.detail.value == '') {
      this.setData({
        value: e.detail.value,
        hidden: false,
      })
    } else {
      this.setData({
        value: e.detail.value,
        hidden: true,
      })
    }

  },
  //搜索确定键
  searchBtn(e) {
    var keyword = this.data.value,
        storeId=this.data.storeId,
        pageNum=this.data.pageNum,
        pageSize=this.data.pageSize,
        _this=this
    app.http.getRequest('/admin/shop/store/'+storeId+'/goods?keyword='+keyword+'&pageNum='+pageNum+'&pageSize='+pageSize)
      .then(res => {
        var obj = res.obj.result
        if (obj.length > 0) {
          _this.setData({
            showResult: true,
            result: obj
          })
        } else {
          _this.setData({
            result: obj
          })
        }
      })
  },
  // 清空input的内容
  emptyInput(e) {
    this.setData({
      value: '',
      showResult: false,
      hidden: false,
      closeCont: false
    })
  },
  keywordHandle(e) {
    console.log(e.target.dataset)
    const text = e.target.dataset.name;
    this.setData({
      value: text,
      showResult: true
    })
    this.historyHandle(text);
  },
  historyHandle(value) {
    let history = this.data.history;
    const idx = history.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (history.length > 7) {
        history.pop();
      }
    } else {
      history.splice(idx, 1);
    }
    history.unshift(value);
    wx.setStorageSync('history', JSON.stringify(history));
    this.setData({
      history
    });
  },
  removeAll() {
    this.setData({
      history: []
    });
  },
  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
      this.setData({
        history: JSON.parse(history)
      })
      console.log(this.data.history);
    }
  }
})