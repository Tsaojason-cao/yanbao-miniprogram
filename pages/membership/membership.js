// membership.js
import { MEMBERSHIP_TIERS, MEMBERSHIP_INFO } from '../../config/membership.js'

Page({
  data: {
    currentTier: MEMBERSHIP_TIERS.FREE,
    expireDate: null,
    currentMembershipInfo: MEMBERSHIP_INFO[MEMBERSHIP_TIERS.FREE],
    
    // 各等级功能列表
    freeTierFeatures: MEMBERSHIP_INFO[MEMBERSHIP_TIERS.FREE].features,
    proTierFeatures: MEMBERSHIP_INFO[MEMBERSHIP_TIERS.PRO].features,
    masterTierFeatures: MEMBERSHIP_INFO[MEMBERSHIP_TIERS.MASTER].features,
    
    // 功能对比数据
    comparisonData: [
      { feature: '大师滤镜', free: '3位', pro: '15位', master: '31位' },
      { feature: '调节参数', free: '5维', pro: '15维', master: '29维' },
      { feature: 'LUT预设', free: '3种', pro: '12种', master: '12种' },
      { feature: '导出画质', free: '标准', pro: '高清', master: '无损' },
      { feature: '机位推荐', free: '10个', pro: '25个', master: '40个' },
      { feature: 'AI推荐', free: '✗', pro: '✓', master: '✓' },
      { feature: '批量处理', free: '✗', pro: '✓', master: '✓' },
      { feature: '云端同步', free: '✗', pro: '✗', master: '✓' },
      { feature: '专属预设', free: '✗', pro: '✗', master: '✓' },
      { feature: '优先支持', free: '✗', pro: '✗', master: '✓' }
    ],
    
    // FAQ数据
    faqList: [
      {
        question: '如何升级会员？',
        answer: '点击对应会员卡片的"立即升级"按钮，选择支付方式完成购买即可。',
        expanded: false
      },
      {
        question: '会员可以退款吗？',
        answer: '根据《用户协议》，会员服务一经开通不支持退款，但支持转让给其他账号。',
        expanded: false
      },
      {
        question: '会员到期后会怎样？',
        answer: '会员到期后，您的账号将自动降级为免费版，但之前创建的作品和预设仍会保留。',
        expanded: false
      },
      {
        question: '可以同时在多个设备使用吗？',
        answer: '一个账号可以在最多3台设备上登录使用，但不支持同时在线。',
        expanded: false
      },
      {
        question: '大师版和专业版有什么区别？',
        answer: '大师版解锁全部31位大师滤镜和29维参数，还包含云端同步、专属预设和优先技术支持。',
        expanded: false
      }
    ]
  },

  onLoad() {
    this.loadMembershipStatus()
  },

  /**
   * 加载会员状态
   */
  loadMembershipStatus() {
    // 从本地存储读取会员信息
    const membershipData = wx.getStorageSync('membership') || {
      tier: MEMBERSHIP_TIERS.FREE,
      expireDate: null
    }
    
    this.setData({
      currentTier: membershipData.tier,
      expireDate: membershipData.expireDate,
      currentMembershipInfo: MEMBERSHIP_INFO[membershipData.tier]
    })
  },

  /**
   * 选择会员等级
   */
  selectTier(e) {
    const tier = e.currentTarget.dataset.tier
    console.log('选择会员等级:', tier)
  },

  /**
   * 升级到专业版
   */
  upgradeToPro() {
    wx.showModal({
      title: '升级到专业版',
      content: '确认支付 ¥98/月 升级到专业版？',
      confirmText: '确认支付',
      success: (res) => {
        if (res.confirm) {
          this.processPurchase(MEMBERSHIP_TIERS.PRO)
        }
      }
    })
  },

  /**
   * 升级到大师版
   */
  upgradeToMaster() {
    wx.showModal({
      title: '升级到大师版',
      content: '确认支付 ¥298/月 升级到大师版？',
      confirmText: '确认支付',
      success: (res) => {
        if (res.confirm) {
          this.processPurchase(MEMBERSHIP_TIERS.MASTER)
        }
      }
    })
  },

  /**
   * 处理购买流程
   */
  processPurchase(tier) {
    wx.showLoading({ title: '处理中...' })
    
    // 模拟支付流程（实际应该调用支付API）
    setTimeout(() => {
      wx.hideLoading()
      
      // 计算到期日期（30天后）
      const expireDate = new Date()
      expireDate.setDate(expireDate.getDate() + 30)
      const expireDateStr = `${expireDate.getFullYear()}-${String(expireDate.getMonth() + 1).padStart(2, '0')}-${String(expireDate.getDate()).padStart(2, '0')}`
      
      // 保存会员信息
      const membershipData = {
        tier: tier,
        expireDate: expireDateStr,
        purchaseDate: new Date().toISOString()
      }
      wx.setStorageSync('membership', membershipData)
      
      // 更新页面数据
      this.setData({
        currentTier: tier,
        expireDate: expireDateStr,
        currentMembershipInfo: MEMBERSHIP_INFO[tier]
      })
      
      // 显示成功提示
      wx.showToast({
        title: '升级成功！',
        icon: 'success',
        duration: 2000
      })
      
      // 通知其他页面刷新会员状态
      const pages = getCurrentPages()
      if (pages.length > 1) {
        const prevPage = pages[pages.length - 2]
        if (prevPage.onMembershipChanged) {
          prevPage.onMembershipChanged(tier)
        }
      }
    }, 1500)
  },

  /**
   * 切换FAQ展开状态
   */
  toggleFaq(e) {
    const index = e.currentTarget.dataset.index
    const faqList = this.data.faqList
    faqList[index].expanded = !faqList[index].expanded
    this.setData({ faqList })
  }
})
