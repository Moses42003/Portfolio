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


class ArticleOut(ArticleCreate):
    id: int
    views: int = 0
    created_at: str | None = None
    updated_at: str | None = None
    category: CategoryOut | None = None
