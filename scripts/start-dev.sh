#!/usr/bin/env bash
set -euo pipefail

# dev runner: starts backend in background and frontend in foreground
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR/backend"

# setup venv if missing
if [ ! -d ".venv" ]; then
  python3 -m venv .venv
fi
# activate
. .venv/bin/activate
# install deps if missing
if [ ! -f ".venv/.installed" ]; then
  pip install -r requirements.txt
  touch .venv/.installed
fi

# ensure DB schema exists
python -c "from app.db.session import init_db; init_db()"

# run alembic migrations (if alembic available). Run via python -m alembic with PYTHONPATH so env.py can import `app`.
if command -v python >/dev/null 2>&1; then
  PYTHONPATH="$ROOT_DIR/backend" python -m alembic upgrade head || true
fi

# start backend in background, log to logs/backend.log
mkdir -p "$ROOT_DIR/logs"
nohup uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 > "$ROOT_DIR/logs/backend.log" 2>&1 &
BACKEND_PID=$!
echo "Backend started (pid=$BACKEND_PID), logs: $ROOT_DIR/logs/backend.log"

# start frontend in foreground
cd "$ROOT_DIR/frontend"
if [ ! -d "node_modules" ]; then
  npm install
fi
npm run dev

# when frontend exits, stop backend
echo "Stopping backend (pid=$BACKEND_PID)"
kill $BACKEND_PID || true
