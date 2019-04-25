import app from '../app';

const { name, url } = app;
const description = 'Create a graphical representation of your Firestore schema';

const SEO = {
  title: name,
  description,
  keywords: 'firebase firestore database schema',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url,
    title: name,
    description,
    image: `${url}/static/images/open-graph.png`,
    imageWidth: 1200,
    imageHeight: 630,
    site_name: 'Schema',
  },
  twitter: {
    handle: '@schemake',
    cardType: 'summary_large_image',
  },
  richText: {
    openingHours: 'Mo,Tu,We,Th,Fr 07:00-14:00',
    streetAddress: '34 Tuscan Waters, Gie Road',
    addressLocality: 'Cape Town',
    postalCode: '7439',
    addressCountry: 'South Africa',
    priceRange: '$$$',
  },
};

export default SEO;
