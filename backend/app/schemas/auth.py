from pydantic import BaseModel, EmailStr


class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    role: str = "admin"
    avatar_url: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenPayload(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserOut


class RefreshTokenRequest(BaseModel):
    refresh_token: str
