# 📦 Installation Guide

Complete guide to install and run Cheap Travels locally.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([Download](https://git-scm.com/))

## Frontend Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Matheus-C-Martins/cheap-travels.git
cd cheap-travels
```

### 2. Install Dependencies

```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at: `http://localhost:5173`

## Backend API Installation (Optional)

If you want to run the backend locally:

### 1. Navigate to API folder

```bash
cd api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `api/.env`:

```env
PORT=3001
NODE_ENV=development
```

### 4. Start API Server

```bash
npm run dev
```

API will be available at: `http://localhost:3001`

## Verification

### Test Frontend

1. Open `http://localhost:5173`
2. You should see the Cheap Travels homepage
3. Check browser console for errors

### Test API

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-12-30T..."
}
```

## Troubleshooting

### Port Already in Use

**Frontend (5173):**
```bash
# Kill process using port 5173
lsof -ti:5173 | xargs kill -9
```

**Backend (3001):**
```bash
lsof -ti:3001 | xargs kill -9
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure your `.env` has the correct API URL and the backend CORS is configured to allow `http://localhost:5173`.

## Next Steps

- Read the [Quick Start Guide](./QUICKSTART.md)
- Explore the [Features](./FEATURES.md)
- Check out [Contributing Guide](./CONTRIBUTING.md)

## Need Help?

See [Troubleshooting](./TROUBLESHOOTING.md) or [open an issue](https://github.com/Matheus-C-Martins/cheap-travels/issues).
