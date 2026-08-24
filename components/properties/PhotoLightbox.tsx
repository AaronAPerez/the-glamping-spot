'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface PhotoLightboxProps {
  images: GalleryImage[];
  /** Index of the photo currently on screen. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Optional "see the rest on Airbnb" link shown in the top bar. */
  airbnbUrl?: string;
}

const SWIPE_THRESHOLD_PX = 50;

/**
 * Full-screen photo viewer.
 *
 * Layout is responsive rather than two separate trees: the flex direction
 * flips at `lg`, so the thumbnail strip is a vertical rail on the right for
 * desktop and a horizontal filmstrip under the photo on smaller screens.
 *
 * Rendered through a portal so the page's sticky booking card can't win a
 * stacking-context fight with it.
 */
export default function PhotoLightbox({
  images,
  index,
  onIndexChange,
  onClose,
  airbnbUrl,
}: PhotoLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const current = images[index];

  const goTo = useCallback(
    (next: number) => onIndexChange((next + total) % total),
    [onIndexChange, total]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  // Portals need the DOM, so hold off until after hydration.
  useEffect(() => setMounted(true), []);

  // Lock background scrolling and restore focus to whatever opened the dialog.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, []);

  // Keyboard: navigation plus a focus trap so Tab can't escape into the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          return;
        case 'ArrowRight':
          event.preventDefault();
          next();
          return;
        case 'ArrowLeft':
          event.preventDefault();
          previous();
          return;
        case 'Home':
          event.preventDefault();
          goTo(0);
          return;
        case 'End':
          event.preventDefault();
          goTo(total - 1);
          return;
        case 'Tab':
          break;
        default:
          return;
      }

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, next, previous, goTo, total]);

  // Keep the active thumbnail visible as the photo changes.
  useEffect(() => {
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-thumb-index="${index}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  if (!mounted || !current) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo gallery — ${total} photos`}
      className="fixed inset-0 z-[100] flex flex-col bg-neutral-950 text-white"
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 h-14 shrink-0 border-b border-white/10">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 -ml-2 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="hidden sm:inline">Close</span>
        </button>

        <p className="text-sm text-white/70 tabular-nums" aria-hidden="true">
          {index + 1} / {total}
        </p>

        {airbnbUrl ? (
          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-white/25 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            Book on Airbnb
          </a>
        ) : (
          <span className="w-16" aria-hidden="true" />
        )}
      </div>

      {/* ── Photo + thumbnail strip ── */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Stage */}
        <div
          className="relative flex-1 min-h-0 flex items-center justify-center p-3 sm:p-6"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > SWIPE_THRESHOLD_PX) (delta < 0 ? next : previous)();
            touchStartX.current = null;
          }}
        >
          <div className="relative w-full h-full">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, calc(100vw - 220px)"
              quality={85}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip — right rail on desktop, filmstrip underneath below lg */}
        <div
          ref={stripRef}
          className="shrink-0 lg:w-[220px] lg:h-full lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40"
        >
          <div className="flex lg:flex-col gap-2 p-3">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                data-thumb-index={i}
                onClick={() => onIndexChange(i)}
                aria-label={`Photo ${i + 1} of ${total}: ${image.alt}`}
                aria-current={i === index ? 'true' : undefined}
                className={`relative shrink-0 w-24 h-16 lg:w-full lg:h-32 rounded-lg overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                  i === index
                    ? 'ring-2 ring-[#FF385C] opacity-100'
                    : 'opacity-50 hover:opacity-90'
                }`}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 96px, 196px"
                  quality={60}
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Caption ── */}
      <div className="shrink-0 px-4 sm:px-6 py-3 border-t border-white/10">
        <p className="text-sm text-white/80 max-w-3xl">{current.alt}</p>
      </div>

      {/* Announce photo changes to screen readers without moving focus */}
      <p aria-live="polite" className="sr-only">
        Photo {index + 1} of {total}: {current.alt}
      </p>
    </div>,
    document.body
  );
}
