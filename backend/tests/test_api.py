from fastapi.testclient import TestClient

from app.core.security import get_password_hash
from app.db.models.admin import AdminUser
from app.db.models.project import Project
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


def test_admin_project_crud() -> None:
    init_db()
    db = SessionLocal()
    db.query(Project).delete()
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
        login = client.post(
            "/api/v1/auth/login",
            json={"email": "admin@moses.dev", "password": "admin123"},
        )
        token = login.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        create = client.post(
            "/api/v1/admin/projects",
            json={
                "title": "Test Project",
                "slug": "test-project",
                "summary": "Short summary",
                "description": "Long description",
                "featured": True,
                "status": "published",
                "order_index": 1,
                "technology_ids": [],
            },
            headers=headers,
        )
        assert create.status_code == 200, create.text
        project_id = create.json()["id"]

        list_response = client.get("/api/v1/admin/projects", headers=headers)
        assert list_response.status_code == 200
        assert any(item["id"] == project_id for item in list_response.json())

        update = client.put(
            f"/api/v1/admin/projects/{project_id}",
            json={
                "title": "Updated Test Project",
                "slug": "updated-test-project",
                "summary": "Updated summary",
                "description": "Updated description",
                "featured": True,
                "status": "published",
                "order_index": 2,
                "technology_ids": [],
            },
            headers=headers,
        )
        assert update.status_code == 200, update.text
        assert update.json()["title"] == "Updated Test Project"

        delete = client.delete(f"/api/v1/admin/projects/{project_id}", headers=headers)
        assert delete.status_code == 204, delete.text
