const express = require('express');
const path = require('path');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/search', async (req, res) => {
  const query = String(req.query.q || '').trim();

  if (!query) {
    return res.status(400).json({ error: 'A search query is required.' });
  }

  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ProxySearchBrowser/1.0; +https://github.com/bgennetten-ai/proxy-search-browser)'
      }
    });

    if (!response.ok) {
      throw new Error(`Search upstream responded with status ${response.status}`);
    }

    const html = await response.text();
    const results = parseDuckDuckGoResults(html);

    return res.json({
      query,
      source: 'DuckDuckGo via local proxy',
      resultCount: results.length,
      results
    });
  } catch (error) {
    console.error('Proxy search failed:', error);
    return res.status(500).json({
      error: 'Search failed while contacting the upstream provider.',
      details: error.message
    });
  }
});

function parseDuckDuckGoResults(html) {
  const $ = cheerio.load(html);
  const seen = new Set();
  const results = [];

  $('.result').each((index, element) => {
    const titleNode = $(element).find('.result__a');
    const snippetNode = $(element).find('.result__snippet');

    const title = titleNode.text().trim();
    const rawUrl = titleNode.attr('href');
    const snippet = snippetNode.text().trim();

    if (!title || !rawUrl) {
      return;
    }

    const url = normalizeUrl(rawUrl);
    if (!url || seen.has(url)) {
      return;
    }

    seen.add(url);
    results.push({
      title,
      url,
      snippet: snippet || 'No description available.'
    });
  });

  return results.slice(0, 8);
}

function normalizeUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  try {
    const unescaped = decodeURIComponent(rawUrl);
    if (unescaped.startsWith('/l/?uddg=')) {
      const target = new URL(unescaped.replace('/l/?uddg=', 'https://duckduckgo.com/l/?uddg='));
      const actual = target.searchParams.get('uddg');
      return actual || null;
    }

    const absolute = unescaped.startsWith('//') ? `https:${unescaped}` : unescaped;
    const candidate = new URL(absolute);
    return candidate.origin === 'null' ? null : candidate.href;
  } catch (error) {
    return rawUrl;
  }
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy Search Browser running at http://localhost:${PORT}`);
});
