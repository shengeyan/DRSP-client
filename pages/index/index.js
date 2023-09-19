// index.js
// 获取应用实例
const app = getApp()

Page({
  //数据
  data: {
    menu_change:true,//切换标记
    show_menu: false,
    currIndex: "",
    logoSrc:"/image/pohto1.png",
    logoSrcS:[
      "/image/pohto1.png",
      "/image/pohto2.png"
    ]
  },
  //切换LOGO函数
  ChangeLogo() {
    let menu_change = !this.data.menu_change; // 反转menu_change的值
    if(menu_change){
      this.setData({
        logoSrc: this.data.logoSrcS[1],
        menu_change:menu_change
      });
    }else{
      this.setData({
        logoSrc: this.data.logoSrcS[0],
        menu_change:menu_change
      });
    }
    this.ChangeCamera()
    console.log(this.data.logoSrc);
  },
  //跳转Camera函数
  ChangeCamera(){
    wx.navigateTo({
      url:"/pages/camera/camera"
    })
  }
  
  
});