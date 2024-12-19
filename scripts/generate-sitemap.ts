import path from 'path';
import { ensureDirectoryExists, writeFileWithBackup } from './utils/fileUtils';
import { generateSitemapXml, generateSitemapUrls } from './utils/sitemapUtils';

async function generateSitemap(): Promise<void> {
  try {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    // Ensure public directory exists
    await ensureDirectoryExists(sitemapPath);
    
    // Generate sitemap content
    const urls = generateSitemapUrls();
    const sitemapContent = generateSitemapXml(urls);
    
    // Write sitemap with backup handling
    await writeFileWithBackup(sitemapPath, sitemapContent);
    
    console.log('Sitemap generated successfully at:', sitemapPath);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to generate sitemap:', error.message);
    }
    process.exit(1);
  }
}

generateSitemap();