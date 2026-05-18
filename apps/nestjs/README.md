## NestJS personal starter

Base template tailored for NestJS REST APIs:

- JWT auth, refresh tokens, role-based ACL helpers
- Prisma ORM against PostgreSQL
- Docker / devcontainer tooling
- OpenAPI (`/swagger`) and shared validation/filter/logging patterns

## Setup

Install dependencies from the **repository root** (`hyper-turbo`): this app is wired as a pnpm workspace package (do not use a separate `npm install` only inside `apps/nestjs`).

```bash
pnpm install --no-frozen-lockfile
```

If you see **`ECONNRESET`** or missing tarballs, retry on a stable connection (VPN/proxy/firewall can interrupt the registry). If **`npm`** fails with **`tinyexec@^1.1.1` ETARGET**, clear the cache (`npm cache clean --force`) or use **pnpm** from the root as above—that version is published on the public registry.

Copy `.env.template` to `.env` and align `DATABASE_URL` with your Postgres user, password, host, database name, and schema.

Generate JWT key material (validated in `src/shared/configs`):

### With Docker (repo script)

```bash
./scripts/generate-jwt-keys
```

Add the printed `JWT_*_BASE64` values to `.env`.

### Without Docker

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key
# No passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

Encode keys to base64 (paths may vary by OS), then set `JWT_PUBLIC_KEY_BASE64` and `JWT_PRIVATE_KEY_BASE64` in `.env`.

Apply schema:

```bash
pnpm run prisma:migrate
pnpm run prisma:generate
```

Optionally bootstrap the default admin (uses `DEFAULT_ADMIN_USER_PASSWORD` from `.env`):

```bash
pnpm run cli:dev
```

## Lint & types

ESLint extends **`@repo/eslint-config`** via **`nestjs`** preset; TypeScript extends **`@repo/tsconfig/nestjs.json`**.

```bash
pnpm run lint
pnpm run typecheck
```

## Run

Local (Postgres reachable per `.env`):

```bash
pnpm run start:dev
```

API defaults to port `APP_PORT` (often `3000`) with prefix `api/v1`, e.g. `http://localhost:3000/api/v1/` and Swagger at `http://localhost:3000/swagger`.

Docker:

```bash
docker compose up
```

## Test

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

E2E tests expect Postgres on `TEST_DB_HOST` (default `localhost`) with credentials from `DB_USER` / `DB_PASS`, and recreate database `e2e_test_db` before the suite.

## Technical notes

| Area            | Detail                          |
| --------------- | ------------------------------- |
| Auth            | JWT (RS256) + refresh + RBAC    |
| ORM / migrations | Prisma |
| Lint / TS        | `@repo/eslint-config/nestjs`, `@repo/tsconfig/nestjs.json` |
| Validation      | `class-validator`, global pipe  |
| Logging         | winston wrapper (`AppLogger`)   |

## Credits

Originally derived from the [nestjs-starter-rest-api](https://github.com/monstar-lab-oss/nestjs-starter-rest-api) OSS template; trimmed and updated for personal reuse.
