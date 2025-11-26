# Handorra Setup Guide

This guide will walk you through setting up and running the Handorra project on your local machine.

## Step 1: Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

Verify your installations:
```bash
node --version
npm --version
```

## Step 2: Clone the Repository

```bash
git clone <your-repository-url>
cd Handorra-2.0-main
```

## Step 3: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install all dependencies listed in `package.json`, including React, TypeScript, Tailwind CSS, and Supabase client.

## Step 4: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Project name: `handorra` (or your preferred name)
   - Database password: Create a strong password
   - Region: Choose closest to your location
4. Wait for the project to be created (takes ~2 minutes)

### Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
3. Your Project ID is in the URL or under **Settings** > **General**

### Configure Environment Variables

1. Create a `.env` file in the root directory (`Handorra-2.0-main/`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
VITE_SUPABASE_PROJECT_ID=your-project-id
```

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 5: Set Up Database Tables

The project includes migration files in `supabase/migrations/`. You have two options:

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Link your project:
```bash
supabase link --project-ref your-project-id
```

3. Push migrations:
```bash
supabase db push
```

### Option B: Manual Setup

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Open each migration file in `supabase/migrations/` and run them in order

## Step 6: Run the Development Server

Start the development server:

```bash
npm run dev
```

The application will start on `http://localhost:8080`

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:8080/
➜  Network: http://[your-ip]:8080/
```

## Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

You should see the Handorra homepage!

## Common Issues & Troubleshooting

### Port Already in Use

If port 8080 is already in use, you can change it in `vite.config.ts`:
```typescript
server: {
  host: "::",
  port: 3000, // Change to any available port
},
```

### Supabase Connection Errors

- Verify your `.env` file has the correct credentials
- Check that your Supabase project is active
- Ensure there are no extra spaces in your environment variables

### Module Not Found Errors

Run:
```bash
npm install
```

If issues persist, delete `node_modules` and `package-lock.json`, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Make sure you're using Node.js v18 or higher:
```bash
node --version
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Additional Commands

- **Lint code**: `npm run lint`
- **Development build**: `npm run build:dev`

## Next Steps

- Create an admin account through the Auth page
- Add products through the Dashboard
- Configure user roles in Supabase
- Customize styling in `src/index.css` and Tailwind config

## Need Help?

- Check the main [README.md](./README.md) for project overview
- Review the code in `src/` for implementation details
- Open an issue in the repository for bugs or questions

Happy coding! 🚀
