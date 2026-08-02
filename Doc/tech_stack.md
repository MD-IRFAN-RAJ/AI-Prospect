# Project Technology Stack

The platform utilizes a modern web stack engineered for fast, asynchronous operations, beautiful user interfaces, and robust AI integrations.

---

## 1. Frontend Client
* **Framework:** React 18 + TypeScript + Vite.
* **Styling:** Tailwind CSS (utility-first styles for rapid layout construction) and custom Glassmorphism tokens.
* **Component Framework & Icons:** Lucide React for consistent vector symbols.
* **State Management:** React Context API (`SearchContext.tsx`) for global query, loading states, and retrieval data dispatching.
* **HTTP Client:** Axios for querying backend endpoints.
* **Animations:** Framer Motion for premium, smooth micro-interactions.

---

## 2. Backend API Server
* **Runtime:** Node.js v18+.
* **Web Framework:** Express with TypeScript.
* **Development Engine:** `tsx watch` for active server reload and ESM-compatible execution.
* **Environment Validation:** Zod validator (`backend/src/config/env.ts`) to ensure mandatory API credentials are present at boot.
* **Middleware:** Cors (for cross-origin requests), custom global error handlers, and 404 router fallbacks.

---

## 3. Databases & Repositories
* **Store Provider:** Supabase (PostgreSQL engine).
* **Connection Client:** `@supabase/supabase-js` client library.
* **Data Schema:** 
  * `companies`: Stores analyzed company summary metadata, industry, website, launches, and custom notes.
  * `search_history`: Retains queries and timestamps for recent searches.

---

## 4. Artificial Intelligence & Web APIs
* **AI Model SDK:** `@google/genai` (v2.15.0).
* **AI Model Used:** `gemini-3.5-flash-lite`.
  * *Reason:* Provides high speed, native JSON output formatting, and cost-efficient extraction.
* **Web Search Engine:** Tavily Search API.
  * *Reason:* Tailored specifically for LLM-RAG retrieval, returning structured web snippets (content and URL) rather than raw HTML.
