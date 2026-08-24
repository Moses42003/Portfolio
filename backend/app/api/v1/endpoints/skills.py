from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.skill import Skill
from app.schemas.skill import SkillCreate, SkillOut

router = APIRouter()


@router.get("", response_model=list[SkillOut])
def list_skills(db: Session = Depends(get_db)) -> list[Skill]:
    return db.query(Skill).order_by(Skill.order_index).all()


@router.get("/{skill_id}", response_model=SkillOut)
def get_skill(skill_id: int, db: Session = Depends(get_db)) -> Skill:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    return skill


@router.post("", response_model=SkillOut)
def create_skill(payload: SkillCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Skill:
    skill = Skill(**payload.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.put("/{skill_id}", response_model=SkillOut)
def update_skill(skill_id: int, payload: SkillCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Skill:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    for key, value in payload.model_dump().items():
        setattr(skill, key, value)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(skill_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    db.delete(skill)
    db.commit()
