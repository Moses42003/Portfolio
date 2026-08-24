from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileOut

router = APIRouter()


@router.get("", response_model=ProfileOut)
def get_profile(db: Session = Depends(get_db)) -> Profile:
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return profile


@router.put("", response_model=ProfileOut)
def update_profile(payload: ProfileCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Profile:
    profile = db.query(Profile).first()
    if profile is None:
        profile = Profile(**payload.model_dump())
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

    for key, value in payload.model_dump().items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return profile
