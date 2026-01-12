// index.js
const app = getApp()

Page({
  data: {
    spots: []
  },
  onLoad() {
    this.setData({
      spots: app.globalData.spots.slice(0, 3) // 只显示前3个机位
    })
  },
  goToCamera() {
    wx.navigateTo({
      url: '/pages/camera/camera'
    })
  },
  goToEdit() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },
  goToGallery() {
    wx.switchTab({
      url: '/pages/gallery/gallery'
    })
  },
  goToSpots() {
    wx.switchTab({
      url: '/pages/spots/spots'
    })
  },
  viewSpot(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/spots/spots?id=${id}`
    })
  }
})
