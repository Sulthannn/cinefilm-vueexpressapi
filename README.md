# Filmdex

A small Vue 3 + Tailwind demo that lists action movies from TMDB, with search suggestions and a detail view.

## Structure

- `filmdex.html` — Main HTML page, loads Tailwind CDN and the app module
- `assets/app.js` — Vue 3 app (ES module), fetches data and handles UI state
- `assets/styles.css` — Minimal custom styles (e.g., `.suggested`)
- `assets/wb.png` — Logo image used in the header

## Cara menjalankan (dengan Proxy Backend)

1) Install dependency:

```bash
npm install
```

2) Salin `.env.example` menjadi `.env` dan isi `TMDB_API_KEY`:

```bash
cp .env.example .env
# edit .env dan isi TMDB_API_KEY
```

3) Jalankan server:

```bash
npm start
# Buka http://localhost:5500/filmdex.html
```

Frontend akan memanggil endpoint proxy `/api/...` sehingga API key tidak ada di browser.

## Catatan

- Vue di-load sebagai ES module dari CDN (unpkg) di `assets/app.js`.
- API key disembunyikan di server (Express) melalui variabel lingkungan `.env`.
- Struktur dipisah: logic di `assets/app.js`, style di `assets/styles.css`.

## Opsi migrasi ke Vite + SFC (lanjutan)

Jika proyek makin besar, gunakan Vite dan Single File Components (`.vue`) untuk pengembangan yang lebih nyaman (HMR, bundling, code-splitting). Langkah ringkas:

1) Inisiasi proyek Vite (vanilla Vue):

```bash
npm create vite@latest filmdex-vite -- --template vue
cd filmdex-vite
npm install
```

2) Pindahkan komponen ke `.vue` dan logic dari `assets/app.js` ke `src/App.vue`/`src/main.js`.

3) Konfigurasi proxy dev Vite (opsional) di `vite.config.js` supaya request `/api` diarahkan ke server Express atau langsung ke TMDB dengan injeksi key via server dev.

4) Jalankan Vite:

```bash
npm run dev
```
