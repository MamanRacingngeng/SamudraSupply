# Samudra Supply

Platform digital ekspor komoditas Indonesia yang menghubungkan supplier lokal dengan buyer global.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** + **Zod** (validasi API)
- **Tailwind CSS 4**
- **Resend** (notifikasi email)
- **Lucide React** (ikon)

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local — set ADMIN_PASSWORD minimal
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Ya (admin) | Password login dashboard `/admin` |
| `RESEND_API_KEY` | Opsional | API key Resend untuk email |
| `EMAIL_FROM` | Opsional | Alamat pengirim email |
| `ADMIN_EMAIL` | Opsional | Email penerima notifikasi admin |

## Fitur

### Publik
- Landing page lengkap
- Direktori supplier dengan filter (`/direktori`)
- Detail supplier + form RFQ (`/direktori/[slug]`)
- Dark mode
- Form kontak & RFQ terhubung backend

### Admin (`/admin`)
- Login dengan password
- Dashboard RFQ & kontak masuk
- Statistik harian
- Data tersimpan di `data/submissions/`

### Email (Resend)
- Notifikasi ke admin saat RFQ/kontak masuk
- Email konfirmasi otomatis ke buyer/supplier

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
