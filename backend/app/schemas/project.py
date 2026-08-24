from app.schemas.common import BaseSchema


class TechnologyOut(BaseSchema):
    id: int
    name: str
    category: str | None = None


class ProjectCreate(BaseSchema):
    title: str
    slug: str
    summary: str | None = None
    description: str | None = None
    image_url: str | None = None
    project_url: str | None = None
    github_url: str | None = None
    featured: bool = False
    status: str = "published"
    order_index: int = 0
    technology_ids: list[int] = []


class ProjectOut(ProjectCreate):
    id: int
    technologies: list[TechnologyOut] = []
