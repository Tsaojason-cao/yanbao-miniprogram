// config/sanmuClub.js
// 森友会会员制度配置

/**
 * 会员等级定义
 */
const MEMBERSHIP_ROLES = {
  FREE: 'free',      // 普通用户
  PRO: 'pro',        // 森友 (Pro)
  MASTER: 'master'   // 大师 (Master)
};

/**
 * 会员权益配置
 */
const MEMBERSHIP_BENEFITS = {
  [MEMBERSHIP_ROLES.FREE]: {
    name: '普通用户',
    nameZh: '免费版',
    icon: '🌱',
    price: 0,
    priceUnit: '免费',
    masterCount: 8,           // 8 位基础大师
    paramCount: 12,           // 12 维基础美颜参数
    features: [
      '8 位基础大师风格',
      '12 维基础美颜参数',
      '基础滤镜调整',
      '照片保存与分享'
    ],
    masterList: ['肖全', 'Annie Leibovitz', '森山大道', '陈漫', '胶片', 'Helmut Newton', 'Richard Avedon', 'Irving Penn'],
    paramList: ['磨皮', '美白', '瘦脸', '大眼', '亮度', '对比度', '饱和度', '锐度', '色温', '色调', '曝光', '阴影']
  },
  
  [MEMBERSHIP_ROLES.PRO]: {
    name: '森友 (Pro)',
    nameZh: '专业版',
    icon: '🌲',
    price: 98,
    priceUnit: '¥98/月',
    masterCount: 31,          // 全部 31 位大师
    paramCount: 29,           // 29 维进阶参数
    features: [
      '全部 31 位摄影大师风格',
      '29 维进阶参数调整',
      '人中深度、柔光、去雾等高级参数',
      '批量处理功能',
      '云端同步',
      '无水印导出'
    ],
    masterList: ['全部 31 位大师'],
    paramList: ['全部 29 维参数']
  },
  
  [MEMBERSHIP_ROLES.MASTER]: {
    name: '大师 (Master)',
    nameZh: '大师版',
    icon: '👑',
    price: 298,
    priceUnit: '¥298/月',
    masterCount: 31,
    paramCount: 29,
    features: [
      '全部 31 位摄影大师风格',
      '29 维完整参数矩阵',
      '自定义参数矩阵',
      '生成专属「森友预设码」',
      '参数导入导出',
      '优先技术支持',
      'AI 智能推荐',
      '独家大师课程'
    ],
    masterList: ['全部 31 位大师 + 自定义'],
    paramList: ['全部 29 维参数 + 自定义矩阵'],
    customPreset: true        // 支持自定义预设
  }
};

/**
 * 会员定价配置
 */
const PRICING_CONFIG = {
  [MEMBERSHIP_ROLES.PRO]: {
    monthly: 98,
    quarterly: 268,    // 原价 294，优惠 26 元
    yearly: 888,       // 原价 1176，优惠 288 元
    discount: {
      quarterly: 0.91,
      yearly: 0.76
    }
  },
  [MEMBERSHIP_ROLES.MASTER]: {
    monthly: 298,
    quarterly: 798,    // 原价 894，优惠 96 元
    yearly: 2688,      // 原价 3576，优惠 888 元
    discount: {
      quarterly: 0.89,
      yearly: 0.75
    }
  }
};

/**
 * 检查用户权限
 * @param {string} userRole - 用户会员等级
 * @param {string} requiredRole - 所需会员等级
 * @returns {boolean}
 */
function hasPermission(userRole, requiredRole) {
  const roleHierarchy = {
    [MEMBERSHIP_ROLES.FREE]: 0,
    [MEMBERSHIP_ROLES.PRO]: 1,
    [MEMBERSHIP_ROLES.MASTER]: 2
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * 获取会员权益
 * @param {string} role - 会员等级
 * @returns {object}
 */
function getMembershipBenefits(role) {
  return MEMBERSHIP_BENEFITS[role] || MEMBERSHIP_BENEFITS[MEMBERSHIP_ROLES.FREE];
}

/**
 * 获取定价配置
 * @param {string} role - 会员等级
 * @returns {object}
 */
function getPricingConfig(role) {
  return PRICING_CONFIG[role] || null;
}

/**
 * 检查大师是否解锁
 * @param {string} userRole - 用户会员等级
 * @param {string} masterRequiredRole - 大师所需等级
 * @returns {boolean}
 */
function isMasterUnlocked(userRole, masterRequiredRole) {
  if (!masterRequiredRole) return true; // 无限制则解锁
  return hasPermission(userRole, masterRequiredRole);
}

/**
 * 检查参数是否解锁
 * @param {string} userRole - 用户会员等级
 * @param {string} paramRequiredRole - 参数所需等级
 * @returns {boolean}
 */
function isParamUnlocked(userRole, paramRequiredRole) {
  if (!paramRequiredRole) return true; // 无限制则解锁
  return hasPermission(userRole, paramRequiredRole);
}

module.exports = {
  MEMBERSHIP_ROLES,
  MEMBERSHIP_BENEFITS,
  PRICING_CONFIG,
  hasPermission,
  getMembershipBenefits,
  getPricingConfig,
  isMasterUnlocked,
  isParamUnlocked
};
