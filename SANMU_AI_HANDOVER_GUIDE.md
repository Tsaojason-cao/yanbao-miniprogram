# Sanmu AI 项目交接指南

**版本**: 1.0  
**日期**: 2026-01-17  
**作者**: Manus AI

---

## 1. 项目概述

Sanmu AI（三木 AI）是一个专业的移动端摄影智能修图工具，旨在为用户提供大师级的AI滤镜和参数调节功能。项目核心是一个混合移动应用，通过Capacitor将React前端打包成Android APK，后端由Flask提供AI服务。

**核心目标**：
- 提供高质量的AI摄影滤镜
- 智能化的参数调节建议
- 专业的移动端修图体验

## 2. GitHub仓库访问

下一个Manus账号需要获得以下GitHub仓库的访问权限：

| 仓库 | URL | 分支 | 描述 |
|---|---|---|---|
| **yanbao-miniprogram** | https://github.com/Tsaojason-cao/yanbao-miniprogram | `sanmu-v1-production` | **主项目** - Capacitor移动应用 |
| **yanbao-imaging-studio** | https://github.com/Tsaojason-cao/yanbao-imaging-studio | `sanmu-v1-production` | **后端服务** - Flask AI引擎 |
| **sanmu-ai-website** | https://github.com/Tsaojason-cao/sanmu-ai-website | `main` | 官网项目 |

**操作指南**：
1. 联系仓库所有者（Tsaojason-cao）
2. 请求将新的Manus账号添加为仓库协作者
3. 使用`gh repo clone <repo-name>`克隆仓库

## 3. 项目结构

详细的项目结构请参考 `/home/ubuntu/PROJECT_STRUCTURE.md`。

### 3.1 主项目 (yanbao-miniprogram)

- **技术栈**: React + Ionic + Capacitor
- **路径**: `/home/ubuntu/yanbao-miniprogram`
- **用途**: 主要的移动应用项目，用于生成APK

### 3.2 后端服务 (yanbao-imaging-studio)

- **技术栈**: Flask + Python
- **路径**: `/home/ubuntu/yanbao-imaging-studio`
- **用途**: 提供AI滤镜、参数推荐等后端服务

### 3.3 Expo项目 (YanbaoAI-Expo)

- **技术栈**: Expo + React Native
- **路径**: `/home/ubuntu/YanbaoAI-Expo`
- **状态**: 实验性，未完成，不建议使用

## 4. 开发环境配置

### 4.1 系统环境
- **OS**: Ubuntu 22.04
- **Java**: OpenJDK 21
- **Android SDK**: API 36 (位于 `/home/ubuntu/android-sdk`)
- **Node.js**: v22.13.0
- **pnpm**: 已安装

### 4.2 关键配置文件

**Android构建配置** (`yanbao-miniprogram/android/variables.gradle`):
```gradle
compileSdkVersion = 36
targetSdkVersion = 33
minSdkVersion = 24
```

**Capacitor配置** (`yanbao-miniprogram/capacitor.config.json`):
```json
{
  "appId": "com.sanmu.ai.pro",
  "appName": "Sanmu AI",
  "webDir": "build"
}
```

**环境变量** (`yanbao-miniprogram/.env`):
```
PUBLIC_URL=.
```
**注意**: 这个配置至关重要，用于解决白屏问题。

## 5. 如何构建APK

1. **进入主项目目录**:
   ```bash
   cd /home/ubuntu/yanbao-miniprogram
   ```

2. **安装依赖**:
   ```bash
   pnpm install
   ```

3. **构建Web资源**:
   ```bash
   pnpm run build
   ```

4. **同步到Android项目**:
   ```bash
   npx cap sync android
   ```

5. **构建Release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

6. **签名APK**:
   - 密钥库: `/home/ubuntu/yanbao-release-key.jks`
   - 密码: `yanbao1017`
   - 别名: `yanbao`
   ```bash
   cd /home/ubuntu/android-sdk/build-tools/34.0.0
   ./apksigner sign --ks /home/ubuntu/yanbao-release-key.jks --ks-key-alias yanbao --v1-signing-enabled true --v2-signing-enabled true --v3-signing-enabled true /path/to/unsigned.apk
   ```

## 6. 已知问题和解决方案

### 6.1 白屏问题
- **原因**: Vite默认使用绝对路径，在Capacitor的`file://`协议下无法加载资源
- **解决方案**: 在`.env`文件中设置`PUBLIC_URL=.`，强制使用相对路径

### 6.2 APK无法安装
- **原因**: targetSdkVersion过高（例如36）
- **解决方案**: 将targetSdkVersion降低到33，同时保持compileSdkVersion=36以支持Capacitor 8

### 6.3 EAS Build失败
- **原因**: 项目不是Expo项目，或者Expo Token权限不足
- **解决方案**: 使用Capacitor + Gradle构建，或者确保使用正确的Expo Token和项目配置

## 7. 下一步计划

根据`NEXT_PHASE_PLAN.md`，下一步的重点是：

1. **集成真实AI服务**:
   - 将后端Flask服务部署到云端
   - 在移动应用中调用真实的AI API

2. **完善UI/UX**:
   - 恢复完整的Ionic UI组件
   - 优化用户体验和交互

3. **真机测试**:
   - 在多款Android设备上进行全面测试
   - 收集用户反馈并修复Bug

4. **应用商店上架**:
   - 准备Google Play上架材料
   - 遵循应用商店的审核指南

## 8. 最终交付成果

### 最新可用APK
- **文件名**: `sanmu-ai-fixed-final-v1.0.apk`
- **下载链接**: https://files.manuscdn.com/user_upload_by_module/session_file/310519663291954815/tpboiZUiiwkxgHCv.apk
- **状态**: ✅ 可安装，白屏问题已修复，品牌名为Sanmu AI

### 项目备份
- **文件名**: `sanmu-ai-phase2-complete-20260117.tar.gz`
- **位置**: `/home/ubuntu/`

---

**祝您交接顺利！** 🚀
