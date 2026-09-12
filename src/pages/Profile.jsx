import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Share2, CreditCard, MessageCircle } from 'lucide-react';

import { businessMembers, currentLocation } from '../data/mockData';

function ContactButton({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition hover:border-emerald-800 hover:bg-emerald-50"
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
}

function Profile() {
  const { slug } = useParams();

  const business = businessMembers.find((item) => item.slug === slug);

  if (!business) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <CreditCard className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-emerald-950">Business Not Found</h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">The business profile you are looking for does not exist or may have been removed.</p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const website = business.website?.startsWith('http') ? business.website : `https://${business.website}`;

  const handleShare = async () => {
    const shareData = {
      title: business.businessName,
      text: `Check out ${business.businessName} on ComerciOnica.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert('Profile link copied to clipboard.');
      }
    } catch (error) {
      // User cancelled the native share dialog.
      if (error?.name !== 'AbortError') {
        console.error('Unable to share profile:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-emerald-900 transition hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4" />
            Directory
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Digital business card */}
        <section className="overflow-hidden rounded-3xl bg-emerald-950 shadow-xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Image */}
            <div className="relative min-h-[320px] lg:min-h-[500px]">
              <img
                src={business.businessCardImage}
                alt={`${business.businessName} business card`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/10 to-transparent" />

              {/* Letter */}
              <div className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-3xl font-bold text-emerald-950 shadow-lg">
                {business.letter}
              </div>

              <div className="absolute bottom-7 left-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Digital Business Card</p>
              </div>
            </div>

            {/* Main information */}
            <div className="flex flex-col justify-center p-6 text-white sm:p-10">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-300">
                  {business.category}
                </span>

                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{business.businessName}</h1>

                <p className="mt-2 text-lg text-emerald-100">{business.ownerName}</p>
              </div>

              <div className="my-8 h-px bg-white/10" />

              <p className="leading-7 text-emerald-100">{business.description}</p>

              {/* Contact information */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-amber-400" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-emerald-300">Location</p>

                    <p className="mt-1 text-sm text-white">
                      {business.city}, {business.country}
                    </p>
                  </div>
                </div>

                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-amber-400" />

                    <div>
                      <p className="text-xs uppercase tracking-wide text-emerald-300">Phone</p>

                      <a href={`tel:${business.phone}`} className="mt-1 block text-sm text-white hover:text-amber-300">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-amber-400" />

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-emerald-300">Email</p>

                      <a href={`mailto:${business.email}`} className="mt-1 block break-all text-sm text-white hover:text-amber-300">
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="mt-1 h-5 w-5 shrink-0 text-amber-400" />

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-emerald-300">Website</p>

                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block break-all text-sm text-white hover:text-amber-300"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact actions */}
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {business.phone && (
            <ContactButton href={`tel:${business.phone}`} icon={Phone}>
              Call Business
            </ContactButton>
          )}

          {business.email && (
            <ContactButton href={`mailto:${business.email}`} icon={MessageCircle}>
              Send Message
            </ContactButton>
          )}

          {business.website && (
            <ContactButton href={website} icon={Globe}>
              Visit Website
            </ContactButton>
          )}
        </section>

        {/* Directory information */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Directory Listing</p>

              <h2 className="mt-1 text-xl font-bold text-emerald-950">{business.businessName}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900">{business.country}</span>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900">{business.city}</span>

              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">{business.category}</span>

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">Letter {business.letter}</span>
            </div>
          </div>
        </section>

        {/* Back to directory */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse More Businesses
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            {currentLocation.city.name}, {currentLocation.country.name}
          </p>

          <p>Together life is better.</p>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
