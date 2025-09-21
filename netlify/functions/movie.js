const TMDB_BASE = 'https://api.themoviedb.org/3'

exports.handler = async function (event) {
  const apiKey = process.env.TMDB_API_KEY
  const v4Token = process.env.TMDB_V4_TOKEN
  if (!apiKey && !v4Token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Kredensial TMDB belum dikonfigurasi (TMDB_API_KEY atau TMDB_V4_TOKEN) di Netlify Environment Variables.' }),
    }
  }

  let id = event.queryStringParameters?.id
  if (!id && event.path) {
    const m = event.path.match(/\/movie\/(\d+)/)
    if (m && m[1]) id = m[1]
  }
  const language = event.queryStringParameters?.language || 'en-US'
  if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Param `id` wajib' }) }

  const qs = new URLSearchParams({ language }).toString()
  const url = `${TMDB_BASE}/movie/${encodeURIComponent(id)}${apiKey ? `?api_key=${encodeURIComponent(apiKey)}&${qs}` : `?${qs}`}`

  try {
    const res = await fetch(url, {
      headers: v4Token ? { Authorization: `Bearer ${v4Token}`, Accept: 'application/json' } : { Accept: 'application/json' },
    })
    const text = await res.text()
    return {
      statusCode: res.status,
      headers: { 'content-type': res.headers.get('content-type') || 'application/json' },
      body: text,
    }
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Gagal menghubungi TMDB' }) }
  }
}
