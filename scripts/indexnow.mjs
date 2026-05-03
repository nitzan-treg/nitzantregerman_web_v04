#!/usr/bin/env node
// IndexNow push: submits every URL in the sitemap to Bing/Yandex/Seznam
// (and, by extension, DuckDuckGo via Bing) for instant indexing.
// Run after each Vercel deploy:  node scripts/indexnow.mjs

import { request } from "node:https";

const HOST = "www.nitzantregerman.com";
const KEY = "7b4c8e2a91f6d3a5b8c9e1d2f3a4b5c6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function fetchSitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urls) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });

  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname: "api.indexnow.org",
        port: 443,
        path: "/IndexNow",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const urls = await fetchSitemapUrls();
console.log(`Submitting ${urls.length} URLs to IndexNow…`);
const result = await submit(urls);
console.log(`IndexNow status: ${result.status}`);
if (result.body) console.log(`Body: ${result.body}`);
// 200 = accepted, 202 = accepted but indexing later, 422 = invalid URLs
if (result.status >= 400) process.exit(1);
