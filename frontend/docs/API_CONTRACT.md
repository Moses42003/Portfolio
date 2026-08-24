# API Contract

Base URL: `VITE_API_BASE_URL`

Mock mode: `VITE_USE_MOCK_API=true`

## Public

- `GET /api/v1/profile`
- `GET /api/v1/projects`
- `GET /api/v1/projects/featured`
- `GET /api/v1/projects/:slug`
- `GET /api/v1/skills`
- `GET /api/v1/experience`
- `GET /api/v1/blog/posts`
- `GET /api/v1/blog/posts/:slug`
- `GET /api/v1/blog/categories`
- `POST /api/v1/contact`
- `GET /api/v1/testimonials`

## Authentication

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

## Admin

- `GET /api/v1/admin/dashboard`
- `GET|POST /api/v1/admin/projects`
- `GET|PUT|DELETE /api/v1/admin/projects/:id`
- `GET|POST /api/v1/admin/skills`
- `PUT|DELETE /api/v1/admin/skills/:id`
- `GET|POST /api/v1/admin/experience`
- `PUT|DELETE /api/v1/admin/experience/:id`
- `GET|POST /api/v1/admin/blog/posts`
- `PUT|DELETE /api/v1/admin/blog/posts/:id`
- `GET /api/v1/admin/messages`
- `GET|PUT|DELETE /api/v1/admin/messages/:id`

Frontend schema types live in `src/types`.
