/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { PublicLayout } from "../components/layout/PublicLayout";

const HomePage = lazy(() => import("../pages/public/HomePage").then((module) => ({ default: module.HomePage })));
const AboutPage = lazy(() => import("../pages/public/AboutPage").then((module) => ({ default: module.AboutPage })));
const ProjectsPage = lazy(() => import("../pages/public/ProjectsPage").then((module) => ({ default: module.ProjectsPage })));
const ProjectDetailsPage = lazy(() => import("../pages/public/ProjectDetailsPage").then((module) => ({ default: module.ProjectDetailsPage })));
const SkillsPage = lazy(() => import("../pages/public/SkillsPage").then((module) => ({ default: module.SkillsPage })));
const ExperiencePage = lazy(() => import("../pages/public/ExperiencePage").then((module) => ({ default: module.ExperiencePage })));
const BlogPage = lazy(() => import("../pages/public/BlogPage").then((module) => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import("../pages/public/BlogPostPage").then((module) => ({ default: module.BlogPostPage })));
const ContactPage = lazy(() => import("../pages/public/ContactPage").then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import("../pages/public/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

export const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "about", element: <AboutPage /> },
    { path: "projects", element: <ProjectsPage /> },
    { path: "projects/:slug", element: <ProjectDetailsPage /> },
    { path: "skills", element: <SkillsPage /> },
    { path: "experience", element: <ExperiencePage /> },
    { path: "blog", element: <BlogPage /> },
    { path: "blog/:slug", element: <BlogPostPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
};
