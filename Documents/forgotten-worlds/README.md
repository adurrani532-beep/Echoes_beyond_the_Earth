# Forgotten Worlds

Interactive web app for the NASA Space Apps Challenge 2026 ("Abandoned but not Forgotten").
Explore NASA machines left on the Moon, Mars and in deep space: stories, 3D views, timeline, map, quiz and badges.

## Stack
- **client/**: React + Vite, React Three Fiber (3D), Framer Motion, plain CSS.
- **server/**: Node.js + Express, MongoDB (Mongoose). Optional: the site works without it.
- Machine data lives in `client/src/data/machines.js` (also used to seed MongoDB).

## Run locally (Windows, VS Code terminal)
```
npm run install:all
npm run dev:server      # terminal 1, API on http://localhost:4000
npm run dev:client      # terminal 2, site on http://localhost:5173
```
Without a database the API keeps scores in memory. To use MongoDB Atlas:
1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` (never commit it).
2. `npm run seed` to load the machines.

If the API is down, the site still works: stories are bundled, and the leaderboard falls back to this device.

## Edit content
- Stories, dates, sources: `client/src/data/machines.js` (see each entry's `verify` list).
- Quiz questions: `client/src/data/quiz.js` (only use facts shown on the story pages).
- Photos: put files in `client/public/images/` and set `imageUrl`, `gallery` and credits.
- 3D models: `client/public/models/*.glb` and set `model: { type: "glb", src, size }`.

## Deploy
- **Frontend (Vercel):** import the repo, set Root Directory to `client`, add `VITE_API_URL` = your API URL + `/api`.
- **API (Render):** use `render.yaml`; set `MONGODB_URI` and `CORS_ORIGIN` (your Vercel URL).

## Credits
Images and 3D models are from NASA (see the About page). Not affiliated with or endorsed by NASA.
