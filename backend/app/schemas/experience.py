from datetime import datetime

from pydantic import field_validator

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

    @field_validator("end_date", "location", "description", mode="before")
    @classmethod
    def empty_str_to_none(cls, value: object) -> object:
        if value == "":
            return None
        return value

    @field_validator("current", mode="before")
    @classmethod
    def coerce_bool(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip().lower() in {"1", "true", "yes", "on"}
        return value


class ExperienceOut(ExperienceCreate):
    id: int
    responsibilities: list[str] = []
    technologies: list[str] = []
