# Deployment

This project is a full-stack portfolio:

- `client/` is a Vite React app.
- `server/` is an Express API that serves `client/dist` in production.

The simplest deployment is a single Render Web Service.

## Render Setup

1. Push the repository to GitHub.
2. In Render, create a new Blueprint or Web Service from the GitHub repo.
3. Use these settings if creating the service manually:
   - Runtime: `Node`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Root Directory: leave blank
4. Add these environment variables in Render:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Deploy the service.

Render provides `PORT` automatically. The app serves the frontend and API from the same domain, so the existing `/api/...` requests work in production.

## Local Production Check

```bash
npm run build-client
cd server
set NODE_ENV=production
node server.js
```

Open `http://localhost:5000`.

## Important

Do not commit real `.env` files. If secrets were already pushed to GitHub, rotate the MongoDB, Gmail app password, Cloudinary, and JWT secret values before deploying.
