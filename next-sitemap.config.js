/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://fastadmission.co.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
