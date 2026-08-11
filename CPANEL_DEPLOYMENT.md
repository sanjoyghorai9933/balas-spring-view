# cPanel Deployment Checklist

## 1. Build locally before upload

```powershell
npm install
npm run lint
npm run build
```

Fix all build/lint errors before deployment.

## 2. cPanel database

Use the existing MySQL database and user:

- Database: `aftahbue_balas_hotel`
- User: `aftahbue_balas_admin`

The production app should normally use the cPanel MySQL host available from the server itself (often `localhost` or the host shown by cPanel), not the developer PC public IP.

## 3. Production environment variables

Create `.env.local`/the hosting environment configuration with the production values. Never commit passwords.

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=aftahbue_balas_hotel
DATABASE_USER=aftahbue_balas_admin
DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD

SMTP_HOST=mail.balasvistahills.com
SMTP_PORT=465
SMTP_USER=info@balasvistahills.com
SMTP_PASSWORD=YOUR_SMTP_PASSWORD
SMTP_FROM=info@balasvistahills.com
BOOKING_TO=info@balasvistahills.com
```

## 4. Database schema

Before switching traffic, ensure all CMS tables and migrations have been applied, including the gallery `category` and `aspect` columns and the attractions extended fields.

## 5. Upload/build

For a cPanel Node.js application, configure the Node.js application with the required Node version, application root, startup command, and environment variables. Run the production build on the server:

```bash
npm ci
npm run build
npm start
```

If the hosting plan does not support the required Next.js Node runtime, use a compatible Node.js application setup or the host's supported deployment method rather than uploading a static export; this project uses server-side database/API routes.

## 6. Domain cutover

Do not change DNS until the production app has been tested using the cPanel-provided temporary URL/preview hostname.

Test:

- `/`
- `/rooms`
- `/gallery`
- `/attractions`
- `/contact`
- `/book-now`
- `/admin/login`
- `/admin`
- `/admin/hero`
- `/admin/rooms`
- `/admin/gallery`
- `/admin/attractions`
- `/admin/amenities`
- `/admin/pages`
- `/admin/enquiries`
- `/admin/settings`

Submit one real test booking and verify both the database enquiry and email.

## 7. DNS/SSL

After the production app is verified, point `balasvistahills.com` and `www.balasvistahills.com` to the cPanel application according to the host's Node.js/domain configuration. Enable/verify SSL before public launch.

## 8. Security

- Do not commit `.env.local` or passwords.
- Change the initial admin password before launch.
- Use HTTPS only.
- Remove temporary/test enquiries before launch if desired.
- Restrict cPanel Remote MySQL access to the developer IP only while local development needs it; production should use the server-local database connection where supported.
