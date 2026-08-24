# Architecture

The frontend is organized around domain contracts and route-level composition.

- `services/api`: centralized client, endpoints, exported service types, and mock data.
- `features`: React Query hooks for public and admin server state.
- `components`: reusable UI, layout, navigation, portfolio, admin, and chart primitives.
- `pages`: route screens for public portfolio and admin workflows.
- `providers`: application providers for Query, Router, Toasts, and Auth.
- `router`: lazy-loaded public and admin route trees.

Authentication is abstracted through `AuthProvider`. Tokens are held by the API token store so backend secure-token handling can be introduced without rewriting UI screens.
