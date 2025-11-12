import fs from "fs";
import path from "path";

const outputFile = path.resolve("public/rss.xml");

function formatDateRFC822(date: string) {
    return new Date(date).toUTCString();
}

export async function generateRSS() {
    const baseUrl = 'https://henry.hollink.dev';

    const posts = JSON.parse(fs.readFileSync('public/posts.json', 'utf8'));
    const items = posts
        .filter((p: any) => p.datum)
        .sort((a: any, b: any) => new Date(b.datum).getTime() - new Date(a.datum).getTime())
        .map((p: any) => `
      <item>
        <title>${p.titel}</title>
        <link>${baseUrl}/post/${p.filename}</link>
        <guid>${baseUrl}/post/${p.filename}</guid>
        <pubDate>${formatDateRFC822(p.datum)}</pubDate>
        <description><![CDATA[${p.bijschrift ?? ''}]]></description>
      </item>
    `)
        .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Henry Hollink</title>
  <link>${baseUrl}</link>
  <description>Verhalen/brieven over en aan Henry.</description>
  <language>nl</language>
  ${items}
</channel>
</rss>`;

    fs.writeFileSync(outputFile, rss, 'utf8');
    console.log(`✅ Generated RSS feed with ${posts.length} posts`);
}