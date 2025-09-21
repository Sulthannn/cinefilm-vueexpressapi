# Filmdex (Vite)

## Jalankan

Pastikan server Express proxy (di root proyek lama) berjalan di `http://localhost:5500`.

```bash
npm start

cd filmdex-vite
npm install
npm run dev
```

Dev proxy Vite sudah diarahkan ke `http://localhost:5500` untuk semua request `/api`.

## Build Production

```bash
cd filmdex-vite
npm run build
```

## Deploy ke Netlify (Frontend)

- Site: arahkan ke folder `filmdex-vite/`
- Build command: `npm run build`
- Publish directory: `filmdex-vite/dist`
- Environment variables (opsional jika backend terpisah):
	- `VITE_API_BASE` → URL backend (mis. `https://your-backend.example.com`)

## Opsi Backend (Express)

Netlify tidak menjalankan server Express langsung pada site statis. Gunakan salah satu opsi:

1) Deploy backend Express terpisah (Railway/Render/Fly/Heroku) dan set `VITE_API_BASE` ke URL backend tersebut.
2) Gunakan Netlify Functions sebagai pengganti Express (perlu migrasi handler `/api`).
3) Deploy fullstack di satu platform yang bisa jalankan Node server (mis. Render Web Service) dan layani `dist/` + `/api` dari Express.

## Catatan
- Tailwind dibundel via PostCSS (lihat `tailwind.config.js`, `postcss.config.js`).
- Logo ditempatkan di `public/wb.png` dan diakses sebagai `/wb.png`.
```

Buka http://localhost:5173

## Catatan
- Dev proxy Vite sudah diarahkan ke `http://localhost:5500` untuk semua request `/api`.
- Tailwind masih via CDN untuk kesederhanaan. Jika butuh, bisa dipindah ke PostCSS/Tailwind config.