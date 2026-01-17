// pages/camera/camera.js
// Leica 极简风格相机逻辑

Page({
  data: {
    devicePosition: 'back',
    flashMode: 'off',
    currentMasterIndex: 0,
    currentMaster: {},
    masterList: [],
    showAdjustment: false,
    showAdvanced: false,
    coreParams: [],
    advancedParams: [],
    membershipRole: 'free'
  },

  onLoad() {
    this.loadMembershipRole();
    this.initMasterList();
    this.initParams();
  },

  loadMembershipRole() {
    const role = wx.getStorageSync('membershipRole') || 'free';
    this.setData({ membershipRole: role });
  },

  initMasterList() {
    const allMasters = [
      { id: 1, name: '肖全', abbr: 'SQ', unlocked: true },
      { id: 2, name: 'Annie Leibovitz', abbr: 'AL', unlocked: true },
      { id: 3, name: '森山大道', abbr: 'SM', unlocked: true },
      { id: 4, name: '陈漫', abbr: 'CM', unlocked: true },
      { id: 5, name: '胶片', abbr: 'JP', unlocked: true },
      { id: 6, name: 'Helmut Newton', abbr: 'HN', unlocked: true },
      { id: 7, name: 'Richard Avedon', abbr: 'RA', unlocked: true },
      { id: 8, name: 'Irving Penn', abbr: 'IP', unlocked: true },
      { id: 9, name: 'Sebastião Salgado', abbr: 'SS', unlocked: false, requiredRole: 'pro' },
      { id: 10, name: 'Steve McCurry', abbr: 'SM2', unlocked: false, requiredRole: 'pro' }
    ];

    const { membershipRole } = this.data;
    const debugMode = wx.getStorageSync('debugMode') || {};
    
    const masterList = allMasters.map(master => {
      if (debugMode.unlockAll || master.unlocked) return { ...master, unlocked: true };
      if (membershipRole === 'master') return { ...master, unlocked: true };
      if (membershipRole === 'pro' && master.requiredRole === 'pro') return { ...master, unlocked: true };
      return master;
    });

    this.setData({ masterList, currentMaster: masterList[0] });
  },

  initParams() {
    const coreParams = [
      { id: 'skin', label: '肤质', value: 50, min: 0, max: 100 },
      { id: 'face', label: '脸型', value: 50, min: 0, max: 100 },
      { id: 'light', label: '光影', value: 50, min: 0, max: 100 },
      { id: 'color', label: '色调', value: 50, min: 0, max: 100 },
      { id: 'atmosphere', label: '氛围', value: 50, min: 0, max: 100 }
    ];
    this.setData({ coreParams, advancedParams: [] });
  },

  selectMaster(e) {
    const index = e.currentTarget.dataset.index;
    const master = this.data.masterList[index];
    if (!master.unlocked) {
      wx.showToast({ title: `需要${master.requiredRole === 'pro' ? '森友' : '大师'}会员`, icon: 'none' });
      return;
    }
    this.setData({ currentMasterIndex: index, currentMaster: master });
  },

  takePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.navigateTo({ url: `/pages/edit/edit?imagePath=${res.tempImagePath}` });
      }
    });
  },

  toggleFlash() {
    this.setData({ flashMode: this.data.flashMode === 'off' ? 'on' : 'off' });
  },

  switchCamera() {
    this.setData({ devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back' });
  },

  goBack() {
    wx.navigateBack();
  },

  openAdjustment() {
    this.setData({ showAdjustment: true });
  },

  closeAdjustment() {
    this.setData({ showAdjustment: false, showAdvanced: false });
  },

  toggleAdvanced() {
    this.setData({ showAdvanced: !this.data.showAdvanced });
  },

  onParamChange(e) {
    console.log(`参数变化: ${e.currentTarget.dataset.id} = ${e.detail.value}`);
  },

  toggleGrid() {
    wx.showToast({ title: '网格线功能开发中', icon: 'none' });
  },

  onCameraError(e) {
    console.error('相机错误', e.detail);
    wx.showToast({ title: '相机启动失败', icon: 'none' });
  }
});
