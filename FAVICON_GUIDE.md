# Favicon Guide

The Handorra logo/favicon has been updated to remove the Lovable branding.

## Current Favicon

The current favicon is a simple purple square with a white "H" letter (`public/favicon.svg`).

## How to Create a Custom Favicon

### Option 1: Use an Online Generator (Easiest)

1. **Favicon.io** (https://favicon.io/)
   - Text to Favicon: Type "H" or "Handorra"
   - Choose colors and font
   - Download and replace `public/favicon.svg`

2. **RealFaviconGenerator** (https://realfavicongenerator.net/)
   - Upload your logo/image
   - Generates all sizes automatically
   - Download and extract to `public/` folder

### Option 2: Design Your Own

1. Create a logo in:
   - Figma (free)
   - Canva (free)
   - Adobe Illustrator
   - Inkscape (free)

2. Export as:
   - SVG (recommended) - scalable, small file size
   - PNG (512x512px minimum)

3. Convert to favicon:
   - Use https://favicon.io/favicon-converter/
   - Or use https://realfavicongenerator.net/

4. Replace files in `public/` folder

### Option 3: Use an Emoji

Simple and quick! Edit `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text x="50" y="50" font-size="80" text-anchor="middle" dominant-baseline="middle">🎨</text>
</svg>
```

Popular emojis for Handorra:
- 🎨 (art palette)
- 🛍️ (shopping bag)
- 🏺 (pottery)
- 🧺 (basket)
- ✨ (sparkles)

## Current Favicon Code

The favicon is referenced in `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="alternate icon" href="/favicon.ico" />
```

## Recommended Sizes

For best compatibility across all devices:

- **favicon.svg** - Modern browsers (current)
- **favicon.ico** - 32x32px (legacy browsers)
- **apple-touch-icon.png** - 180x180px (iOS)
- **favicon-192.png** - 192x192px (Android)
- **favicon-512.png** - 512x512px (PWA)

## Quick Customization

To change the current favicon color, edit `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Change fill color here -->
  <rect width="100" height="100" rx="20" fill="#8B5CF6"/>
  <!-- Change text color here -->
  <text x="50" y="72" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">H</text>
</svg>
```

Popular color schemes:
- Purple: `#8B5CF6` (current)
- Blue: `#3B82F6`
- Green: `#10B981`
- Orange: `#F97316`
- Red: `#EF4444`

## Testing Your Favicon

After changing the favicon:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check in incognito/private mode
4. Test on mobile devices

## Need Help?

- Use https://favicon.io/ for quick generation
- Check https://realfavicongenerator.net/ for comprehensive favicon packages
- Test your favicon at https://realfavicongenerator.net/favicon_checker

---

**Current Status**: ✅ Lovable branding removed, custom "H" favicon in place
