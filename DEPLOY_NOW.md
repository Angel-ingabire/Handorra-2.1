# Deploy Handorra in 5 Minutes

Choose your preferred hosting platform and follow the steps:

---

## 🚀 FASTEST: Deploy to Vercel (Recommended)

### Method 1: Using Vercel Website (No CLI needed)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up** with GitHub (free)
3. **Click** "Add New Project"
4. **Import** your GitHub repository
5. **Configure**:
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
6. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add these three variables:
     ```
     VITE_SUPABASE_URL = your-supabase-url
     VITE_SUPABASE_PUBLISHABLE_KEY = your-anon-key
     VITE_SUPABASE_PROJECT_ID = your-project-id
     ```
7. **Click** "Deploy"
8. **Done!** Your app will be live in 2-3 minutes at `https://your-app.vercel.app`

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd Handorra-2.0-main

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

---

## 🌐 Deploy to Netlify

### Using Netlify Website:

1. **Go to** [netlify.com](https://netlify.com)
2. **Sign up** (free)
3. **Click** "Add new site" → "Import an existing project"
4. **Connect** your Git repository
5. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Add Environment Variables**:
   - Go to Site settings → Environment variables
   - Add your three Supabase variables
7. **Click** "Deploy site"
8. **Done!** Live at `https://your-site.netlify.app`

### Using Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project
cd Handorra-2.0-main

# Login
netlify login

# Deploy
netlify deploy --prod

# Follow prompts
```

---

## 📦 Deploy to Railway

1. **Go to** [railway.app](https://railway.app)
2. **Sign up** with GitHub (free)
3. **Click** "New Project" → "Deploy from GitHub repo"
4. **Select** your repository
5. **Add environment variables** in the Variables tab
6. **Done!** Railway auto-detects and deploys

---

## 🎯 Deploy to Render

1. **Go to** [render.com](https://render.com)
2. **Sign up** (free)
3. **Click** "New" → "Static Site"
4. **Connect** your repository
5. **Configure**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. **Add environment variables**
7. **Click** "Create Static Site"

---

## 💻 Build Locally and Upload Anywhere

If you want to host on your own server or any static hosting:

```bash
# Build the app
npm run build

# This creates a 'dist' folder with all static files
# Upload the contents of 'dist' folder to your hosting
```

You can upload the `dist` folder to:
- Your own web server
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any static file hosting service

---

## ⚙️ Environment Variables You Need

For ALL hosting platforms, you need these three variables:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=xxxxx
```

Get these from your Supabase dashboard:
- Go to [supabase.com/dashboard](https://supabase.com/dashboard)
- Select your project
- Go to Settings → API
- Copy the values

---

## ✅ After Deployment Checklist

Once deployed, test these:

- [ ] Homepage loads
- [ ] Can navigate to Products page
- [ ] Can sign in/sign up
- [ ] Cart functionality works
- [ ] Images load correctly
- [ ] Mobile view works

---

## 🔧 Common Issues

### Build fails with "Cannot find module"
```bash
# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
- Make sure they start with `VITE_`
- Redeploy after adding variables
- Check for typos

### 404 error on page refresh
- Already fixed! The `vercel.json` and `netlify.toml` files handle this
- For other hosts, ensure SPA routing is configured

---

## 🎉 That's It!

Your Handorra app should now be live and accessible to anyone with the URL.

**Recommended**: Start with Vercel - it's the easiest and most reliable.

Need more details? Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
