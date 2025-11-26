# Handorra

A modern e-commerce platform connecting Rwandan artisans with buyers worldwide. Handorra showcases authentic handcrafted products including furniture, clothing, paintings, and traditional crafts.

## Features

- Browse products by category (Furniture, Clothing, Paintings, Crafts)
- Shopping cart with real-time updates
- User authentication and profile management
- Order management system
- Artisan/seller profiles
- Secure checkout process
- Fully responsive design

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn-ui components
- **Build Tool**: Vite
- **Backend**: Supabase (Database, Authentication, Storage)
- **State Management**: TanStack Query
- **Routing**: React Router v6

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for backend services)

## Installation & Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Handorra-2.0-main
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # shadcn-ui components
│   └── ...        # Custom components
├── pages/          # Page components (routes)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and helpers
├── integrations/   # Third-party service integrations
└── assets/         # Static assets (images, icons)
```

## Database Schema

The application uses Supabase with the following main tables:

- `products` - Product catalog with details
- `profiles` - User profile information
- `cart_items` - Shopping cart items per user
- `orders` - Order records and status
- `order_items` - Individual items in orders
- `user_roles` - Role-based access control

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Deployment

Ready to deploy? See the deployment guides:

- **Quick Deploy**: [DEPLOY_NOW.md](./DEPLOY_NOW.md) - Deploy in 5 minutes
- **Detailed Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - All hosting options

Recommended platforms:
- **Vercel** (easiest, free) - Best for React/Vite apps
- **Netlify** (free) - Great for static sites
- **Railway** (free tier) - Good for full-stack apps

## Support

For questions or support, please open an issue in the repository.
