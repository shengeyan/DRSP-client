Page({
  data: {
    text: "This is page data.",
    changeTake:false,
    changePhoto:false,
    TakeAreaSrc:"/image/pai1.png",
    PhotoAreaSrc:"/image/xiangCe1.png",
    TakeAreaSrcS:[
      "/image/pai1.png",
      "/image/pai2.png"
    ],
    PhotoAreaSrcS:[
      "/image/xiangCe1.png",
      "/image/xiangCe2.png"
    ]
  },
  onCamera(){
    
  },
  //拍照状态切换函数
  onTake(){
    let change=!this.data.changeTake
    if(change){
      this.setData({
        changeTake:change,
        TakeAreaSrc:this.data.TakeAreaSrcS[1]
      })
      this.onTakePhoto()
    }else{
      this.setData({
        changeTake:change,
        TakeAreaSrc:this.data.TakeAreaSrcS[0]
      })
    }
  },
  //相册状态切换函数
  onPhoto(){
    let change=!this.data.changePhoto
    if(change){
      this.setData({
        changePhoto:change,
        PhotoAreaSrc:this.data.PhotoAreaSrcS[1]
      })
    }else{
      this.setData({
        changePhoto:change,
        PhotoAreaSrc:this.data.PhotoAreaSrcS[0]
      })
    }
  },
  //拍照函数
  onTakePhoto(){
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles.tempFilePath)
        console.log(res.tempFiles.size)
      }
    })
  }

  
})