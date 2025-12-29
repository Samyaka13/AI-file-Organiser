#  AI-Powered Folder Organizer

An **AI-driven file organization system** that automatically scans a folder (like Downloads), understands file content using OCR + AI embeddings, creates intelligent categories, and safely organizes files into structured folders — **with undo support**.

This project is designed with **real-world safety, scalability, and extensibility** in mind.

---

##  Features

*  **AI-based understanding** of files (images, PDFs, documents)
*  **Automatic category creation** using Gemini AI
*  **Batch organization** of an entire folder
*  **Dry-run safety checks** before moving files
*  **Undo / rollback support** for file moves
*  **Persistent memory** of categories (JSON-based)
*  **Modular architecture** (services, utils, controllers)
*  Runs **automatically on server start**

---

##  Architecture Overview

```
Downloads (Source Folder)
   
Text Extraction (OCR / Parser)
   
AI Embeddings (Gemini)
   
Similarity Matching
   
Decision Engine
   
Category Creation / Reuse
   
Safe File Move
   
Undo Log
```

---

##  Folder Structure (Important Files)

```
src/
 controllers/
    organize.controller.ts
 services/
    organizeFile.service.ts
    batchOrganizer.service.ts
 utils/
    textExtractor.ts
    embedding.service.ts
    similarity.ts
    moveFileSafe.ts
    dryRunMove.ts
    undoLogger.ts
 repositories/
    category.repository.ts
 data/
    categories.json
    undo-log.json
 routes/
    organize.routes.ts
 app.ts
 index.ts
```

---

##  Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

 **Never commit your real API key to GitHub**
Add `.env` to `.gitignore`.

---

##  Installation

### 1 Clone the repository

```bash
git clone <your-repo-url>
cd folder-organizer
```

### 2 Install dependencies

```bash
npm install
```

### 3 Create required folders

```bash
mkdir src/data
mkdir C:/Users/samya/OrganizedDownloads
```

---

##  Running the Project

```bash
npm run dev
```

On startup, the server will:

1. Start Express
2. Automatically scan the target folder
3. Organize files one-by-one using AI
4. Log all moves safely

---

##  Configuration (VERY IMPORTANT)

### Source folder (to scan)

```ts
const TARGET_FOLDER = "C:/Users/samya/Downloads";
```

### Destination folder (organized output)

```ts
const BASE_DIR = "C:/Users/samya/OrganizedDownloads";
```

 **These two folders must NEVER be the same**
 **They must NEVER overlap**

A safety guard is recommended:

```ts
if (
  BASE_DIR.startsWith(TARGET_FOLDER) ||
  TARGET_FOLDER.startsWith(BASE_DIR)
) {
  throw new Error("Invalid folder configuration");
}
```

---

##  Testing Safely (Recommended)

Before using real Downloads:

1. Create a test folder:

   ```
   Desktop/test-downloads
   ```
2. Put sample files inside
3. Point `TARGET_FOLDER` to it
4. Run the server
5. Verify output in `OrganizedDownloads`

---

##  Undo / Rollback

Every file move is logged in:

```
src/data/undo-log.json
```

Each entry contains:

```json
{
  "from": "original path",
  "to": "new path",
  "movedAt": "timestamp"
}
```

This allows:

* Manual rollback
* Future undo APIs
* Safety auditing

---

##  Safety Guarantees

*  Never overwrites files
*  Never processes directories
*  Never recurses into organized folders
*  Absolute paths only
*  One file processed at a time
*  Errors dont stop batch execution

---

##  AI Stack

* **Google Gemini** – category naming & embeddings
* **OCR / Text extraction** – images, PDFs, documents
* **Cosine similarity** – semantic matching
* **Rule-based decision engine** – deterministic safety

---

##  Tech Stack

* Node.js
* TypeScript
* Express
* Google Gemini API
* File System (fs)
* JSON-based persistence

---

##  Future Enhancements

*  Real-time folder watcher (auto-organize new files)
*  CLI interface
*  Web UI dashboard
*  One-click undo
*  Config file for exclusions & thresholds
*  Category analytics

---

##  Disclaimer

This project **moves real files on disk**.
Always test with a sandbox folder before using real data.

---

##  Author

Built by **Samyak Ajmera**
Focused on **real-world engineering, safety, and AI integration**.


