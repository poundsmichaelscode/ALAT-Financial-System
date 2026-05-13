# ALAT Financial System

**ALAT Financial System** is a full-stack financial management SaaS platform designed to help individuals, startups, SMEs, and companies manage expenses, income, invoices, receipts, payroll, businesses, clients, staff, and financial reports from one modern dashboard.

The platform combines a **MERN Stack web application**, a **React Native mobile application**, and an **AI-powered financial assistant** to deliver real-time financial insights, automation, and business performance analytics.

---

## Project Overview

Many businesses still manage finance with spreadsheets, scattered receipts, manual invoice templates, and disconnected payroll records. This creates errors, poor visibility, delayed reporting, and weak financial decision-making.

ALAT Financial System solves this by providing a centralized platform for:

- Tracking income and expenses
- Managing invoices and receipts
- Monitoring business cash flow
- Managing clients, workers, salaries, and projects
- Generating financial reports
- Using AI to analyze spending and business performance
- Accessing financial data from web and mobile

---

## Core Features

### Authentication and Authorization

- User registration and login
- JWT authentication
- Secure password hashing with bcrypt
- Protected routes
- Role-based access control
- Admin and business-user access levels

### Dashboard

- Total income
- Total expenses
- Net balance
- Profit/loss overview
- Recent financial activity
- Summary cards
- Charts and analytics
- AI recommendations

### Expenses Management

- Add expenses
- Add income records
- Edit and delete records
- Expense categories and custom categories
- Monthly summaries
- Total income, total expenses, profit, loss, and net balance
- Income vs expense charts
- Expense category breakdown
- AI-powered spending insights

Default categories include:

- Transportation
- Utilities
- Salaries
- Maintenance
- Marketing
- Rent
- Miscellaneous

### Invoice Management

- Create professional invoices
- Auto-generate invoice numbers
- Add customer/client details
- Add products or services
- Quantity and price fields
- Automatic subtotal calculation
- Tax/VAT calculation
- Discount calculation
- Grand total calculation
- Invoice status tracking: Paid, Pending, Overdue
- Download invoice as PDF
- Download invoice as Excel
- Print invoice
- Save invoice history to MongoDB

### Receipt Management

- Generate receipts after payment
- Auto-generate receipt numbers
- Add customer name
- Add amount paid
- Add payment method
- Add payment date
- Add notes
- Export receipt as PDF
- Export receipt as Excel
- Print receipt
- Save receipt history to MongoDB

Supported payment methods:

- Cash
- Transfer
- Card
- POS

### Business Management

- Add multiple businesses
- Manage business profiles
- Manage clients/customers
- Manage staff/workers
- Assign workers to businesses/projects
- Track salaries and wages
- Manage projects/services
- Track financial records per business
- View business performance metrics
- Generate business performance reports

### Reports and Analytics

- Profit and loss reports
- Income reports
- Expense reports
- Business performance reports
- Employee payment reports
- Monthly summaries
- AI-generated financial summaries foundation

### AI Financial Assistant

- Spending analysis
- Budget suggestions
- Expense prediction
- Profitability insights
- Smart financial recommendations
- Business performance analysis
- Suspicious spending detection foundation

### PWA Support

- Web manifest
- Service worker
- Installable web app support
- Offline-ready foundation
- Improved mobile browser experience

---

## Tech Stack

### Frontend Web

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Recharts
- Framer Motion
- React Query / TanStack Query-ready architecture
- PWA support

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Helmet
- CORS
- Morgan
- Express Rate Limit
- Compression
- PDF/Excel export support

### Mobile

- React Native
- Expo
- React Navigation
- AsyncStorage-ready authentication
- Mobile dashboard screens
- Mobile finance screens

### DevOps

- Docker
- Docker Compose
- MongoDB container
- Redis container
- Vercel-ready frontend
- Render/Railway-ready backend
- MongoDB Atlas-ready database

---

## Brand Colors

```txt
Deep Blue:  #170C79
Soft Cream: #EFE3CA
Sky Blue:   #56B6C6
Light Cyan: #8ACBD0
```

---

## System Architecture

```txt
User
│
├── Web App: React + TypeScript + Tailwind
│   └── Calls REST APIs through Axios
│
├── Mobile App: React Native + Expo
│   └── Calls same backend APIs
│
└── Backend API: Node.js + Express
    ├── Authentication middleware
    ├── RESTful controllers
    ├── Business logic services
    ├── Mongoose models
    ├── MongoDB database
    ├── PDF/Excel export layer
    └── AI insight service
```

---

## Folder Structure

```txt
ALAT-Financial-System/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   ├── app.ts
│   │   │   └── server.ts
│   │   ├── .env.example
│   │   └── package.json
│   │
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── features/
│   │   │   ├── layouts/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   ├── routes/
│   │   │   └── main.tsx
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── mobile/
│       ├── src/
│       │   ├── components/
│       │   ├── navigation/
│       │   ├── screens/
│       │   ├── services/
│       │   └── store/
│       ├── app.json
│       └── package.json
│
├── docs/
├── docker-compose.yml
├── package.json
├── README.md
└── CASE_STUDY.md
```

---

## API Routes

Base URL:

```txt
http://localhost:5050/api/v1
```

Main route groups:

```txt
/api/v1/auth
/api/v1/dashboard
/api/v1/expenses
/api/v1/income
/api/v1/invoices
/api/v1/receipts
/api/v1/businesses
/api/v1/clients
/api/v1/workers
/api/v1/salaries
/api/v1/projects
/api/v1/reports
/api/v1/ai
/api/v1/notifications
```

Example login request:

```bash
curl -X POST http://localhost:5050/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@alatfinance.com","password":"Password123!"}'
```

---

## Authentication Flow

1. User submits email and password.
2. Backend validates credentials.
3. Backend returns access token and refresh token.
4. Frontend stores token for API requests.
5. Protected requests attach token using the Authorization header.
6. Backend verifies the token before allowing access.

Authorization header format:

```txt
Authorization: Bearer <accessToken>
```

---

## Environment Variables

### Backend `.env`

Create `apps/api/.env`:

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

### Web `.env`

Create `apps/web/.env`:

```env
VITE_API_URL=http://localhost:5050/api/v1
```

### Mobile `.env`

Create `apps/mobile/.env`:

```env
EXPO_PUBLIC_API_URL=http://localhost:5050/api/v1
```

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/poundsmichaelscode/alat-financial-system.git
cd alat-financial-system
```

### 2. Install dependencies

```bash
npm install
npm run install:all
```

### 3. Create environment files

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/mobile/.env.example apps/mobile/.env
```

### 4. Start MongoDB and Redis

```bash
docker compose up -d mongo redis
```

### 5. Seed demo admin account

```bash
npm run seed
```

Demo credentials:

```txt
Email: admin@alatfinance.com
Password: Password123!
```

### 6. Start backend

```bash
npm run dev:api
```

Backend runs on:

```txt
http://localhost:5050
```

### 7. Start web frontend

Open another terminal:

```bash
npm run dev:web
```

Web app runs on:

```txt
http://localhost:5173
```

If port `5173` is busy, Vite may use `5174`, `5175`, or `5176`.

---

## Docker Setup

Start MongoDB and Redis:

```bash
docker compose up -d mongo redis
```

Stop services:

```bash
docker compose down
```

View running services:

```bash
docker compose ps
```

---

## Deployment Guide

### Frontend: Vercel

1. Push the project to GitHub.
2. Import the project into Vercel.
3. Set root directory to `apps/web`.
4. Add environment variable:

```env
VITE_API_URL=https://your-backend-url.com/api/v1
```

5. Deploy.

### Backend: Render or Railway

Set root directory to:

```txt
apps/api
```

Add backend environment variables:

```env
PORT=5050
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_ACCESS_SECRET=your_production_access_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
CLIENT_URL=https://your-frontend-url.vercel.app
OPENAI_API_KEY=your_openai_key
REDIS_URL=your_redis_url
```

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm start
```

### Database: MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Add a database user.
3. Whitelist deployment server IP or allow trusted access.
4. Copy the connection string.
5. Add the connection string to `MONGODB_URI`.

### Mobile: Expo EAS

```bash
npm install -g eas-cli
cd apps/mobile
eas login
eas build:configure
eas build -p android
eas build -p ios
```

---

## Security Considerations

Implemented or prepared security measures:

- JWT authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS protection
- Rate limiting
- Environment-based secrets
- Protected API routes
- MongoDB validation
- Error middleware

Recommended production additions:

- Refresh token rotation
- Email verification
- Two-factor authentication
- Audit logs
- Field-level permission controls
- API request logging
- File upload scanning
- Payment provider webhooks
- Role-based permission matrix

---

## Roadmap

### Phase 1

- Authentication
- Dashboard
- Expense tracker
- MongoDB setup
- Basic web layout

### Phase 2

- Invoice system
- Receipt system
- Business management
- Client and worker records

### Phase 3

- AI financial assistant
- Reports and analytics
- Export systems
- Business performance insights

### Phase 4

- React Native mobile app
- Push notifications
- PWA support
- Deployment setup

### Phase 5

- Bank API integration
- OCR receipt scanning
- Subscription billing
- Advanced payroll automation
- Tax calculator
- Multi-currency support
- Audit logs
- Team collaboration

---

## Author

**Olayenikan Michael**  
Full-Stack Software Engineer

GitHub: https://github.com/poundsmichaelscode  
LinkedIn: https://www.linkedin.com/in/olayenikan-michael/  
Portfolio: https://olayenikan-michael-software-enginee.vercel.app/

---

## License

This project is available for portfolio, learning, and professional demonstration purposes.

For commercial use, add an appropriate license file such as MIT, Apache 2.0, or a private commercial license.
