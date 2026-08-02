# Search & AI Processing Pipeline

This document explains the technical sequence, data structures, and pipeline flow that executes whenever a prospecting query is submitted.

---

## 1. Pipeline Architecture Diagram

```mermaid
sequenceDiagram
    participant UI as React Client
    participant Server as Express Server
    participant Gemini as Gemini API (3.5-flash-lite)
    participant Tavily as Tavily Search API
    participant DB as Supabase DB

    UI->>Server: POST /api/search { company: "boAt" }
    
    Note over Server, Gemini: Step 1: Disambiguation & Query Expansion
    Server->>Gemini: generateJSON(buildSearchQueriesPrompt)
    Gemini-->>Server: JSON array: ["boAt Lifestyle website...", "boAt current CMO...", ...]

    Note over Server, Tavily: Step 2: Parallel Search Execution
    Server->>Tavily: 4 parallel searches for website, news, and LinkedIn profiles
    Tavily-->>Server: Combined snippets (URL & text content)

    Note over Server, Gemini: Step 3: Joint Profiling & Contact Extraction
    Server->>Gemini: generateJSON(buildCompanyAndContactsPrompt)
    Gemini-->>Server: JSON (Profile, Notes, extracted CURRENT marketing executives)

    Note over Server: Step 4: Fallback Search URL Construction
    Server->>Server: Construct pre-filled LinkedIn search links for empty profiles

    Note over Server, Gemini: Step 5: Outreach Material Copywriting
    Server->>Gemini: generateJSON(buildOutreachPrompt)
    Gemini-->>Server: JSON (Fit Headline, Email Subject/Body, LinkedIn Intro)

    Note over Server, DB: Step 6: Caching & Persistence
    Server->>DB: Save searches and companies (asynchronously)
    
    Server-->>UI: 200 OK (Full prospect payload)
    UI->>UI: Render Glassmorphism Dashboard
```

---

## 2. Step-by-Step Data Flow

### Step 1: Query Disambiguation (Gemini)
* **Goal:** Expand generic names into specific search terms.
* **Input:** Raw search string (e.g. `"boAt"`).
* **Prompt:** `buildSearchQueriesPrompt`
* **Output:** Exact 4-query string array (e.g. `["boAt Lifestyle website...", "boAt Lifestyle current CMO...", ...]`).

### Step 2: Web Signal Ingestion (Tavily)
* **Goal:** Fetch real-time web context.
* **Execution:** Parallel HTTP `POST` requests to Tavily Search API.
* **Format:** Mapped into `SourceRecord` objects containing both the `URL` and the text `Content` so that Gemini can read profile links.

### Step 3: Company Profiling & Contact Extraction (Gemini)
* **Goal:** Extract structured data for the company and its active leadership.
* **Prompt:** `buildCompanyAndContactsPrompt`
* **Output:** JSON object containing:
  * Company profile details (summary, website, recent launches, custom notes).
  * Array of key contacts currently working at the company, specifically focused on CMOs, Brand leads, and marketing partnership directors.

### Step 4: Contact Link Refinement (Backend Server)
* **Goal:** Ensure all LinkedIn buttons are functional.
* **Logic:** If the search snippet did not yield a direct profile URL for a contact, the server constructs a pre-targeted LinkedIn search query link:
  `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(Name + ' ' + Company)}`

### Step 5: Copywriting Outreach Drafts (Gemini)
* **Goal:** Draft personalized emails and LinkedIn intro messages.
* **Prompt:** `buildOutreachPrompt`
* **Output:** JSON object containing email subject/body, LinkedIn connection text (under 300 characters), and an AI fit confidence score.

### Step 6: Logging & Delivery
* **Goal:** Store history and return results.
* **Logic:** Saves queries and profiles asynchronously to Supabase.
* **Response:** Returns the structured data payload to the client.
