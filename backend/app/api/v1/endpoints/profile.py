from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.profile import Profile
from app.db.models.setting import Setting
from app.schemas.profile import ProfileCreate, ProfileOut

router = APIRouter()


def _apply_settings_overrides(profile: Profile, db: Session) -> dict:
    settings = {item.key: item.value for item in db.query(Setting).all()}
    payload = {
        "id": profile.id,
        "name": profile.name,
        "title": profile.title,
        "bio": profile.bio,
        "location": profile.location,
        "email": profile.email,
        "phone": profile.phone,
        "website": profile.website,
        "linkedin": profile.linkedin,
        "github": profile.github,
        "avatar_url": profile.avatar_url,
        "headline": profile.headline,
        "summary": profile.summary,
        "status": profile.status,
    }

    if settings.get("brand") and not payload["name"]:
        payload["name"] = settings["brand"]
    if settings.get("name"):
        payload["name"] = settings["name"]
    if settings.get("email"):
        payload["email"] = settings["email"]
    if settings.get("phone"):
        payload["phone"] = settings["phone"]
    if settings.get("canonical_url"):
        payload["website"] = settings["canonical_url"]
    if settings.get("brand") and not payload["title"]:
        payload["title"] = settings["brand"]

    return payload


@router.get("", response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)) -> Profile:
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

    response = _apply_settings_overrides(profile, db)
    return response


@router.put("", response_model=ProfileOut)
def update_profile(payload: ProfileCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Profile:
    profile = db.query(Profile).first()
    if profile is None:
        profile = Profile(**payload.model_dump())
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return _apply_settings_overrides(profile, db)

    for key, value in payload.model_dump().items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return _apply_settings_overrides(profile, db)
