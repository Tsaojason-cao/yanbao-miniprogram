# Sanmu AI 项目结构总览

## 项目目录

### 1. yanbao-miniprogram (主项目 - Capacitor)
**路径**: `/home/ubuntu/yanbao-miniprogram`
**类型**: React + Ionic + Capacitor
**用途**: 主要的移动应用项目
**GitHub**: Tsaojason-cao/yanbao-miniprogram (sanmu-v1-production分支)

**关键文件**:
- `package.json` - 项目依赖配置
- `capacitor.config.json` - Capacitor配置
- `.env` - 环境变量（PUBLIC_URL=.）
- `src/App.js` - React主应用
- `android/` - Android原生项目
- `build/` - Web构建产物

### 2. yanbao-imaging-studio (后端服务)
**路径**: `/home/ubuntu/yanbao-imaging-studio`
**类型**: Flask + Python + React前端
**用途**: AI后端服务和Web前端
**GitHub**: Tsaojason-cao/yanbao-imaging-studio (sanmu-v1-production分支)

**关键文件**:
- `server/main.py` - Flask后端主文件
- `server/ai/` - AI模块（master_brain, memory, semantic_editor等）
- `client/` - React前端
- `locustfile.py` - 性能测试脚本

### 3. YanbaoAI-Expo (Expo项目 - 实验性)
**路径**: `/home/ubuntu/YanbaoAI-Expo`
**类型**: Expo + React Native
**用途**: Expo版本的移动应用（未完成）
**状态**: 实验性，依赖版本已修复但未完成EAS Build

## 项目关系

```
Sanmu AI 生态系统
├── yanbao-miniprogram (主应用 - Capacitor)
│   ├── Android APK ✅ 已生成
│   └── 品牌名: Sanmu AI (三木 AI)
├── yanbao-imaging-studio (后端服务)
│   ├── AI引擎
│   └── Flask API
└── YanbaoAI-Expo (备选方案 - Expo)
    └── 状态: 未完成
```

## GitHub仓库

1. **yanbao-miniprogram**
   - URL: https://github.com/Tsaojason-cao/yanbao-miniprogram
   - 分支: sanmu-v1-production
   - 最新提交: 507cc233

2. **yanbao-imaging-studio**
   - URL: https://github.com/Tsaojason-cao/yanbao-imaging-studio
   - 分支: sanmu-v1-production
   - 最新提交: 3647dcf

3. **sanmu-ai-website**
   - URL: https://github.com/Tsaojason-cao/sanmu-ai-website
   - 类型: 官网项目

4. **yanbao-studio**
   - 状态: 仓库不存在或无权限

## 关键配置文件

### Android构建配置
- `yanbao-miniprogram/android/variables.gradle`
  - compileSdkVersion: 36
  - targetSdkVersion: 33
  - minSdkVersion: 24

### Capacitor配置
- `yanbao-miniprogram/capacitor.config.json`
  - appId: com.sanmu.ai.pro
  - appName: Sanmu AI
  - webDir: build

### 环境变量
- `yanbao-miniprogram/.env`
  - PUBLIC_URL=. (关键！解决白屏问题)

## 已生成的APK

### 最新可用版本
- **文件名**: sanmu-ai-fixed-final-v1.0.apk
- **下载链接**: https://files.manuscdn.com/user_upload_by_module/session_file/310519663291954815/tpboiZUiiwkxgHCv.apk
- **大小**: 3.3 MB
- **品牌名**: Sanmu AI (三木 AI)
- **状态**: ✅ 可安装，白屏问题已修复
- **targetSdk**: 33 (Android 13)
- **minSdk**: 24 (Android 7.0+)

## 重要文档

所有文档位于 `/home/ubuntu/`:
- `PROJECT_SUMMARY.md` - 项目总结
- `CURRENT_STATUS_ANALYSIS.md` - 当前状态分析
- `HANDOVER.md` - 交接文档
- `NEXT_PHASE_PLAN.md` - 下一阶段计划
- `EXECUTION_PLAYBOOK.md` - 执行手册
- `APK_FIX_COMPLETE_REPORT.md` - APK修复报告
- `BLANK_PAGE_DIAGNOSIS.md` - 白屏问题诊断
- `FINAL_FIX_REPORT.md` - 最终修复报告
- `SANMU_AI_FINAL_FIXED_REPORT.md` - 最终发布报告

## 备份文件

- `sanmu-ai-phase2-complete-20260117.tar.gz` - Phase 2完整备份
- `yanbao-ai-release-v1.0-backup-20260117.tar.gz` - 发布版本备份
