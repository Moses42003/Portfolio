from fastapi.testclient import TestClient

from app.core.security import get_password_hash
from app.db.models.admin import AdminUser
from app.db.session import SessionLocal, init_db
from app.main import app


def test_health_and_login() -> None:
    # Ensure database tables exist before manipulating entries
    init_db()
    db = SessionLocal()
    db.query(AdminUser).delete()
    db.add(
        AdminUser(
            email="admin@moses.dev",
            full_name="Admin",
            password_hash=get_password_hash("admin123"),
            is_active=True,
        )
    )
    db.commit()
    db.close()

    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"

        login_response = client.post(
            "/api/v1/auth/login",
            json={"email": "admin@moses.dev", "password": "admin123"},
        )
        assert login_response.status_code == 200
        payload = login_response.json()
        assert "access_token" in payload
        assert "refresh_token" in payload
