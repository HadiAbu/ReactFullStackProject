# Express + Postgres Posts API

This server implements a production-ready Posts API (CRUD) with validation, pagination, basic security middleware, and a migration script to create the `posts` table.

## Setup

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL`.
2. Install dependencies: `npm install`
3. Run migration: `npm run migrate`
4. Start server: `npm run dev` (or `npm start`)

## Endpoints

- `GET /api/health` — health check
- `GET /api/posts` — list posts (query: `page`, `limit`, `published`)
- `POST /api/posts` — create a post
- `GET /api/posts/:id` — get single post
- `PATCH /api/posts/:id` — partial update
- `PUT /api/posts/:id` — replace post
- `DELETE /api/posts/:id` — delete post

## Example cURL

Create:

```
curl -X POST http://localhost:5000/api/posts -H "Content-Type: application/json" -d '{"title":"Hello","content":"Body","author":"Hadi","tags":["a","b"]}'
```

List:

```
curl http://localhost:5000/api/posts?page=1&limit=5
```
