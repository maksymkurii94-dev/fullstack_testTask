# Partner Dashboard (PoC)

React + Express monorepo. Mock data lives in `JSON/` and is served as REST endpoints.

## Run

```bash
npm install
npm run dev
```

- UI: http://localhost:5173/partner/vanguard-realty  
- API: http://localhost:3001/api/partners  

## Stack

- **client/** — React (Vite), port 5173  
- **server/** — Express, port 3001  

## API

| Endpoint | File |
|----------|------|
| `/api/partners` | `partners.json` |
| `/api/users` | `users.json` |
| `/api/user-packages` | `userPackages.json` |
| `/api/user-courses` | `userCourses.json` |
| `/api/orders` | `orders.json` |
| `/api/packages` | `packages.json` |

UI uses `GET /api/partners/:slug/dashboard?asOf=2026-05-31` (mock dates are mostly May 2026).

## Improvements (with more time)

- Partner auth and data scoped by logged-in account
- Replace JSON files with a real database and keep the same API shape
- Unit tests for dashboard metrics; API integration tests
- TypeScript on server and client; shared API types
- Pagination and filters on student activity
- Production deploy (Docker, CI, env-based config)
