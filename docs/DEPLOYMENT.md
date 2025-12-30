# 🚀 Deployment Guide

Complete guide to deploy Cheap Travels to production.

## Overview

Cheap Travels has two components:
1. **Frontend** (React + Vite) → GitHub Pages
2. **Backend API** (Node.js) → Your choice of hosting

## Frontend Deployment

### GitHub Pages (Automatic)

✅ **Already configured!** Deploy happens automatically.

#### Setup

1. **Enable GitHub Pages:**
   - Go to: Settings → Pages
   - Source: "GitHub Actions"

2. **Push to main:**
   ```bash
   git push origin main
   ```

3. **Check deployment:**
   - Go to: Actions tab
   - Wait for workflow to complete
   - Visit: `https://YOUR_USERNAME.github.io/cheap-travels/`

#### Manual Deployment

```bash
npm run build
npm run deploy
```

## Backend Deployment

### Option 1: Render.com (Recommended)

✅ Free tier available

1. **Create account:** [render.com](https://render.com)

2. **New Web Service:**
   - Connect GitHub repository
   - Configure:
     ```
     Name: cheap-travels-api
     Root Directory: api
     Build Command: npm install
     Start Command: npm start
     ```

3. **Environment Variables:**
   ```
   PORT=3001
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Copy the URL (e.g., `https://cheap-travels-api.onrender.com`)

### Option 2: Railway.app

1. **Create account:** [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. Configure root directory: `api`
4. Deploy automatically

### Option 3: Vercel

Both frontend and backend:

```bash
npm i -g vercel
vercel
```

### Option 4: Self-Hosted (VPS)

```bash
# On your server
git clone https://github.com/YOUR_USERNAME/cheap-travels.git
cd cheap-travels/api
npm install --production
npm start
```

Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name cheap-travels-api
pm2 save
```

## Connect Frontend to Backend

### 1. Update Environment Variable

Create/update `.env`:

```env
VITE_API_URL=https://your-api-url.onrender.com/api
```

### 2. Rebuild Frontend

```bash
npm run build
```

### 3. Deploy

```bash
git add .
git commit -m "Update API URL"
git push origin main
```

## Security Configuration

### CORS Setup

In `api/server.js`:

```javascript
const corsOptions = {
  origin: [
    'https://matheus-c-martins.github.io',
    'http://localhost:5173' // For development
  ],
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
```

### Environment Variables

**Never commit:**
- API keys
- Database credentials
- Secret tokens

Use platform-specific environment variable managers.

## Performance Optimization

### Frontend

- ✅ Already optimized with Vite
- ✅ Code splitting enabled
- ✅ Assets minified
- ✅ Gzip compression

### Backend

```javascript
// Enable compression
import compression from 'compression';
app.use(compression());

// Cache static responses
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 300 }); // 5 min
```

## Monitoring

### Uptime Monitoring

- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://www.pingdom.com)

### Error Tracking

```bash
npm install @sentry/node
```

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN
});
```

### Logs

**Render:**
```bash
render logs -f
```

**Railway:**
```bash
railway logs
```

## Deployment Checklist

- [ ] Backend deployed and running
- [ ] API URL configured in frontend `.env`
- [ ] CORS properly configured
- [ ] Environment variables set
- [ ] Frontend deployed to GitHub Pages
- [ ] SSL/HTTPS enabled (automatic on most platforms)
- [ ] Rate limiting configured
- [ ] Error monitoring set up
- [ ] Uptime monitoring configured
- [ ] Tested end-to-end

## Rollback

### Frontend (GitHub Pages)

```bash
git revert HEAD
git push origin main
```

### Backend

Most platforms keep previous deployments:
- Render: Click "Rollback" in dashboard
- Railway: Redeploy previous commit
- Vercel: Select previous deployment

## Custom Domain (Optional)

### Frontend (GitHub Pages)

1. Add CNAME file:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

### Backend

Most platforms support custom domains in their settings.

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common deployment issues.

## Need Help?

- 📖 [Installation Guide](./INSTALLATION.md)
- 💬 [Open an Issue](https://github.com/Matheus-C-Martins/cheap-travels/issues)
