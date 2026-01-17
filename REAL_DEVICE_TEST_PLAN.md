# Sanmu AI Real Device Test Plan

## 1. Installation & Launch
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T1.1 | Install APK | Run `adb install app-debug.apk` | Installation successful |
| T1.2 | Launch App | Tap app icon | App opens, shows "Sanmu AI" splash screen |
| T1.3 | Splash Transition | Wait 2 seconds | Transitions to Home/Welcome screen |

## 2. Permissions & Hardware
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T2.1 | Camera Permission | Open "Video Record" page | System dialog asks for Camera permission |
| T2.2 | Mic Permission | (After Camera) | System dialog asks for Microphone permission |
| T2.3 | Deny Permission | Deny permissions | App shows "Permission Required" toast/message |
| T2.4 | Grant Permission | Grant permissions | Camera preview appears immediately |

## 3. Video Recording
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T3.1 | Start Recording | Tap Red Circle button | Button pulses, recording timer starts (if impl) |
| T3.2 | Stop Recording | Tap Red Square button | Recording stops, video loops in preview |
| T3.3 | Retake | Tap "Play" (Retake) button | Preview clears, camera stream returns |

## 4. Cloud Upload
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T4.1 | Upload Video | Record video -> Tap Upload | Toast: "Uploading..." -> "Success" |
| T4.2 | Verify Cloud | Check S3 Bucket | New `.webm` file appears in bucket |
| T4.3 | Network Fail | Disable WiFi -> Upload | Toast: "Upload failed" |

## 5. Social Share
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T5.1 | Share Text | Tap "Share Masterpiece" | System share sheet opens |
| T5.2 | Share Target | Select WhatsApp/Telegram | Message pre-filled with "Check out my masterpiece..." |

## 6. Compliance Check
| ID | Test Case | Steps | Expected Result |
| :--- | :--- | :--- | :--- |
| T6.1 | Privacy Check | Browse all screens | NO real names ("Sanmu", "Jason") visible |
| T6.2 | Asset Check | Check all icons | NO realistic human portraits visible |
