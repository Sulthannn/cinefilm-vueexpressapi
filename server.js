const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;
const TMDB_V4_TOKEN = process.env.TMDB_V4_TOKEN;

const hasV3 = TMDB_KEY && !/REPLACE_WITH_YOUR_TMDB_KEY/i.test(TMDB_KEY);
const hasV4 = !!TMDB_V4_TOKEN;
const isKeyMissing = !hasV3 && !hasV4;
if (isKeyMissing) {
  console.warn('[WARN] Kredensial TMDB belum dikonfigurasi. Tambahkan TMDB_API_KEY (v3) atau TMDB_V4_TOKEN (v4) di .env');
}

app.use(express.static(path.join(__dirname)));

async function proxyTMDB(res, tmdbPath, query = '') {
  if (isKeyMissing) {
    return res.status(500).json({ error: 'Kredensial TMDB belum dikonfigurasi. Set TMDB_API_KEY (v3) atau TMDB_V4_TOKEN (v4) di .env.' });
  }
  const url = hasV3
    ? `${TMDB_BASE}${tmdbPath}?api_key=${encodeURIComponent(TMDB_KEY)}${query ? `&${query}` : ''}`
    : `${TMDB_BASE}${tmdbPath}${query ? `?${query}` : ''}`;
  try {
    const r = await fetch(url, {
      headers: hasV4
        ? { Authorization: `Bearer ${TMDB_V4_TOKEN}`, Accept: 'application/json' }
        : { Accept: 'application/json' },
    });
    const body = await r.text();
    res.status(r.status);
    const ct = r.headers.get('content-type');
    if (ct) res.set('content-type', ct);
    return res.send(body);
  } catch (e) {
    console.error('TMDB proxy error:', e);
    return res.status(502).json({ error: 'Gagal menghubungi TMDB' });
  }
}

app.get('/api/discover/movie', async (req, res) => {
  const query = new URLSearchParams({ with_genres: req.query.with_genres || '28', language: req.query.language || 'en-US', page: req.query.page || '1' }).toString();
  return proxyTMDB(res, '/discover/movie', query);
});

app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;
  const query = new URLSearchParams({ language: req.query.language || 'en-US' }).toString();
  return proxyTMDB(res, `/movie/${encodeURIComponent(id)}`, query);
});

app.listen(PORT, () => {
  console.log(`Filmdex server berjalan di http://localhost:${PORT}/filmdex.html`);
});