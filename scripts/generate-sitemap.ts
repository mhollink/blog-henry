// scripts/generateSitemap.ts
import fs from 'fs';

export function generateSitemap() {
    const baseUrl = 'https://henry.hollink.dev';

    const posts = JSON.parse(fs.readFileSync('public/posts.json', 'utf8'));

    const staticRoutes = [
        '',
        '/blog',
        '/over-henry',
        '/contact',
        '/rss.xml',
    ];

    const urls = [
        ...staticRoutes.map((route) => ({
            loc: `${baseUrl}${route}`,
        })),
        ...posts.map((p: any) => ({
            loc: `${baseUrl}/post/${p.slug}`,
            lastmod: p.datum ? new Date(p.datum).toISOString() : undefined,
        })),
    ];

    const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map((u) => {
            return `
  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>
`;
        })
        .join('')}
</urlset>
`.trim();

    fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
    console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`);
}
