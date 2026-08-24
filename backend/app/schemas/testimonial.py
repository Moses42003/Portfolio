from app.schemas.common import BaseSchema


class TestimonialCreate(BaseSchema):
    client_name: str
    role: str | None = None
    company: str | None = None
    quote: str
    avatar_url: str | None = None
    rating: int | None = 5
    featured: bool = False


class TestimonialOut(TestimonialCreate):
    id: int
