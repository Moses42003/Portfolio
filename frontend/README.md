# MOSES DEV Portfolio Frontend

Production-oriented React frontend for a personal full-stack developer portfolio and admin dashboard.

## Stack

React, TypeScript, Vite, React Router, Tailwind CSS, TanStack React Query, React Hook Form, Zod, Framer Motion, Lucide React, and React Markdown.

## Setup

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` when local overrides are needed.

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCK_API=false
```

Set `VITE_USE_MOCK_API=true` only when you want to use the built-in mock data instead of FastAPI.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run typecheck`
- `npm run format`

## Architecture

The UI consumes data through `src/services/api/client.ts`, endpoint definitions in `src/services/api/endpoints.ts`, and React Query hooks in `src/features/*/hooks.ts`. Mock data lives in `src/services/api/mock` only.

Public routes live under `/`. Admin routes live under `/admin` and are protected by `AuthProvider` plus `ProtectedRoute`.
