from pydantic import BaseModel, ConfigDict, Field


class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class PaginatedResponse(BaseSchema):
    items: list
    total: int
    page: int = Field(default=1)
    page_size: int = Field(default=10)
