from pydantic import field_validator

from app.schemas.common import BaseSchema


class SkillCreate(BaseSchema):
    name: str
    category: str | None = None
    description: str | None = None
    proficiency: int | None = None
    icon: str | None = None
    order_index: int = 0

    @field_validator("proficiency", mode="before")
    @classmethod
    def coerce_proficiency(cls, value: object) -> object:
        if value in ("", None):
            return None
        if isinstance(value, str):
            if value.isdigit():
                return int(value)
            labels = {
                "learning": 20,
                "beginner": 25,
                "working": 50,
                "intermediate": 50,
                "advanced": 80,
                "expert": 100,
            }
            return labels.get(value.strip().lower(), 0)
        return value


class SkillOut(SkillCreate):
    id: int
