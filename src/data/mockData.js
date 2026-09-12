export const currentLocation = {
  country: {
    name: 'United States',
    code: 'US',
    slug: 'us',
    flag: '🇺🇸',
  },

  city: {
    name: 'Miami',
    slug: 'miami',
  },

  language: {
    name: 'English',
    code: 'en',
    slug: 'en',
  },
};

/* --------------------------------------------------
   Brand
-------------------------------------------------- */

export const brand = {
  name: 'ComerciOnica',
  tagline: 'Small Business Exposition',

  description: 'Connecting small businesses locally and globally.',

  footerTagline: 'Together life is better.',

  copyright: '© ComerciOnica 2026',
};

/* --------------------------------------------------
   Miami-only bilingual navigation
-------------------------------------------------- */

export const miamiMenu = [
  {
    key: 'small-business-exposition',
    english: 'Small Business Exposition',
    spanish: 'Feria de la Pequeña Empresa',
  },

  {
    key: 'buy-at-miami',
    english: 'Buy at Miami',
    spanish: 'Compro en Miami',
  },
];

/* --------------------------------------------------
   A-Z
-------------------------------------------------- */

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* --------------------------------------------------
   Business categories
--------------------------------------------------
   Categories are globally defined.

   In the future these will come from the database
   and can be filtered according to location/letter.
-------------------------------------------------- */

export const businessCategories = [
  {
    id: 1,
    name: 'Accounting',
    slug: 'accounting',
  },

  {
    id: 2,
    name: 'Advertising',
    slug: 'advertising',
  },

  {
    id: 3,
    name: 'Auto Services',
    slug: 'auto-services',
  },

  {
    id: 4,
    name: 'Bakery',
    slug: 'bakery',
  },

  {
    id: 5,
    name: 'Beauty',
    slug: 'beauty',
  },

  {
    id: 6,
    name: 'Construction',
    slug: 'construction',
  },

  {
    id: 7,
    name: 'Consulting',
    slug: 'consulting',
  },

  {
    id: 8,
    name: 'Dental',
    slug: 'dental',
  },

  {
    id: 9,
    name: 'Education',
    slug: 'education',
  },

  {
    id: 10,
    name: 'Finance',
    slug: 'finance',
  },

  {
    id: 11,
    name: 'Food & Restaurants',
    slug: 'food-restaurants',
  },

  {
    id: 12,
    name: 'Healthcare',
    slug: 'healthcare',
  },

  {
    id: 13,
    name: 'Legal',
    slug: 'legal',
  },

  {
    id: 14,
    name: 'Marketing',
    slug: 'marketing',
  },

  {
    id: 15,
    name: 'Real Estate',
    slug: 'real-estate',
  },

  {
    id: 16,
    name: 'Retail',
    slug: 'retail',
  },

  {
    id: 17,
    name: 'Technology',
    slug: 'technology',
  },

  {
    id: 18,
    name: 'Travel',
    slug: 'travel',
  },
];

/* --------------------------------------------------
   Business members
--------------------------------------------------
   Every business contains enough information to build:

   1. Directory listing
   2. Business profile
   3. Digital business card
   4. Category listing
   5. Letter listing
   6. Random gallery
-------------------------------------------------- */

export const businessMembers = [
  {
    id: 1,

    businessName: 'ABC Accounting Miami',
    slug: 'abc-accounting-miami',

    ownerName: 'Maria Rodriguez',

    letter: 'A',

    category: 'Accounting',
    categorySlug: 'accounting',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=85',

    description: 'Professional accounting and bookkeeping services for individuals and small businesses in Miami.',

    phone: '+1 (305) 555-0101',

    email: 'hello@abcaccounting.example',

    website: 'www.abcaccounting.example',
  },

  {
    id: 2,

    businessName: 'ABC Miami Bakery',
    slug: 'abc-miami-bakery',

    ownerName: 'Maria Rodriguez',

    letter: 'A',

    category: 'Bakery',
    categorySlug: 'bakery',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',

    description: 'Fresh breads, pastries and cakes made locally in Miami.',

    phone: '+1 (305) 555-0188',

    email: 'hello@abcbakery.example',

    website: 'www.abcbakery.example',
  },

  {
    id: 3,

    businessName: "Antonio's Kitchen",
    slug: 'antonios-kitchen',

    ownerName: 'Antonio Garcia',

    letter: 'A',

    category: 'Food & Restaurants',
    categorySlug: 'food-restaurants',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',

    description: 'A neighborhood restaurant serving local Miami favorites.',

    phone: '+1 (305) 555-0142',

    email: 'hello@antonioskitchen.example',

    website: 'www.antonioskitchen.example',
  },

  {
    id: 4,

    businessName: 'Alpha Advertising',
    slug: 'alpha-advertising',

    ownerName: 'James Wilson',

    letter: 'A',

    category: 'Advertising',
    categorySlug: 'advertising',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85',

    description: 'Advertising and creative marketing solutions for growing businesses.',

    phone: '+1 (305) 555-0133',

    email: 'hello@alphaadvertising.example',

    website: 'www.alphaadvertising.example',
  },

  {
    id: 5,

    businessName: 'Central Miami Dental',
    slug: 'central-miami-dental',

    ownerName: 'Dr. Daniel Smith',

    letter: 'C',

    category: 'Dental',
    categorySlug: 'dental',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=85',

    description: 'Family dental services serving the Miami community.',

    phone: '+1 (305) 555-0199',

    email: 'hello@centraldental.example',

    website: 'www.centraldental.example',
  },

  {
    id: 6,

    businessName: 'Citywide Consulting',
    slug: 'citywide-consulting',

    ownerName: 'Robert Johnson',

    letter: 'C',

    category: 'Consulting',
    categorySlug: 'consulting',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',

    description: 'Business consulting for small and growing companies.',

    phone: '+1 (305) 555-0101',

    email: 'hello@citywide.example',

    website: 'www.citywide.example',
  },

  {
    id: 7,

    businessName: 'Miami Digital Works',
    slug: 'miami-digital-works',

    ownerName: 'James Wilson',

    letter: 'M',

    category: 'Marketing',
    categorySlug: 'marketing',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85',

    description: 'Digital marketing and creative services for local businesses.',

    phone: '+1 (305) 555-0105',

    email: 'hello@miamidigital.example',

    website: 'www.miamidigital.example',
  },

  {
    id: 8,

    businessName: 'Ocean Drive Realty',
    slug: 'ocean-drive-realty',

    ownerName: 'Sofia Martinez',

    letter: 'O',

    category: 'Real Estate',
    categorySlug: 'real-estate',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85',

    description: 'Local real estate services for buyers, sellers and investors.',

    phone: '+1 (305) 555-0106',

    email: 'hello@oceandrive.example',

    website: 'www.oceandrive.example',
  },

  {
    id: 9,

    businessName: 'Prime Legal Group',
    slug: 'prime-legal-group',

    ownerName: 'Michael Brown',

    letter: 'P',

    category: 'Legal',
    categorySlug: 'legal',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=85',

    description: 'Legal services for individuals and small businesses.',

    phone: '+1 (305) 555-0107',

    email: 'hello@primelegal.example',

    website: 'www.primelegal.example',
  },

  {
    id: 10,

    businessName: 'Sunset Auto Care',
    slug: 'sunset-auto-care',

    ownerName: 'Carlos Hernandez',

    letter: 'S',

    category: 'Auto Services',
    categorySlug: 'auto-services',

    country: 'United States',
    countryCode: 'US',

    city: 'Miami',
    citySlug: 'miami',

    language: 'English',
    languageCode: 'en',

    businessCardImage: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=85',

    description: 'Automotive repair and maintenance services.',

    phone: '+1 (305) 555-0108',

    email: 'hello@sunsetauto.example',

    website: 'www.sunsetauto.example',
  },
];

/* --------------------------------------------------
   Utility functions
-------------------------------------------------- */

export function getBusinessesByLetter(letter) {
  return businessMembers
    .filter((business) => business.letter.toUpperCase() === letter.toUpperCase())
    .sort((a, b) => a.businessName.localeCompare(b.businessName));
}

export function getBusinessesByCategory(category) {
  return businessMembers.filter((business) => business.categorySlug === category).sort((a, b) => a.businessName.localeCompare(b.businessName));
}

export function getBusinessesByLetterAndCategory(letter, category) {
  return businessMembers
    .filter((business) => business.letter.toUpperCase() === letter.toUpperCase() && business.categorySlug === category)
    .sort((a, b) => a.businessName.localeCompare(b.businessName));
}
