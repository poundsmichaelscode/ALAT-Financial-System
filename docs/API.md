# ALAT API Design

The backend follows a modular REST architecture:

- `routes` define HTTP resources
- `controllers` parse request/response logic
- `models` define MongoDB schemas and indexes
- `services` hold business logic such as AI analysis, PDF generation, notifications, OCR, payment integrations
- `middlewares` secure validation, authentication, authorization and error handling

All protected requests require:

```http
Authorization: Bearer <access_token>
```

Pagination pattern:

```http
GET /api/v1/expenses?page=1&limit=20&category=Marketing&status=approved
```
