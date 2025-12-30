# Logo Setup Instructions

## ✅ Quick Setup

The app is configured to use `public/logo.png` as the favicon.

### Adding the Logo:

1. **Save your logo image as `public/logo.png`**
   - Use the airplane with discount tag image (logo.jpg)
   - Recommended size: 512x512px or larger
   - Format: PNG with transparent background (or white)

2. **Done!** The `index.html` is already configured:
   ```html
   <link rel="icon" type="image/png" href="/logo.png" />
   ```

## 📁 File Location

```
project/
├── public/
│   └── logo.png  ← Add your logo here
├── index.html    ← Already configured ✅
└── src/
```

## 🎨 Logo Design

The logo should feature:
- ✈️ Blue airplane
- 🏷️ Turquoise/cyan discount tag with % symbol
- Clean, professional design
- Works well at small sizes (favicon)

## 🖼️ Recommended Specifications

- **Format:** PNG
- **Size:** 512x512px (will be scaled automatically)
- **Background:** Transparent or white
- **Colors:** Blue (#0066FF) and Turquoise (#00D4C8)

## 🚀 Using the Logo

### As Favicon (Browser Tab)
✅ **Already configured!** Just add `public/logo.png`

### In App Header (Optional)

To use the logo in the header instead of emoji:

```jsx
// In src/App.jsx
// Replace:
<span className="logo-icon" aria-hidden="true">✈️</span>

// With:
<img src="/logo.png" alt="" className="logo-icon" aria-hidden="true" style={{width: '32px', height: '32px'}} />
```

## 📝 Notes

- Logo will appear in browser tabs automatically
- No additional configuration needed
- Just place your PNG file in `public/logo.png`
- The app will use it immediately after deployment

## 🔄 Alternative: SVG

If you prefer SVG (included in the repo):
1. Change `index.html` to: `href="/logo.svg"`
2. SVG is vector-based and scales perfectly
3. Edit `public/logo.svg` to customize

---

**Current setup:** Uses `logo.png` ✅
