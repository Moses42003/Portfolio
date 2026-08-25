from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.deps import get_current_admin, get_db
from app.core.config import get_settings
from app.core.security import get_password_hash
from app.db.models.admin import AdminUser
from app.db.models.blog import Article, Category
from app.db.models.contact import ContactMessage
from app.db.models.experience import Experience
from app.db.models.profile import Profile
from app.db.models.project import Project, Technology
from app.db.models.setting import Setting
from app.db.models.skill import Skill
from app.db.models.testimonial import Testimonial
from app.schemas.blog import ArticleCreate, ArticleOut, CategoryOut
from app.schemas.contact import ContactMessageOut
from app.schemas.experience import ExperienceCreate, ExperienceOut
from app.schemas.profile import ProfileCreate
from app.schemas.project import ProjectCreate, ProjectOut
from app.schemas.setting import SettingOut, SettingsUpdate
from app.schemas.skill import SkillCreate, SkillOut
from app.schemas.testimonial import TestimonialCreate, TestimonialOut

router = APIRouter()
settings = get_settings()


@router.get("/dashboard")
def dashboard_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    return {
        "profile": db.query(Profile).count(),
        "projects": db.query(Project).count(),
        "skills": db.query(Skill).count(),
        "experience": db.query(Experience).count(),
        "articles": db.query(Article).count(),
        "messages": db.query(ContactMessage).count(),
        "testimonials": db.query(Testimonial).count(),
    }


@router.get("/me")
def get_me(admin=Depends(get_current_admin)) -> dict:
    return {"id": admin.id, "email": admin.email, "full_name": admin.full_name}


@router.post("/seed")
def seed_admin(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    if db.query(AdminUser).filter(AdminUser.email == settings.admin_email).first() is None:
        db.add(
            AdminUser(
                email=settings.admin_email,
                full_name="Administrator",
                password_hash=get_password_hash(settings.admin_password),
                is_active=True,
            )
        )
        db.commit()
    return {"status": "ok"}


@router.get("/profile")
def get_admin_profile(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")
    return {"id": profile.id, "name": profile.name, "title": profile.title, "email": profile.email}


@router.put("/profile")
def update_admin_profile(payload: ProfileCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    profile = db.query(Profile).first()
    if profile is None:
        profile = Profile(**payload.model_dump())
        db.add(profile)
    else:
        for key, value in payload.model_dump().items():
            setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return {"status": "updated", "id": profile.id}

@router.get("/categories", response_model=list[CategoryOut])
def list_admin_categories(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """List categories (admin view)."""
    return db.query(Category).all()


@router.get("/projects", response_model=list[ProjectOut])
def list_admin_projects(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Project]:
    return db.query(Project).order_by(Project.order_index).all()


@router.get("/projects/{project_id}", response_model=ProjectOut)
def get_admin_project(project_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Project:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


@router.post("/projects", response_model=ProjectOut)
def create_admin_project(payload: ProjectCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Project:
    technologies = db.query(Technology).filter(Technology.id.in_(payload.technology_ids)).all() if payload.technology_ids else []
    project = Project(**payload.model_dump(exclude={"technology_ids"}), technologies=technologies)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/projects/{project_id}", response_model=ProjectOut)
def update_admin_project(project_id: int, payload: ProjectCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Project:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    for key, value in payload.model_dump(exclude={"technology_ids"}).items():
        setattr(project, key, value)
    project.technologies = db.query(Technology).filter(Technology.id.in_(payload.technology_ids)).all() if payload.technology_ids else []
    db.commit()
    db.refresh(project)
    return project


@router.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_project(project_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    db.delete(project)
    db.commit()


@router.get("/skills", response_model=list[SkillOut])
def list_admin_skills(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Skill]:
    return db.query(Skill).order_by(Skill.order_index).all()


@router.get("/skills/{skill_id}", response_model=SkillOut)
def get_admin_skill(skill_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Skill:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    return skill


@router.post("/skills", response_model=SkillOut)
def create_admin_skill(payload: SkillCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Skill:
    skill = Skill(**payload.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.put("/skills/{skill_id}", response_model=SkillOut)
def update_admin_skill(skill_id: int, payload: SkillCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Skill:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    for key, value in payload.model_dump().items():
        setattr(skill, key, value)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/skills/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_skill(skill_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    db.delete(skill)
    db.commit()


@router.get("/experience", response_model=list[ExperienceOut])
def list_admin_experience(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Experience]:
    return db.query(Experience).order_by(Experience.order_index).all()


@router.get("/experience/{experience_id}", response_model=ExperienceOut)
def get_admin_experience(experience_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Experience:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    return experience


@router.post("/experience", response_model=ExperienceOut)
def create_admin_experience(payload: ExperienceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Experience:
    experience = Experience(**payload.model_dump())
    db.add(experience)
    db.commit()
    db.refresh(experience)
    return experience


@router.put("/experience/{experience_id}", response_model=ExperienceOut)
def update_admin_experience(experience_id: int, payload: ExperienceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Experience:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    for key, value in payload.model_dump().items():
        setattr(experience, key, value)
    db.commit()
    db.refresh(experience)
    return experience


@router.delete("/experience/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_experience(experience_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    db.delete(experience)
    db.commit()


@router.get("/blog/posts", response_model=list[ArticleOut])
def list_admin_blog_posts(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Article]:
    return db.query(Article).order_by(Article.created_at.desc()).all()


@router.get("/blog/posts/{article_id}", response_model=ArticleOut)
def get_admin_blog_post(article_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Article:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    return article


@router.post("/blog/posts", response_model=ArticleOut)
def create_admin_blog_post(payload: ArticleCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Article:
    article = Article(**payload.model_dump())
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


@router.put("/blog/posts/{article_id}", response_model=ArticleOut)
def update_admin_blog_post(article_id: int, payload: ArticleCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Article:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    for key, value in payload.model_dump().items():
        setattr(article, key, value)
    db.commit()
    db.refresh(article)
    return article


@router.delete("/blog/posts/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_blog_post(article_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found")
    db.delete(article)
    db.commit()


@router.get("/messages", response_model=list[ContactMessageOut])
def list_admin_messages(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[ContactMessage]:
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.get("/messages/{message_id}", response_model=ContactMessageOut)
def get_admin_message(message_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> ContactMessage:
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    return message


@router.put("/messages/{message_id}/read", response_model=ContactMessageOut)
def mark_admin_message_read(message_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> ContactMessage:
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    message.read = True
    db.commit()
    db.refresh(message)
    return message


@router.get("/testimonials", response_model=list[TestimonialOut])
def list_admin_testimonials(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Testimonial]:
    return db.query(Testimonial).all()


@router.get("/testimonials/{testimonial_id}", response_model=TestimonialOut)
def get_admin_testimonial(testimonial_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Testimonial:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    return testimonial


@router.post("/testimonials", response_model=TestimonialOut)
def create_admin_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Testimonial:
    testimonial = Testimonial(**payload.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.put("/testimonials/{testimonial_id}", response_model=TestimonialOut)
def update_admin_testimonial(testimonial_id: int, payload: TestimonialCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> Testimonial:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    for key, value in payload.model_dump().items():
        setattr(testimonial, key, value)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_admin_testimonial(testimonial_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> None:
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()


@router.get("/settings", response_model=list[SettingOut])
def list_settings(db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> list[Setting]:
    return db.query(Setting).all()


@router.put("/settings")
def update_settings(payload: SettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)) -> dict:
    for key, value in payload.settings.items():
        setting = db.query(Setting).filter(Setting.key == key).first()
        if setting is None:
            db.add(Setting(key=key, value=value))
        else:
            setting.value = value
    db.commit()
    return {"status": "ok"}
