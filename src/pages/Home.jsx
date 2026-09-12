import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Search, Menu, MapPin, ArrowRight, Globe2 } from 'lucide-react';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import AlphabetNav from '../components/AlphabetNav';
import BusinessCard from '../components/BusinessCard';
import Gallery from '../components/Gallery';

import { alphabet, brand, businessCategories, businessMembers, currentLocation } from '../data/mockData';

function slugify(value = '') {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatLocationName(value = '') {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveCountry(slug) {
  if (!slug) return currentLocation.country;

  if (slug === currentLocation.country.slug) {
    return currentLocation.country;
  }

  return {
    name: formatLocationName(slug),
    slug,
    code: slug.toUpperCase(),
    flag: '🌎',
  };
}

function resolveCity(slug) {
  if (!slug) return currentLocation.city;

  if (slug === currentLocation.city.slug) {
    return currentLocation.city;
  }

  return {
    name: formatLocationName(slug),
    slug,
  };
}

function resolveLanguage(slug) {
  if (!slug) return currentLocation.language;

  if (slug === currentLocation.language.slug) {
    return currentLocation.language;
  }

  return {
    name: formatLocationName(slug),
    slug,
    code: slug,
  };
}

function CategoryNavigation({ selectedLetter, selectedCategory, onCategoryChange }) {
  const categoriesForLetter = useMemo(() => {
    const matching = businessCategories.filter((category) => category.name.toLowerCase().startsWith(selectedLetter.toLowerCase()));

    return matching.length > 0 ? matching : businessCategories;
  }, [selectedLetter]);

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Categories</p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">Businesses under {selectedLetter}</h2>
          </div>

          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === 'all'
                ? 'border-emerald-900 bg-emerald-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-900 hover:text-emerald-900'
            }`}
          >
            All Categories
          </button>
        </div>

        <div className="directory-horizontal-scroll flex gap-2 overflow-x-auto pb-1">
          {categoriesForLetter
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => {
              const categorySlug = category.slug || slugify(category.name);

              const active = selectedCategory === categorySlug;

              return (
                <button
                  key={categorySlug}
                  type="button"
                  onClick={() => onCategoryChange(categorySlug)}
                  className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? 'border-emerald-900 bg-emerald-900 text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-800 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
        </div>
      </div>
    </section>
  );
}

function DirectoryTitle({ country, city, language, selectedLetter, selectedCategory }) {
  const categoryName =
    selectedCategory === 'all'
      ? 'All Businesses'
      : businessCategories.find((category) => (category.slug || slugify(category.name)) === selectedCategory)?.name ||
        formatLocationName(selectedCategory);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Globe2 className="h-4 w-4" />

              <span>{country.name}</span>

              <span>/</span>

              <span>{city.name}</span>

              <span>/</span>

              <span>{language.name}</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{brand.name}</h1>

            <p className="mt-2 text-lg font-semibold text-emerald-900">{brand.tagline}</p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Discover local businesses, services and digital business cards in {city.name}, {country.name}.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Directory</p>

            <p className="mt-1 text-sm font-bold text-slate-900">Letter {selectedLetter}</p>

            <p className="mt-1 text-sm text-emerald-800">{categoryName}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const navigate = useNavigate();

  const { country: countryParam, city: cityParam, language: languageParam, category: categoryParam, letter: letterParam } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const country = resolveCountry(countryParam);
  const city = resolveCity(cityParam);
  const language = resolveLanguage(languageParam);

  const selectedLetter = (letterParam || 'A').toUpperCase();

  const selectedCategory = categoryParam ? categoryParam.toLowerCase() : 'all';

  const basePath = `/${country.slug}/${city.slug}/${language.slug}`;

  const businesses = useMemo(() => {
    let result = businessMembers.filter((business) => {
      return (
        business.countryCode?.toLowerCase() === country.code?.toLowerCase() &&
        business.citySlug?.toLowerCase() === city.slug?.toLowerCase() &&
        business.languageCode?.toLowerCase() === language.code?.toLowerCase()
      );
    });

    // For prototype/demo data, fall back to all businesses
    // if no location-specific records exist yet.
    if (result.length === 0) {
      result = [...businessMembers];
    }

    result = result.filter((business) => business.letter?.toUpperCase() === selectedLetter);

    if (selectedCategory !== 'all') {
      result = result.filter((business) => (business.categorySlug || slugify(business.category))?.toLowerCase() === selectedCategory);
    }

    return result.sort((a, b) => a.businessName.localeCompare(b.businessName));
  }, [country.code, city.slug, language.code, selectedLetter, selectedCategory]);

  const galleryBusinesses = useMemo(() => {
    let result = businessMembers.filter((business) => business.letter?.toUpperCase() === selectedLetter);

    if (selectedCategory !== 'all') {
      result = result.filter((business) => (business.categorySlug || slugify(business.category))?.toLowerCase() === selectedCategory);
    }

    return result;
  }, [selectedLetter, selectedCategory]);

  const handleLetterChange = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (selectedCategory === 'all') {
      navigate(`${basePath}/all/${normalizedLetter}`);
      return;
    }

    navigate(`${basePath}/${selectedCategory}/${normalizedLetter}`);
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      navigate(`${basePath}/all/${selectedLetter.toLowerCase()}`);
      return;
    }

    navigate(`${basePath}/${category}/${selectedLetter.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setMenuOpen(true)} />

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <DirectoryTitle country={country} city={city} language={language} selectedLetter={selectedLetter} selectedCategory={selectedCategory} />

        {/* Search */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                placeholder={`Search businesses in ${city.name}...`}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
        </section>

        {/* A-Z */}
        <AlphabetNav activeLetter={selectedLetter} onLetterChange={handleLetterChange} />

        {/* Categories */}
        <CategoryNavigation selectedLetter={selectedLetter} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

        {/* Business Directory */}
        <section className="bg-slate-50 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Business Directory</p>

                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  {selectedCategory === 'all' ? `Businesses starting with ${selectedLetter}` : `${formatLocationName(selectedCategory)} businesses`}
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                {businesses.length} business
                {businesses.length !== 1 ? 'es' : ''}
              </p>
            </div>

            {businesses.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {businesses.map((business, index) => (
                  <div key={business.id || business.slug} className="relative">
                    <div className="absolute left-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-black text-white shadow-md">
                      {index + 1}
                    </div>

                    <BusinessCard business={business} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-900">
                  <MapPin className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">No businesses found</h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">There are currently no businesses matching this letter and category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Random Business Card Gallery */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Gallery businesses={galleryBusinesses} letter={selectedLetter} category={selectedCategory} />
          </div>
        </section>

        {/* Digital Business Card CTA */}
        <section className="bg-emerald-950 py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Grow Your Business</p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Get your digital business card</h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-100">
                Join the ComerciOnica business directory and make your business easier to discover locally and globally.
              </p>
            </div>

            <Link
              to="/digital-business-card"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600"
            >
              Create Your Card
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white">
        {/* Main Footer */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-lg font-black text-amber-400">C</div>

                <div>
                  <p className="text-xl font-black">{brand.name}</p>

                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-400">{brand.tagline}</p>
                </div>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-emerald-100">{brand.description}</p>

              <p className="mt-4 text-sm font-semibold italic text-amber-400">{brand.footerTagline}</p>
            </div>

            {/* Directory */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-amber-400">Directory</h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/" className="text-sm text-emerald-100 transition hover:text-white">
                    Business Directory
                  </Link>
                </li>

                <li>
                  <Link to="/digital-business-card" className="text-sm text-emerald-100 transition hover:text-white">
                    Digital Business Card
                  </Link>
                </li>

                <li>
                  <Link to="/services" className="text-sm text-emerald-100 transition hover:text-white">
                    Business Services
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-sm text-emerald-100 transition hover:text-white">
                    About ComerciOnica
                  </Link>
                </li>
              </ul>
            </div>

            {/* Business */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-amber-400">For Businesses</h3>

              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/digital-business-card" className="text-sm text-emerald-100 transition hover:text-white">
                    Create Your Card
                  </Link>
                </li>

                <li>
                  <Link to="/digital-business-card" className="text-sm text-emerald-100 transition hover:text-white">
                    List Your Business
                  </Link>
                </li>

                <li>
                  <Link to="/payment" className="text-sm text-emerald-100 transition hover:text-white">
                    Membership & Payment
                  </Link>
                </li>

                <li>
                  <Link to="/services" className="text-sm text-emerald-100 transition hover:text-white">
                    Business Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Current Location */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-amber-400">Your Directory</h3>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{currentLocation.country.flag}</span>

                  <div>
                    <p className="text-sm font-bold text-white">{currentLocation.city.name}</p>

                    <p className="mt-1 text-xs text-emerald-200">{currentLocation.country.name}</p>

                    <p className="mt-1 text-xs font-medium text-amber-400">{currentLocation.language.name}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <Link to="/" className="flex items-center justify-between text-xs font-semibold text-emerald-100 transition hover:text-white">
                    Browse Local Businesses
                    <ArrowRight className="h-4 w-4 text-amber-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p className="text-xs text-emerald-200">{brand.copyright}</p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
              <Link to="/about" className="text-emerald-200 transition hover:text-white">
                About
              </Link>

              <Link to="/services" className="text-emerald-200 transition hover:text-white">
                Services
              </Link>

              <Link to="/payment" className="text-emerald-200 transition hover:text-white">
                Payment
              </Link>

              <span className="text-emerald-800">•</span>

              <span className="text-emerald-300">
                {currentLocation.city.name}, {currentLocation.country.name}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
