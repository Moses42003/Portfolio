/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { AdminLayout } from "../components/admin/AdminLayout";
import { ProtectedRoute } from "../components/admin/ProtectedRoute";

const AdminLoginPage = lazy(() => import("../pages/admin/AdminLoginPage").then((module) => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage").then((module) => ({ default: module.AdminDashboardPage })));
const AdminProjectsPage = lazy(() => import("../pages/admin/AdminProjectsPage").then((module) => ({ default: module.AdminProjectsPage })));
const AdminProjectEditorPage = lazy(() => import("../pages/admin/AdminProjectEditorPage").then((module) => ({ default: module.AdminProjectEditorPage })));
const AdminSkillsPage = lazy(() => import("../pages/admin/AdminSkillsPage").then((module) => ({ default: module.AdminSkillsPage })));
const AdminExperiencePage = lazy(() => import("../pages/admin/AdminExperiencePage").then((module) => ({ default: module.AdminExperiencePage })));
const AdminBlogPage = lazy(() => import("../pages/admin/AdminBlogPage").then((module) => ({ default: module.AdminBlogPage })));
const AdminBlogEditorPage = lazy(() => import("../pages/admin/AdminBlogEditorPage").then((module) => ({ default: module.AdminBlogEditorPage })));
const AdminTestimonialsPage = lazy(() => import("../pages/admin/AdminTestimonialsPage").then((module) => ({ default: module.AdminTestimonialsPage })));
const AdminMessagesPage = lazy(() => import("../pages/admin/AdminMessagesPage").then((module) => ({ default: module.AdminMessagesPage })));
const AdminCategoriesPage = lazy(() => import("../pages/admin/AdminCategoriesPage").then((module) => ({ default: module.AdminCategoriesPage })));
const AdminTechnologiesPage = lazy(() => import("../pages/admin/AdminTechnologiesPage").then((module) => ({ default: module.AdminTechnologiesPage })));
const AdminProfilePage = lazy(() => import("../pages/admin/AdminProfilePage").then((module) => ({ default: module.AdminProfilePage })));
const AdminSettingsPage = lazy(() => import("../pages/admin/AdminSettingsPage").then((module) => ({ default: module.AdminSettingsPage })));

export const adminRoutes: RouteObject[] = [
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "projects", element: <AdminProjectsPage /> },
          { path: "projects/new", element: <AdminProjectEditorPage /> },
          { path: "projects/:id/edit", element: <AdminProjectEditorPage /> },
          { path: "skills", element: <AdminSkillsPage /> },
          { path: "experience", element: <AdminExperiencePage /> },
          { path: "blog", element: <AdminBlogPage /> },
          { path: "blog/new", element: <AdminBlogEditorPage /> },
          { path: "blog/:id/edit", element: <AdminBlogEditorPage /> },
          { path: "testimonials", element: <AdminTestimonialsPage /> },
          { path: "messages", element: <AdminMessagesPage /> },
          { path: "categories", element: <AdminCategoriesPage /> },
          { path: "technologies", element: <AdminTechnologiesPage /> },
          { path: "profile", element: <AdminProfilePage /> },
          { path: "settings", element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
];
