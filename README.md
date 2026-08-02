# Buyhatke Prospecting Platform

An AI-driven sales intelligence and prospect discovery platform. It automatically expands search queries to disambiguate target companies, retrieves high-quality web signals, extracts current key decision-makers (specifically focused on advertising and marketing partnerships), and drafts personalized email and LinkedIn outreach materials.

---

## Directory Overview

The project is split into a frontend React application and an Express backend API:

```text
buyhatke/
├── backend/
│   ├── src/
│   │   ├── ai/              # Gemini SDK client setup
│   │   ├── config/          # Environment and Supabase configs
│   │   ├── controllers/     # API request handlers (search, history)
│   │   ├── middleware/      # Error handling & 404 middleware
│   │   ├── prompts/         # Consolidated prompts (combined.prompt.ts)
│   │   ├── routes/          # Express route registration
│   │   ├── services/        # Business logic (search, outreach, contacts)
│   │   └── supabase/        # Database client & repository handlers
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI Cards, Layout, Navbar, Footer
│   │   ├── features/        # Search context state & providers
│   │   ├── layouts/         # Base glassmorphism layout
│   │   ├── pages/           # Landing page / Dashboard
│   │   ├── routes/          # React Router configuration
│   │   ├── services/        # Search API consumer client
│   │   └── main.tsx
│   └── package.json
│
└── Doc/                 # Technical documentation
```

---

## Environment Setup

### 1. Backend Environment (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=4000
GEMINI_API_KEY="your-google-ai-studio-api-key"
TAVILY_API_KEY="your-tavily-api-key"
SUPABASE_URL="your-supabase-project-url"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 2. Frontend Environment (`frontend/.env`)
Create a `.env` file in the `frontend/` directory if you need to point to a custom API port (defaults to `http://localhost:4000`):
```env
VITE_API_URL="http://localhost:4000"
```

---

## Quickstart

### 1. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
The backend starts a server using `tsx watch` at `http://localhost:4000`.

### 2. Start the Frontend Application
```bash
cd ../frontend
npm install
npm run dev
```
The Vite development server starts, usually at `http://localhost:5173`.
