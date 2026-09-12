import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Globe2,
  LayoutDashboard,
  Megaphone,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  WalletCards,
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

import { brand, currentLocation } from '../data/mockData';

const pageContent = {
  about: {
    eyebrow: 'About ComerciOnica',
    title: 'A digital network for small businesses everywhere.',
    description:
      'ComerciOnica is designed to connect local businesses with customers through a simple, searchable and multilingual digital business directory.',
  },

  services: {
    eyebrow: 'Our Services',
    title: 'Everything a small business needs to be discovered online.',
    description:
      'From a digital business card to directory visibility, ComerciOnica gives local businesses a simple way to establish their digital presence.',
  },

  payment: {
    eyebrow: 'Membership & Payment',
    title: 'Choose a simple way to grow your business presence.',
    description: 'Businesses can create their digital profile and become part of the local ComerciOnica business network.',
  },

  'digital-business-card': {
    eyebrow: 'Digital Business Card',
    title: 'Turn your traditional business card into a digital profile.',
    description: 'Upload your business card, provide your basic information and create a professional online business profile.',
  },
};

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-emerald-950">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}

function OtherPages() {
  const location = useLocation();

  const pageKey = location.pathname.replace('/', '').replace(/\/$/, '') || 'about';

  const content = pageContent[pageKey] || pageContent.about;

  const isPayment = pageKey === 'payment';
  const isDigitalCard = pageKey === 'digital-business-card';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold text-emerald-950">
            {brand.name}
          </Link>

          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-emerald-900 hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4" />
            Directory
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-emerald-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">{content.eyebrow}</p>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{content.title}</h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">{content.description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-emerald-950 transition hover:bg-amber-300"
                >
                  Explore Directory
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {!isPayment && (
                  <Link
                    to="/digital-business-card"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Create Digital Card
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Location context */}
        <section className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Current Directory</p>

              <p className="mt-1 font-semibold text-emerald-950">
                {currentLocation.city.name}, {currentLocation.country.name}
              </p>
            </div>

            <p className="text-sm text-gray-500">
              Language: <span className="font-medium text-gray-700">{currentLocation.language.name}</span>
            </p>
          </div>
        </section>

        {/* About page */}
        {pageKey === 'about' && (
          <>
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-3">
                <FeatureCard
                  icon={Globe2}
                  title="Global Network"
                  description="A single platform can organize businesses across countries, cities, languages and business categories."
                />

                <FeatureCard
                  icon={Users}
                  title="Local Businesses"
                  description="Give small businesses a professional online presence without requiring them to build a website from scratch."
                />

                <FeatureCard
                  icon={Search}
                  title="Easy Discovery"
                  description="Customers can browse businesses alphabetically by location, category and language."
                />
              </div>
            </section>

            <section className="bg-white">
              <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Our Vision</p>

                    <h2 className="mt-2 text-3xl font-bold text-emerald-950">One platform. Many communities.</h2>

                    <p className="mt-5 leading-8 text-gray-600">
                      The platform is designed around one universal application rather than separate websites for every city or category.
                    </p>

                    <p className="mt-4 leading-8 text-gray-600">
                      Location, language, category and business information are managed dynamically, allowing the network to grow without creating
                      thousands of manually maintained pages.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-emerald-950 p-8 text-white">
                    <Globe2 className="h-10 w-10 text-amber-400" />

                    <h3 className="mt-6 text-2xl font-bold">Built to scale</h3>

                    <p className="mt-3 leading-7 text-emerald-100">
                      Countries, cities, languages, categories and members can be added through the platform database.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Services page */}
        {pageKey === 'services' && (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={CreditCard}
                title="Digital Business Card"
                description="Create a professional online business profile from your basic business information and card image."
              />

              <FeatureCard
                icon={Search}
                title="Business Directory"
                description="Appear in your city's business directory and allow customers to find you by category and alphabet."
              />

              <FeatureCard
                icon={Globe2}
                title="Multilingual Presence"
                description="Support businesses and customers in different languages while keeping one universal platform."
              />

              <FeatureCard
                icon={Smartphone}
                title="Responsive Design"
                description="Business profiles and directories are designed to work across phones, tablets and desktop computers."
              />

              <FeatureCard
                icon={Megaphone}
                title="Business Promotion"
                description="Provide additional visibility opportunities for participating businesses within the network."
              />

              <FeatureCard
                icon={ShieldCheck}
                title="Secure Profiles"
                description="Business information can be managed through authenticated member accounts and administrative controls."
              />
            </div>
          </section>
        )}

        {/* Digital business card page */}
        {isDigitalCard && (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">How It Works</p>

                <h2 className="mt-2 text-3xl font-bold text-emerald-950">Your business card becomes your online identity.</h2>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      number: '01',
                      title: 'Enter your business information',
                      text: 'Add your business name, owner information, category, location and contact details.',
                    },
                    {
                      number: '02',
                      title: 'Upload your business card',
                      text: 'Upload an image of your existing business card to your profile.',
                    },
                    {
                      number: '03',
                      title: 'Get your digital profile',
                      text: 'The platform creates a searchable business profile and places it into the appropriate directory.',
                    },
                  ].map((step) => (
                    <div key={step.number} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-white">
                        {step.number}
                      </div>

                      <div>
                        <h3 className="font-bold text-emerald-950">{step.title}</h3>

                        <p className="mt-1 text-sm leading-6 text-gray-600">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card preview */}
              <div className="rounded-3xl bg-emerald-950 p-5 shadow-xl sm:p-8">
                <div className="overflow-hidden rounded-2xl bg-white">
                  <div className="h-24 bg-gradient-to-r from-emerald-950 to-emerald-800" />

                  <div className="relative px-6 pb-7">
                    <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-amber-400 text-3xl font-bold text-emerald-950 shadow-lg">
                      A
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber-700">Digital Business Card</p>

                    <h3 className="mt-1 text-2xl font-bold text-emerald-950">ABC Miami Bakery</h3>

                    <p className="mt-1 text-sm text-gray-500">Maria Rodriguez</p>

                    <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPinIcon />
                        Miami, United States
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <PhoneIcon />
                        +1 (305) 555-0188
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Globe2 className="h-4 w-4 text-amber-600" />
                        www.abcbakery.example
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Payment page */}
        {isPayment && (
          <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Business Membership</p>

                <h2 className="mt-3 text-3xl font-bold text-emerald-950">Get Listed</h2>

                <p className="mt-3 leading-7 text-gray-600">Create your business profile and become part of the ComerciOnica directory.</p>

                <div className="my-7 text-4xl font-bold text-emerald-950">
                  $XX
                  <span className="text-sm font-normal text-gray-500"> / membership</span>
                </div>

                <div className="space-y-3">
                  {[
                    'Digital business profile',
                    'Business card image',
                    'Category listing',
                    'Location directory listing',
                    'Customer contact options',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-emerald-700" />
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 w-full rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                >
                  Continue to Payment
                </button>
              </div>

              <div className="rounded-3xl bg-emerald-950 p-7 text-white">
                <WalletCards className="h-10 w-10 text-amber-400" />

                <h2 className="mt-6 text-2xl font-bold">Secure Online Payment</h2>

                <p className="mt-3 leading-7 text-emerald-100">Payment processing will be connected to the final membership and billing system.</p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <LayoutDashboard className="h-6 w-6 text-amber-400" />

                  <p className="mt-4 text-sm font-semibold">Future payment system</p>

                  <p className="mt-2 text-sm leading-6 text-emerald-200">
                    The final implementation can support payment status, membership expiry, invoices and transaction history.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <p>{brand.copyright}</p>

          <p>
            {currentLocation.city.name}, {currentLocation.country.name}
          </p>

          <p>{brand.footerTagline}</p>
        </div>
      </footer>
    </div>
  );
}

/*
 * Small reusable icon wrappers used in the
 * digital business card preview.
 */
function MapPinIcon() {
  return <Globe2 className="h-4 w-4 text-amber-600" />;
}

function PhoneIcon() {
  return <Smartphone className="h-4 w-4 text-amber-600" />;
}

export default OtherPages;
