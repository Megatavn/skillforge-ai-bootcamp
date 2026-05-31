# SkillForge AI: Career Bootcamp

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white)
![Offline First](https://img.shields.io/badge/Mode-Offline--First-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Portfolio-ready offline AI Engineering bootcamp app for Vietnamese beginners.**  
**Ứng dụng bootcamp AI Engineering chạy offline, dành cho người Việt mới bắt đầu, có bài học, bài tập code, bằng chứng năng lực và capstone để đưa lên GitHub/CV.**

**Author / Tác giả:** Vũ Hoàng  
**Repository:** `skillforge-ai-bootcamp`  
**App name:** SkillForge AI  
**Build target:** Web + Android APK via Capacitor  
**Mode:** Offline-first, no backend, no login, no real AI API in MVP

---

## Preview / Ảnh demo

![SkillForge AI showcase](docs/screenshots/showcase.png)

<p align="center">
  <img src="docs/screenshots/01-code-missions-overview.jpg" width="180" alt="Code Missions screen" />
  <img src="docs/screenshots/02-build-evidence-system.jpg" width="180" alt="Build Evidence screen" />
  <img src="docs/screenshots/05-evidence-vault.jpg" width="180" alt="Evidence Vault screen" />
  <img src="docs/screenshots/06-career-tracks.jpg" width="180" alt="Career Tracks screen" />
</p>

---

## 🇻🇳 Giới thiệu nhanh bằng tiếng Việt

**SkillForge AI** là một ứng dụng học nghề AI Engineering theo kiểu bootcamp offline. App không chỉ cho người học đọc bài và làm quiz, mà dẫn họ đi qua một vòng học nghiêm túc hơn:

```text
Học → Lab → Bài tập Code → Làm Project → Lưu bằng chứng → Giải thích → Xuất Portfolio
```

Mục tiêu của app là giúp người mới có nền tảng và bằng chứng thực hành để chuẩn bị ứng tuyển các vị trí entry-level như:

- AI Engineer Intern
- Junior AI App Builder
- AI Automation Assistant
- LLM Application Developer Intern
- Junior AI Solutions Builder

App **không hứa** rằng người mới chỉ đọc vài bài là trở thành Senior AI Engineer. Thay vào đó, app tập trung vào cách học thật hơn: hiểu kiến thức, làm bài tập code, lưu evidence, hoàn thành capstone và biết trình bày project trên GitHub/CV.

---

## 1. Project Summary

SkillForge AI is a mobile-first career bootcamp app that helps Vietnamese beginners move from basic AI concepts to job-ready portfolio evidence.

The app is not a simple quiz app. It uses a stricter learning loop:

```text
Learn → Lab → Code Mission → Build Project → Save Evidence → Explain → Export Portfolio
```

The goal is realistic: help learners prepare for entry-level roles such as:

- AI Engineer Intern
- Junior AI App Builder
- AI Automation Assistant
- LLM Application Developer Intern
- Junior AI Solutions Builder

It does **not** claim that a beginner becomes a Senior AI Engineer by only reading lessons.

---

## 🇻🇳 Chiến lược ngôn ngữ

SkillForge AI dùng chiến lược song ngữ rõ ràng:

| Khu vực | Ngôn ngữ |
|---|---|
| Giao diện app | Tiếng Việt-first, dễ hiểu cho người mới |
| Thuật ngữ nghề | Song ngữ Việt - Anh khi cần, ví dụ: Code Mission, Evidence Vault, Capstone, RAG |
| GitHub README | Song ngữ, có tiếng Anh để đẹp portfolio và có tiếng Việt để đúng người dùng mục tiêu |
| CV / mô tả project | Ưu tiên tiếng Anh chuyên nghiệp |
| Code / starter kits | Ưu tiên tiếng Anh để đúng chuẩn kỹ thuật |

Cách này giúp app dễ tiếp cận với người Việt mới bắt đầu, nhưng repo vẫn đủ chuyên nghiệp khi đưa vào GitHub portfolio hoặc CV.

---

## 2. Vì sao project này đáng đưa vào portfolio?

Hầu hết app học AI cho người mới chỉ dừng ở bài học và quiz. SkillForge AI tập trung vào **bằng chứng năng lực**:

- Có bài tập code thật bằng Python
- Có starter kits để người học chạy được trong terminal
- Có Evidence Vault để lưu repo, README, screenshot, terminal output, CV bullet và câu trả lời phỏng vấn
- Có Capstone 2.0 mô phỏng Document Q&A / RAG offline
- Có workflow xuất portfolio để đưa lên GitHub/CV
- Có lộ trình học nghề rõ ràng, không hứa quá mức

Project này thể hiện các năng lực quan trọng:

- Product thinking
- Mobile-first UI/UX
- Offline-first architecture
- React/Vite/Tailwind implementation
- Capacitor Android packaging
- Curriculum design for AI Engineering beginners
- Career-readiness and portfolio workflow design

---

## 3. Core Features / Tính năng chính

### Career Bootcamp System / Hệ thống bootcamp nghề nghiệp

- 100+ micro-lessons / hơn 100 bài học ngắn
- 12-week sprint roadmap / lộ trình 12 tuần
- Placement test / kiểm tra đầu vào
- 4 career tracks / 4 hướng ứng tuyển
- Skill tree / cây kỹ năng
- Spaced repetition / ôn tập lặp lại
- Weekly sprint review / review theo tuần

### Code Missions / Bài tập code

The app includes runnable starter kits in `/starter-kits`:

1. `ai-glossary-cli`
2. `csv-insight-analyzer`
3. `ml-predictor-demo`
4. `document-qa-offline`
5. `ai-automation-workflow`

Mỗi mission được thiết kế cho người mới, có output cụ thể để người học đưa vào GitHub làm bằng chứng.

### Evidence Vault / Kho bằng chứng năng lực

Learners can save:

- GitHub repo links
- README text
- terminal output
- screenshots/demo proof
- CV bullets
- interview answers
- project notes

### Capstone 2.0 / Project cuối khóa

**AI Career Capstone: Document Q&A Assistant**

Final project mô phỏng quy trình RAG-style Document Q&A offline:

```text
Local documents
→ keyword retrieval
→ grounded answer
→ source citation
→ no-answer behavior
→ evaluation test set
→ capstone report
```

### Career Tools / Công cụ ứng tuyển

- Portfolio export pack
- CV project description
- LinkedIn post template
- Mock interview defense
- Career reality check
- Production-thinking labs
- AI safety and trust module

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS 3 |
| Storage | LocalStorage |
| Mobile wrapper | Capacitor Android |
| Code missions | Python starter kits |
| Backend | None |
| Auth | None |
| AI API | None in MVP |
| Online database | None |

---

## 5. Run locally / Chạy project local

```bash
git clone https://github.com/Megatavn/skillforge-ai-bootcamp.git
cd skillforge-ai-bootcamp
npm ci
npm run dev
```

Open the forwarded Vite URL in Codespace or your browser.

---

## 6. Build web

```bash
npm run build
```

---

## 7. Build Android APK

```bash
npm run build
npm run cap:sync
cd android
./gradlew assembleDebug
```

APK output:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

> Note: Capacitor Android builds may require a compatible JDK and Android SDK in Codespace/local machine.

---

## 8. Test starter kits / Chạy thử bài tập code

```bash
python starter-kits/ai-glossary-cli/ai_glossary.py
python starter-kits/csv-insight-analyzer/analyzer.py
python starter-kits/ml-predictor-demo/train_model.py
python starter-kits/document-qa-offline/document_qa.py
python starter-kits/ai-automation-workflow/automation_workflow.py
```

---

## 9. Folder structure / Cấu trúc thư mục

```text
skillforge-ai-bootcamp/
├── .github/workflows/
├── android/
├── docs/screenshots/
├── src/
│   ├── App.jsx
│   ├── data/curriculum.js
│   ├── utils/generators.js
│   └── utils/storage.js
├── starter-kits/
│   ├── ai-glossary-cli/
│   ├── csv-insight-analyzer/
│   ├── ml-predictor-demo/
│   ├── document-qa-offline/
│   └── ai-automation-workflow/
├── README.md
├── CV_PROJECT_DESCRIPTION.md
├── GITHUB_UPLOAD_GUIDE.md
├── DESIGN_SYSTEM.md
├── REAL_BOOTCAMP_CURRICULUM.md
└── capacitor.config.json
```

---

## 10. Suggested GitHub repository description

```text
Offline-first AI Engineering career bootcamp app for Vietnamese beginners, featuring code missions, Evidence Vault, Capstone 2.0, portfolio export and interview defense.
```

Suggested topics:

```text
ai-engineering, react, vite, tailwindcss, capacitor, android, offline-first, localstorage, education, portfolio, vietnamese, career-bootcamp, rag
```

---

## 11. Suggested CV bullets

```text
Built SkillForge AI, an offline-first AI Engineering career bootcamp app for Vietnamese beginners, using React, Vite, Tailwind CSS, LocalStorage and Capacitor.
```

```text
Designed a job-readiness learning system with micro-lessons, code missions, Evidence Vault, Capstone 2.0, portfolio export, career tracks and interview defense workflows.
```

```text
Implemented runnable Python starter kits and an offline Document Q&A Assistant capstone that simulates RAG with local documents, keyword retrieval, source citation, no-answer behavior and evaluation reports.
```

---

## 12. What I learned / Những gì học được từ project

- Designed an offline-first learning product for beginner AI Engineering learners.
- Built a structured career-readiness system with lessons, code missions, evidence tracking and capstone evaluation.
- Implemented local persistence with LocalStorage.
- Packaged a React/Vite web app into Android APK using Capacitor.
- Created Python starter kits to connect learning content with hands-on project evidence.

---

## 13. Limitations / Giới hạn của MVP

This MVP is intentionally offline-first:

- No real AI API in the MVP.
- No backend, login or cloud sync.
- Capstone simulates RAG with keyword retrieval rather than embeddings/vector database.
- Production ML/MLOps concepts are represented as curriculum and learning labs, not full production infrastructure.

Bản MVP này cố tình giữ offline-first để dễ demo, dễ chạy, dễ đưa lên GitHub. Các phần AI thật, backend, cloud sync và embedding-based RAG có thể được thêm ở các phiên bản sau.

---

## 14. Roadmap / Hướng phát triển tiếp theo

- [ ] Add optional AI tutor mode with user-provided API key
- [ ] Add embedding-based RAG mode
- [ ] Add GitHub Pages / Netlify live demo
- [ ] Add more demo video/GIF previews
- [ ] Add project submission review workflow
- [ ] Add optional cloud sync and account system

---

## 15. License

MIT License.
