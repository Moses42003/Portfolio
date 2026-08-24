from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialOut

router = APIRouter()


@router.get("", response_model=list[TestimonialOut])
def list_testimonials(db: Session = Depends(get_db)) -> list[Testimonial]:
    return db.query(Testimonial).all()


@router.get("/{testimonial_id}", response_model=TestimonialOut)
def get_testimonial(testimonial_id: int, db: Session = Depends(get_db)) -> Testimonial:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    return testimonial


@router.post("", response_model=TestimonialOut)
def create_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Testimonial:
    testimonial = Testimonial(**payload.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.put("/{testimonial_id}", response_model=TestimonialOut)
def update_testimonial(testimonial_id: int, payload: TestimonialCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Testimonial:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    for key, value in payload.model_dump().items():
        setattr(testimonial, key, value)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
