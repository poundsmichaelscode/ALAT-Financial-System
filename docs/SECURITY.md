# Security Checklist

- Use strong JWT secrets in production.
- Store refresh tokens securely and rotate them.
- Enable HTTPS at hosting provider level.
- Keep `CLIENT_URL` strict in production CORS.
- Validate all payloads with Zod or equivalent.
- Restrict upload mime types and file size.
- Use Cloudinary/S3 signed uploads for receipts and invoices.
- Add audit logs for payroll, invoice and admin actions.
- Add 2FA with OTP app or email code.
- Add subscription and role checks before AI-heavy endpoints.
