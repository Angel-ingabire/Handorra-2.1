# Deployment Guide for Handorra

This guide covers multiple hosting options for deploying your Handorra application to production.

## Prerequisites

Before deploying, ensure:
- ✅ Your Supabase project is set up and running
- ✅ All environment variables are configured
- ✅ The app runs locally without errors (`npm run dev`)

---

## Option 1: Vercel (Recommended - Easiest)

Vercel is perfect for React/Vite apps and offers free hosting with automatic deployments.

### Steps:

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy via Vercel Website** (easier):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`
   - Click "Deploy"

3. **Deploy via CLI**:
```bash
cd Handorra-2.0-main
vercel
```
Follow the prompts and add your environment variables when asked.

**Your app will be live at**: `https://your-project.vercel.app`

---

## Option 2: Netlify

Netlify is another excellent free hosting platform with great CI/CD.

### Steps:

1. **Deploy via Netlify Website**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Add environment variables in Site settings → Environment variables
   - Click "Deploy"

2. **Deploy via Netlify CLI**:
```bash
npm install -g netlify-cli
cd Handorra-2.0-main
netlify deploy --prod
```

3. **Create netlify.toml** (optional, for better config):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Your app will be live at**: `https://your-site.netlify.app`

---

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**:
Add base URL:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/root`
   - Save

**Your app will be live at**: `https://yourusername.github.io/your-repo-name/`

---

## Option 4: Railway

Railway offers free hosting with database support.

### Steps:

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables
6. Railway will auto-detect Vite and deploy

**Your app will be live at**: `https://your-app.up.railway.app`

---

## Option 5: Render

Free tier with automatic deployments from Git.

### Steps:

1. Go to [render.com](https://render.com)
2. Sign up/login
3. Click "New" → "Static Site"
4. Connect your repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Add environment variables
7. Click "Create Static Site"

**Your app will be live at**: `https://your-app.onrender.com`

---

## Option 6: Self-Hosted (VPS/Cloud)

Deploy on your own server (DigitalOcean, AWS, Azure, etc.)

### Steps:

1. **Build the app**:
```bash
npm run build
```
This creates a `dist` folder with static files.

2. **Upload to server**:
```bash
scp -r dist/* user@your-server:/var/www/html/
```

3. **Configure Nginx** (example):
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. **Restart Nginx**:
```bash
sudo systemctl restart nginx
```

---

## Environment Variables Setup

For all hosting platforms, you need to set these environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

**Important**: Never commit your `.env` file to Git!

---

## Build Command Reference

For all platforms, use these settings:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node Version | 18.x or higher |

---

## Post-Deployment Checklist

After deploying, verify:

- ✅ App loads without errors
- ✅ Can navigate between pages
- ✅ Supabase connection works
- ✅ Authentication works
- ✅ Images load correctly
- ✅ Cart functionality works
- ✅ Mobile responsive design works

---

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### For Netlify:
1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS records

### For Others:
Point your domain's A record to the hosting provider's IP or CNAME to their URL.

---

## Continuous Deployment

Most platforms support automatic deployments:

1. **Connect your Git repository**
2. **Every push to main branch** triggers a new deployment
3. **Pull requests** can create preview deployments

---

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Environment Variables Not Working
- Ensure they start with `VITE_`
- Restart the deployment after adding variables
- Check for typos in variable names

### 404 on Page Refresh
- Add redirect rules for SPA routing
- For Netlify: Create `_redirects` file in `public/`:
  ```
  /*    /index.html   200
  ```
- For Vercel: Create `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Supabase Connection Issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure API keys are correct

---

## Recommended Hosting Comparison

| Platform | Free Tier | Ease of Use | Best For |
|----------|-----------|-------------|----------|
| **Vercel** | ✅ Generous | ⭐⭐⭐⭐⭐ | React/Vite apps |
| **Netlify** | ✅ Good | ⭐⭐⭐⭐⭐ | Static sites |
| **Railway** | ✅ Limited | ⭐⭐⭐⭐ | Full-stack apps |
| **Render** | ✅ Basic | ⭐⭐⭐⭐ | Static + APIs |
| **GitHub Pages** | ✅ Yes | ⭐⭐⭐ | Simple projects |

**My Recommendation**: Start with **Vercel** - it's the easiest and most reliable for Vite/React apps.

---

## Quick Deploy Commands

### Vercel:
```bash
npm install -g vercel
vercel --prod
```

### Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Build Locally:
```bash
npm run build
# Upload the 'dist' folder to any static hosting
```

---

## Need Help?

- Check the hosting platform's documentation
- Verify your Supabase project is running
- Test locally first with `npm run build && npm run preview`
- Check browser console for errors

---

**Your Handorra app is ready to go live! 🚀**
