# Sanmu AI - Leica 极简风格 UI 设计

**设计理念**：**「深藏功名，极简外露」**

对标 Leica M10 与 Apple 的极简克制美学，打造专业摄影 AI 应用的终极形态。

---

## 📸 Leica 风格核心设计原则

### 1. 极简主义（Minimalism）
- **95% 取景器**：让照片成为主角，UI 退居幕后
- **纯白快门**：标志性的圆环快门键，致敬 Leica 相机
- **极细字体**：Helvetica Neue Light（200-300 weight），克制而优雅

### 2. 克制美学（Restraint）
- **单色调**：黑白灰三色，拒绝花哨
- **隐藏式菜单**：29 维参数隐藏在 Adjustment 面板中
- **大师转盘**：仅显示简写（SQ, AL, SM），极简而专业

### 3. 功能优先（Function First）
- **直觉操作**：快门、大师、参数，三步完成拍摄
- **权限可视化**：锁定参数清晰展示会员权益
- **出厂设定**：31 位大师预设，专业而可靠

---

## 🖼️ UI 截图说明

### 1. Leica 相机主界面
**文件名**：leica-01-camera-main.png

**核心元素**：
- **95% 全屏取景器**：森林场景，沉浸式拍照体验
- **顶部工具栏**：3 个极简圆形图标（返回、闪光灯、翻转），半透明黑色背景
- **大师转盘**：底部横向滚动，显示 SQ、AL、**SM**（激活）、CM、JP
  - 激活大师：**SM**（森山大道），白色加粗，32px
  - 未激活大师：灰白色，28px，极细字体
- **纯白圆环快门**：底部中心，140px 直径，6px 白色边框，白色填充中心
- **底部提示条**：黑色背景，显示当前大师名称「森山大道」，24px 极细白色字体
- **右侧工具栏**：设置图标、网格图标，垂直排列

**设计亮点**：
- ✅ 95% 取景器，视觉极简
- ✅ 纯白快门，Leica 标志性设计
- ✅ 大师转盘，极细字体简写
- ✅ 单色调，黑白灰配色

---

### 2. Adjustment 调整面板（折叠状态）
**文件名**：leica-02-adjustment-panel.png

**核心元素**：
- **底部弹出面板**：覆盖 80% 屏幕，黑色背景（95% 不透明度），磨砂玻璃模糊效果
- **头部**：「Adjustment」标题，40px 极细字体，右上角「×」关闭图标
- **Core 核心参数**：5 个滑块
  - Skin（肤质）：50
  - Face（脸型）：50
  - Light（光影）：50
  - Color（色调）：50
  - Atmosphere（氛围）：50
- **Advanced 高级参数**：折叠状态，显示「Advanced」标题 + 右箭头「›」
  - 下方提示：「🔒 Pro」「🔒 Master」锁定徽章

**设计亮点**：
- ✅ 隐藏式面板，不干扰主界面
- ✅ 5 个核心参数，简洁明了
- ✅ 高级参数折叠，避免凌乱
- ✅ 锁定徽章，清晰展示权限

---

### 3. Adjustment 调整面板（高级参数展开）
**文件名**：leica-03-advanced-expanded.png

**核心元素**：
- **Core 核心参数**：5 个滑块（Skin 60%, Face 40%, Light 75%, Color 50%, Atmosphere 30%）
- **Advanced 高级参数**：展开状态，箭头旋转向上「↗」
  - **解锁参数**（6 个）：
    - Philtrum（人中雕琢）：20%
    - Bloom（光学弥散）：80%
    - Clarity+（通透度）：55%
    - Eye Detail（眼部精雕）：90%
    - Nose Shape（鼻梁塑形）：15%
    - Jawline（下颌线条）：35%
  - **锁定参数**（4 个）：
    - Temple Fill（太阳穴填充）：🔒 Pro
    - Cheekbone（颧骨高度）：🔒 Master
    - Lip Volume（唇部丰盈）：🔒 Pro
    - Pore Detail（毛孔细节）：🔒 Master

**设计亮点**：
- ✅ 高级参数完全展开，展示 29 维参数体系
- ✅ 锁定参数灰度处理，视觉区分明显
- ✅ 锁定徽章清晰标注所需会员等级
- ✅ 极细字体，专业而克制

---

## 🎨 设计规范

### 配色系统
- **背景色**：纯黑 #000000
- **主要文字**：纯白 #FFFFFF
- **次要文字**：灰白 rgba(255, 255, 255, 0.5-0.7)
- **激活色**：纯白 #FFFFFF（加粗）
- **锁定色**：灰色 rgba(255, 255, 255, 0.3)

### 字体系统
- **主标题**：Helvetica Neue Light, 40px, weight 300
- **大师简写（激活）**：Helvetica Neue, 32px, weight 400
- **大师简写（未激活）**：Helvetica Neue Light, 28px, weight 200
- **参数标签**：Helvetica Neue Light, 24px, weight 300
- **参数值**：Helvetica Neue Light, 24px, weight 300

### 圆角规范
- **快门按钮**：50%（完全圆形）
- **工具图标**：50%（完全圆形）
- **调整面板**：40rpx（顶部圆角）

### 阴影规范
- **工具图标**：backdrop-filter: blur(20rpx)
- **调整面板**：backdrop-filter: blur(40rpx)

### 间距规范
- **取景器占比**：95%
- **底部提示条**：5%
- **参数间距**：32rpx
- **工具图标间距**：32rpx

---

## 🆚 设计对比

### 升级前后对比

| 元素 | 升级前（雁宝 AI） | 升级后（Sanmu AI - Leica 风格） |
|------|------------------|-------------------------------|
| **取景器占比** | 70% | 95% |
| **快门设计** | 粉紫色渐变 | 纯白圆环 |
| **大师展示** | 缩略图 + 名称 | 极细字体简写（SQ, AL, SM）|
| **参数展示** | 主界面滑块 | 隐藏式 Adjustment 面板 |
| **配色方案** | 粉紫色 + 彩色 | 黑白灰单色调 |
| **字体风格** | 常规字体 | Helvetica Neue Light（极细）|
| **设计风格** | 可爱活泼 | 极简克制（Leica 美学）|

---

## 📐 Markdown 布局图

### Leica 相机主界面布局

```
┌─────────────────────────────────────────┐
│  ←    ⚡    ⟲                          │ ← 顶部工具栏（极简圆形图标）
├─────────────────────────────────────────┤
│                                         │
│                                         │
│                                         │
│                                         │
│         95% 全屏取景器                  │ ← 森林场景
│         (Forest Viewfinder)             │
│                                         │
│                                         │
│                                         │
│                                    ⚙    │ ← 右侧工具栏
│                                    ⊞    │
│                                         │
│  SQ   AL   SM   CM   JP                │ ← 大师转盘（极细字体简写）
│            ‾‾                           │    SM 激活（加粗下划线）
│                                         │
│              ◯                          │ ← 纯白圆环快门（140px）
│            ◯   ◯                        │
│                                         │
├─────────────────────────────────────────┤
│           森山大道                       │ ← 底部提示条（5%）
└─────────────────────────────────────────┘
```

### Adjustment 调整面板布局（高级参数展开）

```
┌─────────────────────────────────────────┐
│  Adjustment                          ×  │ ← 头部
├─────────────────────────────────────────┤
│  Core                                   │ ← 核心参数区
│  Skin        ━━━━━━●━━━━━━        60%  │
│  Face        ━━━━●━━━━━━━━        40%  │
│  Light       ━━━━━━━━━●━━        75%  │
│  Color       ━━━━━━●━━━━━━        50%  │
│  Atmosphere  ━━━●━━━━━━━━━        30%  │
│                                         │
│  ↗ Advanced                             │ ← 高级参数区（展开）
│  Philtrum    ━━●━━━━━━━━━━        20%  │
│  Bloom       ━━━━━━━━━━●━        80%  │
│  Clarity+    ━━━━━━●━━━━━        55%  │
│  Eye Detail  ━━━━━━━━━━●━        90%  │
│  Nose Shape  ━●━━━━━━━━━━        15%  │
│  Jawline     ━━━━●━━━━━━━        35%  │
│  Temple Fill ━━━━━━━━━━━━  🔒 Pro     │ ← 锁定参数（灰度）
│  Cheekbone   ━━━━━━━━━━━━  🔒 Master  │
│  Lip Volume  ━━━━━━━━━━━━  🔒 Pro     │
│  Pore Detail ━━━━━━━━━━━━  🔒 Master  │
└─────────────────────────────────────────┘
```

---

## 🚀 实现要点

### 1. 95% 取景器实现
```css
.camera-viewfinder {
  width: 100%;
  height: 95vh; /* 95% 视口高度 */
}

.bottom-hint {
  height: 5vh; /* 5% 视口高度 */
}
```

### 2. 纯白圆环快门实现
```css
.shutter-button {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  border: 6rpx solid #FFFFFF;
  background: transparent;
}

.shutter-inner {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  background: #FFFFFF;
}
```

### 3. 极细字体实现
```css
.master-abbr {
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 28rpx;
  font-weight: 200; /* Ultra Light */
  letter-spacing: 2rpx;
  color: rgba(255, 255, 255, 0.5);
}

.master-item.active .master-abbr {
  font-size: 32rpx;
  font-weight: 400; /* Regular */
  color: #FFFFFF;
}
```

### 4. 隐藏式 Adjustment 面板实现
```css
.adjustment-panel {
  position: fixed;
  bottom: -100%; /* 初始隐藏 */
  left: 0;
  right: 0;
  height: 80vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(40rpx);
  transition: bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.adjustment-panel.show {
  bottom: 0; /* 滑入显示 */
}
```

---

## 📝 用户体验流程

### 拍照流程（3 步）
1. **选择大师**：横向滑动大师转盘，点击选择（SQ, AL, SM...）
2. **按下快门**：点击纯白圆环快门键，拍摄照片
3. **微调参数**（可选）：点击右侧设置图标，打开 Adjustment 面板

### 参数调整流程
1. **Core 核心参数**：直接调整 5 个滑块（Skin, Face, Light, Color, Atmosphere）
2. **Advanced 高级参数**：点击「Advanced」展开，调整 24 个进阶参数
3. **锁定参数提示**：点击锁定参数，弹出升级提示「需要森友/大师会员」

---

## 🎯 商业化亮点

### 1. 权限可视化
- **锁定徽章**：🔒 Pro / 🔒 Master，清晰展示会员权益
- **灰度处理**：锁定参数灰度显示，视觉区分明显
- **升级引导**：点击锁定参数，一键跳转会员中心

### 2. 专业定位
- **Leica 美学**：对标 Leica M10，传递专业摄影器材的克制美学
- **大师预设**：31 位摄影大师，从肖全到 Ansel Adams
- **29 维参数**：从基础美颜到专业调色，满足不同层级用户

### 3. 极简体验
- **95% 取景器**：让照片成为主角
- **纯白快门**：标志性设计，品牌识别度高
- **隐藏式菜单**：29 维参数不凌乱，专业而简洁

---

© 2025 Sanmu AI. All rights reserved.

**「深藏功名，极简外露」**
