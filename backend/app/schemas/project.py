from pydantic import computed_field, field_validator

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

    @field_validator("summary", "description", "image_url", "project_url", "github_url", mode="before")
    @classmethod
    def empty_str_to_none(cls, value: object) -> object:
        if value == "":
            return None
        return value


class ProjectOut(ProjectCreate):
    id: int
    technologies: list[TechnologyOut] = []

    @computed_field
    @property
    def live_url(self) -> str | None:
        return self.project_url
