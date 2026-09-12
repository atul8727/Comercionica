import { ArrowRight, Globe2, MapPin, Phone } from 'lucide-react';

import { Link } from 'react-router-dom';

function BusinessCardImage({ business }) {
  return (
    <div className="relative h-56 overflow-hidden bg-gray-100 sm:h-64">
      <img
        src={business.businessCardImage}
        alt={`${business.businessName} business card`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Alphabet letter */}
      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-950 text-lg font-bold text-white shadow-lg">
        {business.letter}
      </div>

      {/* Digital card label */}
      <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-950 shadow">
        Digital Business Card
      </div>
    </div>
  );
}

function BusinessInformation({ business }) {
  return (
    <div className="p-5 sm:p-6">
      {/* Category */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">{business.category}</span>

        <span className="text-xs font-semibold text-gray-400">{business.letter}</span>
      </div>

      {/* Business name */}
      <h3 className="mt-3 text-xl font-bold leading-tight text-emerald-950 transition group-hover:text-emerald-700">{business.businessName}</h3>

      {/* Owner */}
      {business.ownerName && <p className="mt-1 text-sm text-gray-500">{business.ownerName}</p>}

      {/* Description */}
      {business.description && <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">{business.description}</p>}

      {/* Information */}
      <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          <MapPin className="h-4 w-4 shrink-0 text-emerald-700" />

          <span>
            {business.city}, {business.country}
          </span>
        </div>

        {business.phone && (
          <div className="flex items-center gap-2.5 text-xs text-gray-500">
            <Phone className="h-4 w-4 shrink-0 text-emerald-700" />

            <span>{business.phone}</span>
          </div>
        )}

        {business.website && (
          <div className="flex items-center gap-2.5 text-xs text-gray-500">
            <Globe2 className="h-4 w-4 shrink-0 text-emerald-700" />

            <span className="truncate">{business.website}</span>
          </div>
        )}
      </div>

      {/* Profile action */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Business Profile</span>

        <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-900 transition group-hover:text-amber-700">
          View Profile
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
}

function BusinessCard({ business }) {
  if (!business) {
    return null;
  }

  return (
    <Link
      to={`/profile/${business.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
      aria-label={`View profile for ${business.businessName}`}
    >
      <BusinessCardImage business={business} />

      <BusinessInformation business={business} />
    </Link>
  );
}

export default BusinessCard;
