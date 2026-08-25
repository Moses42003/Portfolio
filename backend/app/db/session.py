from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings
from app.db.base import Base

settings = get_settings()
engine = create_engine(settings.database_url, connect_args={"check_same_thread": False} if settings.database_url.startswith("sqlite") else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)

    # Ensure a default profile exists so public endpoints return usable data
    try:
        from app.db.models.profile import Profile

        db = SessionLocal()
        try:
            if db.query(Profile).first() is None:
                db.add(Profile(name="Your Name", title="Developer", bio=""))
                db.commit()
        finally:
            db.close()
    except Exception:
        # If models are not available or DB is inaccessible during migration,
        # swallow errors to avoid startup crash; tables will be created by Alembic/init.
        pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
