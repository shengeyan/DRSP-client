const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

let socketOpen = false;
let socketMsgQueue = [];
let lineCount = Math.floor(windowWidth / 16) - 6;
let curAnsCount = 0;
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '你好，我是人工智能助手，请问有什么可以帮你？'
  }, ]
  that.setData({
    msgList,
    inputVal
  })
}

function sendSocketMessage(msg) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data: msg
    })
  } else {
    socketMsgQueue.push(msg)
  }
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    reply:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
    this.setData({
      cusHeadIcon: "/images/春日野穹.png",
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('expireTime') == null || wx.getStorageSync('expireTime') < Date.now()) {
      wx.removeStorageSync('expireTime')
      let username = wx.getStorageSync('username')
      wx.removeStorageSync('username')
      wx.request({
        url: 'http://cfc.bilibili.info:20131/project/chat',
        method: "post",
        data: {
          "question":"小麦粉",
        },
        success: (
          response
        )=>{
          this.onSetData(response)
        },
        fail: (error) => {
          console.error(error.data.error); 
        }
      })
    }
  },

  //设置this.data函数
  onSetData:function(response){
    this.setData({
      reply: response.data.reply
    })
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
   * 获取聚焦
   */
  focus: function (e) {
    let res = wx.getSystemInfoSync()
    let navBarHeight = res.statusBarHeight + 44 //顶部状态栏+顶部导航，大部分机型默认44px
    keyHeight = e.detail.height - navBarHeight;
    if (keyHeight < 0) {
      keyHeight = 0
    }
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: (keyHeight) + 'px'
    })
  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    sendSocketMessage(e.detail.value)
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    msgList.push({
      speaker: 'server',
      contentType: 'text',
      content: ''
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }

})