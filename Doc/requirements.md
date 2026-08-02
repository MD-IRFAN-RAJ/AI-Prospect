# Project Requirements

This document outlines the product requirements and core objectives of the Buyhatke Prospecting Platform.

---

## 1. Functional Requirements

### A. Company Disambiguation & Search
* The user must be able to input a generic company brand name (e.g. "boAt", "Apple").
* The system must automatically analyze the query and expand it into 4 target searches, disambiguating common nouns to resolve the correct business entity (e.g., expanding "boAt" to "boAt Lifestyle" rather than generic yacht listings).

### B. Contact Extraction
* The system must search the web and extract key decision-makers currently working at the company.
* Extracted contacts must focus specifically on **advertising, marketing partnerships, brand collaborations, and sales leadership** (e.g., Chief Marketing Officer (CMO), Head of Marketing, Brand Manager).
* The system must **strictly exclude former employees**, previous founders who left, and advisors no longer active at the company.
* Each contact profile must contain:
  * Full Name
  * Current Job Title / Role
  * Confidence Score (0-100)
  * Public Profile verification markers
  * Resolved LinkedIn Profile URL (or a targeted search query link fallback if a direct URL is unavailable in snippets).

### C. Automated Copywriting (Outreach Generation)
* The system must generate personalized outreach materials based on the company's profile and extracted contacts:
  * **Personalized Email:** A professional subject line and a structured email body targeting partnerships.
  * **LinkedIn Message:** A highly concise connection message strictly under 300 characters.

### D. User Interface & Controls
* **Premium Glassmorphism Dashboard:** Interactive visual feedback with hover animations.
* **Responsive Layout:** Adaptive styling for screen responsiveness (grid columns wrapping instead of breaking).
* **Copy-to-Clipboard:** Quick "Copy" buttons for email bodies, LinkedIn messages, and contact details.
* **Regeneration Action:** Inline "Regenerate" buttons for individual email drafts and LinkedIn messages, querying the backend `/api/email` and `/api/linkedin` endpoints to generate fresh variations.

---

## 2. Non-Functional Requirements

### A. Performance & Latency
* LLM calls must be consolidated to minimize API roundtrips and keep latency under 15 seconds per full pipeline search.

### B. Robustness & Error Resilience
* In case of Tavily search failures or Gemini API rate limit blocks, the system must gracefully degrade and return safe mock/fallback profiles rather than crashing the client or server.

### C. Reliability
* Extracted data must parse correctly as valid JSON, preventing malformed strings from causing application crashes.
