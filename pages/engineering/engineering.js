// pages/engineering/engineering.js
Page({
  data: {
    systemInfo: {
      version: 'v2.5.0-commercial',
      packageName: 'com.sanmu.ai.pro',
      membershipRole: '免费版',
      deviceModel: '',
      wechatVersion: ''
    },
    debugMode: {
      showFPS: false,
      showParams: false,
      unlockAll: false
    }
  },

  onLoad() {
    this.loadSystemInfo();
    this.loadDebugMode();
  },

  /**
   * 加载系统信息
   */
  loadSystemInfo() {
    const systemInfo = wx.getSystemInfoSync();
    const membershipRole = wx.getStorageSync('membershipRole') || 'free';
    
    const roleMap = {
      'free': '🌱 免费版',
      'pro': '🌲 森友 (Pro)',
      'master': '👑 大师 (Master)'
    };

    this.setData({
      'systemInfo.deviceModel': systemInfo.model,
      'systemInfo.wechatVersion': systemInfo.version,
      'systemInfo.membershipRole': roleMap[membershipRole]
    });
  },

  /**
   * 加载调试模式配置
   */
  loadDebugMode() {
    const debugMode = wx.getStorageSync('debugMode') || {
      showFPS: false,
      showParams: false,
      unlockAll: false
    };
    this.setData({ debugMode });
  },

  /**
   * 切换 FPS 显示
   */
  toggleFPS(e) {
    const showFPS = e.detail.value;
    this.setData({ 'debugMode.showFPS': showFPS });
    this.saveDebugMode();
    
    wx.showToast({
      title: showFPS ? 'FPS 显示已开启' : 'FPS 显示已关闭',
      icon: 'none'
    });
  },

  /**
   * 切换参数值显示
   */
  toggleParams(e) {
    const showParams = e.detail.value;
    this.setData({ 'debugMode.showParams': showParams });
    this.saveDebugMode();
    
    wx.showToast({
      title: showParams ? '参数值显示已开启' : '参数值显示已关闭',
      icon: 'none'
    });
  },

  /**
   * 切换解锁全部大师
   */
  toggleUnlock(e) {
    const unlockAll = e.detail.value;
    this.setData({ 'debugMode.unlockAll': unlockAll });
    this.saveDebugMode();
    
    wx.showToast({
      title: unlockAll ? '已解锁全部大师' : '已恢复权限限制',
      icon: 'none'
    });
  },

  /**
   * 保存调试模式配置
   */
  saveDebugMode() {
    wx.setStorageSync('debugMode', this.data.debugMode);
  },

  /**
   * 清除缓存
   */
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorage({
            success: () => {
              wx.showToast({
                title: '缓存已清除',
                icon: 'success'
              });
            }
          });
        }
      }
    });
  },

  /**
   * 导出日志
   */
  exportLogs() {
    const logs = wx.getStorageSync('logs') || [];
    const logText = logs.map(log => new Date(log).toLocaleString()).join('\n');
    
    wx.setClipboardData({
      data: logText,
      success: () => {
        wx.showToast({
          title: '日志已复制到剪贴板',
          icon: 'success'
        });
      }
    });
  },

  /**
   * 重置设置
   */
  resetSettings() {
    wx.showModal({
      title: '重置设置',
      content: '确定要重置所有设置吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('debugMode');
          this.setData({
            debugMode: {
              showFPS: false,
              showParams: false,
              unlockAll: false
            }
          });
          wx.showToast({
            title: '设置已重置',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 关闭页面
   */
  closePage() {
    wx.navigateBack();
  }
});
