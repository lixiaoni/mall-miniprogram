// import http from '../../../utils/util';
const app = getApp();
var getTempList = function (that) {
  app.http.getRequest('/admin/shop/specificationTemplate/findList')
    .then(res => {
      const obj = res.obj
      console.log(obj)
      const templateCont = (that.data.templateCont).concat(obj)
      that.setData({
        templateCont: templateCont
      })
    })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    attribute: [{ title: "如图" }, { title: "白色" }, { title: "红色" }, { title: "卡其色" }, { title: "香槟色" }],
    navindex:-1,
    currentTab: 0,
    templateCont: [{ templateName: "不用模板", specificationTemplateContentVOList: [{ specName: "颜色", specValueList: ["如图", "米白色"] }] }],
    addSpec: false,
    addSpecAttc: false,
    watchInput: false,
    updateSpec: false,
    editSpec: false,
    editId: '',
    templateId: '',
    templateContentId: '',
    notemp: { templateName: "衣服" },
    specName: '',
    value: '',
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
      }]

  },
  // 返回上一页
  goback: function () {
    var index = this.data.currentTab
    console.log(this.data.templateId)
    console.log(this.data.templateCont[index].specificationTemplateContentVOList)
    var pages = getCurrentPages();             //  获取页面栈
    var currPage = pages[pages.length - 1];
    var prevPage = pages[pages.length - 2];    // 上一个页面
    prevPage.setData({
      mydata:this.data.goodsListData
    })
    wx.navigateBack({
      data: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    var templateId = e.target.dataset.id
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        templateId: templateId,
        navindex:-1
      })
    }
  },
  // 添加规格
  addAttrc: function () {
    var index = this.data.currentTab
    var templateId = this.data.templateId
    var newArr = { specName: "规格", specValueList: [] }
    var templateCont = this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    if (tempArr.lenght < 3) {

    }
    templateCont[index].specificationTemplateContentVOList = tempArr
    tempArr.push(newArr)
    this.setData({
      templateCont: templateCont
    })
    var tempArr = { specName: "规格", templateId: templateId, specValueList:[]}
    app.http.postRequest('/admin/shop/specificationTemplate/saveSpecTemplateContent', JSON.stringify(tempArr))
      .then(res => {
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
  // 取消
  cancel: function () {
    this.setData({
      addSpec: false,
      addSpecAttc: false,
      updateSpec: false,
      editSpec: false
    })
  },
  // 添加规格值
  addSpec: function (e) {
    this.setData({
      addSpec: true,
      value: '',
      templateContentId: e.target.dataset.id,
      specName: e.target.dataset.name
    })
  },
  confirm: function (e) {
    var _this = this
    var specName = _this.data.value,
        newSpecValueList=[],
        specArr=[],
        str = "";
    if (specName == '') {
      return
    }
    var templateContentId = _this.data.templateContentId
    var index = _this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    var parentName = _this.data.specName
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].specName == parentName) {
        if (tempArr[i].specValueList==null){
          str = specName
          specArr.push(specName)
          tempArr[i].specValueList= specArr
        }else{
          for (var j = 0; j < tempArr[i].specValueList.length;j++){
            console.log(tempArr[i].specValueList[j])
            str += tempArr[i].specValueList[j] + ",";
          }
          str += specName
          tempArr[i].specValueList.push(specName)
        }
        newSpecValueList = tempArr[i].specValueList
        console.log(str)
        
      } 
    }
    templateCont[index].specificationTemplateContentVOList = tempArr
    _this.setData({
      templateCont: templateCont
    })
    app.http.postRequest('/admin/shop/specificationTemplate/updateTemplateContentSpecValue?templateContentId='+templateContentId+'&specValueList='+str)
      .then(res => {
        const code = res.code
        if (code == 1) {
          wx.showToast({
            title: '新建成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          _this.cancel()
        }
      })
  },
  saveTemplate: function (e) {
    var _this = this
    _this.setData({
      addSpecAttc: true
    })
  },
  // 删除规格值
  removeTemp:function(e){
    
  },
  // 确定 保存模板
  confirm1: function () {
    var _this = this
    var templateId = _this.data.templateId
    var index = _this.data.currentTab
    var tempArr = {}
    var listData = _this.data.templateCont[index]
    console.log(listData["specificationTemplateContentVOList"])
    tempArr["specificationTemplateContentVOList"] = listData["specificationTemplateContentVOList"]
    tempArr["userId"] = "00000000"
    if (_this.data.value != '') {
      tempArr["templateName"] = _this.data.value
    }
    app.http.postRequest('/admin/shop/specificationTemplate/addTemplateAndContent', JSON.stringify(tempArr))
      .then(res => {
        const code = res.code
        if (code == 1) {
          wx.showToast({
            title: '添加成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          _this.cancel()
        }
      })
  },
  // 属性切换
  swichNav(e) {
    var current= e.target.dataset.current,
        pName= e.target.dataset.name,
        code= e.target.dataset.code,
        list={},
        listChi=[],
        goodsList=[]
     code+=code+""+code
    listChi.push({ specValueCode: code, specValueName: e.target.dataset.namechi})
    list.specName = pName
    list.goodsSpecificationValueVOList = listChi
    list.specCode = this.data.templateId+code
    if (current == this.data.navindex) {
      return false;
    } else {
      this.setData({
        navindex: current
      })
    }
  },

  // 删除模板
  unsetSpec: function () {
    var _this = this
    var templateId = this.data.templateId
    var currentTab = this.data.currentTab
    var templateCont = _this.data.templateCont
    templateCont.splice(currentTab, 1)
    wx.showModal({
      title: '提示',
      content: '是否要删除？',
      success: function (res) {
        if (res.confirm) {
          _this.setData({
            templateCont: templateCont
          })
          app.http.deleteRequest('/admin/shop/specificationTemplate/deleteTemplateById?templateId=' + templateId)
            .then(res => {
              const code = res.code
              if (code == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
              }
            })
        }
      }
    })
  },
  // 删除模板内容
  deleteTemplateContentId: function (e) {
    var _this = this
    var templateContentId = e.target.dataset.id

    var templateId = this.data.templateId
    var currentTab = this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempContList = templateCont[currentTab].specificationTemplateContentVOList
    var len = tempContList.length
    tempContList.pop()
    templateCont[currentTab].specificationTemplateContentVOList = tempContList
    wx.showModal({
      title: '提示',
      content: '是否要删除？',
      success: function (res) {
        if (res.confirm) {
          _this.setData({
            templateCont: templateCont
          })
          app.http.deleteRequest('/admin/shop/specificationTemplate/deleteTemplateContentByTemplateContentId?templateContentId=' + templateContentId)
            .then(res => {
              const code = res.code
              if (code == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
              }
            })
        }
      }
    })
  },
  // 更新模板名称
  updateTemplate: function () {
    this.setData({
      updateSpec: true
    })
  },
  confirm2: function () {
    var _this = this
    var templateId = this.data.templateId
    var currentTab = this.data.currentTab
    var templateCont = _this.data.templateCont
    var templateName = this.data.value
    var templateCont = _this.data.templateCont
    templateCont[currentTab].templateName = templateName
    _this.setData({
      templateCont: templateCont
    })
    if (templateName == '') { return }
    app.http.postRequest('/admin/shop/specificationTemplate/updateTemplateName?templateId=' + templateId + '&templateName=' + templateName)
      .then(res => {
        const code = res.code
        if (code == 1) {
          wx.showToast({
            title: '更新成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
          _this.cancel()
        }
      })
  },
  // 更新模板内容值
  updataTemp: function () {
    var templateId = this.data.templateId
    // http.request('admin/shop/specificationTemplate/updateTemplateName', 'POST', { templateId: templateId, templateName: templateName }, '正在加载数据', function (res) {
    // })
    http.request('admin/shop/specificationTemplate/updateTemplateName', 'POST', { templateId: templateId, templateName: templateName }, '正在加载数据', function (res) {
    })
  },
  // 更新规格名字
  editName: function (e) {
    var editId = e.target.dataset.id
    console.log(editId+"//")
    var name = e.target.dataset.name
    var _this = this
    _this.setData({
      editSpec: true,
      editId: editId,
      value: name,
      specName: name
    })
  },
  confirm3: function () {
    var _this = this
    var templateContentId = this.data.editId
    var specName = this.data.value
    if (specName == '') {
      return
    }
    var templateId = _this.data.templateId
    var index = _this.data.currentTab
    var templateCont = _this.data.templateCont
    var tempArr = templateCont[index].specificationTemplateContentVOList
    var parentName = _this.data.specName
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].specName == parentName) {
        tempArr[i].specName = specName
      }
    }
    templateCont[index].specificationTemplateContentVOList = tempArr
    console.log(tempArr)
    _this.setData({
      templateCont: templateCont,
      editSpec: false
    })
    app.http.postRequest('/admin/shop/specificationTemplate/updateSpecNameByTemplateContentId?templateContentId='+templateContentId+'&specName='+specName)
      .then(res => {
        const code = res.code
        if (code == 1) {
          wx.showToast({
            title: '更新成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
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
    var that = this;
    getTempList(that);
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