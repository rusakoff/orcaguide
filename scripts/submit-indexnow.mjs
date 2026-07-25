const host = "orcaguide.ru";
const key = "8c2e6f1a9d4b7c3e5f60718293a4b5c6";
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;

const response = await fetch(sitemapUrl);
if (!response.ok) {
  throw new Error(`Не удалось загрузить sitemap: ${response.status}`);
}

const xml = await response.text();
const allUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const requestedUrls = process.argv.slice(2);
const urlList = requestedUrls.length ? requestedUrls : allUrls;

if (!urlList.length) {
  throw new Error("В sitemap не найдено URL для отправки.");
}

const indexNowResponse = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList,
  }),
});

if (!indexNowResponse.ok && indexNowResponse.status !== 202) {
  const body = await indexNowResponse.text();
  throw new Error(`IndexNow вернул ${indexNowResponse.status}: ${body}`);
}

process.stdout.write(
  `IndexNow принял ${urlList.length} URL: HTTP ${indexNowResponse.status}\n`,
);
