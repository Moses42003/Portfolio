from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.db.models.blog import Article, Category
from app.schemas.blog import ArticleCreate, ArticleOut, CategoryOut

router = APIRouter()


def _published_articles(db: Session) -> list[Article]:
    query = db.query(Article).order_by(Article.created_at.desc())
    published = query.filter(Article.published.is_(True)).all()
    return published if published else query.all()


def _get_article(db: Session, article_ref: str) -> Article:
    article = db.query(Article).filter(Article.slug == article_ref).first()
    if article is None and article_ref.isdigit():
        article = db.query(Article).filter(Article.id == int(article_ref)).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    return article


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)) -> list[Category]:
    return db.query(Category).all()


@router.get("/posts", response_model=list[ArticleOut])
def list_posts(db: Session = Depends(get_db)) -> list[Article]:
    return _published_articles(db)


@router.get("/articles", response_model=list[ArticleOut])
def list_articles(db: Session = Depends(get_db)) -> list[Article]:
    return _published_articles(db)


@router.get("/posts/{article_ref}", response_model=ArticleOut)
def get_post(article_ref: str, db: Session = Depends(get_db)) -> Article:
    return _get_article(db, article_ref)


@router.get("/articles/{article_ref}", response_model=ArticleOut)
def get_article(article_ref: str, db: Session = Depends(get_db)) -> Article:
    return _get_article(db, article_ref)


@router.post("/articles", response_model=ArticleOut)
def create_article(payload: ArticleCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Article:
    article = Article(**payload.model_dump())
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.put("/articles/{article_id}", response_model=ArticleOut)
def update_article(article_id: int, payload: ArticleCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Article:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    for key, value in payload.model_dump().items():
        setattr(article, key, value)
    db.commit()
    db.refresh(article)
    return article


@router.delete("/articles/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_article(article_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    db.delete(article)
    db.commit()
