# How to Run Handorra

## Prerequisites
- Node.js v18+ installed
- npm installed
- Supabase account (free tier works)

## Step-by-Step Instructions

### 1. Install Dependencies
```bash
cd Handorra-2.0-main
npm install
```

This will install all required packages and clean up the package-lock.json.

### 2. Set Up Environment Variables

You have two options:

**Option A: Use the existing .env file (if you have Supabase credentials)**
- The `.env` file is already configured
- Just make sure the credentials are valid

**Option B: Create your own Supabase project**
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Copy your credentials from Settings > API
4. Update the `.env` file with your credentials:
```env
VITE_SUPABASE_PROJECT_ID="your-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
VITE_SUPABASE_URL="https://your-project.supabase.co"
```

### 3. Run the Development Server
```bash
npm run dev
```

The app will start on **http://localhost:8080**

### 4. Open in Browser
Navigate to:
```
http://localhost:8080
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 8080) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

## Troubleshooting

### Port 8080 is already in use
Edit `vite.config.ts` and change the port:
```typescript
server: {
  host: "::",
  port: 3000, // Change to any available port
},
```

### Cannot connect to Supabase
- Verify your `.env` file has correct credentials
- Check your Supabase project is active
- Ensure no extra spaces in environment variables

### Module errors after install
Delete and reinstall:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Project Structure

```
Handorra-2.0-main/
├── src/
│   ├── components/      # UI components
│   ├── pages/          # Route pages
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   └── integrations/   # Supabase integration
├── public/             # Static assets
├── supabase/           # Database migrations
└── .env               # Environment variables
```

## Next Steps

1. Create an account through the Auth page
2. Browse products on the Products page
3. Add items to cart
4. Explore the Dashboard (requires authentication)

## Need More Help?

- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- See [QUICK_START.md](./QUICK_START.md) for quick reference
- Check [README.md](./README.md) for project overview

---

**Happy coding!** 🚀
