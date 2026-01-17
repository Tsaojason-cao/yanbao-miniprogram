# Sanmu AI 快速启动指南

**适用对象**: 下一个接手项目的Manus账号  
**预计时间**: 30分钟  
**作者**: Manus AI

---

## 第一步：获取GitHub访问权限（5分钟）

1. **联系仓库所有者**:
   - GitHub用户名: `Tsaojason-cao`
   - 请求添加为以下仓库的协作者：
     - `Tsaojason-cao/yanbao-miniprogram`
     - `Tsaojason-cao/yanbao-imaging-studio`

2. **验证访问权限**:
   ```bash
   gh repo list Tsaojason-cao --limit 10
   ```

## 第二步：克隆项目仓库（10分钟）

```bash
# 克隆主项目
cd /home/ubuntu
gh repo clone Tsaojason-cao/yanbao-miniprogram
cd yanbao-miniprogram
git checkout sanmu-v1-production

# 克隆后端服务
cd /home/ubuntu
gh repo clone Tsaojason-cao/yanbao-imaging-studio
cd yanbao-imaging-studio
git checkout sanmu-v1-production
```

## 第三步：安装依赖（5分钟）

```bash
# 主项目依赖
cd /home/ubuntu/yanbao-miniprogram
pnpm install

# 后端服务依赖
cd /home/ubuntu/yanbao-imaging-studio
pnpm install
```

## 第四步：构建APK（10分钟）

```bash
# 1. 构建Web资源
cd /home/ubuntu/yanbao-miniprogram
pnpm run build

# 2. 同步到Android
npx cap sync android

# 3. 构建Release APK
cd android
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
./gradlew assembleRelease

# 4. 签名APK（如果密钥库存在）
cd /home/ubuntu/android-sdk/build-tools/34.0.0
./apksigner sign \
  --ks /home/ubuntu/yanbao-release-key.jks \
  --ks-key-alias yanbao \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --v3-signing-enabled true \
  /home/ubuntu/yanbao-miniprogram/android/app/build/outputs/apk/release/app-release-unsigned.apk

# 5. 上传APK
manus-upload-file /home/ubuntu/sanmu-ai-release.apk
```

## 关键注意事项

### ⚠️ 必须保留的配置

**`.env` 文件** (`yanbao-miniprogram/.env`):
```
PUBLIC_URL=.
```
**这个配置至关重要！** 缺少它会导致白屏问题。

### ⚠️ Android SDK版本

**`variables.gradle`** (`yanbao-miniprogram/android/variables.gradle`):
```gradle
compileSdkVersion = 36
targetSdkVersion = 33
minSdkVersion = 24
```
- `targetSdkVersion`必须是33，不能是36
- `compileSdkVersion`必须是36以支持Capacitor 8

### ⚠️ 品牌名

项目品牌名是 **Sanmu AI（三木 AI）**，不是"yanbao AI"。

## 常见问题

### Q1: APK无法安装？
**A**: 检查`targetSdkVersion`是否为33。如果是36，设备会拒绝安装。

### Q2: 安装后白屏？
**A**: 检查`.env`文件是否存在且包含`PUBLIC_URL=.`。

### Q3: Gradle构建失败？
**A**: 确保使用Java 21：
```bash
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
java -version
```

### Q4: 如何查看已生成的APK？
**A**: 最新的可用APK下载链接：
https://files.manuscdn.com/user_upload_by_module/session_file/310519663291954815/tpboiZUiiwkxgHCv.apk

## 下一步

构建成功后，您可以：
1. 在真机上测试APK
2. 阅读 `SANMU_AI_HANDOVER_GUIDE.md` 了解详细信息
3. 查看 `NEXT_PHASE_PLAN.md` 了解下一阶段计划
4. 开始集成真实的AI后端服务

---

**祝您顺利接手项目！** 🚀
