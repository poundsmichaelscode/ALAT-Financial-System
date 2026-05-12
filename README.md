# ALAT Financial System

A production-ready MERN financial SaaS platform for businesses, startups, accountants, and teams. It includes a premium React web dashboard, Node.js/Express API, MongoDB persistence, Expo React Native mobile app, PDF/Excel exports, PWA support, and AI-powered financial insights.

## Implemented Modules

- Authentication with JWT
- Responsive premium dashboard
- Expenses and income management
- Profit, loss, net balance and monthly financial summaries
- AI-powered expense insights and risk scoring
- Professional invoice generation
- Receipt generation with QR-ready receipt data
- PDF and Excel downloads for invoices and receipts
- Business management for multiple companies
- Clients, projects/services, staff/workers and salary tracking
- MongoDB CRUD APIs
- Mobile app screens for dashboard, expenses, invoices, receipts, businesses and AI
- PWA manifest and service worker
- CORS support for Vite ports `5173` through `5176`

## Brand Colors

- Deep Blue: `#170C79`
- Soft Cream: `#EFE3CA`
- Sky Blue: `#56B6C6`
- Light Cyan: `#8ACBD0`

## Folder Structure

```txt
ALAT-Financial-System/
├── apps/
│   ├── api/       # Node.js + Express + MongoDB API
│   ├── web/       # React + TypeScript + Tailwind PWA
│   └── mobile/    # Expo React Native app
├── docs/
├── docker-compose.yml
├── package.json
└── README.md
```

## Local Setup

```bash
npm install
npm run install:all
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

Start MongoDB and Redis:

```bash
docker compose up -d mongo redis
```

Seed demo data:

```bash
npm run seed
```

Start backend:

```bash
npm run dev:api
```

Start frontend in another terminal:

```bash
npm run dev:web
```

Demo login:

```txt
Email: admin@alatfinance.com
Password: Password123!
```

## Environment Variables

### Backend `apps/api/.env`

```env
PORT=5050
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alat_financial_system
JWT_ACCESS_SECRET=change_me_access_secret
JWT_REFRESH_SECRET=change_me_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_URL=redis://localhost:6380
```

### Web `apps/web/.env`

```env
VITE_API_URL=http://localhost:5050/api/v1
```

## Main API Routes

```txt
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/expenses
POST   /api/v1/expenses
PATCH  /api/v1/expenses/:id
DELETE /api/v1/expenses/:id
GET    /api/v1/expenses/income
POST   /api/v1/expenses/income
PATCH  /api/v1/expenses/income/:id
DELETE /api/v1/expenses/income/:id
GET    /api/v1/expenses/summary
GET    /api/v1/invoices
POST   /api/v1/invoices
GET    /api/v1/invoices/:id/pdf
GET    /api/v1/invoices/:id/xlsx
GET    /api/v1/receipts
POST   /api/v1/receipts
GET    /api/v1/receipts/:id/pdf
GET    /api/v1/receipts/:id/xlsx
GET    /api/v1/businesses
POST   /api/v1/businesses
POST   /api/v1/businesses/:id/clients
POST   /api/v1/businesses/:id/projects
GET    /api/v1/businesses/:id/performance
GET    /api/v1/employees
POST   /api/v1/employees
PATCH  /api/v1/employees/:id
DELETE /api/v1/employees/:id
POST   /api/v1/ai/ask
```

## Deployment

- Web: Vercel
- API: Render or Railway
- Database: MongoDB Atlas
- Mobile: Expo EAS Build

For production, use strong JWT secrets, set `CLIENT_URL` to the deployed frontend URL, and use MongoDB Atlas for `MONGODB_URI`.
