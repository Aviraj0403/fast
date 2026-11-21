/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fastadmission.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: { policies: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }] },
};
