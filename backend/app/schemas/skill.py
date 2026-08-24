from app.schemas.common import BaseSchema


class SkillCreate(BaseSchema):
    name: str
    category: str | None = None
    description: str | None = None
    proficiency: int | None = None
    icon: str | None = None
    order_index: int = 0


class SkillOut(SkillCreate):
    id: int
