import type { AuthResponse, BlogPost, Category, ContactMessage, DashboardMetric, Experience, Profile, Project, Skill, Technology, Testimonial } from "../types";

export const categories: Category[] = [
  { id: "cat-web", name: "Web Applications", slug: "web-applications" },
  { id: "cat-api", name: "API", slug: "api" },
  { id: "cat-dashboard", name: "Dashboard", slug: "dashboard" },
  { id: "cat-ecommerce", name: "E-Commerce", slug: "e-commerce" },
];

export const technologies: Technology[] = [
  { id: "tech-react", name: "React", slug: "react", category: "Frontend" },
  { id: "tech-ts", name: "TypeScript", slug: "typescript", category: "Frontend" },
  { id: "tech-python", name: "Python", slug: "python", category: "Backend" },
  { id: "tech-fastapi", name: "FastAPI", slug: "fastapi", category: "Backend" },
  { id: "tech-node", name: "Node.js", slug: "node-js", category: "Backend" },
  { id: "tech-postgres", name: "PostgreSQL", slug: "postgresql", category: "Database" },
  { id: "tech-tailwind", name: "Tailwind CSS", slug: "tailwind-css", category: "Frontend" },
  { id: "tech-docker", name: "Docker", slug: "docker", category: "DevOps" },
];

const projectArt = [
  "linear-gradient(135deg, #17172b, #6d28d9 48%, #06b6d4)",
  "linear-gradient(135deg, #111827, #2563eb 42%, #a855f7)",
  "linear-gradient(135deg, #020617, #7c3aed 44%, #0ea5e9)",
  "linear-gradient(135deg, #0f172a, #9333ea 38%, #22d3ee)",
];

export const projects: Project[] = [
  {
    id: "project-1",
    title: "TaskFlow",
    slug: "taskflow",
    description: "A collaborative project management system with role-based workspaces, live updates, and analytics.",
    content: "TaskFlow is designed for teams that need clarity across planning, execution, and reporting. The frontend consumes a typed API layer and keeps realtime concerns isolated for future backend integration.",
    thumbnail: projectArt[0],
    gallery: projectArt,
    category: categories[0],
    technologies: [technologies[0], technologies[1], technologies[4], technologies[5]],
    github_url: "https://github.com/",
    live_url: "https://example.com",
    featured: true,
    status: "published",
    year: "2026",
    created_at: "2026-06-01T10:00:00Z",
    updated_at: "2026-08-12T10:00:00Z",
  },
  {
    id: "project-2",
    title: "Commerce Core",
    slug: "commerce-core",
    description: "A fast storefront and admin commerce experience built around typed product, checkout, and inventory flows.",
    content: "Commerce Core focuses on resilient product browsing, clean dashboard operations, and a backend contract ready for payments, orders, and stock management.",
    thumbnail: projectArt[1],
    category: categories[3],
    technologies: [technologies[0], technologies[1], technologies[3], technologies[5]],
    github_url: "https://github.com/",
    live_url: "https://example.com",
    featured: true,
    status: "published",
    year: "2026",
    created_at: "2026-04-03T10:00:00Z",
    updated_at: "2026-08-02T10:00:00Z",
  },
  {
    id: "project-3",
    title: "DevConnect",
    slug: "devconnect",
    description: "A developer networking platform for publishing work, sharing notes, and discovering collaborators.",
    content: "DevConnect brings social product thinking into a developer-centered interface with profiles, activity feeds, and project collections.",
    thumbnail: projectArt[2],
    category: categories[0],
    technologies: [technologies[0], technologies[1], technologies[2], technologies[3]],
    github_url: "https://github.com/",
    live_url: "https://example.com",
    featured: true,
    status: "published",
    year: "2025",
    created_at: "2025-10-10T10:00:00Z",
    updated_at: "2026-07-21T10:00:00Z",
  },
  {
    id: "project-4",
    title: "Pulse Metrics",
    slug: "pulse-metrics",
    description: "A concise analytics dashboard for tracking visitors, page performance, messages, and publishing status.",
    content: "Pulse Metrics turns noisy reporting data into focused operational views with reusable chart primitives.",
    thumbnail: projectArt[3],
    category: categories[2],
    technologies: [technologies[0], technologies[1], technologies[5], technologies[7]],
    github_url: "https://github.com/",
    live_url: "https://example.com",
    featured: false,
    status: "draft",
    year: "2025",
    created_at: "2025-11-14T10:00:00Z",
    updated_at: "2026-06-18T10:00:00Z",
  },
];

export const skills: Skill[] = [
  { id: "skill-react", name: "React", category: "Frontend", icon: "Atom", proficiency: "Advanced", years: 2, featured: true, description: "Component architecture, routing, server-state patterns, and polished interactions.", sort_order: 1 },
  { id: "skill-ts", name: "TypeScript", category: "Frontend", icon: "Braces", proficiency: "Advanced", years: 2, featured: true, description: "Strict contracts, maintainable data models, and safer frontend systems.", sort_order: 2 },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", icon: "Palette", proficiency: "Advanced", years: 2, featured: true, description: "Responsive, expressive interfaces with disciplined design tokens.", sort_order: 3 },
  { id: "skill-python", name: "Python", category: "Backend", icon: "Terminal", proficiency: "Advanced", years: 2, featured: true, description: "API services, automation scripts, and backend application logic.", sort_order: 4 },
  { id: "skill-fastapi", name: "FastAPI", category: "Backend", icon: "Zap", proficiency: "Working", years: 1, featured: true, description: "Typed REST APIs, validation, authentication, and clean service boundaries.", sort_order: 5 },
  { id: "skill-postgres", name: "PostgreSQL", category: "Database", icon: "Database", proficiency: "Working", years: 1, featured: true, description: "Relational data modeling, queries, migrations, and reporting views.", sort_order: 6 },
  { id: "skill-docker", name: "Docker", category: "DevOps", icon: "Box", proficiency: "Working", years: 1, featured: false, description: "Containerized development environments and deployable services.", sort_order: 7 },
  { id: "skill-hardware", name: "Hardware Diagnostics", category: "Hardware / Systems", icon: "Cpu", proficiency: "Working", years: 2, featured: false, description: "Systems thinking across devices, operating environments, and performance issues.", sort_order: 8 },
];

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "Independent Projects",
    role: "Full-Stack Developer",
    location: "Accra, Ghana",
    start_date: "2024-01-01T00:00:00Z",
    current: true,
    description: "Building web applications with modern frontend architecture and FastAPI-ready backend contracts.",
    responsibilities: ["Created reusable React interfaces", "Designed typed API service layers", "Shipped responsive admin and public workflows"],
    technologies: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "exp-2",
    company: "Client Systems Lab",
    role: "Frontend Developer",
    location: "Remote",
    start_date: "2022-06-01T00:00:00Z",
    end_date: "2023-12-01T00:00:00Z",
    current: false,
    description: "Delivered clean interfaces for business workflows, dashboards, and content-driven websites.",
    responsibilities: ["Translated briefs into production UI", "Improved accessibility and mobile behavior", "Integrated REST APIs"],
    technologies: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    id: "exp-3",
    company: "Systems & Support",
    role: "Technical Support Developer",
    location: "Accra, Ghana",
    start_date: "2021-01-01T00:00:00Z",
    end_date: "2022-05-01T00:00:00Z",
    current: false,
    description: "Combined hardware troubleshooting with automation and internal tooling.",
    responsibilities: ["Diagnosed system issues", "Automated repetitive support tasks", "Documented technical workflows"],
    technologies: ["Python", "Linux", "Networking"],
  },
];

export const posts: BlogPost[] = [
  {
    id: "post-1",
    title: "Designing React Frontends for a FastAPI Backend",
    slug: "react-frontends-fastapi-backend",
    excerpt: "How to keep frontend screens polished today while preserving a clean backend contract for tomorrow.",
    content: "## API-first frontend work\n\nA strong React frontend can move quickly without guessing the backend. The trick is to let TypeScript types, endpoint constants, and a centralized client become the contract.\n\n### Practical rules\n\n- Keep fake data inside mock services.\n- Fetch through React Query hooks.\n- Transform data only in the service layer.\n- Make forms validate before the network request.\n\nThis keeps the UI expressive while leaving the FastAPI connection straightforward.",
    cover_image: "linear-gradient(135deg, #111827, #7c3aed, #06b6d4)",
    category: categories[1],
    tags: ["React", "FastAPI", "Architecture"],
    status: "published",
    published_at: "2026-08-10T10:00:00Z",
    reading_time: 5,
    author: "Moses",
    created_at: "2026-08-01T10:00:00Z",
    updated_at: "2026-08-10T10:00:00Z",
  },
  {
    id: "post-2",
    title: "Building Admin Interfaces That Stay Maintainable",
    slug: "maintainable-admin-interfaces",
    excerpt: "A practical approach to tables, forms, status states, and dashboard actions.",
    content: "## Admin software has a rhythm\n\nGood admin interfaces are quiet, dense, and predictable. They help people act without fighting the layout.\n\nReusable tables, confirmed destructive actions, field validation, and clear async states are the foundation.",
    cover_image: "linear-gradient(135deg, #020617, #2563eb, #a855f7)",
    category: categories[2],
    tags: ["Admin", "UX", "React"],
    status: "published",
    published_at: "2026-07-20T10:00:00Z",
    reading_time: 4,
    author: "Moses",
    created_at: "2026-07-10T10:00:00Z",
    updated_at: "2026-07-20T10:00:00Z",
  },
];

export const testimonials: Testimonial[] = [
  { id: "test-1", name: "Ama Mensah", role: "Founder", company: "BrightOps", quote: "Moses brings unusual clarity to both product polish and implementation details.", featured: true },
  { id: "test-2", name: "Daniel Owusu", role: "Engineering Lead", company: "Northstar Labs", quote: "His interfaces feel considered, and the code underneath is prepared for real backend constraints.", featured: true },
];

export const messages: ContactMessage[] = [
  { id: "msg-1", name: "Nora Blake", email: "nora@example.com", subject: "Portfolio collaboration", message: "Can we discuss a dashboard build?", status: "unread", received_at: "2026-08-20T09:00:00Z" },
  { id: "msg-2", name: "Kwame Boateng", email: "kwame@example.com", subject: "API integration", message: "I need help connecting a frontend to FastAPI.", status: "read", received_at: "2026-08-18T13:30:00Z" },
];

export const profile: Profile = {
  id: "profile-moses",
  name: "Moses",
  brand: "MOSES DEV",
  role: "Full-Stack Developer",
  greeting: "Hi, I'm Moses",
  headline: "I build digital experiences that make an impact.",
  summary: "Full-Stack Developer passionate about building modern, fast and scalable web applications.",
  location: "Accra, Ghana",
  email: "moses@example.com",
  cv_url: "/Moses-Developer-CV.pdf",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://x.com/",
    email: "mailto:moses@example.com",
  },
  stats: [
    { id: "stat-projects", value: "20+", label: "Projects" },
    { id: "stat-tech", value: "10+", label: "Technologies" },
    { id: "stat-years", value: "2+", label: "Years Experience" },
    { id: "stat-dedication", value: "100%", label: "Dedication" },
  ],
  about: {
    introduction: "I'm Moses, a full-stack developer focused on building fast, maintainable, and scalable software experiences.",
    philosophy: "Great products come from thoughtful interfaces, stable contracts, and disciplined backend thinking.",
    builds: ["Portfolio platforms", "Admin dashboards", "API-connected applications", "Automation tools", "Developer-focused products"],
    approach: ["Model the data clearly", "Design accessible workflows", "Build reusable interfaces", "Keep API boundaries explicit", "Polish responsive behavior"],
    technology_overview: {
      Frontend: ["React", "TypeScript", "Tailwind CSS", "React Query"],
      Backend: ["Python", "FastAPI", "Node.js"],
      Database: ["PostgreSQL", "SQL modeling"],
      DevOps: ["Docker", "CI-ready builds"],
      "Hardware / systems": ["Diagnostics", "Linux", "Performance troubleshooting"],
    },
  },
};

export const authResponse: AuthResponse = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  token_type: "bearer",
  user: {
    id: "user-admin",
    name: "Moses Admin",
    email: "admin@moses.dev",
    role: "admin",
  },
};

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Projects", total: projects.length, growth: "+3 this quarter", tone: "violet" },
  { label: "Skills", total: skills.length, growth: "+2 added", tone: "blue" },
  { label: "Blog Posts", total: posts.length, growth: "+1 this month", tone: "emerald" },
  { label: "Messages", total: messages.length, growth: "2 pending", tone: "amber" },
];
