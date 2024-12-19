export const siteConfig = {
  baseUrl: 'https://dosetune.vercel.app',
  routes: [
    {
      path: '',
      changefreq: 'daily',
      priority: 1.0
    },
    {
      path: '/services',
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      path: '/about',
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      path: '/contact',
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      path: '/order',
      changefreq: 'daily',
      priority: 0.9
    }
  ] as const
};