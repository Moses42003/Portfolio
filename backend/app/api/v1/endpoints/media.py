from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from pathlib import Path
import uuid
from app.api.v1.deps import get_current_admin
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()

UPLOAD_DIR = Path(__file__).resolve().parents[3] / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/uploads")
def upload_file(file: UploadFile = File(...), admin=Depends(get_current_admin)) -> dict:
    try:
        ext = Path(file.filename).suffix or ""
        name = f"{uuid.uuid4().hex}{ext}"
        dest = UPLOAD_DIR / name
        with dest.open("wb") as f:
            f.write(file.file.read())
        # return path relative to static mount
        return {"url": f"/static/uploads/{name}"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
