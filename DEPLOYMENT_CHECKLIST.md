# Deployment Checklist

Use this checklist to ensure a smooth deployment of your Handorra application.

## Pre-Deployment

### Local Testing
- [ ] App runs locally without errors (`npm run dev`)
- [ ] All pages load correctly
- [ ] Authentication works (sign up, sign in, sign out)
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] No console errors in browser
- [ ] Mobile responsive design works

### Build Testing
- [ ] Production build completes successfully (`npm run build`)
- [ ] Preview build works (`npm run preview`)
- [ ] All features work in preview mode
- [ ] Images load correctly
- [ ] Environment variables are working

### Supabase Setup
- [ ] Supabase project is created and active
- [ ] Database tables are set up (via migrations)
- [ ] Authentication is enabled
- [ ] Row Level Security (RLS) policies are configured
- [ ] Storage buckets are created (if using file uploads)
- [ ] API keys are copied and ready

### Code Preparation
- [ ] All changes are committed to Git
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] `.env.example` exists for reference
- [ ] `vercel.json` and `netlify.toml` are in place

## Deployment

### Choose Your Platform
- [ ] Selected hosting platform (Vercel recommended)
- [ ] Created account on hosting platform
- [ ] Connected GitHub account

### Platform Configuration
- [ ] Repository imported/connected
- [ ] Build command set: `npm run build`
- [ ] Output directory set: `dist`
- [ ] Node version set: 18.x or higher

### Environment Variables
- [ ] `VITE_SUPABASE_URL` added
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` added
- [ ] `VITE_SUPABASE_PROJECT_ID` added
- [ ] All variables start with `VITE_` prefix
- [ ] No typos in variable names
- [ ] No extra spaces in values

### Deploy
- [ ] Clicked "Deploy" button
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] Deployment URL is generated

## Post-Deployment

### Functionality Testing
- [ ] Homepage loads at deployment URL
- [ ] All navigation links work
- [ ] Products page displays items
- [ ] Can sign up for new account
- [ ] Can sign in with credentials
- [ ] Can add items to cart
- [ ] Cart updates correctly
- [ ] Can view profile
- [ ] Can access dashboard (if authenticated)
- [ ] Images load correctly
- [ ] No 404 errors on page refresh

### Performance Testing
- [ ] Page load speed is acceptable
- [ ] Images load quickly
- [ ] No console errors
- [ ] No console warnings (or acceptable ones)
- [ ] Mobile view works correctly
- [ ] Tablet view works correctly
- [ ] Desktop view works correctly

### Security Testing
- [ ] Environment variables are not exposed in browser
- [ ] API keys are not visible in source code
- [ ] Authentication redirects work correctly
- [ ] Protected routes require login
- [ ] HTTPS is enabled (automatic on most platforms)

### Browser Testing
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on mobile browsers

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased (if needed)
- [ ] Domain connected to hosting platform
- [ ] DNS records updated
- [ ] SSL certificate issued (automatic)
- [ ] Domain redirects to HTTPS

### Continuous Deployment
- [ ] Auto-deploy on push to main branch enabled
- [ ] Preview deployments for pull requests enabled
- [ ] Deployment notifications configured

### Monitoring
- [ ] Analytics added (Google Analytics, Plausible, etc.)
- [ ] Error tracking added (Sentry, LogRocket, etc.)
- [ ] Uptime monitoring configured

### Performance
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Code splitting configured
- [ ] Caching headers set

## Troubleshooting

If something doesn't work:

### Build Fails
- [ ] Check build logs for errors
- [ ] Verify Node.js version
- [ ] Check all dependencies are in package.json
- [ ] Try building locally first

### Environment Variables Not Working
- [ ] Verify they start with `VITE_`
- [ ] Check for typos
- [ ] Redeploy after adding variables
- [ ] Check Supabase project is active

### 404 on Page Refresh
- [ ] Verify `vercel.json` or `netlify.toml` exists
- [ ] Check SPA routing is configured
- [ ] Verify `_redirects` file in public folder

### Supabase Connection Issues
- [ ] Verify environment variables are correct
- [ ] Check Supabase project is running
- [ ] Test API keys in Supabase dashboard
- [ ] Check browser console for errors

### Images Not Loading
- [ ] Verify images are in public folder
- [ ] Check image paths are correct
- [ ] Ensure images are committed to Git
- [ ] Check image URLs in browser network tab

## Success Criteria

Your deployment is successful when:

✅ App is accessible via public URL
✅ All pages load without errors
✅ Authentication works end-to-end
✅ Cart and checkout function correctly
✅ Mobile responsive design works
✅ No console errors
✅ Supabase connection is stable
✅ Images and assets load properly

## Next Steps After Deployment

1. **Share your app** - Send the URL to users/stakeholders
2. **Monitor performance** - Check analytics and error logs
3. **Gather feedback** - Get user feedback for improvements
4. **Plan updates** - Create a roadmap for new features
5. **Set up backups** - Ensure Supabase data is backed up
6. **Document** - Keep deployment docs updated

---

## Quick Reference

**Recommended Platform**: Vercel
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Node Version**: 18.x

**Environment Variables**:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY
- VITE_SUPABASE_PROJECT_ID

**Deployment Time**: 2-5 minutes
**Cost**: Free (for personal projects)

---

**Ready to deploy? Start with [DEPLOY_NOW.md](./DEPLOY_NOW.md)!** 🚀
