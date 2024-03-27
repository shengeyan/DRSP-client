Page({
  data: {
    text: 'This is page data.',
    changeTake: false,
    changePhoto: false,
    TakeAreaSrc: '/image/pai1.png',
    PhotoAreaSrc: '/image/xiangCe1.png',
    TakeAreaSrcS: ['/image/pai1.png', '/image/pai2.png'],
    PhotoAreaSrcS: ['/image/xiangCe1.png', '/image/xiangCe2.png'],
    ImageSrc: 'https://img.yzcdn.cn/vant/cat.jpeg',
    valueText: '', //文字内容
    buttonFlag: false //是否显示确定文字按钮
  },

  //输入框内容
  onChange(event) {
    this.setData({
      valueText: event.detail
    })
    setTimeout(() => {
      this.ChangeButtonFlag()
      console.log(this.data.valueText)
    }, 500)
  },
  //切换确定按钮状态
  ChangeButtonFlag() {
    if (this.data.valueText !== '') {
      this.setData({
        buttonFlag: true
      })
    } else {
      this.setData({
        buttonFlag: false
      })
    }
  },
  //发送补充内容
  onSend() {
    // console.log(this.data.valueText)
  },
  onCamera() {},
  //拍照状态切换函数
  onTake() {
    let change = !this.data.changeTake
    if (change) {
      this.setData({
        TakeAreaSrc: this.data.TakeAreaSrcS[1]
      })
      this.onTakePhoto()
      setTimeout(() => {
        this.setData({
          TakeAreaSrc: this.data.TakeAreaSrcS[0]
        })
      }, 1000)
    }
  },
  //相册状态切换函数
  onPhoto() {
    let change = !this.data.changePhoto
    if (change) {
      this.setData({
        changePhoto: change,
        PhotoAreaSrc: this.data.PhotoAreaSrcS[1]
      })
    } else {
      this.setData({
        changePhoto: change,
        PhotoAreaSrc: this.data.PhotoAreaSrcS[0]
      })
    }
  },

  // 获取函数
  onTakePhoto() {
    //获取照片
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: res => {
        this.onChangeCameraArea(res.tempFiles[0].tempFilePath)
        // 上传图片
        this.uploadImage(res.tempFiles[0].tempFilePath)
      }
    })
  },
  //上传图片函数
  uploadImage(filePath) {
    const that = this // 保存当前的this指向
    wx.uploadFile({
      // url: 'http://cfc.bilibili.info:20131/project/upload',
      url: 'http://172.18.3.26:8080/project/upload',

      filePath: filePath,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        const data = JSON.parse(res.data)
        const result = data.data.result
        // console.log('上传成功', result)
        that.set_ORC_data('OCRText', result)
        that.ChangeChat() //跳转聊天页面
      },
      fail(err) {
        console.error('上传失败', err)
      }
    })
  },

  //数据存储函数
  set_ORC_data(name, value) {
    wx.setStorageSync(name, value)
  },

  //跳转Chat函数
  ChangeChat() {
    wx.switchTab({
      url: '/pages/chat/chat'
    })
  },

  //修改Camera图片函数
  onChangeCameraArea(src) {
    console.log(src)
    this.setData({
      ImageSrc: src
    }),
      this.OCRRead()
  },
  //裁剪图片
  onCutImage() {
    wx.cropImage({
      src: '', // 图片路径
      cropScale: '16:9' // 裁剪比例
    })
  },
  //OCR调试
  OCRRead() {
    const session = wx.createVKSession({
      track: {
        OCR: { mode: 2 } // mode: 1 - 使用摄像头；2 - 手动传入图像
      }
    })

    // 静态图片检测模式下，每调一次 runOCR 接口就会触发一次 updateAnchors 事件
    session.on('updateAnchors', anchors => {
      console.log('anchors.text', ''.concat(anchors.map(anchor => anchor.text)))
    })

    // 需要调用一次 start 以启动
    session.start(errno => {
      if (errno) {
        // 如果失败，将返回 errno
      } else {
        // 否则，返回null，表示成功
        session.runOCR({
          frameBuffer, // 图片 ArrayBuffer 数据。待检测图像的像素点数据，每四项表示一个像素点的 RGBA
          width, // 图像宽度
          height // 图像高度
        })
      }
    })
  }
})
