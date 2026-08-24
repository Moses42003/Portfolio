from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.experience import Experience
from app.schemas.experience import ExperienceCreate, ExperienceOut

router = APIRouter()


@router.get("", response_model=list[ExperienceOut])
def list_experiences(db: Session = Depends(get_db)) -> list[Experience]:
    return db.query(Experience).order_by(Experience.order_index).all()


@router.get("/{experience_id}", response_model=ExperienceOut)
def get_experience(experience_id: int, db: Session = Depends(get_db)) -> Experience:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    return experience


@router.post("", response_model=ExperienceOut)
def create_experience(payload: ExperienceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Experience:
    experience = Experience(**payload.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience


@router.put("/{experience_id}", response_model=ExperienceOut)
def update_experience(experience_id: int, payload: ExperienceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Experience:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    for key, value in payload.model_dump().items():
        setattr(experience, key, value)
    db.commit()
    db.refresh(experience)
    return experience


@router.delete("/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_experience(experience_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    db.delete(experience)
    db.commit()
