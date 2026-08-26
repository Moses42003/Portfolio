from datetime import datetime

from pydantic import computed_field, field_validator

from app.schemas.common import BaseSchema


class CategoryOut(BaseSchema):
    id: int
    name: str
    slug: str
    description: str | None = None


class ArticleCreate(BaseSchema):
    title: str
    slug: str
    excerpt: str | None = None
    content: str
    thumbnail_url: str | None = None
    published: bool = False
    featured: bool = False
    category_id: int | None = None

    @field_validator("thumbnail_url", "excerpt", mode="before")
    @classmethod
    def empty_str_to_none(cls, value: object) -> object:
        if value == "":
            return None
        return value

    @field_validator("category_id", mode="before")
    @classmethod
    def empty_category_to_none(cls, value: object) -> object:
        if value in ("", 0, "0", None):
            return None
        return value

    @field_validator("published", "featured", mode="before")
    @classmethod
    def coerce_bool(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip().lower() in {"1", "true", "yes", "on"}
        return value


class ArticleOut(ArticleCreate):
    id: int
    views: int = 0
    created_at: datetime | None = None
    updated_at: datetime | None = None
    category: CategoryOut | None = None

    @computed_field
    @property
    def published_at(self) -> datetime | None:
        return self.created_at

    @computed_field
    @property
    def cover_image(self) -> str | None:
        return self.thumbnail_url

    @computed_field
    @property
    def status(self) -> str:
        return "published" if self.published else "draft"

    @computed_field
    @property
    def reading_time(self) -> int:
        words = len((self.content or "").split())
        return max(1, round(words / 200))

    @computed_field
    @property
    def tags(self) -> list[str]:
        return []

    @computed_field
    @property
    def author(self) -> str:
        return "Admin"
