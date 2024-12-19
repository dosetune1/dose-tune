import { siteConfig } from '../config/siteConfig';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export function generateSitemapXml(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('')}
</urlset>`;
}

export function generateSitemapUrls(): SitemapUrl[] {
  const currentDate = new Date().toISOString();
  
  return siteConfig.routes.map(route => ({
    loc: `${siteConfig.baseUrl}${route.path}`,
    lastmod: currentDate,
    changefreq: route.changefreq,
    priority: route.priority
  }));
}