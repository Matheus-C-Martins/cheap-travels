# 🔧 Troubleshooting Guide

Common issues and solutions.

## Installation Issues

### Node Version Error

**Problem:**
```
Error: The engine "node" is incompatible
```

**Solution:**
```bash
# Check your Node version
node --version

# Should be 18.0.0 or higher
# Update Node:
# - Using nvm: nvm install 18
# - Or download from: https://nodejs.org/
```

### Dependencies Won't Install

**Problem:**
```
npm ERR! code ERESOLVE
```

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try:
npm install --legacy-peer-deps
```

### Port Already in Use

**Problem:**
```
Error: Port 5173 is already in use
```

**Solution:**
```bash
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port:
VITE_PORT=5174 npm run dev
```

## Runtime Issues

### API Not Loading

**Problem:** No deals showing, console shows network errors.

**Checklist:**
1. ✅ Backend running? `curl http://localhost:3001/api/health`
2. ✅ Correct API URL in `.env`?
3. ✅ CORS configured correctly?
4. ✅ Internet connection working?

**Solution:**
```bash
# 1. Check backend
cd api
npm run dev

# 2. Verify .env
cat .env
# Should have: VITE_API_URL=http://localhost:3001/api

# 3. Check CORS in api/server.js
# Should allow http://localhost:5173
```

### CORS Errors

**Problem:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**

In `api/server.js`:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'https://yourdomain.com'],
  credentials: true
}));
```

### Blank Page After Build

**Problem:** Production build shows blank page.

**Solution:**

1. Check base path in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/cheap-travels/', // For GitHub Pages
  // or
  base: '/', // For custom domain
});
```

2. Check console for errors:
   - F12 > Console
   - Look for 404 errors

3. Rebuild:
```bash
npm run build
npm run preview
```

### Favorites Not Saving

**Problem:** Favorites disappear on refresh.

**Checklist:**
1. ✅ Browser allows localStorage?
2. ✅ Not in private/incognito mode?
3. ✅ No browser extensions blocking?

**Solution:**

Test localStorage:
```javascript
// In browser console:
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage works!');
} catch (e) {
  console.error('localStorage blocked:', e);
}
```

### Dark Mode Not Working

**Problem:** Theme toggle doesn't work.

**Solution:**

1. Check localStorage:
```javascript
// Console:
localStorage.getItem('darkMode')
// Should return 'true' or 'false'
```

2. Clear and reset:
```javascript
localStorage.removeItem('darkMode');
window.location.reload();
```

### Language Not Changing

**Problem:** Language selector doesn't work.

**Solution:**

1. Check localStorage:
```javascript
localStorage.getItem('language')
```

2. Verify translations exist:
```javascript
import translations from './translations';
console.log(translations.pt); // Should show Portuguese translations
```

## Deployment Issues

### GitHub Pages 404

**Problem:** Deployed site shows 404.

**Checklist:**
1. ✅ GitHub Pages enabled in Settings?
2. ✅ Workflow completed successfully?
3. ✅ Base path correct in `vite.config.js`?

**Solution:**

1. Check Actions tab for errors
2. Verify base path:
```javascript
// vite.config.js
base: '/cheap-travels/'
```
3. Redeploy:
```bash
git commit --allow-empty -m "Trigger deploy"
git push
```

### API Deployment Failed

**Problem:** Backend won't deploy to Render/Railway.

**Solution:**

1. Check build logs
2. Verify `package.json` has start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```
3. Check environment variables are set
4. Verify root directory is `api`

### Build Fails

**Problem:**
```
npm run build fails
```

**Solution:**

1. Check for TypeScript/ESLint errors:
```bash
npm run lint
```

2. Fix all errors

3. Try again:
```bash
rm -rf dist
npm run build
```

## Performance Issues

### App Feels Slow

**Checklist:**
1. ✅ Using production build?
2. ✅ Network throttling disabled?
3. ✅ Too many deals rendering?

**Solutions:**

1. Use production build:
```bash
npm run build
npm run preview
```

2. Check Network tab (F12)
   - Look for slow requests
   - Check bundle sizes

3. Clear browser cache:
   - Ctrl+Shift+Delete
   - Clear all

### High Memory Usage

**Problem:** Browser uses too much RAM.

**Solution:**

1. Close other tabs
2. Disable browser extensions
3. Check for memory leaks:
   - F12 > Memory tab
   - Take heap snapshot
   - Look for detached DOM nodes

## Browser-Specific Issues

### Safari Issues

**Problem:** Features not working in Safari.

**Solutions:**

1. Update to latest Safari
2. Enable "Allow Cross-Origin Requests"
3. Clear website data:
   - Safari > Preferences > Privacy > Manage Website Data

### Firefox Private Window

**Problem:** localStorage doesn't work.

**Solution:**

Firefox blocks localStorage in private windows by default. Use regular window or enable in settings.

### Mobile Browser Issues

**Problem:** Layout broken on mobile.

**Solutions:**

1. Clear mobile browser cache
2. Try different mobile browser
3. Check viewport meta tag exists:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Still Having Issues?

### Get Help

1. **Search existing issues:**
   - [GitHub Issues](https://github.com/Matheus-C-Martins/cheap-travels/issues)

2. **Open new issue:**
   - Include error messages
   - Browser and OS versions
   - Steps to reproduce

3. **Provide details:**
   ```
   OS: Windows 11
   Browser: Chrome 120
   Node: 18.17.0
   npm: 9.8.1
   
   Error:
   [Paste error message]
   
   Steps to reproduce:
   1. ...
   2. ...
   ```

### Debug Information

Collect this info before reporting:

```bash
# System info
node --version
npm --version
git --version

# Project info
npm list --depth=0

# Check for errors
npm run lint
npm run build
```

### Useful Commands

```bash
# Clean everything and start fresh
rm -rf node_modules package-lock.json dist .vite
npm install
npm run dev

# Check logs
npm run dev -- --debug

# Analyze bundle
npm run build -- --mode analyze
```

---

**Can't find your issue?** [Open a new issue](https://github.com/Matheus-C-Martins/cheap-travels/issues/new) with details!
