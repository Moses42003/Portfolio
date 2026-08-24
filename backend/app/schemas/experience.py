from datetime import datetime

from app.schemas.common import BaseSchema


class ExperienceCreate(BaseSchema):
    company: str
    role: str
    location: str | None = None
    start_date: datetime
    end_date: datetime | None = None
    description: str | None = None
    current: bool = False
    order_index: int = 0


class ExperienceOut(ExperienceCreate):
    id: int
