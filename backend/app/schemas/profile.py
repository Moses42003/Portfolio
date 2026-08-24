from app.schemas.common import BaseSchema


class ProfileCreate(BaseSchema):
    name: str
    title: str
    bio: str
    location: str | None = None
    email: str | None = None
    phone: str | None = None
    website: str | None = None
    linkedin: str | None = None
    github: str | None = None
    avatar_url: str | None = None
    headline: str | None = None
    summary: str | None = None
    status: str = "active"


class ProfileOut(ProfileCreate):
    id: int
