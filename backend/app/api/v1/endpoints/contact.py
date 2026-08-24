from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.contact import ContactMessage
from app.schemas.contact import ContactMessageCreate, ContactMessageOut

router = APIRouter()


@router.post("", response_model=ContactMessageOut)
def submit_contact_form(payload: ContactMessageCreate, db: Session = Depends(get_db)) -> ContactMessage:
    message = ContactMessage(**payload.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("", response_model=list[ContactMessageOut])
def list_messages(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[ContactMessage]:
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.put("/{message_id}/read", response_model=ContactMessageOut)
def mark_message_read(message_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> ContactMessage:
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    message.read = True
    db.commit()
    db.refresh(message)
    return message
