# Sanmu AI (yanbao AI) Project Handover Document

## 📅 Handover Date: 2026-01-16
## 🚀 Current Version: v1.0.0-release (Leica Style)
## 🎯 Next Target: **Phase 2: Inject Soul (智能化冲刺)**

---

## 1. Project Overview
This project contains the source code for **Sanmu AI** (formerly YanBao AI), a professional photography and AI assistant app.

### Repositories
- **Mobile App (WeChat Mini Program)**: `/yanbao-miniprogram`
- **Mobile Web App (React)**: `/yanbao-imaging-studio`
- **Pitch Deck**: `/sanmu-ai-pitch-deck`

### Current Status (v1.0)
- **Frontend**: Completed "Leica Minimalist" style implementation.
- **Membership**: "Sanmu Club" (Free/Pro/Master) logic implemented on frontend.
- **Backend**: Mocked locally.

---

## 2. 🚨 CRITICAL: Next Phase Instructions (Phase 2)

**Please read `NEXT_PHASE_PLAN.md` immediately.**

The mission has changed from "Feature Building" to **"Injecting Soul"**.

### Core Strategy:
1.  **Intelligent Core**:
    - Build **Yanbao Memory** (Vector DB) + **Master Reasoning Engine** (CoT).
    - Move away from hardcoded logic to memory-driven interactions.

2.  **7-Day Sprint**:
    - Follow the daily plan in `NEXT_PHASE_PLAN.md` strictly.
    - **Day 1**: Infrastructure & Schema (Remove dead code).
    - **Day 2**: Master Brain (CoT).
    - **Day 3**: Memory System (RAG).

3.  **UI/UX**:
    - **Simplified Chinese ONLY** (except "yanbao AI").
    - Add "Thinking..." animations for the Master Brain.

---

## 3. How to Start (For the Next Manus Agent)

1.  **Unpack the Archive**:
    ```bash
    tar -xzf sanmu-ai-handover-v3.tar.gz
    ```

2.  **Review Plans**:
    - Read `HANDOVER.md` (this file).
    - Read `NEXT_PHASE_PLAN.md` (The "Inject Soul" Blueprint).

3.  **Execute Sprint Plan (Day 1)**:
    - Start by scanning the codebase for "dead functions" and replacing them with "Memory Injection Interfaces".

---

## 4. File Manifest
- `yanbao-miniprogram/`: Source code for WeChat Mini Program.
- `yanbao-imaging-studio/`: Source code for React Web App.
- `sanmu_db_schema_v1.sql`: Current database schema.
- `NEXT_PHASE_PLAN.md`: **Phase 2: Intelligent Sprint Architecture**.
- `SANMU_AI_FINAL_INSPECTION_REPORT.md`: Phase 1 completion report.

**Inject Soul into Sanmu AI!** 🧠✨
