// membership.js - yanbao AI 会员体系配置

/**
 * 会员等级定义
 */
export const MEMBERSHIP_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  MASTER: 'master'
}

/**
 * 会员等级详细信息
 */
export const MEMBERSHIP_INFO = {
  [MEMBERSHIP_TIERS.FREE]: {
    name: '免费版',
    nameEn: 'Free',
    price: 0,
    color: '#9CA3AF',
    icon: '🌱',
    features: [
      '3位大师滤镜',
      '5维基础参数',
      '基础LUT预设',
      '标准画质导出',
      '10个机位推荐'
    ],
    limits: {
      masterFilters: 3,
      parameters: 5,
      lutPresets: 3,
      exportQuality: 'standard',
      spots: 10,
      advancedMode: false
    }
  },
  [MEMBERSHIP_TIERS.PRO]: {
    name: '专业版',
    nameEn: 'Professional',
    price: 98,
    priceUnit: '元/月',
    color: '#2D5F3F',
    icon: '🌲',
    features: [
      '15位大师滤镜',
      '15维进阶参数',
      '全部12种LUT',
      '高清画质导出',
      '25个机位推荐',
      'AI智能推荐',
      '批量处理'
    ],
    limits: {
      masterFilters: 15,
      parameters: 15,
      lutPresets: 12,
      exportQuality: 'hd',
      spots: 25,
      advancedMode: true,
      batchProcessing: true,
      aiRecommendation: true
    }
  },
  [MEMBERSHIP_TIERS.MASTER]: {
    name: '大师版',
    nameEn: 'Master',
    price: 298,
    priceUnit: '元/月',
    color: '#1F2937',
    icon: '👑',
    features: [
      '全部31位大师滤镜',
      '完整29维参数',
      '全部12种LUT',
      '无损画质导出',
      '全部40个机位',
      'AI智能推荐',
      '批量处理',
      '专属调色预设',
      '优先技术支持',
      '云端同步'
    ],
    limits: {
      masterFilters: 31,
      parameters: 29,
      lutPresets: 12,
      exportQuality: 'lossless',
      spots: 40,
      advancedMode: true,
      batchProcessing: true,
      aiRecommendation: true,
      customPresets: true,
      prioritySupport: true,
      cloudSync: true
    }
  }
}

/**
 * 29维参数完整定义
 */
export const PARAMETERS_29D = [
  // 一级：大师滤镜（快餐模式）
  { id: 'masterFilter', name: '大师滤镜', category: 'master', tier: 'free', order: 1 },
  
  // 二级：五大核心维度（精选调节）
  { id: 'skinTexture', name: '肤质', nameEn: 'Skin Texture', category: 'core', tier: 'free', order: 2 },
  { id: 'faceShape', name: '脸型', nameEn: 'Face Shape', category: 'core', tier: 'free', order: 3 },
  { id: 'lighting', name: '光影', nameEn: 'Lighting', category: 'core', tier: 'free', order: 4 },
  { id: 'colorTone', name: '色调', nameEn: 'Color Tone', category: 'core', tier: 'free', order: 5 },
  { id: 'atmosphere', name: '氛围', nameEn: 'Atmosphere', category: 'core', tier: 'free', order: 6 },
  
  // 三级：高级参数（极客模式）- 专业版
  { id: 'philtrumDepth', name: '人中雕琢', nameEn: 'Philtrum Sculpt', category: 'advanced', tier: 'pro', order: 7, description: '黄金比例微调' },
  { id: 'bloomIntensity', name: '光学弥散', nameEn: 'Optical Bloom', category: 'advanced', tier: 'pro', order: 8, description: '模拟顶级定焦镜头氛围' },
  { id: 'dehaze', name: '通透度', nameEn: 'Clarity+', category: 'advanced', tier: 'pro', order: 9, description: '消除光污染，还原纯净视野' },
  { id: 'eyeEnlarge', name: '眼部精雕', nameEn: 'Eye Refinement', category: 'advanced', tier: 'pro', order: 10 },
  { id: 'noseSlim', name: '鼻梁塑形', nameEn: 'Nose Sculpt', category: 'advanced', tier: 'pro', order: 11 },
  { id: 'jawlineDefine', name: '下颌线条', nameEn: 'Jawline Define', category: 'advanced', tier: 'pro', order: 12 },
  { id: 'templesFill', name: '太阳穴填充', nameEn: 'Temples Fill', category: 'advanced', tier: 'pro', order: 13 },
  { id: 'cheekboneHeight', name: '颧骨高度', nameEn: 'Cheekbone Height', category: 'advanced', tier: 'pro', order: 14 },
  { id: 'lipFullness', name: '唇部丰盈', nameEn: 'Lip Fullness', category: 'advanced', tier: 'pro', order: 15 },
  
  // 三级：高级参数 - 大师版专属
  { id: 'skinPoreDetail', name: '毛孔细节', nameEn: 'Pore Detail', category: 'advanced', tier: 'master', order: 16, description: '拒绝塑料感，还原真实皮质' },
  { id: 'microWrinkle', name: '微纹理保留', nameEn: 'Micro Texture', category: 'advanced', tier: 'master', order: 17 },
  { id: 'hairStrand', name: '发丝层次', nameEn: 'Hair Strand', category: 'advanced', tier: 'master', order: 18 },
  { id: 'eyeReflection', name: '眼神光', nameEn: 'Eye Reflection', category: 'advanced', tier: 'master', order: 19 },
  { id: 'shadowDepth', name: '阴影深度', nameEn: 'Shadow Depth', category: 'advanced', tier: 'master', order: 20 },
  { id: 'highlightRolloff', name: '高光衰减', nameEn: 'Highlight Rolloff', category: 'advanced', tier: 'master', order: 21 },
  { id: 'colorGrading', name: '分区调色', nameEn: 'Color Grading', category: 'advanced', tier: 'master', order: 22 },
  { id: 'filmGrain', name: '胶片颗粒', nameEn: 'Film Grain', category: 'advanced', tier: 'master', order: 23 },
  { id: 'vignette', name: '暗角控制', nameEn: 'Vignette', category: 'advanced', tier: 'master', order: 24 },
  { id: 'chromaticAberration', name: '色散模拟', nameEn: 'Chromatic Aberration', category: 'advanced', tier: 'master', order: 25 },
  { id: 'lensDistortion', name: '镜头畸变', nameEn: 'Lens Distortion', category: 'advanced', tier: 'master', order: 26 },
  { id: 'bokehQuality', name: '焦外质感', nameEn: 'Bokeh Quality', category: 'advanced', tier: 'master', order: 27 },
  { id: 'lightLeaks', name: '漏光效果', nameEn: 'Light Leaks', category: 'advanced', tier: 'master', order: 28 },
  { id: 'dualTone', name: '双色调映射', nameEn: 'Dual Tone', category: 'advanced', tier: 'master', order: 29 }
]

/**
 * 31位大师滤镜定义
 */
export const MASTER_FILTERS = [
  // 免费版（3位）
  { id: 1, name: '肖全', style: '纪实/黑白', tier: 'free' },
  { id: 2, name: '陈漫', style: '时尚/糖水', tier: 'free' },
  { id: 3, name: '森山大道', style: '街头/高反差', tier: 'free' },
  
  // 专业版（新增12位，共15位）
  { id: 4, name: '荒木经惟', style: '私摄影', tier: 'pro' },
  { id: 5, name: '川内伦子', style: '日系/柔和', tier: 'pro' },
  { id: 6, name: '蜷川实花', style: '梦幻/色彩', tier: 'pro' },
  { id: 7, name: 'Annie Leibovitz', style: '人像大师', tier: 'pro' },
  { id: 8, name: 'Steve McCurry', style: '人文纪实', tier: 'pro' },
  { id: 9, name: 'Sebastião Salgado', style: '黑白纪实', tier: 'pro' },
  { id: 10, name: 'Peter Lindbergh', style: '时尚黑白', tier: 'pro' },
  { id: 11, name: 'Mario Testino', style: '时尚色彩', tier: 'pro' },
  { id: 12, name: 'Richard Avedon', style: '极简人像', tier: 'pro' },
  { id: 13, name: 'Helmut Newton', style: '时尚先锋', tier: 'pro' },
  { id: 14, name: 'Irving Penn', style: '静物大师', tier: 'pro' },
  { id: 15, name: 'Cindy Sherman', style: '概念摄影', tier: 'pro' },
  
  // 大师版（新增16位，共31位）
  { id: 16, name: 'Henri Cartier-Bresson', style: '决定性瞬间', tier: 'master' },
  { id: 17, name: 'Robert Capa', style: '战地摄影', tier: 'master' },
  { id: 18, name: 'Ansel Adams', style: '风光大师', tier: 'master' },
  { id: 19, name: 'Diane Arbus', style: '边缘人像', tier: 'master' },
  { id: 20, name: 'Robert Frank', style: '美国人', tier: 'master' },
  { id: 21, name: 'William Eggleston', style: '彩色先驱', tier: 'master' },
  { id: 22, name: 'Joel Meyerowitz', style: '街头色彩', tier: 'master' },
  { id: 23, name: 'Saul Leiter', style: '抽象色彩', tier: 'master' },
  { id: 24, name: 'Fan Ho', style: '光影诗人', tier: 'master' },
  { id: 25, name: 'Vivian Maier', style: '街头人文', tier: 'master' },
  { id: 26, name: 'Rinko Kawauchi', style: '日常诗意', tier: 'master' },
  { id: 27, name: 'Nan Goldin', style: '私密纪实', tier: 'master' },
  { id: 28, name: 'Martin Parr', style: '讽刺纪实', tier: 'master' },
  { id: 29, name: 'Alex Webb', style: '复杂构图', tier: 'master' },
  { id: 30, name: 'Gregory Crewdson', style: '电影叙事', tier: 'master' },
  { id: 31, name: 'Jeff Wall', style: '灯箱摄影', tier: 'master' }
]

/**
 * 检查用户是否有权限访问某个功能
 * @param {string} userTier - 用户会员等级
 * @param {string} requiredTier - 所需会员等级
 * @returns {boolean}
 */
export function hasPermission(userTier, requiredTier) {
  const tierOrder = {
    [MEMBERSHIP_TIERS.FREE]: 0,
    [MEMBERSHIP_TIERS.PRO]: 1,
    [MEMBERSHIP_TIERS.MASTER]: 2
  }
  return tierOrder[userTier] >= tierOrder[requiredTier]
}

/**
 * 获取用户可用的大师滤镜
 * @param {string} userTier - 用户会员等级
 * @returns {Array}
 */
export function getAvailableMasterFilters(userTier) {
  return MASTER_FILTERS.filter(filter => hasPermission(userTier, filter.tier))
}

/**
 * 获取用户可用的参数
 * @param {string} userTier - 用户会员等级
 * @returns {Array}
 */
export function getAvailableParameters(userTier) {
  return PARAMETERS_29D.filter(param => hasPermission(userTier, param.tier))
}

/**
 * 检查功能是否需要升级
 * @param {string} userTier - 用户会员等级
 * @param {string} featureTier - 功能所需等级
 * @returns {Object} { needUpgrade: boolean, targetTier: string }
 */
export function checkUpgradeRequired(userTier, featureTier) {
  const needUpgrade = !hasPermission(userTier, featureTier)
  return {
    needUpgrade,
    targetTier: needUpgrade ? featureTier : null
  }
}
