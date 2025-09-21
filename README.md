# Filmdex

A Vue 3 + Tailwind app that lists action movies from TMDB, with search suggestions, infinite scroll, and a detail view. Frontend is built with Vite; API key is hidden behind a backend (Express proxy for local dev or Netlify Functions in production).

## Struktur

- `filmdex-vite/` — Frontend (Vite + Vue + Tailwind)
- `server.js` — Express proxy untuk pengembangan lokal (`/api/...` → TMDB)
- `netlify/` + `netlify.toml` — Netlify Functions dan redirect `/api` untuk production
- `.env.example` — Contoh env untuk TMDB

Legacy file (single-file HTML + assets) sudah dihapus agar repo lebih bersih.

## Menjalankan di lokal (dev)

1) Install dependency untuk backend proxy (root) dan frontend (Vite):

```bash
# root (backend proxy)
npm install

# frontend
cd filmdex-vite
npm install
```

2) Isi kredensial TMDB di `.env` (root):

```bash
cp .env.example .env
# Buka .env dan isi salah satu:
# TMDB_API_KEY=...   # v3 API Key
# atau
# TMDB_V4_TOKEN=...  # v4 Bearer Token
```

3) Jalankan dua terminal terpisah:

```bash
# Terminal 1: Express proxy (port 5500)
npm start

# Terminal 2: Vite dev server (port 5173)
cd filmdex-vite
npm run dev
```

Vite sudah mem-proxy request `/api` ke `http://localhost:5500` (lihat `vite.config.js`).

## Deploy ke Netlify (tanpa Express)

- Pastikan environment variable TMDB diset di Netlify (Site settings → Environment → `TMDB_API_KEY` atau `TMDB_V4_TOKEN`).
- Netlify akan membuild `filmdex-vite` dan fungsi di `netlify/functions/*` akan menangani `/api` (lihat `netlify.toml`).
- Frontend cukup memanggil path `/api/...` (tanpa mengungkap API key di browser).

## Catatan

- Aset logo untuk Vite berada di `filmdex-vite/public/wb.png`.
- Untuk produksi, Express tidak diperlukan—gunakan Netlify Functions.

## Troubleshooting

- 401/500 dari `/api`: cek env TMDB di lokal/Netlify.
- Proxy error (ECONNREFUSED) saat dev: pastikan Express di port 5500 sedang berjalan sebelum membuka Vite.
