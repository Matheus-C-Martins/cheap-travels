# Logo Setup Instructions

## Adding the Custom Logo

To add the custom Cheap Travels logo to the application:

### Option 1: Use the generated PNG

1. **Download the logo image:**
   - URL: https://user-gen-media-assets.s3.amazonaws.com/seedream_images/0e6de77e-1356-4b40-b20d-9042d8091666.png

2. **Save as `public/logo.png`**

3. **The index.html is already configured to use it!**

### Option 2: Use the SVG (included)

- A vector SVG logo is included at `public/logo.svg`
- You can edit colors/design directly in the SVG file
- Change `index.html` to use: `<link rel="icon" type="image/svg+xml" href="/logo.svg" />`

## Logo Files

### Favicon (Browser Tab)
- `public/logo.png` or `public/logo.svg`
- Shows in browser tabs and bookmarks

### App Logo (Header)
- Currently using emoji: ✈️
- To use custom logo, update `src/App.jsx`:
  ```jsx
  <img src="/logo.svg" alt="Cheap Travels" className="logo-icon" />
  ```

## Colors Used

- **Primary Blue:** `#3498db` (airplane)
- **Turquoise:** `#1abc9c` (price tag)
- **Dark Blue:** `#2980b9` (shadows)

## Customization

Edit `public/logo.svg` to customize:
- Change colors in `fill` attributes
- Adjust airplane angle in `rotate()` transform
- Resize elements by changing viewBox

## Quick Setup

```bash
# Download the PNG logo
curl -o public/logo.png https://user-gen-media-assets.s3.amazonaws.com/seedream_images/0e6de77e-1356-4b40-b20d-9042d8091666.png

# Or just use the included SVG - it's already configured!
```

The app will automatically use the logo once the file is in place!
