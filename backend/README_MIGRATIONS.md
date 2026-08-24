Alembic migrations and seed usage

To run the Alembic seed migration that inserts the default admin user:

1) Activate the project's Python environment and install dependencies:

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

2) Ensure the database schema exists (the app's `init_db()` creates tables):

```bash
python -c "from app.db.session import init_db; init_db(); print('schema ready')"
```

3) Run Alembic upgrade to apply the seed migration:

```bash
cd backend
. .venv/bin/activate
alembic upgrade head
```

If `alembic` is not on PATH, run with `python -m alembic upgrade head` from the `backend` folder.

Notes:
- The seed migration will insert the default admin user `admin@moses.dev` with password `admin123` if it doesn't already exist.
- For production, change credentials and `JWT_SECRET_KEY` in the `.env` file before running migrations.
