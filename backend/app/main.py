from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.api import api_router
from app.core.config import get_settings
from app.db.session import init_db

settings = get_settings()

STATIC_DIR = Path("static")
STATIC_DIR.mkdir(exist_ok=True)
( STATIC_DIR / "uploads" ).mkdir(exist_ok=True)

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Portfolio CMS and public API for the portfolio site.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_prefix)
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")


@app.on_event("startup")
def startup_event() -> None:
    init_db()


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
