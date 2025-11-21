# Kids Burger Kiosk - Deployment Guide

## Quick Start - Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Setup Vercel deployment configuration"
git push origin main
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `SELF-ORDERING-KIOSK-FOR-KIDS`
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### 3. Environment Variables (Optional)
If you add a database later, set these in Vercel Dashboard:
- `DATABASE_URL` - Your PostgreSQL connection string

## Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will run at `http://localhost:5000`

### Build for Production
```bash
npm run build
```

## Auto-Deployment

Once connected to Vercel:
- **Every push to `main` branch** → Automatic deployment to production
- **Pull requests** → Preview deployments automatically created
- **Deployment status** → Check in GitHub PR checks

## Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── index.html
├── api/            # Vercel Serverless Functions
│   ├── ingredients.ts
│   └── orders.ts
├── shared/         # Shared types/schema
└── server/         # Express server (for local dev)
```

## Features
- 🍔 Interactive burger builder for kids
- 🎨 Colorful, kid-friendly UI
- 📱 Touch-friendly drag & drop
- 💰 Real-time price calculation
- 🎉 Celebration animations on order completion
- 📊 Nutrition information display
