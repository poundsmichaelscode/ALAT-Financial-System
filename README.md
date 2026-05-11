# ALAT Financial System

**ALAT Financial System** is a full-stack fintech operating system for individuals, startups and companies to manage expenses, invoices, receipts, payroll, reports, businesses and AI-powered financial insights.

This repository contains:

- **Backend API:** Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, Socket.IO
- **Web App:** React, Vite, Tailwind CSS, Redux Toolkit, React Router, Recharts
- **Mobile App:** React Native, Expo, React Navigation
- **AI Assistant:** OpenAI-ready financial analysis service
- **Database:** MongoDB collections for users, businesses, expenses, transactions, invoices, receipts, employees, payrolls, notifications and AI insights

---

## Current Phase

This version includes work from:

- **Phase 1:** Authentication, dashboard, seed data and local setup
- **Phase 2:** Expense, invoice, receipt and payroll modules
- **Phase 3:** Reports, cash flow, tax summary and AI assistant foundation
- **Phase 4:** Mobile screens, admin foundation and improved local CORS support

---

## Demo Login

```txt
Email: admin@alatfinance.com
Password: Password123!
```

---

## Quick Start

```bash
npm install
npm run install:all

cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env

docker compose up -d mongo redis
npm run seed
npm run dev:api
```

In another terminal:

```bash
npm run dev:web
```

Backend:

```txt
http://localhost:5050/api/v1
```

Web:

```txt
http://localhost:5173
```

Health check:

```bash
curl http://localhost:5050/api/v1/health
```

Login test:

```bash
curl -X POST http://localhost:5050/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alatfinance.com","password":"Password123!"}'
```

---

## Important Local Ports

The backend defaults to:

```env
PORT=5050
```

Redis is mapped to local port `6380` to avoid common macOS Redis conflicts:

```env
REDIS_URL=redis://localhost:6380
```

The web app uses:

```env
VITE_API_URL=http://localhost:5050/api/v1
```

The backend allows Vite dev ports `5173`, `5174`, `5175` and `5176` by default.

---

## Main API Routes

```txt
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me

GET    /api/v1/dashboard/summary

GET    /api/v1/expenses
POST   /api/v1/expenses
PATCH  /api/v1/expenses/:id
DELETE /api/v1/expenses/:id

GET    /api/v1/invoices
POST   /api/v1/invoices
PATCH  /api/v1/invoices/:id

GET    /api/v1/receipts
POST   /api/v1/receipts

GET    /api/v1/employees
POST   /api/v1/employees

GET    /api/v1/payrolls
POST   /api/v1/payrolls

GET    /api/v1/reports/profit-loss
GET    /api/v1/reports/cash-flow
GET    /api/v1/reports/tax

POST   /api/v1/ai/ask
GET    /api/v1/notifications
GET    /api/v1/businesses
POST   /api/v1/businesses
GET    /api/v1/admin/overview
GET    /api/v1/admin/users
```

---

## Web Modules

- Login
- Dashboard
- Expenses
- Invoices
- Receipts
- Payroll
- Reports
- Businesses
- Admin
- AI Assistant

---

## Mobile Modules

- Dashboard
- Expenses
- Invoices
- AI Assistant

Run mobile:

```bash
npm run dev:mobile
```

For physical device testing, replace `EXPO_PUBLIC_API_URL` with your computer LAN address, for example:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.10:5050/api/v1
```

---

## Deployment Targets

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas
- Mobile: Expo EAS Build

---

## Next Production Phase

Recommended Phase 5:

- Real PDF invoice, receipt and payslip exports
- Cloudinary/S3 receipt uploads
- OCR receipt scanning
- Subscription billing
- Bank API integration
- Push notifications
- Audit logs UI
- Test suite
- CI/CD pipeline
