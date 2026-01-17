# 微信支付 API 集成文档

## 📋 概述

本文档详细说明如何在 Sanmu AI 小程序中集成微信支付 API，实现森友会会员购买流程。

---

## 🔑 前置准备

### 1. 微信支付商户号申请
1. 登录微信公众平台：https://mp.weixin.qq.com
2. 进入「微信支付」→「开通微信支付」
3. 填写商户信息，提交审核
4. 审核通过后，获取以下信息：
   - **商户号（mchid）**：1234567890
   - **API 密钥（key）**：32 位字符串
   - **API 证书**：apiclient_cert.pem, apiclient_key.pem

### 2. 配置小程序支付权限
1. 登录微信公众平台
2. 进入「设置」→「第三方设置」→「微信支付」
3. 关联商户号
4. 配置支付目录：https://yourdomain.com/pages/payment/

---

## 🛠️ 后端实现

### 1. 统一下单接口
**文件**：server/api/payment/unifiedOrder.js

```javascript
const request = require('request');
const crypto = require('crypto');
const xml2js = require('xml2js');

// 微信支付配置
const WECHAT_PAY_CONFIG = {
  appid: 'wx1234567890abcdef',      // 小程序 AppID
  mchid: '1234567890',              // 商户号
  key: 'your_api_key_32_characters', // API 密钥
  notifyUrl: 'https://yourdomain.com/api/payment/notify' // 支付回调地址
};

/**
 * 生成签名
 * @param {object} params - 参数对象
 * @returns {string} 签名字符串
 */
function generateSign(params) {
  // 1. 参数排序
  const sortedKeys = Object.keys(params).sort();
  const stringA = sortedKeys
    .filter(key => params[key] !== '' && key !== 'sign')
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // 2. 拼接 API 密钥
  const stringSignTemp = `${stringA}&key=${WECHAT_PAY_CONFIG.key}`;
  
  // 3. MD5 加密并转大写
  return crypto.createHash('md5').update(stringSignTemp, 'utf8').digest('hex').toUpperCase();
}

/**
 * 统一下单
 * @param {object} orderInfo - 订单信息
 * @returns {Promise<object>} 预支付交易会话标识
 */
async function unifiedOrder(orderInfo) {
  const {
    userId,
    membershipRole,  // 'pro' or 'master'
    duration,        // 'monthly', 'quarterly', 'yearly'
    totalFee,        // 单位：分
    orderNo          // 订单号
  } = orderInfo;
  
  // 构造请求参数
  const params = {
    appid: WECHAT_PAY_CONFIG.appid,
    mch_id: WECHAT_PAY_CONFIG.mchid,
    nonce_str: crypto.randomBytes(16).toString('hex'),
    body: `Sanmu AI - ${membershipRole === 'pro' ? '森友会员' : '大师会员'}`,
    out_trade_no: orderNo,
    total_fee: totalFee,
    spbill_create_ip: '127.0.0.1',
    notify_url: WECHAT_PAY_CONFIG.notifyUrl,
    trade_type: 'JSAPI',
    openid: userId // 用户 OpenID
  };
  
  // 生成签名
  params.sign = generateSign(params);
  
  // 构造 XML 请求体
  const builder = new xml2js.Builder({ rootName: 'xml', headless: true });
  const xmlBody = builder.buildObject(params);
  
  // 发送请求
  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      body: xmlBody,
      headers: { 'Content-Type': 'application/xml' }
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }
      
      // 解析 XML 响应
      xml2js.parseString(body, (err, result) => {
        if (err) {
          return reject(err);
        }
        
        const data = result.xml;
        if (data.return_code[0] === 'SUCCESS' && data.result_code[0] === 'SUCCESS') {
          resolve({
            prepayId: data.prepay_id[0],
            orderNo: orderNo
          });
        } else {
          reject(new Error(data.return_msg[0] || '统一下单失败'));
        }
      });
    });
  });
}

module.exports = { unifiedOrder };
```

### 2. 支付回调接口
**文件**：server/api/payment/notify.js

```javascript
const xml2js = require('xml2js');
const { generateSign } = require('./unifiedOrder');
const { updateOrderStatus } = require('../order/orderService');

/**
 * 支付回调处理
 * @param {string} xmlBody - 微信支付回调 XML 数据
 * @returns {Promise<string>} 响应 XML
 */
async function handlePaymentNotify(xmlBody) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlBody, async (err, result) => {
      if (err) {
        return reject(err);
      }
      
      const data = result.xml;
      
      // 1. 验证签名
      const sign = data.sign[0];
      delete data.sign;
      const calculatedSign = generateSign(data);
      
      if (sign !== calculatedSign) {
        return resolve(buildFailResponse('签名验证失败'));
      }
      
      // 2. 验证支付结果
      if (data.return_code[0] !== 'SUCCESS' || data.result_code[0] !== 'SUCCESS') {
        return resolve(buildFailResponse('支付失败'));
      }
      
      // 3. 更新订单状态
      const orderNo = data.out_trade_no[0];
      const transactionId = data.transaction_id[0];
      const totalFee = parseInt(data.total_fee[0]);
      
      try {
        await updateOrderStatus({
          orderNo,
          transactionId,
          totalFee,
          status: 'paid',
          paidAt: new Date()
        });
        
        resolve(buildSuccessResponse());
      } catch (error) {
        console.error('更新订单状态失败', error);
        resolve(buildFailResponse('更新订单状态失败'));
      }
    });
  });
}

/**
 * 构造成功响应
 */
function buildSuccessResponse() {
  return `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`;
}

/**
 * 构造失败响应
 */
function buildFailResponse(msg) {
  return `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[${msg}]]></return_msg></xml>`;
}

module.exports = { handlePaymentNotify };
```

---

## 📱 小程序端实现

### 1. 发起支付
**文件**：pages/membership/membership.js

```javascript
/**
 * 购买会员
 */
async buyMembership(membershipRole, duration) {
  wx.showLoading({ title: '正在创建订单...' });
  
  try {
    // 1. 调用后端创建订单
    const orderInfo = await this.createOrder(membershipRole, duration);
    
    // 2. 调用微信支付
    const paymentResult = await this.requestPayment(orderInfo);
    
    // 3. 支付成功，更新会员状态
    if (paymentResult.success) {
      await this.updateMembershipStatus(membershipRole, duration);
      
      wx.showToast({
        title: '购买成功！',
        icon: 'success'
      });
      
      // 刷新页面
      this.loadMembershipInfo();
    }
  } catch (error) {
    console.error('购买失败', error);
    wx.showToast({
      title: error.message || '购买失败',
      icon: 'none'
    });
  } finally {
    wx.hideLoading();
  }
},

/**
 * 创建订单
 */
async createOrder(membershipRole, duration) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://yourdomain.com/api/order/create',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        membershipRole,
        duration
      },
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(new Error(res.data.message));
        }
      },
      fail: reject
    });
  });
},

/**
 * 调用微信支付
 */
async requestPayment(orderInfo) {
  const { prepayId, orderNo } = orderInfo;
  
  // 构造支付参数
  const paymentParams = {
    timeStamp: String(Math.floor(Date.now() / 1000)),
    nonceStr: this.generateNonceStr(),
    package: `prepay_id=${prepayId}`,
    signType: 'MD5',
    paySign: '' // 需要后端生成
  };
  
  // 调用后端生成支付签名
  const signResult = await this.getPaymentSign(paymentParams);
  paymentParams.paySign = signResult.paySign;
  
  // 调用微信支付
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...paymentParams,
      success: () => resolve({ success: true }),
      fail: (err) => {
        if (err.errMsg === 'requestPayment:fail cancel') {
          reject(new Error('用户取消支付'));
        } else {
          reject(new Error('支付失败'));
        }
      }
    });
  });
},

/**
 * 生成随机字符串
 */
generateNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}
```

---

## 🗄️ 订单管理系统

### 1. 订单数据表结构
**数据库**：MySQL

```sql
CREATE TABLE `orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_no` VARCHAR(32) NOT NULL COMMENT '订单号',
  `user_id` VARCHAR(64) NOT NULL COMMENT '用户 ID',
  `membership_role` ENUM('pro', 'master') NOT NULL COMMENT '会员等级',
  `duration` ENUM('monthly', 'quarterly', 'yearly') NOT NULL COMMENT '购买时长',
  `total_fee` INT(11) NOT NULL COMMENT '订单金额（分）',
  `status` ENUM('pending', 'paid', 'refunded', 'cancelled') DEFAULT 'pending' COMMENT '订单状态',
  `transaction_id` VARCHAR(64) DEFAULT NULL COMMENT '微信支付交易号',
  `paid_at` DATETIME DEFAULT NULL COMMENT '支付时间',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no` (`order_no`),
  KEY `user_id` (`user_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';
```

### 2. 订单服务
**文件**：server/services/orderService.js

```javascript
const db = require('../database/mysql');

/**
 * 创建订单
 */
async function createOrder(orderData) {
  const { userId, membershipRole, duration, totalFee } = orderData;
  
  // 生成订单号
  const orderNo = generateOrderNo();
  
  const sql = `
    INSERT INTO orders (order_no, user_id, membership_role, duration, total_fee, status)
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;
  
  await db.query(sql, [orderNo, userId, membershipRole, duration, totalFee]);
  
  return { orderNo, totalFee };
}

/**
 * 更新订单状态
 */
async function updateOrderStatus(updateData) {
  const { orderNo, transactionId, status, paidAt } = updateData;
  
  const sql = `
    UPDATE orders
    SET status = ?, transaction_id = ?, paid_at = ?
    WHERE order_no = ?
  `;
  
  await db.query(sql, [status, transactionId, paidAt, orderNo]);
  
  // 如果订单已支付，更新用户会员状态
  if (status === 'paid') {
    const order = await getOrderByNo(orderNo);
    await updateUserMembership(order);
  }
}

/**
 * 查询订单
 */
async function getOrderByNo(orderNo) {
  const sql = `SELECT * FROM orders WHERE order_no = ?`;
  const [rows] = await db.query(sql, [orderNo]);
  return rows[0];
}

/**
 * 查询用户订单列表
 */
async function getUserOrders(userId, page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  const sql = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  const [rows] = await db.query(sql, [userId, pageSize, offset]);
  return rows;
}

/**
 * 生成订单号
 */
function generateOrderNo() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SM${timestamp}${random}`;
}

/**
 * 更新用户会员状态
 */
async function updateUserMembership(order) {
  const { userId, membershipRole, duration } = order;
  
  // 计算会员到期时间
  const durationDays = {
    monthly: 30,
    quarterly: 90,
    yearly: 365
  };
  
  const expireAt = new Date();
  expireAt.setDate(expireAt.getDate() + durationDays[duration]);
  
  const sql = `
    UPDATE users
    SET membership_role = ?, membership_expire_at = ?
    WHERE user_id = ?
  `;
  
  await db.query(sql, [membershipRole, expireAt, userId]);
}

module.exports = {
  createOrder,
  updateOrderStatus,
  getOrderByNo,
  getUserOrders
};
```

---

## 🔐 安全注意事项

### 1. API 密钥保护
- ❌ **禁止**将 API 密钥硬编码在小程序端
- ✅ **必须**将 API 密钥存储在服务器端
- ✅ **必须**使用环境变量管理敏感信息

### 2. 签名验证
- ✅ **必须**在服务器端验证微信支付回调签名
- ✅ **必须**验证订单金额是否一致
- ✅ **必须**防止重复支付

### 3. HTTPS 加密
- ✅ **必须**使用 HTTPS 协议
- ✅ **必须**配置 SSL 证书

---

## 📊 测试流程

### 1. 沙箱环境测试
1. 登录微信支付商户平台
2. 进入「开发配置」→「沙箱环境」
3. 获取沙箱商户号和 API 密钥
4. 使用沙箱环境进行测试

### 2. 测试用例
- ✅ 正常支付流程
- ✅ 用户取消支付
- ✅ 支付超时
- ✅ 重复支付
- ✅ 退款流程

---

## 📞 技术支持

**微信支付官方文档**：https://pay.weixin.qq.com/wiki/doc/api/index.html  
**小程序支付文档**：https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html

---

© 2025 Sanmu AI. All rights reserved.
