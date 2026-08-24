from fastapi import APIRouter

from app.api.v1.endpoints import admin, auth, blog, contact, experience, profile, projects, skills, testimonials

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(experience.router, prefix="/experience", tags=["experience"])
api_router.include_router(blog.router, prefix="/blog", tags=["blog"])
api_router.include_router(testimonials.router, prefix="/testimonials", tags=["testimonials"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
