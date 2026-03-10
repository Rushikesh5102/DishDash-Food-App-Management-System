# Vercel Deployment Tasks (DishDash Frontend)

This repository has:
- Backend API (Express + MySQL): `root`
- Frontend (Next.js): `frontend`

Deploy only the `frontend` app to Vercel. Host backend separately (Railway/Render/Fly/etc.) and point frontend to it.

## Task 1: Prepare Local Environment Files

1. Backend local env:
   - File: `/.env`
   - Used for local backend only.
   - Do not upload this file to git or Vercel.

2. Frontend local env:
   - File: `/frontend/.env.local`
   - Example:
     - `NEXT_PUBLIC_API_BASE_URL=http://localhost:5001`
     - `NEXT_PUBLIC_API_TIMEOUT=10000`

3. Frontend env template:
   - File: `/frontend/.env.example`
   - Keep this in git as a non-secret template.

## Task 2: Create/Configure Vercel Project

1. Import repository in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Next.js**.
4. Build command:
   - `npm run vercel:build`
5. Install command:
   - `npm install`

## Task 3: Add Environment Variables in Vercel

In Vercel Project Settings -> Environment Variables, add:

1. `NEXT_PUBLIC_API_BASE_URL`
   - Value: your deployed backend URL, for example:
   - `https://api.yourdomain.com`

2. `NEXT_PUBLIC_API_TIMEOUT`
   - Value: `10000`

Important:
- Do not use `localhost` in production Vercel env vars.
- Do not paste backend secrets (DB password, JWT secret) into frontend Vercel vars.

## Task 4: Validate Before Deploy

From `frontend`:

1. Install dependencies:
   - `npm install`
2. Validate env variables:
   - `npm run check:env`
3. Build:
   - `npm run build`

## Task 5: Deploy

1. Push branch to GitHub.
2. Trigger Vercel deploy.
3. Verify:
   - `https://your-vercel-domain/`
   - login/signup/search pages
   - network calls go to your backend URL, not `localhost`

## Task 6: Post-Deploy Smoke Test

1. Open browser devtools -> Network.
2. Confirm API requests hit:
   - `NEXT_PUBLIC_API_BASE_URL`
3. Confirm compare endpoint works:
   - `GET /api/products/compare/search?product=Chicken`

## Notes

- Backend root route now returns JSON status.
- Backend health route:
  - `/health`
- Frontend deployment depends on backend uptime and CORS config.
