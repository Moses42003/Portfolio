from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.core.config import get_settings
from app.core.security import get_password_hash
from app.db.models.admin import AdminUser
from app.db.models.blog import Article, Category
from app.schemas.blog import CategoryOut
from app.db.models.contact import ContactMessage
from app.db.models.experience import Experience
from app.db.models.profile import Profile
from app.db.models.project import Project
from app.db.models.skill import Skill
from app.db.models.testimonial import Testimonial
from app.schemas.profile import ProfileCreate

router = APIRouter()
settings = get_settings()


@router.get("/dashboard")
def dashboard_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    return {
        "profile": db.query(Profile).count(),
        "projects": db.query(Project).count(),
        "skills": db.query(Skill).count(),
        "experience": db.query(Experience).count(),
        "articles": db.query(Article).count(),
        "messages": db.query(ContactMessage).count(),
        "testimonials": db.query(Testimonial).count(),
    }


@router.get("/me")
def get_me(admin=Depends(get_current_admin)) -> dict:
    return {"id": admin.id, "email": admin.email, "full_name": admin.full_name}


@router.post("/seed")
def seed_admin(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    if db.query(AdminUser).filter(AdminUser.email == settings.admin_email).first() is None:
        db.add(
            AdminUser(
                email=settings.admin_email,
                full_name="Administrator",
                password_hash=get_password_hash(settings.admin_password),
                is_active=True,
            )
        )
        db.commit()
    return {"status": "ok"}


@router.get("/profile")
def get_admin_profile(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return {"id": profile.id, "name": profile.name, "title": profile.title, "email": profile.email}


@router.put("/profile")
def update_admin_profile(payload: ProfileCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    profile = db.query(Profile).first()
    if profile is None:
        profile = Profile(**payload.model_dump())
        db.add(profile)
    else:
        for key, value in payload.model_dump().items():
            setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return {"status": "updated", "id": profile.id}

@router.get("/categories", response_model=list[CategoryOut])
def list_admin_categories(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """List categories (admin view)."""
    return db.query(Category).all()
