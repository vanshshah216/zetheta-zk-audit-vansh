# Deployment Guide

## What this app is

**Zero Knowledge Audit Marketplace** — an enterprise SaaS portal for blockchain/security audits with role-based dashboards:

| Role | Route prefix | Purpose |
|------|--------------|---------|
| Company (`audited`) | `/company` | Request audits, view certificates, payments |
| Auditor | `/auditor` | Accept audits, generate ZK proofs |
| Verifier (`investor`) | `/verifier` | Verify proofs and certificates |
| Security | `/security` | Security monitoring (auditor role) |

Stack: **Next.js 16**, **Supabase** (Postgres), **Zustand**, **Tailwind CSS v4**.

---

## Required environment variables

Set these in Vercel (or `.env.local` for local dev). Copy from `.env.local.example`:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key (safe for client) |
| `AUTH_SESSION_SECRET` | **Yes in production** | HMAC secret for session cookies (`openssl rand -hex 32`) |
| `SEED_SECRET` | If using seed | Protects `GET /api/seed` |

**Never** expose `SUPABASE_SERVICE_ROLE_KEY` in client code or `NEXT_PUBLIC_*` vars.

---

## Supabase setup (manual)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the full contents of `supabase/schema.sql`.
3. (Optional) Seed demo data:
   ```bash
   curl -H "Authorization: Bearer YOUR_SEED_SECRET" https://your-app.vercel.app/api/seed
   ```
4. Confirm tables exist: `profiles`, `audit_requests`, `proofs`, `certificates`, `verification_history`, `notifications`, `payments`.

---

## Vercel deployment

1. Push repo to GitHub.
2. Import project in [Vercel](https://vercel.com).
3. Add environment variables (see table above).
4. Deploy. `NODE_ENV=production` is set automatically.
5. After deploy, run seed once (optional) with `SEED_SECRET` header.

---

## Demo login accounts

| Role | Email | Password |
|------|-------|----------|
| Company | `company@example.com` | `password123` |
| Auditor | `auditor@example.com` | `password123` |
| Verifier | `verifier@example.com` | `password123` |
| Demo | `demo@example.com` | `Demo@1234567890` |

Change or remove these before a public production launch.

---

## Security model (current)

| Layer | Status |
|-------|--------|
| Route protection | Middleware validates signed httpOnly session cookie |
| Login | Server-side credential check via `/api/auth/login` |
| Session forgery | Fixed — clients cannot set arbitrary session cookies |
| Seed endpoint | Blocked in production without `SEED_SECRET` |
| Security headers | X-Frame-Options, HSTS, nosniff, etc. |
| RLS (database) | **Open demo policies** — see below |

### Important: database RLS

The default `schema.sql` uses permissive RLS for the demo (anon key can read/write all rows). This is acceptable for **private demos/staging** but **not for public production with real data**.

Before launch with real users:

1. Migrate authentication to **Supabase Auth** (replace mock credentials).
2. Link `profiles.id` to `auth.users.id`.
3. Run `supabase/rls-production.sql` in the SQL Editor.

---

## Pre-deploy checklist

- [ ] Run `supabase/schema.sql` in Supabase SQL Editor
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- [ ] Set `AUTH_SESSION_SECRET` (32+ byte random hex) in Vercel
- [ ] Set `SEED_SECRET` if you need seeding after deploy
- [ ] Run `npm run build` locally — must pass
- [ ] Test login for all three roles
- [ ] Test `/company/request-audit` creates a row in Supabase
- [ ] Remove or rotate demo passwords for public launch
- [ ] (Production) Apply `rls-production.sql` after Supabase Auth migration

---

## Local development

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
npm install
npm run dev
```

Seed locally (no secret needed in development):

```bash
curl http://localhost:3000/api/seed
```

---

## Build & lint

```bash
npm run build
npm run lint
```

---

## Remaining manual steps

1. **Create Supabase project** and run `schema.sql` — the agent cannot do this for you.
2. **Configure Vercel env vars** in the dashboard.
3. **Optional:** Run seed endpoint once after first deploy.
4. **Before public launch:** Migrate to Supabase Auth + production RLS.
