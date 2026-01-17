// app.js
const { initUserData, updateLastLogin, checkMembershipExpiry } = require('./utils/userDatabase.js');

App({
  onLaunch() {
    // 初始化用户数据
    initUserData();
    updateLastLogin();
    checkMembershipExpiry();
    
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('登录成功', res.code)
      }
    })
  },
  globalData: {
    userInfo: null,
    // 机位数据
    spots: [
      {
        id: 1,
        name: '西湖断桥',
        city: '杭州',
        rating: 5.0,
        distance: '2.3km',
        bestTime: 'Golden Hour 17:00-18:30',
        latitude: 30.259244,
        longitude: 120.148262,
        image: '/images/spot-1.jpg',
        description: '西湖十景之一，白娘子与许仙相会之地，日落时分最美'
      },
      {
        id: 2,
        name: '雷峰塔',
        city: '杭州',
        rating: 4.8,
        distance: '3.5km',
        bestTime: 'Golden Hour 17:30-19:00',
        latitude: 30.231991,
        longitude: 120.148783,
        image: '/images/spot-2.jpg',
        description: '西湖南岸制高点，俯瞰西湖全景的最佳位置'
      },
      {
        id: 3,
        name: '三潭印月',
        city: '杭州',
        rating: 4.9,
        distance: '2.8km',
        bestTime: 'Blue Hour 18:00-19:30',
        latitude: 30.239184,
        longitude: 120.142584,
        image: '/images/spot-3.jpg',
        description: '西湖中最大的岛屿，一元人民币背景图案取景地'
      }
    ],
    // LUT预设
    luts: [
      { id: 1, name: 'Cinematic', nameZh: '电影感', thumbnail: '/images/lut-cinematic.jpg' },
      { id: 2, name: 'Japanese', nameZh: '日系', thumbnail: '/images/lut-japanese.jpg' },
      { id: 3, name: 'Korean', nameZh: '韩系', thumbnail: '/images/lut-korean.jpg' },
      { id: 4, name: 'Fuji CCD', nameZh: '富士CCD', thumbnail: '/images/lut-fuji.jpg' },
      { id: 5, name: 'Vintage Film', nameZh: '复古胶片', thumbnail: '/images/lut-vintage.jpg' },
      { id: 6, name: 'Portra', nameZh: '柔和人像', thumbnail: '/images/lut-portra.jpg' },
      { id: 7, name: 'Classic B&W', nameZh: '经典黑白', thumbnail: '/images/lut-bw.jpg' },
      { id: 8, name: 'Warm Tone', nameZh: '暖色调', thumbnail: '/images/lut-warm.jpg' },
      { id: 9, name: 'Cool Mist', nameZh: '冷色雾', thumbnail: '/images/lut-cool.jpg' },
      { id: 10, name: 'Faded', nameZh: '褪色', thumbnail: '/images/lut-faded.jpg' },
      { id: 11, name: 'Teal & Orange', nameZh: '青橙', thumbnail: '/images/lut-teal.jpg' },
      { id: 12, name: 'Modern', nameZh: '现代风格', thumbnail: '/images/lut-modern.jpg' }
    ]
  }
})
