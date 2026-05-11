# ALAT Financial System — Phase 2, 3 and 4 Upgrade

This upgrade moves the project beyond setup into real product modules.

## Phase 2: Business Finance Modules

Added:

- Invoice creation from dashboard UI
- Receipt generation with QR code support
- Employee records
- Payroll creation and net pay calculation
- Multi-business creation UI
- API routes for receipts, reports and admin overview

## Phase 3: AI + Reports

Added:

- Profit & Loss report endpoint
- Cash flow report endpoint
- Tax summary endpoint
- Reports dashboard with charts
- AI Assistant UI connected to `/api/v1/ai/ask`
- AIInsight persistence for prompt history

## Phase 4: Mobile + Admin Foundation

Added:

- React Native screens connected to API
- Mobile dashboard/expenses/invoices/AI screens
- Admin overview endpoint and web admin page
- Local development CORS fix for Vite ports 5173–5176

## Run After Upgrade

```bash
npm install
npm run install:all

docker compose up -d mongo redis
npm run seed
npm run dev:api
npm run dev:web
```

Backend default:

```txt
http://localhost:5050/api/v1
```

Web default:

```txt
http://localhost:5173
```

Demo login:

```txt
admin@alatfinance.com
Password123!
```

## Recommended Next Phase

Phase 5 should add:

- Real PDF invoice and payslip generation
- Cloudinary/S3 upload flow for receipts
- OCR receipt scanning
- Subscription billing
- Bank API integration
- Push notifications
- EAS mobile builds
- Testing suite
- CI/CD pipeline
