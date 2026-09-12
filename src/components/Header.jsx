import { useState } from 'react';
import { Menu, QrCode, ChevronDown, Globe2, MapPin, CreditCard } from 'lucide-react';

import { Link } from 'react-router-dom';

import { brand, currentLocation, miamiMenu } from '../data/mockData';

import QrModal from './QrModal';

function LocationItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-amber-400" />

      <div className="leading-none">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-200">{label}</p>

        <p className="mt-1 text-xs font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function Header({ onMenuClick }) {
  const [qrOpen, setQrOpen] = useState(false);

  const isMiami = currentLocation.city.slug === 'miami';

  return (
    <>
      <header className="relative z-30">
        {/* ==========================================
            TOP INFORMATION BAR
        =========================================== */}

        <div className="bg-emerald-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-14 items-center justify-between gap-4">
              {/* Left side */}
              <div className="flex min-w-0 items-center gap-3">
                {/* QR BUTTON */}
                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10 sm:flex"
                  aria-label="Show QR code"
                >
                  <QrCode className="h-4 w-4" />
                </button>

                {/* Country flag */}
                <span className="shrink-0 text-xl">{currentLocation.country.flag}</span>

                {/* Desktop location */}
                <div className="hidden items-center gap-5 md:flex">
                  <LocationItem icon={Globe2} label="Country" value={currentLocation.country.name} />

                  <div className="h-7 w-px bg-white/10" />

                  <LocationItem icon={MapPin} label="City" value={currentLocation.city.name} />

                  <div className="h-7 w-px bg-white/10" />

                  <LocationItem icon={Globe2} label="Language" value={currentLocation.language.name} />
                </div>

                {/* Mobile location */}
                <div className="min-w-0 md:hidden">
                  <p className="truncate text-sm font-bold">{currentLocation.city.name}</p>

                  <p className="truncate text-[10px] text-emerald-200">
                    {currentLocation.country.name} · {currentLocation.language.name}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex shrink-0 items-center gap-2">
                {/* Digital Business Card */}
                <Link
                  to="/digital-business-card"
                  className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold transition hover:bg-white/10 sm:flex"
                >
                  <CreditCard className="h-4 w-4 text-amber-400" />
                  Digital Business Card
                </Link>

                {/* Menu */}
                <button
                  type="button"
                  onClick={onMenuClick}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            BRAND / EXPOSITION AREA
        =========================================== */}

        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-24 items-center justify-between gap-5">
              {/* Brand */}
              <Link to="/" className="group min-w-0">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-950 text-lg font-bold text-amber-400 shadow-sm">
                    C
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-black tracking-tight text-emerald-950 sm:text-2xl">{brand.name}</p>

                    <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700 sm:text-xs">{brand.tagline}</p>
                  </div>
                </div>
              </Link>

              {/* Location title */}
              <div className="hidden text-right md:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Current Location</p>

                <p className="mt-1 text-lg font-bold text-emerald-950">{currentLocation.city.name}</p>

                <p className="text-xs text-gray-500">{currentLocation.country.name}</p>
              </div>

              {/* Mobile card button */}
              <Link
                to="/digital-business-card"
                className="flex shrink-0 items-center gap-2 rounded-lg bg-emerald-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 sm:px-4 sm:py-2.5"
              >
                <CreditCard className="h-4 w-4 text-amber-400" />

                <span className="hidden sm:inline">My Digital Card</span>

                <span className="sm:hidden">Card</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ==========================================
            MIAMI-ONLY BILINGUAL NAVIGATION
        =========================================== */}

        {isMiami && (
          <nav className="border-b border-amber-200 bg-amber-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex min-h-12 items-center justify-center gap-1 overflow-x-auto sm:justify-start">
                {/* Small Business Exposition */}
                <Link to="/" className="group flex shrink-0 items-center gap-2 border-r border-amber-200 px-4 py-2 text-center">
                  <div>
                    <p className="text-xs font-bold text-emerald-950">{miamiMenu[0].english}</p>

                    <p className="mt-0.5 text-[10px] italic text-gray-500">{miamiMenu[0].spanish}</p>
                  </div>

                  <ChevronDown className="h-3.5 w-3.5 rotate-[-90deg] text-amber-600 transition group-hover:translate-x-0.5" />
                </Link>

                {/* Buy at Miami */}
                <Link to="/" className="group flex shrink-0 items-center gap-2 px-4 py-2 text-center">
                  <div>
                    <p className="text-xs font-bold text-emerald-950">{miamiMenu[1].english}</p>

                    <p className="mt-0.5 text-[10px] italic text-gray-500">{miamiMenu[1].spanish}</p>
                  </div>

                  <ChevronDown className="h-3.5 w-3.5 rotate-[-90deg] text-amber-600 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* ==========================================
          QR MODAL
      =========================================== */}

      <QrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}

export default Header;
