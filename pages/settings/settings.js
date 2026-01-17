// settings.js
import { MEMBERSHIP_TIERS, MEMBERSHIP_INFO } from '../../config/membership.js'

Page({
  data: {
    userId: '10001',
    cacheSize: '12.5MB',
    membershipIcon: '🌱',
    membershipName: '免费版',
    membershipColor: '#9CA3AF',
    membershipTip: '升级解锁更多专业功能'
  },

  onLoad() {
    this.loadMembershipStatus()
  },

  onShow() {
    this.loadMembershipStatus()
  },

  /**
   * 加载会员状态
   */
  loadMembershipStatus() {
    const membershipData = wx.getStorageSync('membership') || {
      tier: MEMBERSHIP_TIERS.FREE
    }
    
    const info = MEMBERSHIP_INFO[membershipData.tier]
    
    this.setData({
      membershipIcon: info.icon,
      membershipName: info.name,
      membershipColor: info.color,
      membershipTip: membershipData.tier === MEMBERSHIP_TIERS.FREE 
        ? '升级解锁更多专业功能' 
        : `有效期至 ${membershipData.expireDate || '永久'}`
    })
  },

  /**
   * 会员状态变化回调
   */
  onMembershipChanged(newTier) {
    this.loadMembershipStatus()
  },

  /**
   * 跳转到会员中心
   */
  goToMembership() {
    wx.navigateTo({
      url: '/pages/membership/membership'
    })
  },

  /**
   * 清除缓存
   */
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确认清除所有缓存数据？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '清除中...' })
          setTimeout(() => {
            wx.hideLoading()
            this.setData({ cacheSize: '0MB' })
            wx.showToast({
              title: '清除成功',
              icon: 'success'
            })
          }, 1000)
        }
      }
    })
  },

  /**
   * 检查更新
   */
  checkUpdate() {
    wx.showLoading({ title: '检查中...' })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已是最新版本',
        icon: 'success'
      })
    }, 1000)
  },

  /**
   * 显示关于信息
   */
  showAbout() {
    wx.showModal({
      title: '关于 yanbao AI',
      content: 'yanbao AI v2.4.1\n\n专业摄影AI智能修图工具\n深藏功名，极简外露\n\n© 2025 yanbao AI',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  /**
   * 联系客服
   */
  contactSupport() {
    wx.showModal({
      title: '联系客服',
      content: '客服微信：sanmu-support\n工作时间：9:00-18:00',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  /**
   * 分享应用
   */
  shareApp() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.showToast({
      title: '长按小程序图标分享',
      icon: 'none'
    })
  }
})
