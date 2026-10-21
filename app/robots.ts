import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.OLI_PRODUCTION === '1';

  if (!isProd) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/'],
    },
    sitemap: 'https://olidesignstudio.in/sitemap.xml',
  };
}
