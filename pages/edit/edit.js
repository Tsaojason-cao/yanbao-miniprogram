// edit.js - 三级漏斗交互模型
import { MEMBERSHIP_TIERS, getAvailableMasterFilters, getAvailableParameters } from '../../config/membership.js'

Page({
  data: {
    imagePath: '',
    currentMaster: null,
    advancedExpanded: false,
    userTier: MEMBERSHIP_TIERS.FREE,
    
    // 一级：大师滤镜
    masterFilters: [],
    
    // 二级：核心参数（5维）
    coreParams: [
      { id: 'skinTexture', name: '肤质', value: 50 },
      { id: 'faceShape', name: '脸型', value: 50 },
      { id: 'lighting', name: '光影', value: 50 },
      { id: 'colorTone', name: '色调', value: 50 },
      { id: 'atmosphere', name: '氛围', value: 50 }
    ],
    
    // 三级：高级参数（24维）
    advancedParams: []
  },

  onLoad(options) {
    if (options.imagePath) {
      this.setData({ imagePath: options.imagePath })
    }
    this.loadMembershipStatus()
    this.loadAvailableFeatures()
  },

  /**
   * 加载会员状态
   */
  loadMembershipStatus() {
    const membershipData = wx.getStorageSync('membership') || {
      tier: MEMBERSHIP_TIERS.FREE
    }
    this.setData({ userTier: membershipData.tier })
  },

  /**
   * 加载可用功能
   */
  loadAvailableFeatures() {
    const userTier = this.data.userTier
    
    // 获取可用的大师滤镜
    const availableFilters = getAvailableMasterFilters(userTier)
    this.setData({ masterFilters: availableFilters })
    
    // 获取可用的高级参数
    const allParams = getAvailableParameters(userTier)
    const advancedParams = allParams.filter(p => p.category === 'advanced').map(p => ({
      id: p.id,
      name: p.name,
      nameEn: p.nameEn,
      value: 50,
      locked: p.tier !== MEMBERSHIP_TIERS.FREE && userTier === MEMBERSHIP_TIERS.FREE,
      tier: p.tier
    }))
    
    this.setData({ advancedParams })
  },

  /**
   * 选择大师滤镜
   */
  selectMaster(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ currentMaster: id })
    
    // 应用大师滤镜预设
    this.applyMasterPreset(id)
  },

  /**
   * 应用大师滤镜预设
   */
  applyMasterPreset(masterId) {
    // 根据大师ID自动配置29维参数
    // 这里是模拟逻辑，实际应该从预设配置中读取
    wx.showToast({
      title: `应用${masterId}号大师风格`,
      icon: 'success'
    })
  },

  /**
   * 核心参数变化
   */
  onParamChange(e) {
    const id = e.currentTarget.dataset.id
    const value = e.detail.value
    
    const coreParams = this.data.coreParams.map(p => {
      if (p.id === id) {
        return { ...p, value }
      }
      return p
    })
    
    this.setData({ coreParams })
  },

  /**
   * 切换高级参数展开状态
   */
  toggleAdvanced() {
    this.setData({ advancedExpanded: !this.data.advancedExpanded })
  },

  /**
   * 显示升级对话框
   */
  showUpgradeDialog(e) {
    const tier = e.currentTarget.dataset.tier
    const tierName = tier === 'pro' ? '专业版' : '大师版'
    
    wx.showModal({
      title: `需要${tierName}`,
      content: `此功能需要升级到${tierName}才能使用`,
      confirmText: '立即升级',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/membership/membership'
          })
        }
      }
    })
  },

  /**
   * 取消编辑
   */
  cancel() {
    wx.navigateBack()
  },

  /**
   * 保存照片
   */
  save() {
    wx.showLoading({ title: '保存中...' })
    
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1000)
  }
})
