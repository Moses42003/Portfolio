from app.schemas.common import BaseSchema


class SettingOut(BaseSchema):
    key: str
    value: str | None


class SettingsUpdate(BaseSchema):
    settings: dict[str, str | None]
