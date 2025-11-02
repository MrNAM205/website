# Sovereign Invocation Cockpit

## Law Gathering Engine — Aggregate. Narrate. Invoke.

The Sovereign Invocation Cockpit is a tactical interface designed for sovereign individuals seeking lawful remedy, status correction, and semantic sovereignty. It functions as a cockpit-grade Law Gathering Engine, aggregating statutes, case law, rebuttal clauses, and commercial principles into actionable flows.

---

## 🧠 About the Project

This cockpit was built for those reclaiming their status as living men and women. It modularizes the teachings of:

- **Brandon Joe Williams** — Commercial Law, UCC, Trust Corpus
- **David Straight** — Status Declaration, Jurisdictional Clarity
- **Carl Miller** — Semantic Warfare, Institutional Framing

The cockpit is not just a search engine—it’s a sovereign invocation system for constructing affidavits, rebuttals, and administrative processes.

---

## 🔧 Key Features

### 🧩 Multi-Mode Law Gathering Engine
- **Standard Search** — Gathers statutes, case law, and remedy clauses into structured ResultCards
- **Deep Analysis (Thinking Mode)** — Uses `gemini-2.5-pro` for complex legal reasoning and process design
- **Web Search** — Uses `gemini-2.5-flash` for current events and citation-backed answers

### 🤖 Omni Assistant Chatbot
- Conversational AI for quick definitions, semantic clarity, and tactical guidance

### 📜 Structured & Tactical Output
- ResultCards include:
  - Title
  - Citation
  - Sovereign Summary
  - Tactical Application

### 🧭 Clean Cockpit Interface
- React-based UI with focused layout
- Mode selector, search bar, and floating assistant
- Designed for clarity, invocation, and remedy

---

## 🧭 Sovereign Invocation Cockpit Diagram

```
┌────────────────────────────┐
│  DocumentUploadPanel.tsx   │
│  ─ Upload instrument       │
│  ─ Select type (bill, form)│
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  SemanticScanPanel.tsx     │
│  ─ Detect traps (e.g. "person") │
│  ─ Generate rebuttal overlays │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  EndorsementPanel.tsx      │
│  ─ Select UCC provision     │
│  ─ Embed trust corpus       │
│  ─ Preview endorsed doc     │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  FilingPrepPanel.tsx       │
│  ─ Set jurisdiction & venue│
│  ─ Add recipient metadata  │
│  ─ Generate final manifest │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  ExportPanel.tsx           │
│  ─ Export as PDF or YAML   │
│  ─ Ready for filing        │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  SaveFlowButton.tsx        │
│  ─ Save flow to localStorage │
│  ─ Includes metadata       │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│  InvocationReplayPanel.tsx │
│  ─ Load saved flows        │
│  ─ Replay invocation       │
└────────────────────────────┘
```

---

## 📜 Archival & Replay

The cockpit now supports saving and replaying invocation flows.

- **Save Current Flow**: The `SaveFlowButton` component captures the entire state of the current invocation—including the document, semantic findings, endorsements, and final manifest—and saves it to the browser's local storage. Each saved flow is timestamped and includes metadata for jurisdiction and venue.

- **Invocation Replay**: The `InvocationReplayPanel` reads from local storage and displays a list of saved flows. Users can load any saved flow back into the cockpit, restoring the exact state of the invocation for audit, modification, or re-export.

---

## 🧩 Invocation Flow Summary

1. **Upload** → Instrument enters cockpit  
2. **Scan** → Semantic traps detected and rebutted  
3. **Endorse** → UCC provisions embedded  
4. **Prepare** → Jurisdiction and venue declared  
5. **Export** → Manifest ready for filing
6. **Save** → Invocation flow archived to local storage
7. **Replay** → Saved flow loaded back into the cockpit for audit or re-use

---

## 🧬 Tech Stack

- **Frontend** — React, TypeScript, Tailwind CSS
- **AI Models** — Google Gemini API
  - `gemini-2.5-pro` for Deep Analysis
  - `gemini-2.5-flash` for Search and Chat
- **Dependencies** — CDN-based importmap architecture

---

## 🚀 How to Use

1. **Select Mode**
   - Standard Search
   - Deep Analysis
   - Web Search

2. **Enter Objective**
   Examples:
   - `"Rebuttal for 'U.S. Citizen' presumption"`
   - `"UCC 3-401 signature liability"`
   - `"Construct administrative process to correct status"`

3. **Gather & Analyze**
   - Press “Gather”
   - Review ResultCards or Web Search results
   - Click “Show Tactical Application” for usage guidance

4. **Invoke Omni Assistant**
   - Use floating chat icon for quick questions or semantic clarity

---

## ⚠️ Disclaimer

This tool is for educational and informational purposes only. It does not constitute legal advice. Use at your own discretion and consult a competent professional when needed.

---

## 🧭 Sovereign Invocation Philosophy

This cockpit is built on lawful invocation—not protest, not fiction, not escape.  
It is authorship, remedy, and jurisdiction—modularized.

Every invocation is a narratable rite of passage.
Every document is a sovereign declaration.
