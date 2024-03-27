/**
 *  New versions
 */
const app = getApp()
var inputVal = '' // 输入框的内容
// var msgList = [] // 消息列表
// 消息列表测试
var msgList = []
var windowWidth = wx.getSystemInfoSync().windowWidth // 窗口宽度
var windowHeight = wx.getSystemInfoSync().windowHeight // 窗口高度
var keyHeight = 0 // 键盘高度

let socketOpen = false // WebSocket 是否已打开
let socketMsgQueue = [] // 待发送的 WebSocket 消息队列
let lineCount = Math.floor(windowWidth / 16) - 6
let curAnsCount = 0

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = ''
  // msgList = []
  // 测试数据
  msgList = [
    {
      speaker: 'server',
      contentType: 'text',
      content: '你好，我是人工智能助手，请问有什么可以帮你？已提取的问题：'
    }
  ]
  that.onLoad_OCR_data('OCRText')

  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 发送 WebSocket 消息
 */
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
    scrollHeight: '100vh', // 滚动视图的高度
    inputBottom: 0, // 输入区域的底部位置
    reply: '', // 从服务器获取的回复
    question: '' //发送给服务器的问题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this)
    this.setData({
      cusHeadIcon: '/images/春日野穹.png' // 用户头像
    })
  },

  /**
   * 提取OCR文字函数
   */
  onLoad_OCR_data(name) {
    const data = wx.getStorageSync(name)
    console.log(data)
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: data
    })
    this.data.question = data
    this.send_question_server()
    this.setData({
      msgList
    })
  },

  /**
   * 发送问题给服务器 函数
   */
  send_question_server() {
    console.log('发送信息')
    // 请求服务器获取回复
    if (wx.getStorageSync('expireTime') == null || wx.getStorageSync('expireTime') < Date.now()) {
      wx.removeStorageSync('expireTime')
      let username = wx.getStorageSync('username')
      wx.removeStorageSync('username')
      wx.request({
        // url: 'http://cfc.bilibili.info:20131/project/chat',
        url: 'http://172.18.3.26:8080/project/chat',
        method: 'post',
        data: {
          // 发送的用户提问
          question: this.data.question
        },
        success: response => {
          this.onSetData(response)
        },
        fail: error => {
          console.error(error.data.error)
        }
      })
    }
  },

  // 设置 服务端返回 函数
  onSetData: function (response) {
    this.setData({
      reply: response.data.data
    })
    let newMsgList = [
      ...this.data.msgList,
      {
        speaker: 'server',
        contentType: 'text',
        content: this.data.reply
      }
    ]
    this.setData({
      msgList: newMsgList,
      toView: 'msg-' + (newMsgList.length - 1) // 滚动到最新消息
    })
  },

  /**
   * 获取聚焦 界面函数
   */
  focus: function (e) {
    let res = wx.getSystemInfoSync()
    let navBarHeight = res.statusBarHeight + 44 // 顶部状态栏+顶部导航，大部分机型默认44px
    keyHeight = e.detail.height - navBarHeight
    if (keyHeight < 0) {
      keyHeight = 0
    }
    this.setData({
      scrollHeight: windowHeight - keyHeight + 'px'
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
  },

  // 失去聚焦(软键盘消失) 界面函数
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
  sendClick: function () {
    var inputVal = this.data.inputVal
    if (inputVal == null || inputVal == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading',
        duration: 1000 // 提示的延迟时间
      })
      return
    }

    let newMsgList = [
      ...this.data.msgList,
      {
        speaker: 'customer',
        contentType: 'text',
        content: inputVal
      }
    ]

    this.setData({
      msgList: newMsgList,
      inputVal: '' // 清空输入框
      // question: inputVal // 更新要发送的问题
    })

    this.send_question_server() // 发送提问
  },

  // 设置输入内容
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
      question: e.detail.value
    })
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  },

  /**
   * 刷新函数
   */
  onPullDownRefresh: function () {
    // 显示加载提示
    wx.showLoading({
      title: '刷新中...'
    })
    // 执行刷新操作
    this.refreshData()
  },

  refreshData: function () {
    // 刷新页面数据的逻辑
    initData(this)
    wx.stopPullDownRefresh()
    wx.hideLoading()
  }
})
