# Frontend Guide

Use feature hooks instead of calling `fetch` from components. Pages should compose data-aware components and shared UI states.

Forms use React Hook Form with Zod resolvers. Field-level validation should stay close to the form, while transport details stay inside the API layer.

Animations use Framer Motion sparingly for page entrance, cards, and toast interactions. CSS respects `prefers-reduced-motion`.

Admin screens should remain dense and task-focused. Public screens may be more expressive but should keep the dark technical identity.
