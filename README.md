# ALAT Financial System

**ALAT Financial System** is a production-oriented fintech monorepo for individuals, startups, and companies to manage expenses, income, payroll, invoices, receipts, reports, AI-powered financial insights, notifications, and multiple businesses.

## Live Architecture

```txt
ALAT-Financial-System/
├── apps/
│   ├── api/      Node.js + Express + MongoDB + Socket.IO + AI assistant
│   ├── web/      React + Vite + Tailwind + Redux Toolkit dashboard
│   └── mobile/   React Native + Expo + Redux Toolkit mobile app
├── docker-compose.yml
└── README.md
```

## Core Features Included

- JWT authentication with roles: Super Admin, Admin, Manager, Accountant, Employee
- Multi-business support with business switching
- Expense CRUD, categories, approval workflow, budgets, receipt upload hooks
- Invoice CRUD with status tracking and PDF-ready invoice model
- Receipt model with QR-code-ready references
- Payroll, employees, bonuses, deductions, tax fields, approval state
- Financial dashboard summaries and analytics endpoints
- AI financial assistant endpoint for spending analysis and recommendations
- Notifications API and Socket.IO real-time channel
- Admin-oriented user/business analytics foundations
- React web dashboard with modern fintech UI
- Expo mobile app with dashboard, expenses, invoices, AI assistant screens
- Docker Compose for MongoDB, Redis, and API
- Deployment guide for Vercel, Render/Railway, MongoDB Atlas, Expo EAS

## Tech Stack

### Backend
Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, Bcrypt, Multer, Cloudinary-ready config, Socket.IO, Helmet, CORS, Zod, Rate Limiting, OpenAI integration.

### Web
React.js, Vite, TypeScript, Tailwind CSS, Redux Toolkit, React Router, Axios, Recharts, Framer Motion.

### Mobile
React Native, Expo, TypeScript, React Navigation, Redux Toolkit, AsyncStorage.

## Quick Start

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

Update `apps/api/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/alat_financial_system
JWT_ACCESS_SECRET=change_me_access_secret
JWT_REFRESH_SECRET=change_me_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_key
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Run MongoDB and Redis

```bash
docker compose up -d mongo redis
```

### 4. Seed demo data

```bash
npm run seed
```

Demo login:

```txt
Email: admin@alatfinance.com
Password: Password123!
```

### 5. Start development

```bash
npm run dev
```

Web: `http://localhost:5173`  
API: `http://localhost:5000/api/v1/health`

### 6. Start mobile

```bash
npm run dev:mobile
```

## API Endpoints

| Module | Method | Endpoint | Description |
|---|---:|---|---|
| Health | GET | `/api/v1/health` | API health check |
| Auth | POST | `/api/v1/auth/register` | Register user and business |
| Auth | POST | `/api/v1/auth/login` | Login and receive tokens |
| Auth | GET | `/api/v1/auth/me` | Current user profile |
| Businesses | GET | `/api/v1/businesses` | List user businesses |
| Dashboard | GET | `/api/v1/dashboard/summary` | Financial dashboard summary |
| Expenses | GET/POST | `/api/v1/expenses` | List or create expenses |
| Expenses | PATCH/DELETE | `/api/v1/expenses/:id` | Update or delete expense |
| Invoices | GET/POST | `/api/v1/invoices` | List or create invoices |
| Payroll | GET/POST | `/api/v1/payrolls` | List or create payrolls |
| Employees | GET/POST | `/api/v1/employees` | List or create employees |
| Reports | GET | `/api/v1/reports/profit-loss` | Profit and loss report |
| AI | POST | `/api/v1/ai/ask` | AI finance assistant |
| Notifications | GET | `/api/v1/notifications` | List notifications |

## Production Deployment

### Backend → Render/Railway

1. Create a MongoDB Atlas cluster.
2. Create a backend service from `apps/api`.
3. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Add environment variables from `apps/api/.env.example`.
6. Set `CLIENT_URL` to your Vercel frontend URL.

### Frontend → Vercel

1. Import the GitHub repository.
2. Set root directory to `apps/web`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add:

```env
VITE_API_URL=https://your-api.onrender.com/api/v1
```

### Mobile → Expo EAS

```bash
cd apps/mobile
npx expo login
npx eas build:configure
npx eas build --platform android
npx eas build --platform ios
```

Set the API base URL in `apps/mobile/.env`.

## Testing Strategy

- Backend unit tests for services and validators
- Integration tests for auth, expenses, invoices, payroll, AI assistant
- Frontend component tests for dashboard cards, forms, tables
- E2E tests for login → create expense → generate report flow
- Security testing for JWT, rate limits, authorization, file upload validation

## Roadmap

### Phase 1
Authentication, dashboard, expenses, multi-business foundation.

### Phase 2
Invoices, receipts, payroll, employees, PDFs.

### Phase 3
AI assistant, reports, forecasting, fraud detection.

### Phase 4
Mobile app, push notifications, production deployment.

### Phase 5
OCR receipt scanning, banking integrations, subscriptions, audit logs, advanced AI automation.

## Author

Built for **Olayenikan Michael / PoundsMichaelsCode** as an enterprise-level fintech portfolio project.
