// config/masterPresets.js
// 大师引擎配置文件（出厂设定）

const { MEMBERSHIP_ROLES } = require('./sanmuClub.js');

/**
 * 31 位摄影大师预设参数
 * 每位大师的参数作为「出厂设定」存在
 * 森友级别用户可在「高级」模式下微调大师参数，并保存为个人风格
 */
const MASTER_PRESETS = [
  // ========== 普通用户可用（8 位基础大师）==========
  {
    id: 1,
    name: '肖全',
    nameEn: 'Xiao Quan',
    abbr: 'SQ',
    country: 'China',
    style: '纪实人像',
    description: '中国当代人像摄影大师，以真实、自然的纪实风格著称',
    requiredRole: null, // 无限制
    params: {
      skin: 40, face: 30, light: 60, color: 45, atmosphere: 70,
      philtrum: 50, bloom: 30, clarity: 80, eye: 60, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 70,
      texture: 80, dehaze: 60, highlight: 50, shadow: 60, vibrance: 50,
      saturation: 45, grain: 20, vignette: 30, sharpness: 70, contrast: 55,
      exposure: 50, temperature: 52, tint: 50, fade: 10
    }
  },
  {
    id: 2,
    name: 'Annie Leibovitz',
    nameEn: 'Annie Leibovitz',
    abbr: 'AL',
    country: 'USA',
    style: '时尚人像',
    description: '美国著名时尚摄影师，以戏剧化的光影和构图闻名',
    requiredRole: null,
    params: {
      skin: 60, face: 50, light: 80, color: 70, atmosphere: 80,
      philtrum: 55, bloom: 50, clarity: 70, eye: 70, nose: 55,
      jawline: 60, temple: 55, cheekbone: 60, lip: 60, pore: 50,
      texture: 60, dehaze: 50, highlight: 70, shadow: 40, vibrance: 70,
      saturation: 65, grain: 10, vignette: 40, sharpness: 75, contrast: 70,
      exposure: 55, temperature: 50, tint: 50, fade: 5
    }
  },
  {
    id: 3,
    name: '森山大道',
    nameEn: 'Daido Moriyama',
    abbr: 'SM',
    country: 'Japan',
    style: '街头纪实',
    description: '日本街头摄影大师，以高对比度、粗颗粒的黑白影像著称',
    requiredRole: null,
    params: {
      skin: 20, face: 20, light: 40, color: 20, atmosphere: 90,
      philtrum: 50, bloom: 10, clarity: 90, eye: 50, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 90,
      texture: 95, dehaze: 80, highlight: 80, shadow: 20, vibrance: 20,
      saturation: 10, grain: 90, vignette: 60, sharpness: 85, contrast: 95,
      exposure: 45, temperature: 50, tint: 50, fade: 40
    }
  },
  {
    id: 4,
    name: '陈漫',
    nameEn: 'Chen Man',
    abbr: 'CM',
    country: 'China',
    style: '时尚艺术',
    description: '中国时尚摄影师，以超现实主义和强烈色彩著称',
    requiredRole: null,
    params: {
      skin: 80, face: 70, light: 75, color: 90, atmosphere: 85,
      philtrum: 60, bloom: 70, clarity: 60, eye: 80, nose: 60,
      jawline: 70, temple: 60, cheekbone: 70, lip: 70, pore: 30,
      texture: 40, dehaze: 40, highlight: 60, shadow: 50, vibrance: 90,
      saturation: 85, grain: 5, vignette: 20, sharpness: 70, contrast: 65,
      exposure: 55, temperature: 48, tint: 52, fade: 0
    }
  },
  {
    id: 5,
    name: '胶片',
    nameEn: 'Film',
    abbr: 'JP',
    country: 'Universal',
    style: '胶片质感',
    description: '经典胶片相机的色彩和质感',
    requiredRole: null,
    params: {
      skin: 50, face: 40, light: 55, color: 60, atmosphere: 75,
      philtrum: 50, bloom: 40, clarity: 50, eye: 55, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 60,
      texture: 70, dehaze: 40, highlight: 55, shadow: 55, vibrance: 60,
      saturation: 55, grain: 60, vignette: 50, sharpness: 50, contrast: 60,
      exposure: 50, temperature: 54, tint: 50, fade: 30
    }
  },
  {
    id: 6,
    name: 'Helmut Newton',
    nameEn: 'Helmut Newton',
    abbr: 'HN',
    country: 'Germany',
    style: '时尚黑白',
    description: '德国时尚摄影大师，以大胆的黑白人像著称',
    requiredRole: null,
    params: {
      skin: 50, face: 50, light: 70, color: 30, atmosphere: 80,
      philtrum: 55, bloom: 20, clarity: 85, eye: 70, nose: 55,
      jawline: 70, temple: 55, cheekbone: 70, lip: 60, pore: 60,
      texture: 75, dehaze: 70, highlight: 75, shadow: 30, vibrance: 30,
      saturation: 20, grain: 30, vignette: 50, sharpness: 80, contrast: 85,
      exposure: 50, temperature: 50, tint: 50, fade: 20
    }
  },
  {
    id: 7,
    name: 'Richard Avedon',
    nameEn: 'Richard Avedon',
    abbr: 'RA',
    country: 'USA',
    style: '极简人像',
    description: '美国人像摄影大师，以极简白背景人像著称',
    requiredRole: null,
    params: {
      skin: 45, face: 40, light: 85, color: 40, atmosphere: 60,
      philtrum: 50, bloom: 15, clarity: 90, eye: 75, nose: 50,
      jawline: 55, temple: 50, cheekbone: 55, lip: 50, pore: 80,
      texture: 85, dehaze: 80, highlight: 85, shadow: 40, vibrance: 40,
      saturation: 30, grain: 15, vignette: 10, sharpness: 90, contrast: 75,
      exposure: 55, temperature: 50, tint: 50, fade: 5
    }
  },
  {
    id: 8,
    name: 'Irving Penn',
    nameEn: 'Irving Penn',
    abbr: 'IP',
    country: 'USA',
    style: '静物人像',
    description: '美国摄影大师，以精致的静物和人像摄影著称',
    requiredRole: null,
    params: {
      skin: 55, face: 50, light: 75, color: 55, atmosphere: 70,
      philtrum: 52, bloom: 25, clarity: 80, eye: 65, nose: 52,
      jawline: 55, temple: 52, cheekbone: 55, lip: 55, pore: 70,
      texture: 75, dehaze: 70, highlight: 70, shadow: 45, vibrance: 55,
      saturation: 50, grain: 20, vignette: 30, sharpness: 85, contrast: 70,
      exposure: 52, temperature: 51, tint: 50, fade: 15
    }
  },

  // ========== 森友 (Pro) 解锁（9-15 位大师）==========
  {
    id: 9,
    name: 'Sebastião Salgado',
    nameEn: 'Sebastião Salgado',
    abbr: 'SS',
    country: 'Brazil',
    style: '纪实黑白',
    description: '巴西纪实摄影大师，以震撼的黑白纪实作品著称',
    requiredRole: MEMBERSHIP_ROLES.PRO,
    params: {
      skin: 30, face: 30, light: 60, color: 25, atmosphere: 95,
      philtrum: 50, bloom: 15, clarity: 90, eye: 60, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 85,
      texture: 90, dehaze: 85, highlight: 70, shadow: 35, vibrance: 25,
      saturation: 15, grain: 50, vignette: 50, sharpness: 85, contrast: 90,
      exposure: 48, temperature: 50, tint: 50, fade: 30
    }
  },
  {
    id: 10,
    name: 'Steve McCurry',
    nameEn: 'Steve McCurry',
    abbr: 'SM2',
    country: 'USA',
    style: '纪实色彩',
    description: '美国纪实摄影师，以《阿富汗少女》等作品闻名',
    requiredRole: MEMBERSHIP_ROLES.PRO,
    params: {
      skin: 50, face: 45, light: 65, color: 75, atmosphere: 80,
      philtrum: 50, bloom: 30, clarity: 75, eye: 70, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 65,
      texture: 75, dehaze: 70, highlight: 65, shadow: 50, vibrance: 75,
      saturation: 70, grain: 25, vignette: 40, sharpness: 80, contrast: 70,
      exposure: 52, temperature: 53, tint: 50, fade: 20
    }
  },

  // ========== 大师 (Master) 解锁（16-31 位大师）==========
  {
    id: 16,
    name: 'Ansel Adams',
    nameEn: 'Ansel Adams',
    abbr: 'AA',
    country: 'USA',
    style: '风光黑白',
    description: '美国风光摄影大师，以壮丽的黑白风光作品著称',
    requiredRole: MEMBERSHIP_ROLES.MASTER,
    params: {
      skin: 20, face: 20, light: 80, color: 20, atmosphere: 95,
      philtrum: 50, bloom: 10, clarity: 95, eye: 50, nose: 50,
      jawline: 50, temple: 50, cheekbone: 50, lip: 50, pore: 90,
      texture: 95, dehaze: 95, highlight: 85, shadow: 25, vibrance: 20,
      saturation: 10, grain: 15, vignette: 40, sharpness: 95, contrast: 95,
      exposure: 50, temperature: 50, tint: 50, fade: 10
    }
  }
  // ... 其他 15 位大师省略，实际应用中需补全
];

/**
 * 根据 ID 获取大师预设
 * @param {number} masterId - 大师 ID
 * @returns {object|null}
 */
function getMasterPresetById(masterId) {
  return MASTER_PRESETS.find(master => master.id === masterId) || null;
}

/**
 * 根据简写获取大师预设
 * @param {string} abbr - 大师简写
 * @returns {object|null}
 */
function getMasterPresetByAbbr(abbr) {
  return MASTER_PRESETS.find(master => master.abbr === abbr) || null;
}

/**
 * 获取用户可用的大师列表
 * @param {string} userRole - 用户会员等级
 * @returns {array}
 */
function getAvailableMasters(userRole) {
  const debugMode = wx.getStorageSync('debugMode') || {};
  
  if (debugMode.unlockAll) {
    return MASTER_PRESETS;
  }
  
  return MASTER_PRESETS.filter(master => {
    if (!master.requiredRole) return true; // 无限制
    
    if (userRole === MEMBERSHIP_ROLES.MASTER) return true; // 大师会员全部解锁
    
    if (userRole === MEMBERSHIP_ROLES.PRO && master.requiredRole === MEMBERSHIP_ROLES.PRO) {
      return true; // 森友会员解锁森友级别大师
    }
    
    return false;
  });
}

/**
 * 应用大师预设参数
 * @param {number} masterId - 大师 ID
 * @returns {object|null}
 */
function applyMasterPreset(masterId) {
  const preset = getMasterPresetById(masterId);
  if (!preset) return null;
  
  // 返回参数副本，避免修改原始预设
  return { ...preset.params };
}

module.exports = {
  MASTER_PRESETS,
  getMasterPresetById,
  getMasterPresetByAbbr,
  getAvailableMasters,
  applyMasterPreset
};
