# Vercel Deployment (Frontend)

This repository contains a Node/Express backend and a Next.js frontend.
Deploy the `frontend` app to Vercel and host backend separately.

## 1. Local test

1. Backend: run from repository root
   - `npm run dev`
2. Frontend: run from `frontend`
   - `npm run dev`
3. Open:
   - Frontend: `http://localhost:3000`
   - Backend health: `http://localhost:5000/health`

## 2. Vercel project settings

1. Import this repository in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Next.js** (auto-detected).

## 3. Environment variables in Vercel

Add these in Project Settings -> Environment Variables:

1. `NEXT_PUBLIC_API_BASE_URL`
   - Value: your deployed backend base URL (example: `https://api.yourdomain.com`)
2. `NEXT_PUBLIC_API_TIMEOUT`
   - Value: `10000`

Do not use localhost values in Vercel production.

## 4. Build and deploy

Use defaults once root directory is `frontend`:

- Install command: `npm install`
- Build command: `npm run build`
- Output: `.next` (managed by Next.js)

## 5. Backend hosting note

Current backend is a long-running Express server with MySQL and should be deployed to a backend host (for example Railway/Render/Fly.io), then referenced by `NEXT_PUBLIC_API_BASE_URL`.
