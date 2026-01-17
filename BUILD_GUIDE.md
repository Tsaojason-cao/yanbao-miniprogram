# Sanmu AI Android Build Guide

This guide details how to build the Sanmu AI Android APK from the source code.

## Prerequisites

*   **OS**: Windows, macOS, or Linux
*   **Java Development Kit (JDK)**: Version 17 or higher
*   **Android Studio**: Latest version (Ladybug or newer recommended)
*   **Node.js**: Version 18 or higher

## Build Steps

### 1. Prepare Web Assets
First, build the React frontend and sync it to the Android project.

```bash
cd yanbao-miniprogram
npm install
npm run build
npx cap sync android
```

### 2. Open in Android Studio
1.  Launch Android Studio.
2.  Select **Open**.
3.  Navigate to `yanbao-miniprogram/android` and click **OK**.
4.  Wait for Gradle sync to complete.

### 3. Configure Signing (Release Build Only)
For a production release, you need a signing key.

1.  Generate a keystore:
    ```bash
    keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
    ```
2.  Create a `keystore.properties` file in `android/` directory:
    ```properties
    storePassword=your_store_password
    keyPassword=your_key_password
    keyAlias=my-key-alias
    storeFile=../my-release-key.keystore
    ```
3.  Update `android/app/build.gradle` to use this config (optional for debug builds).

### 4. Build APK
*   **Debug APK** (for testing):
    *   Menu: `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
    *   Output: `android/app/build/outputs/apk/debug/app-debug.apk`
*   **Release Bundle** (for Play Store):
    *   Menu: `Build` > `Generate Signed Bundle / APK`

## Troubleshooting

*   **Gradle Sync Failed**: Check your JDK version in `File > Settings > Build, Execution, Deployment > Build Tools > Gradle`.
*   **SDK Location Not Found**: Create a `local.properties` file in `android/` with `sdk.dir=/path/to/android/sdk`.

## Next Steps
Once built, transfer the APK to your device or use `adb install` to test.
