# YanBao AI 微信小程序

YanBao AI是一款专业摄影应用的微信小程序版本，集成40个真实机位推荐、12种LUT预设、AI影集生成和专业相机功能。

## 功能特性

### 1. 首页（pages/index）
- Hero区域展示Logo和标语
- 核心功能卡片（机位/相机/LUT/AI影集）
- 热门机位推荐列表
- 快速操作按钮

### 2. 专业相机（pages/camera）
- 前后摄像头切换
- 闪光灯控制
- 实时相机参数显示（ISO/快门/白平衡）
- 7维美颜滑块调节
- 多种拍摄模式（自动/专业/人像/风景）
- 拍摄后自动保存到相册

### 3. 照片编辑（pages/edit）
- 12种LUT滤镜预设
- 实时预览效果
- 强度滑块调节（0-100%）
- 保存编辑后的照片

### 4. 相册（pages/gallery）
- 网格展示所有照片
- 点击预览大图
- 空状态引导拍摄

### 5. 拍摄机位（pages/spots）
- 40个精选拍摄点列表
- 评分、距离、最佳拍摄时间
- 点击查看详情和导航

### 6. 设置（pages/settings）
- 用户信息展示
- 清除缓存功能
- 关于我们信息

## 技术栈

- **框架**: 微信小程序原生框架
- **样式**: WXSS（类似CSS）
- **数据存储**: 本地存储（wx.setStorageSync/getStorageSync）
- **相机**: 微信小程序Camera组件
- **地图**: 微信小程序地图API

## 项目结构

```
yanbao-miniprogram/
├── app.js                 # 小程序入口文件
├── app.json               # 全局配置（页面路由、TabBar、窗口样式）
├── app.wxss               # 全局样式
├── project.config.json    # 项目配置
├── sitemap.json           # 搜索配置
├── pages/                 # 页面目录
│   ├── index/             # 首页
│   ├── camera/            # 相机页面
│   ├── edit/              # 编辑页面
│   ├── gallery/           # 相册页面
│   ├── spots/             # 机位页面
│   └── settings/          # 设置页面
├── images/                # 图片资源
└── utils/                 # 工具函数

每个页面包含4个文件：
- *.wxml  # 页面结构（类似HTML）
- *.wxss  # 页面样式（类似CSS）
- *.js    # 页面逻辑
- *.json  # 页面配置
```

## 开发指南

### 1. 环境准备
1. 下载并安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册微信小程序账号，获取AppID

### 2. 导入项目
1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择项目目录：`/home/ubuntu/yanbao-miniprogram`
4. 填入AppID（或使用测试号）
5. 点击"导入"

### 3. 本地开发
1. 在微信开发者工具中打开项目
2. 点击"编译"按钮
3. 在模拟器中预览效果
4. 修改代码后自动刷新

### 4. 真机调试
1. 点击工具栏"预览"按钮
2. 使用微信扫描二维码
3. 在手机上测试真实效果

### 5. 上传发布
1. 点击工具栏"上传"按钮
2. 填写版本号和项目备注
3. 登录[微信公众平台](https://mp.weixin.qq.com)
4. 进入"版本管理"提交审核
5. 审核通过后发布上线

## 配置说明

### app.json 配置
```json
{
  "pages": ["页面路径列表"],
  "window": {
    "navigationBarBackgroundColor": "#8B5CF6",  // 导航栏背景色（紫色）
    "navigationBarTitleText": "YanBao AI",      // 导航栏标题
    "navigationBarTextStyle": "white"            // 导航栏文字颜色
  },
  "tabBar": {
    "selectedColor": "#EC4899",  // TabBar选中颜色（粉色）
    "list": [/* TabBar配置 */]
  }
}
```

### 权限配置
小程序需要以下权限：
- **相机权限**: 拍摄照片
- **相册权限**: 保存照片到相册
- **位置权限**: 导航到拍摄机位
- **存储权限**: 本地数据存储

在`app.json`中配置：
```json
{
  "permission": {
    "scope.camera": {
      "desc": "用于拍摄照片"
    },
    "scope.writePhotosAlbum": {
      "desc": "用于保存照片到相册"
    },
    "scope.userLocation": {
      "desc": "用于导航到拍摄机位"
    }
  }
}
```

## 数据结构

### 机位数据（Spot）
```javascript
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
  description: '西湖十景之一...'
}
```

### LUT预设数据
```javascript
{
  id: 1,
  name: 'Cinematic',
  nameZh: '电影感',
  thumbnail: '/images/lut-cinematic.jpg'
}
```

## 样式规范

### 库洛米主题配色
- **主色（紫色）**: `#8B5CF6`
- **辅色（粉色）**: `#EC4899`
- **背景色**: `#F5F5F5`
- **文字色**: `#333333`
- **次要文字**: `#999999`

### 设计规范
- **圆角**: 24rpx（卡片）、48rpx（按钮）
- **间距**: 16rpx/24rpx/32rpx/40rpx
- **阴影**: `0 4rpx 16rpx rgba(0, 0, 0, 0.06)`
- **字体大小**: 24rpx（小）、28rpx（正文）、32rpx（标题）、48rpx（大标题）

## 注意事项

1. **图片资源**: 需要准备以下图片资源
   - TabBar图标（5个，每个2种状态）
   - Logo图片
   - 机位照片（40张）
   - LUT预设缩略图（12张）

2. **相机权限**: 首次使用相机需要用户授权，需要处理授权失败的情况

3. **本地存储**: 微信小程序本地存储上限为10MB，注意控制照片数量

4. **网络请求**: 如需连接后端API，需要在微信公众平台配置服务器域名

5. **性能优化**: 
   - 图片使用webp格式
   - 列表使用虚拟列表
   - 避免频繁setData

## 后续优化

### 功能增强
- [ ] AI影集生成功能
- [ ] 一键成片功能
- [ ] 云端同步（需要后端支持）
- [ ] 社交分享功能
- [ ] 用户登录系统

### 性能优化
- [ ] 图片懒加载
- [ ] 列表虚拟滚动
- [ ] 离线缓存策略
- [ ] 骨架屏加载

### 体验优化
- [ ] 添加加载动画
- [ ] 优化交互反馈
- [ ] 添加引导页
- [ ] 完善错误提示

## 相关链接

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [YanBao AI官网](https://tsaojason-cao.github.io/yanbao-screenshots-showcase/)
- [GitHub仓库](https://github.com/Tsaojason-cao/yanbao-imaging-studio)

## 许可证

© 2025 YanBao AI. All rights reserved.
