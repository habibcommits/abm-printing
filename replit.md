# ABM Printing Solution - Next.js Template

## Overview
This is a Next.js 14 application for a printing solutions business. It uses MongoDB for data storage and is styled with Tailwind CSS and Radix UI components.

## Project Structure
- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components (using Radix UI/shadcn)
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and database helpers
- `public/` - Static assets

## Key Technologies
- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Forms**: React Hook Form with Zod validation

## Development
- Dev server runs on port 5000
- Run with `npm run dev`

## Environment Variables
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name
- `NEXT_PUBLIC_BASE_URL` - Public base URL for the app
- `CORS_ORIGINS` - Allowed CORS origins
