// utils/userDatabase.js
// 用户数据库模拟（基于微信小程序本地存储）

const { MEMBERSHIP_ROLES } = require('../config/sanmuClub.js');

/**
 * 用户数据结构
 */
const USER_SCHEMA = {
  userId: '',                    // 用户 ID
  openId: '',                    // 微信 OpenID
  nickname: '',                  // 昵称
  avatar: '',                    // 头像
  membershipRole: MEMBERSHIP_ROLES.FREE,  // 会员等级
  membershipExpireAt: null,      // 会员到期时间
  createdAt: '',                 // 注册时间
  lastLoginAt: '',               // 最后登录时间
  customPresets: [],             // 自定义预设（仅大师会员）
  settings: {
    debugMode: false,
    showFPS: false,
    showParams: false,
    unlockAll: false
  }
};

/**
 * 初始化用户数据
 */
function initUserData() {
  const existingUser = wx.getStorageSync('userData');
  if (existingUser && existingUser.userId) {
    return existingUser;
  }
  
  const newUser = {
    ...USER_SCHEMA,
    userId: generateUserId(),
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
  
  wx.setStorageSync('userData', newUser);
  wx.setStorageSync('membershipRole', MEMBERSHIP_ROLES.FREE);
  
  return newUser;
}

/**
 * 获取用户数据
 */
function getUserData() {
  const userData = wx.getStorageSync('userData');
  if (!userData || !userData.userId) {
    return initUserData();
  }
  return userData;
}

/**
 * 更新用户数据
 * @param {object} updates - 更新的字段
 */
function updateUserData(updates) {
  const userData = getUserData();
  const updatedData = { ...userData, ...updates };
  wx.setStorageSync('userData', updatedData);
  
  // 同步会员等级到单独的存储
  if (updates.membershipRole) {
    wx.setStorageSync('membershipRole', updates.membershipRole);
  }
  
  return updatedData;
}

/**
 * 获取会员等级
 */
function getMembershipRole() {
  const role = wx.getStorageSync('membershipRole');
  if (!role) {
    return MEMBERSHIP_ROLES.FREE;
  }
  return role;
}

/**
 * 设置会员等级
 * @param {string} role - 会员等级
 * @param {number} durationDays - 有效期（天数）
 */
function setMembershipRole(role, durationDays = 30) {
  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + durationDays);
  
  updateUserData({
    membershipRole: role,
    membershipExpireAt: expireAt.toISOString()
  });
  
  wx.showToast({
    title: `已升级为${role === MEMBERSHIP_ROLES.PRO ? '森友' : '大师'}会员`,
    icon: 'success'
  });
}

/**
 * 检查会员是否过期
 */
function checkMembershipExpiry() {
  const userData = getUserData();
  
  if (userData.membershipRole === MEMBERSHIP_ROLES.FREE) {
    return false; // 免费用户不会过期
  }
  
  if (!userData.membershipExpireAt) {
    return false;
  }
  
  const expireDate = new Date(userData.membershipExpireAt);
  const now = new Date();
  
  if (now > expireDate) {
    // 会员已过期，降级为免费用户
    updateUserData({
      membershipRole: MEMBERSHIP_ROLES.FREE,
      membershipExpireAt: null
    });
    
    wx.showToast({
      title: '会员已过期',
      icon: 'none'
    });
    
    return true;
  }
  
  return false;
}

/**
 * 保存自定义预设（仅大师会员）
 * @param {object} preset - 预设数据
 */
function saveCustomPreset(preset) {
  const userData = getUserData();
  
  if (userData.membershipRole !== MEMBERSHIP_ROLES.MASTER) {
    wx.showToast({
      title: '需要大师会员',
      icon: 'none'
    });
    return false;
  }
  
  const customPresets = userData.customPresets || [];
  const presetWithId = {
    ...preset,
    id: generatePresetId(),
    createdAt: new Date().toISOString()
  };
  
  customPresets.push(presetWithId);
  updateUserData({ customPresets });
  
  return presetWithId;
}

/**
 * 获取自定义预设列表
 */
function getCustomPresets() {
  const userData = getUserData();
  return userData.customPresets || [];
}

/**
 * 生成用户 ID
 */
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成预设 ID
 */
function generatePresetId() {
  return 'preset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成森友预设码（6位字母数字组合）
 */
function generateSanmuCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * 更新最后登录时间
 */
function updateLastLogin() {
  updateUserData({
    lastLoginAt: new Date().toISOString()
  });
}

module.exports = {
  USER_SCHEMA,
  initUserData,
  getUserData,
  updateUserData,
  getMembershipRole,
  setMembershipRole,
  checkMembershipExpiry,
  saveCustomPreset,
  getCustomPresets,
  generateSanmuCode,
  updateLastLogin
};
