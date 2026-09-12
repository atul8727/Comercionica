import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

/* --------------------------------------------------
   Shuffle helper
-------------------------------------------------- */

function shuffleBusinesses(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

/* --------------------------------------------------
   Navigation button
-------------------------------------------------- */

function GalleryNavigationButton({ direction, onClick, disabled }) {
  const isPrevious = direction === 'previous';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? 'Previous business card' : 'Next business card'}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-950 shadow-lg transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isPrevious ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );
}

/* --------------------------------------------------
   Gallery indicators
-------------------------------------------------- */

function GalleryIndicators({ total, activeIndex, onSelect }) {
  if (total <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Show business card ${index + 1}`}
          className={`h-1.5 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-amber-400' : 'w-1.5 bg-white/50 hover:bg-white'}`}
        />
      ))}
    </div>
  );
}

/* --------------------------------------------------
   Gallery
-------------------------------------------------- */

function Gallery({ businesses = [], letter, category }) {
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Randomize the gallery whenever the selected
   * letter/category or supplied businesses change.
   */
  const randomizedBusinesses = useMemo(() => {
    if (!businesses.length) {
      return [];
    }

    return shuffleBusinesses(businesses);
  }, [businesses, letter, category]);

  /*
   * Always start from the first random card when
   * the directory section changes.
   */
  useEffect(() => {
    setActiveIndex(0);
  }, [letter, category]);

  /*
   * Automatic slideshow.
   */
  useEffect(() => {
    if (randomizedBusinesses.length <= 1) {
      return undefined;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => (current === randomizedBusinesses.length - 1 ? 0 : current + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [randomizedBusinesses.length]);

  /*
   * Keep the index valid if the data changes.
   */
  useEffect(() => {
    if (activeIndex >= randomizedBusinesses.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, randomizedBusinesses.length]);

  if (!randomizedBusinesses.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
        <p className="text-sm font-semibold text-emerald-950">No business cards available</p>

        <p className="mt-2 text-xs text-gray-500">There are no cards available for this directory section yet.</p>
      </div>
    );
  }

  const business = randomizedBusinesses[activeIndex];

  return (
    <div className="overflow-hidden rounded-3xl bg-emerald-950 shadow-xl">
      <div className="grid lg:grid-cols-2">
        {/* ========================================
            BUSINESS CARD IMAGE
        ========================================= */}

        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
          <img
            key={business.id}
            src={business.businessCardImage}
            alt={`${business.businessName} business card`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/10 to-transparent" />

          {/* Letter */}
          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-xl font-bold text-emerald-950 shadow-lg">
            {business.letter}
          </div>

          {/* Navigation */}
          {randomizedBusinesses.length > 1 && (
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
              <GalleryNavigationButton
                direction="previous"
                disabled={randomizedBusinesses.length <= 1}
                onClick={() => setActiveIndex((current) => (current === 0 ? randomizedBusinesses.length - 1 : current - 1))}
              />

              <GalleryIndicators total={randomizedBusinesses.length} activeIndex={activeIndex} onSelect={setActiveIndex} />

              <GalleryNavigationButton
                direction="next"
                disabled={randomizedBusinesses.length <= 1}
                onClick={() => setActiveIndex((current) => (current === randomizedBusinesses.length - 1 ? 0 : current + 1))}
              />
            </div>
          )}
        </div>

        {/* ========================================
            BUSINESS INFORMATION
        ========================================= */}

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-950">
                {business.category}
              </span>

              <span className="text-xs text-emerald-300">
                Card {activeIndex + 1} of {randomizedBusinesses.length}
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">{business.businessName}</h3>

            {business.ownerName && <p className="mt-2 text-sm text-emerald-200">{business.ownerName}</p>}

            <div className="my-6 h-px bg-white/10" />

            {business.description && <p className="text-sm leading-7 text-emerald-100">{business.description}</p>}

            {/* Location */}
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Location</p>

                <p className="mt-1 text-sm text-white">
                  {business.city}, {business.country}
                </p>
              </div>
            </div>

            {/* Phone */}
            {business.phone && (
              <div className="mt-4">
                <a href={`tel:${business.phone}`} className="text-sm font-medium text-amber-300 hover:text-amber-200">
                  {business.phone}
                </a>
              </div>
            )}
          </div>

          {/* Profile button */}
          <Link
            to={`/profile/${business.slug}`}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-400"
          >
            View Business Profile
            <ExternalLink className="h-4 w-4" />
          </Link>

          {/* Context */}
          <p className="mt-4 text-center text-[10px] text-emerald-300">
            Random business card · Letter {letter}
            {category ? ` · ${category}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
