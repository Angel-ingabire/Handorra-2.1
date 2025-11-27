# Deploy Handorra to Firebase Hosting

Firebase Hosting can serve your Handorra app while still using Supabase as the backend.

## Initial Setup (One Time)

### 1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase:
```bash
firebase login
```

### 3. Initialize Firebase (Answer Questions):

```bash
firebase init
```

**Select**: Hosting (use spacebar to select, then Enter)

**Questions & Answers**:
- Use existing project or create new? → **Select your project**
- What file for Firestore Rules? → **Press Enter** (default: firestore.rules)
- What file for Firestore indexes? → **Press Enter** (default: firestore.indexes.json)
- What do you want to use as your public directory? → **Type: `dist`**
- Configure as a single-page app? → **Type: `y`**
- Set up automatic builds with GitHub? → **Type: `y` or `n`** (your choice)
- File dist/index.html already exists. Overwrite? → **Type: `N`**

## Deploy Your App

### Step 1: Build the App
```bash
npm run build
```

This creates a `dist` folder with your production-ready app.

### Step 2: Deploy to Firebase
```bash
firebase deploy --only hosting
```

### Step 3: Access Your App
Your app will be live at:
```
https://your-project-id.web.app
```
or
```
https://your-project-id.firebaseapp.com
```

## Important: Environment Variables

Firebase Hosting doesn't support server-side environment variables. Your `.env` file is bundled during the build process.

### Security Note:
The environment variables in `.env` are **safe to bundle** because:
- `VITE_SUPABASE_URL` - Public URL (safe)
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Public anon key (safe, designed for client-side)
- These are meant to be exposed in the browser

### If You Need Different Environments:

**Development**:
```bash
npm run dev
```

**Production**:
```bash
npm run build
firebase deploy
```

## Firebase Configuration Files

After initialization, you'll have:

### firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### .firebaserc
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

## Continuous Deployment

### Option 1: Manual Deploy
```bash
npm run build
firebase deploy
```

### Option 2: GitHub Actions (Automatic)

If you selected "Set up automatic builds with GitHub", Firebase created a workflow file.

Every push to your main branch will automatically:
1. Build your app
2. Deploy to Firebase Hosting

## Custom Domain (Optional)

### 1. Go to Firebase Console:
- Open [console.firebase.google.com](https://console.firebase.google.com)
- Select your project
- Go to Hosting → Add custom domain

### 2. Follow the instructions to:
- Add your domain
- Verify ownership
- Update DNS records

### 3. Firebase will automatically provision SSL certificate

## Useful Commands

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# Preview before deploying
firebase hosting:channel:deploy preview

# View deployment history
firebase hosting:clone

# Open Firebase console
firebase open hosting

# Check Firebase project info
firebase projects:list
```

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Deploy Fails
```bash
# Re-login to Firebase
firebase logout
firebase login
firebase deploy
```

### Environment Variables Not Working
- Make sure `.env` file exists in root directory
- Verify variables start with `VITE_`
- Rebuild after changing `.env`: `npm run build`

### 404 Errors on Refresh
- Check `firebase.json` has the rewrite rule (see above)
- Redeploy: `firebase deploy --only hosting`

### Old Version Still Showing
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check deployment completed successfully

## Comparison: Firebase vs Other Platforms

| Feature | Firebase | Vercel | Netlify |
|---------|----------|--------|---------|
| Free Tier | ✅ Generous | ✅ Generous | ✅ Good |
| Custom Domain | ✅ Free SSL | ✅ Free SSL | ✅ Free SSL |
| Auto Deploy | ✅ Via GitHub | ✅ Via Git | ✅ Via Git |
| CDN | ✅ Global | ✅ Global | ✅ Global |
| Setup | Medium | Easy | Easy |

## Cost

Firebase Hosting is **FREE** for:
- 10 GB storage
- 360 MB/day transfer
- Perfect for Handorra!

## Architecture

```
User Browser
    ↓
Firebase Hosting (serves your React app)
    ↓
Supabase (handles database, auth, storage)
```

Firebase = Frontend hosting
Supabase = Backend services

## Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Verify all features work
3. ✅ Check authentication
4. ✅ Test cart and checkout
5. ✅ Add custom domain (optional)
6. ✅ Set up monitoring

## Support

- Firebase Docs: https://firebase.google.com/docs/hosting
- Firebase Console: https://console.firebase.google.com
- Supabase Dashboard: https://supabase.com/dashboard

---

**Your app will be live at**: `https://your-project-id.web.app` 🚀
