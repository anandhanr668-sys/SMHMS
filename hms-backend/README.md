# HMS Backend

> Developer notes: When running locally in development mode the backend will accept requests without the `x-tenant-id` header and will resolve to a local tenant (`local`). This behavior is intentionally disabled in test and production modes to preserve tenant enforcement.


Enterprise-grade backend for the Hospital Management System (HMS).

## Tech Stack
- Node.js
- Express
- TypeScript
- PostgreSQL
- Knex ORM
- Socket.IO

## Setup

```bash
cp .env.example .env
npm install
npm run dev
