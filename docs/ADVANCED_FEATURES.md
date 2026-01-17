# Sanmu AI 高级功能设计文档

## 📋 概述

本文档详细说明 Sanmu AI 的三大高级功能：批量处理、AI 智能推荐、云端同步。

---

## 🚀 功能 1：批量处理（森友会员专属）

### 1.1 功能描述
森友 (Pro) 及以上会员可一次性上传多张照片，批量应用大师风格和参数调整。

### 1.2 技术实现

#### 前端实现
**文件**：pages/batch/batch.wxml, batch.js

```javascript
// pages/batch/batch.js
Page({
  data: {
    selectedImages: [],      // 已选择的图片列表
    currentMaster: null,     // 当前大师风格
    batchProgress: 0,        // 批量处理进度
    isProcessing: false,     // 是否正在处理
    membershipRole: 'free'   // 会员等级
  },

  onLoad() {
    this.checkMembershipRole();
  },

  /**
   * 检查会员等级
   */
  checkMembershipRole() {
    const role = wx.getStorageSync('membershipRole') || 'free';
    this.setData({ membershipRole: role });
    
    if (role === 'free') {
      wx.showModal({
        title: '功能限制',
        content: '批量处理功能需要森友会员，是否立即升级？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({ url: '/pages/membership/membership' });
          } else {
            wx.navigateBack();
          }
        }
      });
    }
  },

  /**
   * 选择图片
   */
  async selectImages() {
    try {
      const res = await wx.chooseMedia({
        count: 9,  // 最多选择 9 张
        mediaType: ['image'],
        sourceType: ['album', 'camera']
      });
      
      const selectedImages = res.tempFiles.map(file => ({
        path: file.tempFilePath,
        size: file.size,
        status: 'pending'  // pending, processing, completed, failed
      }));
      
      this.setData({ selectedImages });
    } catch (error) {
      console.error('选择图片失败', error);
    }
  },

  /**
   * 选择大师风格
   */
  selectMaster(e) {
    const masterId = e.currentTarget.dataset.id;
    const master = this.getMasterById(masterId);
    this.setData({ currentMaster: master });
  },

  /**
   * 开始批量处理
   */
  async startBatchProcessing() {
    const { selectedImages, currentMaster } = this.data;
    
    if (!currentMaster) {
      wx.showToast({ title: '请先选择大师风格', icon: 'none' });
      return;
    }
    
    if (selectedImages.length === 0) {
      wx.showToast({ title: '请先选择图片', icon: 'none' });
      return;
    }
    
    this.setData({ isProcessing: true, batchProgress: 0 });
    
    // 逐张处理图片
    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i];
      
      try {
        // 更新状态为处理中
        selectedImages[i].status = 'processing';
        this.setData({ selectedImages });
        
        // 调用 AI 处理接口
        const processedImage = await this.processImage(image.path, currentMaster);
        
        // 更新状态为完成
        selectedImages[i].status = 'completed';
        selectedImages[i].processedPath = processedImage.path;
        
      } catch (error) {
        console.error(`处理图片 ${i + 1} 失败`, error);
        selectedImages[i].status = 'failed';
      }
      
      // 更新进度
      const progress = Math.floor(((i + 1) / selectedImages.length) * 100);
      this.setData({ 
        selectedImages,
        batchProgress: progress
      });
    }
    
    this.setData({ isProcessing: false });
    wx.showToast({ title: '批量处理完成！', icon: 'success' });
  },

  /**
   * 处理单张图片
   */
  async processImage(imagePath, master) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://yourdomain.com/api/image/process',
        method: 'POST',
        data: {
          imagePath,
          masterId: master.id,
          params: master.params
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
   * 保存所有图片
   */
  async saveAllImages() {
    const { selectedImages } = this.data;
    const completedImages = selectedImages.filter(img => img.status === 'completed');
    
    if (completedImages.length === 0) {
      wx.showToast({ title: '没有可保存的图片', icon: 'none' });
      return;
    }
    
    wx.showLoading({ title: `正在保存 ${completedImages.length} 张图片...` });
    
    for (const image of completedImages) {
      try {
        await wx.saveImageToPhotosAlbum({
          filePath: image.processedPath
        });
      } catch (error) {
        console.error('保存图片失败', error);
      }
    }
    
    wx.hideLoading();
    wx.showToast({ title: '保存成功！', icon: 'success' });
  }
});
```

#### 后端实现
**文件**：server/api/image/process.js

```javascript
const { applyMasterPreset } = require('../config/masterPresets');
const { processImageWithAI } = require('../services/aiService');

/**
 * 处理图片
 */
async function processImage(req, res) {
  const { imagePath, masterId, params } = req.body;
  
  try {
    // 1. 获取大师预设参数
    const masterParams = applyMasterPreset(masterId);
    
    // 2. 合并用户自定义参数
    const finalParams = { ...masterParams, ...params };
    
    // 3. 调用 AI 处理服务
    const processedImage = await processImageWithAI(imagePath, finalParams);
    
    // 4. 返回处理结果
    res.json({
      code: 200,
      message: '处理成功',
      data: {
        path: processedImage.path,
        size: processedImage.size
      }
    });
  } catch (error) {
    console.error('处理图片失败', error);
    res.status(500).json({
      code: 500,
      message: error.message || '处理失败'
    });
  }
}

module.exports = { processImage };
```

---

## 🤖 功能 2：AI 智能推荐

### 2.1 功能描述
根据照片内容（人像、风景、街拍等）自动推荐最适合的大师风格。

### 2.2 技术实现

#### AI 图像分类
**文件**：server/services/aiRecommendation.js

```javascript
const { OpenAI } = require('openai');
const fs = require('fs');

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * 分析图片内容并推荐大师风格
 */
async function recommendMasterStyle(imagePath) {
  try {
    // 1. 读取图片并转为 base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    // 2. 调用 GPT-4 Vision API 分析图片
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `请分析这张照片的内容和风格，并从以下摄影大师中推荐最适合的 3 位：
              
              1. 肖全 - 纪实人像
              2. Annie Leibovitz - 时尚人像
              3. 森山大道 - 街头纪实
              4. 陈漫 - 时尚艺术
              5. 胶片 - 胶片质感
              6. Helmut Newton - 时尚黑白
              7. Richard Avedon - 极简人像
              8. Irving Penn - 静物人像
              9. Sebastião Salgado - 纪实黑白
              10. Steve McCurry - 纪实色彩
              11. Ansel Adams - 风光黑白
              
              请以 JSON 格式返回推荐结果，包含：
              {
                "recommendations": [
                  {
                    "masterId": 1,
                    "masterName": "肖全",
                    "reason": "推荐理由",
                    "confidence": 0.95
                  }
                ],
                "imageType": "portrait|landscape|street|still_life",
                "keywords": ["关键词1", "关键词2"]
              }`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });
    
    // 3. 解析 AI 响应
    const content = response.choices[0].message.content;
    const result = JSON.parse(content);
    
    return result;
  } catch (error) {
    console.error('AI 推荐失败', error);
    throw error;
  }
}

/**
 * 基于规则的简化推荐（备用方案）
 */
function simpleRecommendation(imageAnalysis) {
  const { brightness, contrast, colorfulness, faceCount } = imageAnalysis;
  
  // 人像照片
  if (faceCount > 0) {
    if (colorfulness > 0.6) {
      return { masterId: 2, masterName: 'Annie Leibovitz', reason: '时尚人像，色彩丰富' };
    } else {
      return { masterId: 1, masterName: '肖全', reason: '纪实人像，自然真实' };
    }
  }
  
  // 风景照片
  if (brightness > 0.7 && contrast > 0.5) {
    return { masterId: 11, masterName: 'Ansel Adams', reason: '风光摄影，高对比度' };
  }
  
  // 街拍照片
  if (contrast > 0.7) {
    return { masterId: 3, masterName: '森山大道', reason: '街头纪实，高对比度' };
  }
  
  // 默认推荐
  return { masterId: 5, masterName: '胶片', reason: '经典胶片质感' };
}

module.exports = { recommendMasterStyle, simpleRecommendation };
```

#### 前端实现
**文件**：pages/edit/edit.js

```javascript
/**
 * AI 智能推荐
 */
async aiRecommendation() {
  const { imagePath } = this.data;
  
  wx.showLoading({ title: 'AI 分析中...' });
  
  try {
    const res = await wx.request({
      url: 'https://yourdomain.com/api/ai/recommend',
      method: 'POST',
      data: { imagePath }
    });
    
    if (res.data.code === 200) {
      const recommendations = res.data.data.recommendations;
      
      // 显示推荐结果
      this.setData({ recommendations, showRecommendations: true });
      
      wx.showToast({
        title: `AI 推荐了 ${recommendations.length} 种风格`,
        icon: 'success'
      });
    }
  } catch (error) {
    console.error('AI 推荐失败', error);
    wx.showToast({ title: 'AI 推荐失败', icon: 'none' });
  } finally {
    wx.hideLoading();
  }
},

/**
 * 应用推荐风格
 */
applyRecommendedStyle(e) {
  const index = e.currentTarget.dataset.index;
  const recommendation = this.data.recommendations[index];
  
  // 应用大师风格
  this.selectMaster(recommendation.masterId);
  
  wx.showToast({
    title: `已应用 ${recommendation.masterName} 风格`,
    icon: 'success'
  });
}
```

---

## ☁️ 功能 3：云端同步

### 3.1 功能描述
用户数据、自定义预设、编辑历史云端同步，支持多设备访问。

### 3.2 技术实现

#### 数据库设计
**表结构**：user_cloud_data

```sql
CREATE TABLE `user_cloud_data` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(64) NOT NULL COMMENT '用户 ID',
  `data_type` ENUM('preset', 'history', 'settings') NOT NULL COMMENT '数据类型',
  `data_key` VARCHAR(128) NOT NULL COMMENT '数据键',
  `data_value` TEXT NOT NULL COMMENT '数据值（JSON）',
  `version` INT(11) DEFAULT 1 COMMENT '版本号',
  `synced_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '同步时间',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_data` (`user_id`, `data_type`, `data_key`),
  KEY `user_id` (`user_id`),
  KEY `data_type` (`data_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户云端数据表';
```

#### 云端同步服务
**文件**：server/services/cloudSyncService.js

```javascript
const db = require('../database/mysql');

/**
 * 上传数据到云端
 */
async function uploadToCloud(userId, dataType, dataKey, dataValue) {
  const sql = `
    INSERT INTO user_cloud_data (user_id, data_type, data_key, data_value, version)
    VALUES (?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE
      data_value = VALUES(data_value),
      version = version + 1,
      synced_at = CURRENT_TIMESTAMP
  `;
  
  await db.query(sql, [userId, dataType, dataKey, JSON.stringify(dataValue)]);
}

/**
 * 从云端下载数据
 */
async function downloadFromCloud(userId, dataType) {
  const sql = `
    SELECT data_key, data_value, version, synced_at
    FROM user_cloud_data
    WHERE user_id = ? AND data_type = ?
    ORDER BY synced_at DESC
  `;
  
  const [rows] = await db.query(sql, [userId, dataType]);
  
  return rows.map(row => ({
    key: row.data_key,
    value: JSON.parse(row.data_value),
    version: row.version,
    syncedAt: row.synced_at
  }));
}

/**
 * 同步数据（增量同步）
 */
async function syncData(userId, localData) {
  // 1. 获取云端数据
  const cloudData = await downloadFromCloud(userId, 'preset');
  
  // 2. 比较版本号，合并数据
  const mergedData = mergeData(localData, cloudData);
  
  // 3. 上传本地新增数据
  for (const item of mergedData.toUpload) {
    await uploadToCloud(userId, 'preset', item.key, item.value);
  }
  
  return mergedData.final;
}

/**
 * 合并数据
 */
function mergeData(localData, cloudData) {
  const cloudMap = new Map(cloudData.map(item => [item.key, item]));
  const toUpload = [];
  const final = [];
  
  // 遍历本地数据
  for (const localItem of localData) {
    const cloudItem = cloudMap.get(localItem.key);
    
    if (!cloudItem) {
      // 云端没有，需要上传
      toUpload.push(localItem);
      final.push(localItem);
    } else if (localItem.version > cloudItem.version) {
      // 本地版本更新，需要上传
      toUpload.push(localItem);
      final.push(localItem);
    } else {
      // 云端版本更新或相同，使用云端数据
      final.push(cloudItem);
    }
    
    cloudMap.delete(localItem.key);
  }
  
  // 添加云端独有的数据
  for (const cloudItem of cloudMap.values()) {
    final.push(cloudItem);
  }
  
  return { toUpload, final };
}

module.exports = { uploadToCloud, downloadFromCloud, syncData };
```

#### 前端实现
**文件**：utils/cloudSync.js

```javascript
const { getUserData } = require('./userDatabase');

/**
 * 同步到云端
 */
async function syncToCloud() {
  const userData = getUserData();
  const customPresets = userData.customPresets || [];
  
  wx.showLoading({ title: '正在同步...' });
  
  try {
    const res = await wx.request({
      url: 'https://yourdomain.com/api/cloud/sync',
      method: 'POST',
      data: {
        userId: userData.userId,
        presets: customPresets
      }
    });
    
    if (res.data.code === 200) {
      // 更新本地数据
      const syncedPresets = res.data.data.presets;
      wx.setStorageSync('customPresets', syncedPresets);
      
      wx.showToast({ title: '同步成功', icon: 'success' });
    }
  } catch (error) {
    console.error('同步失败', error);
    wx.showToast({ title: '同步失败', icon: 'none' });
  } finally {
    wx.hideLoading();
  }
}

/**
 * 自动同步（应用启动时）
 */
function autoSync() {
  const lastSyncTime = wx.getStorageSync('lastSyncTime') || 0;
  const now = Date.now();
  
  // 超过 1 小时自动同步
  if (now - lastSyncTime > 3600000) {
    syncToCloud().then(() => {
      wx.setStorageSync('lastSyncTime', now);
    });
  }
}

module.exports = { syncToCloud, autoSync };
```

---

## 📊 功能对比

| 功能 | 免费用户 | 森友 (Pro) | 大师 (Master) |
|------|---------|-----------|--------------|
| **批量处理** | ❌ | ✅ 最多 9 张 | ✅ 最多 20 张 |
| **AI 智能推荐** | ✅ 每日 3 次 | ✅ 无限次 | ✅ 无限次 |
| **云端同步** | ❌ | ✅ 10 个预设 | ✅ 无限预设 |

---

## 🚀 性能优化

### 1. 批量处理优化
- **并发处理**：使用 Promise.all() 并发处理多张图片
- **进度反馈**：实时更新处理进度条
- **错误重试**：失败的图片自动重试 3 次

### 2. AI 推荐优化
- **缓存机制**：相同图片的推荐结果缓存 24 小时
- **备用方案**：AI 服务不可用时，使用基于规则的简化推荐
- **异步处理**：推荐过程不阻塞主线程

### 3. 云端同步优化
- **增量同步**：仅同步变更的数据，减少网络传输
- **版本控制**：使用版本号避免数据冲突
- **离线缓存**：网络不可用时，数据存储在本地队列，恢复后自动同步

---

© 2025 Sanmu AI. All rights reserved.
