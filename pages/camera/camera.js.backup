// camera.js
Page({
  data: {
    devicePosition: 'back',
    flash: 'off',
    beautyLevel: 50,
    iso: 400,
    shutter: '1/125s',
    whiteBalance: 5600,
    showModes: false,
    currentMode: 'auto'
  },
  
  toggleFlash() {
    this.setData({
      flash: this.data.flash === 'off' ? 'on' : 'off'
    })
  },
  
  toggleCamera() {
    this.setData({
      devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back'
    })
  },
  
  onBeautyChange(e) {
    this.setData({
      beautyLevel: e.detail.value
    })
  },
  
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.showToast({
          title: '拍摄成功',
          icon: 'success'
        })
        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempImagePath,
          success: () => {
            wx.showToast({
              title: '已保存到相册',
              icon: 'success'
            })
          }
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '拍摄失败',
          icon: 'error'
        })
        console.error('拍摄失败', err)
      }
    })
  },
  
  goToGallery() {
    wx.switchTab({
      url: '/pages/gallery/gallery'
    })
  },
  
  showModeSelector() {
    this.setData({
      showModes: true
    })
  },
  
  hideModeSelector() {
    this.setData({
      showModes: false
    })
  },
  
  selectMode(e) {
    const mode = e.currentTarget.dataset.mode
    this.setData({
      currentMode: mode,
      showModes: false
    })
    
    // 根据模式调整参数
    switch(mode) {
      case 'auto':
        this.setData({ iso: 400, shutter: '1/125s', whiteBalance: 5600 })
        break
      case 'pro':
        this.setData({ iso: 800, shutter: '1/250s', whiteBalance: 6500 })
        break
      case 'portrait':
        this.setData({ iso: 200, shutter: '1/60s', whiteBalance: 5200 })
        break
      case 'landscape':
        this.setData({ iso: 100, shutter: '1/500s', whiteBalance: 6000 })
        break
    }
  },
  
  onCameraStop() {
    console.log('相机停止')
  },
  
  onCameraError(e) {
    console.error('相机错误', e.detail)
    wx.showToast({
      title: '相机启动失败',
      icon: 'error'
    })
  }
})
