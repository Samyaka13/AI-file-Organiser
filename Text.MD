
# Folder Organiser

A small Node.js/TypeScript service to scan, analyze and organize files into categories.

## Summary

Organizes files on disk using configurable category rules and AI-assisted classification. The project exposes a set of HTTP endpoints to scan directories, extract metadata/text, and move files into destination folders. It includes utilities for dry-run mode and undo logging.

## Features

- Scan file system for files to process
- Extract text (OCR) and metadata from files
- Categorize files using rule-based and AI-assisted helpers
- Move files safely with dry-run and undo support

## Repo structure (key files)

- `src/app.ts`, `src/index.ts`: app bootstrap
- `src/routes/*`: API routes (`scan`, `analyze`, `extract`, `organize`)
- `src/controllers/*`: request handlers
- `src/services/*`: core organizing logic
- `src/utils/*`: helpers (OCR, similarity, category decision, move helper, undo logger)
- `src/data/categories.json`: category definitions

## Prerequisites

- Node.js 18+ and npm
- Tesseract `eng.traineddata` (included in repo)
- Optional: environment variables in `.env` (see below)

## Install

Install dependencies:

```
npm install
```

## Run (development)

```
npm run dev
```

## Environment

Create a `.env` file in the project root as needed. Typical variables the app may read (add or adapt in your environment):

- `PORT` — HTTP port (default 8000)
- `GEMINI_API_KEY` - Your Gemini API key

## API (overview)

The app exposes simple REST endpoints (prefixed with `/api` by default). Example endpoints:

- `POST /api/scan` — scan a path for files to process
- `POST /api/analyze` — run analysis (category suggestions) on a file or set
- `POST /api/extract` — extract text/metadata from a file
- `POST /api/organize` — perform organization (move files)

Check the route implementations in `src/routes` for request payload specifics and additional query options.

## Data files

- `src/data/categories.json` — category definitions and rules
- `src/data/undo-log.json` — recorded moves for undo support

## Development notes

- Use dry-run mode (see `dryRunMove` util) to preview changes before moving files
- Undo operations are logged and can be replayed using the undo logger
- Category decision helpers live in `src/utils` and can be extended to add new classification logic

## Contributing

PRs welcome. Please open issues for bugs or feature requests.

