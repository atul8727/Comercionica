import { alphabet } from '../data/mockData';

function AlphabetLetter({ letter, active, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(letter)}
      aria-label={`View businesses beginning with ${letter}`}
      aria-current={active ? 'page' : undefined}
      className={`relative flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-200 ${
        active
          ? 'border-emerald-900 bg-emerald-900 text-white shadow-md'
          : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-900'
      }`}
    >
      {letter}

      {/* Current letter indicator */}
      {active && <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-amber-400" />}
    </button>
  );
}

function AlphabetNav({ activeLetter, onLetterChange }) {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">Browse Alphabetically</p>

            <p className="mt-0.5 text-sm font-semibold text-emerald-950">Select a letter</p>
          </div>

          <div className="text-xs text-gray-400">
            Current: <span className="font-bold text-emerald-900">{activeLetter}</span>
          </div>
        </div>

        {/* A-Z horizontal navigation */}
        <div className="directory-horizontal-scroll -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-4 pt-1">
          {alphabet.map((letter) => (
            <AlphabetLetter key={letter} letter={letter} active={activeLetter === letter} onClick={onLetterChange} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AlphabetNav;
