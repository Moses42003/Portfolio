from fastapi.testclient import TestClient

from app.core.security import get_password_hash
from app.db.models.admin import AdminUser
from app.db.models.blog import Article
from app.db.models.experience import Experience
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
        assert payload["user"]["email"] == "admin@moses.dev"

        me_response = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {payload['access_token']}"},
        )
        assert me_response.status_code == 200
        assert me_response.json()["email"] == "admin@moses.dev"


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

        public_by_slug = client.get("/api/v1/projects/updated-test-project")
        assert public_by_slug.status_code == 200, public_by_slug.text
        assert public_by_slug.json()["title"] == "Updated Test Project"

        delete = client.delete(f"/api/v1/admin/projects/{project_id}", headers=headers)
        assert delete.status_code == 204, delete.text


def test_public_experience_and_blog_routes() -> None:
    init_db()
    db = SessionLocal()
    db.query(Article).delete()
    db.query(Experience).delete()
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

        unauthenticated = client.post(
            "/api/v1/admin/experience",
            json={
                "company": "Acme",
                "role": "Engineer",
                "location": "Remote",
                "start_date": "2024-01-01",
                "description": "Built APIs and frontend systems.",
                "current": True,
                "order_index": 1,
            },
        )
        assert unauthenticated.status_code == 401

        create_experience = client.post(
            "/api/v1/admin/experience",
            json={
                "company": "Acme",
                "role": "Engineer",
                "location": "Remote",
                "start_date": "2024-01-01",
                "end_date": "",
                "description": "Built APIs and frontend systems.",
                "current": True,
                "order_index": 1,
            },
            headers=headers,
        )
        assert create_experience.status_code == 200, create_experience.text

        public_experience = client.get("/api/v1/experience")
        assert public_experience.status_code == 200, public_experience.text
        assert any(item["company"] == "Acme" for item in public_experience.json())

        create_post = client.post(
            "/api/v1/admin/blog/posts",
            json={
                "title": "Shipping the portfolio",
                "slug": "shipping-the-portfolio",
                "excerpt": "Notes on launching the site.",
                "content": "A longer markdown article about the launch.",
                "published": "true",
                "featured": False,
            },
            headers=headers,
        )
        assert create_post.status_code == 200, create_post.text

        public_posts = client.get("/api/v1/blog/posts")
        assert public_posts.status_code == 200, public_posts.text
        assert any(item["slug"] == "shipping-the-portfolio" for item in public_posts.json())

        public_post = client.get("/api/v1/blog/posts/shipping-the-portfolio")
        assert public_post.status_code == 200, public_post.text
        assert public_post.json()["title"] == "Shipping the portfolio"


def test_settings_are_reflected_in_public_profile() -> None:
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
        login = client.post(
            "/api/v1/auth/login",
            json={"email": "admin@moses.dev", "password": "admin123"},
        )
        token = login.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        client.put(
            "/api/v1/admin/profile",
            json={
                "name": "Moses Dev",
                "title": "Full-Stack Developer",
                "bio": "I build products.",
                "location": "Accra",
                "email": "old@example.com",
                "phone": "+233000000000",
                "website": "https://old.example.com",
                "linkedin": "https://linkedin.com/in/old",
                "github": "https://github.com/old",
                "headline": "Developer",
                "summary": "Summary",
                "status": "active",
            },
            headers=headers,
        )

        settings_response = client.put(
            "/api/v1/admin/settings",
            json={
                "settings": {
                    "name": "Moses Dev",
                    "brand": "MOSES DEV",
                    "email": "hello@new.example.com",
                    "phone": "+233123456789",
                    "canonical_url": "https://new.example.com",
                }
            },
            headers=headers,
        )
        assert settings_response.status_code == 200, settings_response.text

        public_profile = client.get("/api/v1/profile")
        assert public_profile.status_code == 200, public_profile.text
        body = public_profile.json()
        assert body["email"] == "hello@new.example.com"
        assert body["phone"] == "+233123456789"
        assert body["name"] == "Moses Dev"
        assert body["website"] == "https://new.example.com"
