import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, CreditCard, BriefcaseBusiness, Info, WalletCards, Globe2, MapPin, ChevronRight } from 'lucide-react';

import { brand, currentLocation, miamiMenu } from '../data/mockData';

function MenuItem({ to, icon: Icon, children, onClick }) {
  const location = useLocation();

  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`group flex items-center justify-between rounded-xl px-4 py-3 transition ${
        isActive ? 'bg-emerald-900 text-white' : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${isActive ? 'text-amber-400' : 'text-emerald-900'}`} />

        <span className="text-sm font-semibold">{children}</span>
      </div>

      <ChevronRight
        className={`h-4 w-4 transition ${isActive ? 'text-amber-400' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-emerald-800'}`}
      />
    </Link>
  );
}

function SideMenu({ isOpen, onClose }) {
  const location = useLocation();

  const isMiami = currentLocation.city.slug === 'miami';

  // Prevent background scrolling while menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Close menu when route changes.
  useEffect(() => {
    if (isOpen) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(390px,92vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {/* ======================================
            MENU HEADER
        ======================================= */}

        <div className="shrink-0 bg-emerald-950 text-white">
          <div className="flex items-center justify-between px-5 py-5">
            <Link to="/" onClick={onClose} className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg font-black text-amber-400">C</div>

              <div>
                <p className="text-lg font-black">{brand.name}</p>

                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200">{brand.tagline}</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ======================================
            CURRENT LOCATION
        ======================================= */}

        <div className="shrink-0 border-b border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">You are in</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl">{currentLocation.country.flag}</span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-800" />

                <p className="truncate text-sm font-bold text-slate-900">{currentLocation.city.name}</p>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Globe2 className="h-3.5 w-3.5" />

                <span>{currentLocation.country.name}</span>

                <span className="text-slate-300">•</span>

                <span>{currentLocation.language.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            MENU CONTENT
        ======================================= */}

        <div className="directory-horizontal-scroll flex-1 overflow-y-auto px-4 py-5">
          <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Navigation</p>

          <nav className="space-y-1">
            <MenuItem to="/" icon={Home} onClick={onClose}>
              Directory Home
            </MenuItem>

            <MenuItem to="/digital-business-card" icon={CreditCard} onClick={onClose}>
              Digital Business Card
            </MenuItem>

            <MenuItem to="/services" icon={BriefcaseBusiness} onClick={onClose}>
              Services
            </MenuItem>

            <MenuItem to="/about" icon={Info} onClick={onClose}>
              About Us
            </MenuItem>

            <MenuItem to="/payment" icon={WalletCards} onClick={onClose}>
              Payment
            </MenuItem>
          </nav>

          {/* ====================================
              MIAMI ONLY
          ===================================== */}

          {isMiami && (
            <div className="mt-7">
              <div className="mb-3 px-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">Miami</p>

                <p className="mt-1 text-sm font-bold text-slate-900">Miami Business Network</p>
              </div>

              <div className="space-y-2">
                {miamiMenu.map((item, index) => (
                  <Link
                    key={item.id || index}
                    to={item.path || '/'}
                    onClick={onClose}
                    className="group rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 transition hover:border-amber-300 hover:bg-amber-100"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-emerald-950">{item.english}</p>

                        <p className="mt-1 text-xs italic text-slate-500">{item.spanish}</p>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-amber-600 transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ====================================
              LOCATION CARD
          ===================================== */}

          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-900">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Directory</p>

                <p className="mt-1 text-sm font-bold text-slate-900">{currentLocation.city.name}</p>

                <p className="mt-0.5 text-xs text-slate-500">{currentLocation.country.name}</p>

                <p className="mt-1 text-xs font-medium text-emerald-800">{currentLocation.language.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            FOOTER
        ======================================= */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-4">
          <p className="text-center text-xs text-slate-400">{brand.footerTagline}</p>

          <p className="mt-1 text-center text-[10px] text-slate-300">{brand.copyright}</p>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
