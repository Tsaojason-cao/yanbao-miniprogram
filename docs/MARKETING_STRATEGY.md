# Sanmu AI 运营推广策略

## 📋 概述

本文档详细说明 Sanmu AI 的运营推广策略，包括首月 5 折优惠、邀请送会员活动、社交媒体推广计划。

---

## 🎁 策略 1：首月 5 折优惠

### 1.1 活动规则
- **活动对象**：新用户首次购买森友/大师会员
- **优惠力度**：首月享受 5 折优惠
- **活动时间**：长期有效
- **限制条件**：每个用户仅限享受一次

### 1.2 定价对比

| 会员等级 | 原价 | 首月 5 折价 | 节省金额 |
|---------|------|-----------|---------|
| **森友 (Pro)** | ¥98/月 | ¥49/月 | ¥49 |
| **大师 (Master)** | ¥298/月 | ¥149/月 | ¥149 |

### 1.3 技术实现

#### 优惠券系统
**文件**：server/services/couponService.js

```javascript
const db = require('../database/mysql');

/**
 * 创建首月 5 折优惠券
 */
async function createFirstMonthCoupon(userId) {
  // 检查用户是否已领取
  const existingCoupon = await getCouponByUser(userId, 'first_month_50');
  if (existingCoupon) {
    throw new Error('您已领取过首月优惠券');
  }
  
  const sql = `
    INSERT INTO coupons (user_id, coupon_type, discount_rate, status, expire_at)
    VALUES (?, 'first_month_50', 0.5, 'available', DATE_ADD(NOW(), INTERVAL 30 DAY))
  `;
  
  await db.query(sql, [userId]);
  
  return {
    couponType: 'first_month_50',
    discountRate: 0.5,
    expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  };
}

/**
 * 应用优惠券
 */
async function applyCoupon(userId, couponId, orderAmount) {
  // 1. 查询优惠券
  const coupon = await getCouponById(couponId);
  
  if (!coupon) {
    throw new Error('优惠券不存在');
  }
  
  if (coupon.user_id !== userId) {
    throw new Error('优惠券不属于该用户');
  }
  
  if (coupon.status !== 'available') {
    throw new Error('优惠券已使用或已过期');
  }
  
  if (new Date(coupon.expire_at) < new Date()) {
    throw new Error('优惠券已过期');
  }
  
  // 2. 计算折扣金额
  const discountAmount = Math.floor(orderAmount * (1 - coupon.discount_rate));
  const finalAmount = orderAmount - discountAmount;
  
  // 3. 更新优惠券状态
  await updateCouponStatus(couponId, 'used');
  
  return {
    originalAmount: orderAmount,
    discountAmount,
    finalAmount
  };
}

module.exports = { createFirstMonthCoupon, applyCoupon };
```

#### 前端实现
**文件**：pages/membership/membership.js

```javascript
/**
 * 领取首月 5 折优惠券
 */
async claimFirstMonthCoupon() {
  wx.showLoading({ title: '正在领取...' });
  
  try {
    const res = await wx.request({
      url: 'https://yourdomain.com/api/coupon/claim',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        couponType: 'first_month_50'
      }
    });
    
    if (res.data.code === 200) {
      wx.showToast({
        title: '领取成功！',
        icon: 'success'
      });
      
      // 刷新优惠券列表
      this.loadCoupons();
    }
  } catch (error) {
    console.error('领取优惠券失败', error);
    wx.showToast({
      title: error.message || '领取失败',
      icon: 'none'
    });
  } finally {
    wx.hideLoading();
  }
}
```

---

## 👥 策略 2：邀请送会员活动

### 2.1 活动规则
- **邀请奖励**：邀请好友注册，双方各得 7 天森友会员
- **邀请上限**：每个用户最多邀请 10 位好友
- **好友条件**：好友必须完成注册并使用 1 次编辑功能
- **奖励发放**：好友完成条件后，自动发放会员权益

### 2.2 奖励机制

| 邀请人数 | 累计奖励 | 额外奖励 |
|---------|---------|---------|
| 1 人 | 7 天森友会员 | - |
| 3 人 | 21 天森友会员 | - |
| 5 人 | 35 天森友会员 | 🎁 专属头像框 |
| 10 人 | 70 天森友会员 | 🎁 升级为大师会员 7 天 |

### 2.3 技术实现

#### 邀请码系统
**文件**：server/services/inviteService.js

```javascript
const crypto = require('crypto');
const db = require('../database/mysql');

/**
 * 生成邀请码
 */
function generateInviteCode(userId) {
  const hash = crypto.createHash('md5').update(userId + Date.now()).digest('hex');
  return hash.substring(0, 8).toUpperCase();
}

/**
 * 创建邀请记录
 */
async function createInvite(inviterId) {
  const inviteCode = generateInviteCode(inviterId);
  
  const sql = `
    INSERT INTO invites (inviter_id, invite_code, status)
    VALUES (?, ?, 'pending')
  `;
  
  await db.query(sql, [inviterId, inviteCode]);
  
  return { inviteCode };
}

/**
 * 接受邀请
 */
async function acceptInvite(inviteeId, inviteCode) {
  // 1. 查询邀请记录
  const invite = await getInviteByCode(inviteCode);
  
  if (!invite) {
    throw new Error('邀请码不存在');
  }
  
  if (invite.status !== 'pending') {
    throw new Error('邀请码已使用');
  }
  
  // 2. 更新邀请记录
  const sql = `
    UPDATE invites
    SET invitee_id = ?, status = 'accepted', accepted_at = NOW()
    WHERE invite_code = ?
  `;
  
  await db.query(sql, [inviteeId, inviteCode]);
  
  // 3. 发放奖励（待好友完成条件后）
  return { inviterId: invite.inviter_id };
}

/**
 * 完成邀请任务
 */
async function completeInviteTask(inviteeId) {
  // 1. 查询邀请记录
  const invite = await getInviteByInvitee(inviteeId);
  
  if (!invite || invite.status !== 'accepted') {
    return;
  }
  
  // 2. 更新邀请状态
  const sql = `
    UPDATE invites
    SET status = 'completed', completed_at = NOW()
    WHERE invitee_id = ?
  `;
  
  await db.query(sql, [inviteeId]);
  
  // 3. 发放奖励
  await grantInviteReward(invite.inviter_id, inviteeId);
}

/**
 * 发放邀请奖励
 */
async function grantInviteReward(inviterId, inviteeId) {
  // 1. 邀请人奖励：7 天森友会员
  await extendMembership(inviterId, 'pro', 7);
  
  // 2. 被邀请人奖励：7 天森友会员
  await extendMembership(inviteeId, 'pro', 7);
  
  // 3. 检查累计邀请数，发放额外奖励
  const inviteCount = await getInviteCount(inviterId);
  
  if (inviteCount === 5) {
    // 5 人奖励：专属头像框
    await grantAvatarFrame(inviterId, 'invite_5');
  } else if (inviteCount === 10) {
    // 10 人奖励：升级为大师会员 7 天
    await extendMembership(inviterId, 'master', 7);
  }
}

module.exports = { createInvite, acceptInvite, completeInviteTask };
```

#### 前端实现
**文件**：pages/invite/invite.js

```javascript
Page({
  data: {
    inviteCode: '',
    inviteCount: 0,
    inviteList: []
  },

  onLoad() {
    this.loadInviteInfo();
  },

  /**
   * 加载邀请信息
   */
  async loadInviteInfo() {
    const res = await wx.request({
      url: 'https://yourdomain.com/api/invite/info',
      data: { userId: wx.getStorageSync('userId') }
    });
    
    if (res.data.code === 200) {
      this.setData({
        inviteCode: res.data.data.inviteCode,
        inviteCount: res.data.data.inviteCount,
        inviteList: res.data.data.inviteList
      });
    }
  },

  /**
   * 分享邀请
   */
  onShareAppMessage() {
    const { inviteCode } = this.data;
    
    return {
      title: '我在用 Sanmu AI，邀你一起体验专业摄影 AI！',
      path: `/pages/index/index?inviteCode=${inviteCode}`,
      imageUrl: '/images/share-invite.png'
    };
  },

  /**
   * 复制邀请码
   */
  copyInviteCode() {
    wx.setClipboardData({
      data: this.data.inviteCode,
      success: () => {
        wx.showToast({ title: '邀请码已复制', icon: 'success' });
      }
    });
  }
});
```

---

## 📱 策略 3：社交媒体推广

### 3.1 推广渠道

| 平台 | 目标用户 | 内容形式 | 发布频率 |
|------|---------|---------|---------|
| **小红书** | 摄影爱好者、时尚博主 | 图文教程、前后对比 | 每周 3 次 |
| **抖音** | 年轻用户、短视频创作者 | 短视频教程、特效展示 | 每周 5 次 |
| **微博** | 摄影师、艺术爱好者 | 大师作品分享、活动宣传 | 每周 2 次 |
| **B站** | 摄影学习者、技术爱好者 | 长视频教程、功能讲解 | 每月 2 次 |

### 3.2 内容策略

#### 小红书内容模板
**标题**：「Sanmu AI | 一键拥有摄影大师的调色风格」

**正文**：
```
🌲 发现了一个宝藏 AI 摄影应用！

✨ 核心功能：
• 31 位摄影大师风格（肖全、Annie Leibovitz、森山大道...）
• 29 维专业参数调整（人中深度、光学弥散、通透度...）
• Leica 极简美学设计，专业而克制

📸 使用体验：
1. 上传照片
2. 选择大师风格（我最爱森山大道的高对比度黑白）
3. 微调参数（可选）
4. 保存分享

💡 推荐理由：
• 不是简单的滤镜，是真正的摄影大师风格
• 界面极简，95% 取景器，纯白快门
• 森友会员可批量处理，AI 智能推荐

🎁 新用户福利：
首月 5 折！森友会员只要 ¥49/月

#Sanmu AI #摄影 #AI修图 #Leica美学 #摄影大师
```

**配图**：
- 图 1：Sanmu AI 主界面截图
- 图 2-4：前后对比图（原图 vs 大师风格）
- 图 5：会员定价卡片

#### 抖音短视频脚本
**时长**：30 秒

**脚本**：
```
[0-5s] 开场：展示一张普通照片
文案：「这张照片太普通了？」

[5-10s] 打开 Sanmu AI
文案：「试试 Sanmu AI 的摄影大师风格」

[10-15s] 选择大师风格（森山大道）
文案：「一键应用森山大道的高对比度黑白」

[15-20s] 展示处理后的照片
文案：「瞬间拥有大师级质感」

[20-25s] 展示其他大师风格
文案：「31 位摄影大师，随心选择」

[25-30s] 结尾：显示 Sanmu AI Logo
文案：「Sanmu AI - 深藏功名，极简外露」
```

**BGM**：极简电子音乐（如 Nils Frahm - Says）

#### 微博推广文案
**文案**：
```
【Sanmu AI 正式上线】

对标 Leica 与 Apple 的极简美学，我们打造了一款专业摄影 AI 应用。

🌲 核心理念：「深藏功名，极简外露」
• 95% 取景器，让照片成为主角
• 纯白圆环快门，Leica 标志性设计
• 31 位摄影大师风格，从肖全到 Ansel Adams

🎁 新用户福利：
首月 5 折！森友会员 ¥49/月，大师会员 ¥149/月

📱 立即体验：[小程序码]

#Sanmu AI #摄影 #AI #Leica美学 #摄影大师
```

### 3.3 KOL 合作计划

#### 目标 KOL
| KOL 类型 | 粉丝量级 | 合作形式 | 预算 |
|---------|---------|---------|------|
| **摄影博主** | 10万+ | 试用测评 + 专属优惠码 | ¥5,000/人 |
| **时尚博主** | 50万+ | 图文推广 + 短视频 | ¥10,000/人 |
| **摄影师** | 5万+ | 深度测评 + 教程 | ¥3,000/人 |

#### 合作流程
1. **筛选 KOL**：摄影、时尚、生活方式领域
2. **发送合作邀请**：提供产品介绍和合作方案
3. **提供试用账号**：赠送 3 个月大师会员
4. **内容审核**：确保内容真实、专业
5. **发布推广**：KOL 在各平台发布内容
6. **效果追踪**：监测转化率和用户反馈

### 3.4 社交媒体运营日历

#### 第 1 周
- **周一**：小红书发布「Sanmu AI 功能介绍」
- **周三**：抖音发布「30 秒快速上手教程」
- **周五**：微博发布「31 位摄影大师介绍」

#### 第 2 周
- **周一**：小红书发布「森山大道风格前后对比」
- **周三**：抖音发布「批量处理功能演示」
- **周五**：B站发布「Sanmu AI 完整功能讲解」

#### 第 3 周
- **周一**：小红书发布「AI 智能推荐功能体验」
- **周三**：抖音发布「会员权益对比」
- **周五**：微博发布「用户案例分享」

#### 第 4 周
- **周一**：小红书发布「Leica 美学设计理念」
- **周三**：抖音发布「邀请送会员活动宣传」
- **周五**：微博发布「月度数据报告」

---

## 📊 效果追踪

### 1. 关键指标（KPI）

| 指标 | 目标值 | 追踪方式 |
|------|--------|---------|
| **新用户注册数** | 10,000/月 | 后台数据统计 |
| **首月优惠券领取率** | 60% | 优惠券系统统计 |
| **邀请活动参与率** | 20% | 邀请系统统计 |
| **社交媒体曝光量** | 100万/月 | 各平台数据统计 |
| **付费转化率** | 5% | 订单系统统计 |
| **月收入** | ¥80,000 | 财务系统统计 |

### 2. 数据分析工具
- **友盟+**：用户行为分析
- **微信小程序数据助手**：小程序数据统计
- **新榜**：社交媒体数据监测
- **Google Analytics**：网站流量分析

---

## 💰 预算分配

| 项目 | 预算 | 占比 |
|------|------|------|
| **KOL 合作** | ¥50,000 | 50% |
| **广告投放** | ¥30,000 | 30% |
| **活动奖励** | ¥15,000 | 15% |
| **内容制作** | ¥5,000 | 5% |
| **总计** | ¥100,000 | 100% |

---

## 🚀 执行时间表

### 第 1 个月：预热期
- **Week 1**：完成社交媒体账号注册和认证
- **Week 2**：制作推广素材（图文、视频）
- **Week 3**：联系 KOL，发送合作邀请
- **Week 4**：首月 5 折活动上线

### 第 2 个月：爆发期
- **Week 1**：KOL 集中发布测评内容
- **Week 2**：邀请送会员活动上线
- **Week 3**：加大广告投放力度
- **Week 4**：数据分析和优化

### 第 3 个月：稳定期
- **Week 1**：持续内容输出
- **Week 2**：用户案例分享
- **Week 3**：月度数据报告发布
- **Week 4**：下一阶段策略规划

---

© 2025 Sanmu AI. All rights reserved.
