# AI War Room - Frontend

Strategic intelligence dashboard for tracking AI industry developments.

## What This Is

Frontend application that displays:
- Top strategic AI stories (twice daily: 7am & 4pm feeds)
- Strategic analysis across Impact, Timing, Players, Precedent dimensions
- Connection mapping between related stories
- Importance-based prioritization (HIGH/MEDIUM/EMERGING)

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + shadcn/ui components
- **Supabase** for authentication
- **Backend API** for data (separate repository)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Create `.env` file:
   ```
   VITE_BACKEND_URL=http://localhost:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Backend Dependency

This frontend requires the AI War Room backend API running on the specified `VITE_BACKEND_URL`. 

Key endpoints used:
- `GET /api/dashboard` - Main dashboard data
- `GET /api/articles/{id}` - Detailed article view
- `GET /api/articles` - Article listings
- `GET /api/categories` - Strategic categories

## Authentication

Uses Supabase Auth. Users must sign up/login to access the dashboard.

## Data Flow

1. User authenticates via Supabase
2. Dashboard loads stories from backend API
3. Stories transformed to display format
4. Real-time updates every 15 minutes (configurable)
5. Manual refresh available (once per 24 hours)

## Development Notes

- All API calls go through `src/services/api.ts`
- Data transformations in `src/utils/dataTransforms.ts`
- Dashboard state managed by `src/hooks/useDashboardData.ts`
- No mock data - all data comes from backend API

## Common Issues

**No articles showing:**
- Check browser console for API errors
- Verify backend is running and accessible
- Check CORS configuration on backend

**CORS errors:**
- Backend must allow requests from your frontend URL
- Common dev URLs: `http://localhost:3000`, `http://localhost:5173`

**Environment variables not loading:**
- Restart dev server after changing `.env`
- Ensure variables start with `VITE_`

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```
