from datetime import datetime

from app.schemas.common import BaseSchema


class ContactMessageCreate(BaseSchema):
    name: str
    email: str
    subject: str | None = None
    message: str


class ContactMessageOut(ContactMessageCreate):
    id: int
    read: bool = False
    created_at: datetime | None = None
