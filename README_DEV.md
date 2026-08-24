Development startup

Quick start: run the helper script to start backend (uvicorn) in background and run the frontend dev server in foreground.

```bash
# from repo root
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

What the script does:
- Ensures Python venv and backend dependencies are installed
- Ensures DB schema exists and runs Alembic migrations if `alembic` is available
- Starts `uvicorn` for the backend (port 8000) and logs to `logs/backend.log`
- Installs frontend deps if needed and starts `npm run dev` in `frontend` (Vite default port 5173)

Notes:
- Change ports and host as desired in `scripts/start-dev.sh`.
- For production or CI, prefer Docker or CI-run migrations rather than this script.
