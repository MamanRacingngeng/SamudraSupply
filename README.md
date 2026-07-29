# Samudra Supply

Platform digital ekspor komoditas Indonesia yang menghubungkan supplier lokal dengan buyer global.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** + **Zod** (validasi API)
- **Tailwind CSS 4**
- **Resend** (notifikasi email)
- **Vercel Blob** (persistent storage di production)
- **Lucide React** (ikon)

## Getting Started (Local)

```bash
npm install
cp .env.example .env.local
# Edit .env.local — set ADMIN_PASSWORD minimal
npm run dev
```

Buka [http://localhost:3003](http://localhost:3003)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | **Yes** (admin) | Password login dashboard `/admin` |
| `BLOB_READ_WRITE_TOKEN` | **Yes** (Vercel prod) | Auto-set when Vercel Blob is connected |
| `RESEND_API_KEY` | Recommended | API key Resend untuk email |
| `EMAIL_FROM` | Optional | Alamat pengirim email (verified domain) |
| `ADMIN_EMAIL` | Recommended | Email penerima notifikasi admin |
| `TWILIO_*` + `ADMIN_WHATSAPP` | Optional | WhatsApp alerts via Twilio |

## Deploy to Vercel

### 1. Import repository

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repo: `https://github.com/MamanRacingngeng/SamudraSupply`
3. Framework preset: **Next.js** (auto-detected)

### 2. Environment variables

Di **Project Settings → Environment Variables**, tambahkan:

| Key | Value |
|-----|-------|
| `ADMIN_PASSWORD` | Password admin yang kuat |
| `RESEND_API_KEY` | (opsional) dari [resend.com](https://resend.com) |
| `ADMIN_EMAIL` | Email penerima notifikasi |
| `EMAIL_FROM` | `Samudra Supply <noreply@yourdomain.com>` |

### 3. Connect Vercel Blob (penting)

Tanpa Blob, data form/admin **tidak persist** di serverless:

1. **Storage** tab di Vercel project → **Create Database** → **Blob**
2. Connect ke project — `BLOB_READ_WRITE_TOKEN` otomatis ter-set
3. Redeploy

### 4. Deploy

```bash
npm run build   # verify locally first
```

Push ke `main` → Vercel auto-deploy.

### Post-deploy checklist

- [ ] Homepage loads
- [ ] `/direktori` shows suppliers
- [ ] Contact form submits (check Admin → Submissions)
- [ ] `/admin` login works with `ADMIN_PASSWORD`
- [ ] Email notifications (if Resend configured)

## Fitur

### Publik
- Landing page lengkap (Samudra theme)
- Direktori supplier dengan filter (`/direktori`)
- Detail supplier + form RFQ (`/direktori/[slug]`)
- Dark mode
- Form kontak Supplier/Buyer terpisah

### Admin (`/admin`)
- Login dengan password
- Dashboard RFQ & kontak masuk
- CRUD supplier
- CSV export & activity log
- Settings notifikasi

## API Routes

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| POST | `/api/rfq` | Submit RFQ ke supplier |
| POST | `/api/contact` | Submit form kontak |
| POST | `/api/admin/login` | Login admin |
| DELETE | `/api/admin/login` | Logout admin |
| GET | `/api/admin/submissions` | List submission (auth) |

## Build

```bash
npm run build
npm start
```
