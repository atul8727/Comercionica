import { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';

function QrModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Unable to copy URL:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  /*
   * Using a public QR image service for the prototype.
   *
   * Later, when the Laravel backend is ready,
   * we can generate/store QR codes ourselves.
   */
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-emerald-950 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Scan & Visit</p>

              <h2 className="mt-1 text-xl font-black">ComerciOnica</h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Close QR code"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* QR */}
        <div className="px-6 pb-6 pt-7">
          <div className="mx-auto flex w-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={qrUrl} alt="QR code for current ComerciOnica page" className="h-64 w-64" />
          </div>

          <div className="mt-5 text-center">
            <h3 className="text-lg font-bold text-slate-900">Scan this QR code</h3>

            <p className="mt-1 text-sm leading-5 text-slate-500">Scan with your phone camera to open this ComerciOnica directory page.</p>
          </div>

          {/* Current URL */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="break-all text-xs leading-5 text-slate-500">{currentUrl}</p>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={copyUrl}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-800 hover:text-emerald-900"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-700" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </button>

            <a
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              <ExternalLink className="h-4 w-4" />
              Open Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrModal;
