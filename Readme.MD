# 📂 AI-Powered Folder Organizer

![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue) ![Gemini API](https://img.shields.io/badge/AI-Gemini-orange) ![License](https://img.shields.io/badge/License-MIT-yellow)

An AI-driven file organization system that automatically scans a source folder (e.g., Downloads), understands file content using **OCR + AI embeddings**, creates intelligent categories, and safely organizes files into structured folders.

This project is designed with real-world safety, scalability, and extensibility in mind—featuring **dry-run checks**, **undo support**, and **persistent memory**.

---

## 🚀 Features

* **🧠 AI-based Understanding:** Analyzes content of images, PDFs, and documents (not just file extensions).
* **📁 Automatic Categorization:** Uses Google Gemini AI to determine the best folder name.
* **🔁 Batch Organization:** Scans and processes entire directories automatically.
* **🛑 Safety First:** Includes dry-run checks to prevent data loss or overwrites.
* **🔄 Undo / Rollback:** Logs every move to a JSON file, allowing for manual or programmatic rollback.
* **🧩 Persistent Memory:** Remembers past categories to maintain consistency.
* **⚙️ Modular Architecture:** Clean separation of concerns (Services, Controllers, Utils).

---

## 📁 Folder Structure
src/
├── controllers/
│   └── organize.controller.ts    # Handles the request flow
├── services/
│   ├── organizeFile.service.ts   # Logic for single file processing
│   └── batchOrganizer.service.ts # Logic for directory scanning
├── utils/
│   ├── textExtractor.ts          # OCR & Text parsing
│   ├── embedding.service.ts      # Gemini Embedding generation
│   ├── similarity.ts             # Cosine similarity math
│   ├── moveFileSafe.ts           # OS-level file operations
│   ├── dryRunMove.ts             # Simulation logic
│   └── undoLogger.ts             # JSON logging
├── repositories/
│   └── category.repository.ts    # JSON persistence layer
├── data/
│   ├── categories.json           # Learned categories storage
│   └── undo-log.json             # History of file moves
├── routes/
│   └── organize.routes.ts
├── app.ts
└── index.ts

## 🔐 Environment Variables
