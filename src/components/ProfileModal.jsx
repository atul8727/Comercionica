import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

function ProfileDetail({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3 text-sm text-gray-700">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <span>{children}</span>
    </div>
  );
}

function ProfileModal({ business, onClose }) {
  useEffect(() => {
    if (!business) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [business, onClose]);

  if (!business) {
    return null;
  }

  const website = business.website?.startsWith('http') ? business.website : `https://${business.website}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${business.businessName} profile`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
          aria-label="Close profile"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Business card image */}
        <div className="relative h-56 overflow-hidden sm:h-72">
          <img src={business.businessCardImage} alt={`${business.businessName} business card`} className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Letter badge */}
          <div className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-900 text-2xl font-bold text-white shadow-lg">
            {business.letter}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7">
          {/* Heading */}
          <div className="mb-6 pr-10">
            <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
              {business.category}
            </span>

            <h2 className="text-2xl font-bold text-emerald-950 sm:text-3xl">{business.businessName}</h2>

            <p className="mt-1 text-sm text-gray-500">{business.ownerName}</p>
          </div>

          {/* Description */}
          {business.description && (
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-emerald-900">About the Business</h3>

              <p className="leading-7 text-gray-600">{business.description}</p>
            </div>
          )}

          {/* Business information */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-4 sm:p-5">
            <ProfileDetail icon={MapPin}>
              {business.city}, {business.country}
            </ProfileDetail>

            {business.phone && (
              <ProfileDetail icon={Phone}>
                <a href={`tel:${business.phone}`} className="transition hover:text-emerald-800">
                  {business.phone}
                </a>
              </ProfileDetail>
            )}

            {business.email && (
              <ProfileDetail icon={Mail}>
                <a href={`mailto:${business.email}`} className="break-all transition hover:text-emerald-800">
                  {business.email}
                </a>
              </ProfileDetail>
            )}

            {business.website && (
              <ProfileDetail icon={Globe}>
                <a href={website} target="_blank" rel="noopener noreferrer" className="break-all transition hover:text-emerald-800">
                  {business.website}
                </a>
              </ProfileDetail>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/profile/${business.slug}`}
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              View Full Profile
              <ExternalLink className="h-4 w-4" />
            </Link>

            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-900 px-5 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50"
              >
                <Phone className="h-4 w-4" />
                Call Business
              </a>
            )}
          </div>

          {/* Directory context */}
          <div className="mt-6 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
            Listed under <span className="font-semibold text-emerald-900">{business.category}</span> · Letter{' '}
            <span className="font-semibold text-emerald-900">{business.letter}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
