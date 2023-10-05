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
    ],
    ImageSrc:"https://img.yzcdn.cn/vant/cat.jpeg",
  },
  onCamera(){
    
  },
  //拍照状态切换函数
  onTake(){
    let change=!this.data.changeTake
    if(change){
      this.setData({
        TakeAreaSrc:this.data.TakeAreaSrcS[1]
      })
      this.onTakePhoto()
      setTimeout(()=>{
        this.setData({
          TakeAreaSrc:this.data.TakeAreaSrcS[0]
        })
      },1000)
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
    //获取照片
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        console.log(res)
        this.onChangeCameraArea(res.tempFiles[0].tempFilePath);

      }
    })
    
  },
  //修改Camera图片函数
  onChangeCameraArea(src){
    this.setData({
      ImageSrc:src
    })
  },
  //裁剪图片
  onCutImage(){
    wx.cropImage({
      src: '', // 图片路径
      cropScale: '16:9', // 裁剪比例
    })
  }
  
})