from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.core.config import get_settings
from app.core.security import create_access_token, create_refresh_token, get_password_hash, verify_password
from app.db.models.admin import AdminUser
from app.schemas.auth import LoginRequest, RefreshTokenRequest, TokenPayload, UserOut

router = APIRouter()
settings = get_settings()


def serialize_admin_user(admin: AdminUser) -> UserOut:
    return UserOut(
        id=admin.id,
        email=admin.email,
        name=admin.full_name or admin.email.split("@")[0],
        role="admin",
        avatar_url=None,
    )


@router.post("/login", response_model=TokenPayload)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenPayload:
    admin = db.query(AdminUser).filter(AdminUser.email == payload.email).first()
    if not admin or not verify_password(payload.password, admin.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(admin.email, expires_delta=timedelta(minutes=settings.jwt_access_token_expire_minutes))
    refresh_token = create_refresh_token(admin.email, expires_delta=timedelta(days=settings.jwt_refresh_token_expire_days))
    return TokenPayload(access_token=access_token, refresh_token=refresh_token, user=serialize_admin_user(admin))


@router.get("/me", response_model=UserOut)
def me(admin=Depends(get_current_admin)) -> UserOut:
    return serialize_admin_user(admin)


@router.post("/logout")
def logout() -> dict:
    return {"ok": True}


@router.post("/refresh", response_model=TokenPayload)
def refresh(payload: RefreshTokenRequest, db: Session = Depends(get_db)) -> TokenPayload:
    try:
        decoded = __import__("app.core.security", fromlist=["decode_token"]).decode_token(payload.refresh_token)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token") from exc

    if decoded.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token type")

    email = decoded.get("sub")
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing subject")

    admin = db.query(AdminUser).filter(AdminUser.email == email).first()
    if not admin or not admin.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin account not found or inactive")

    new_access = create_access_token(email)
    new_refresh = create_refresh_token(email)
    return TokenPayload(access_token=new_access, refresh_token=new_refresh, user=serialize_admin_user(admin))
