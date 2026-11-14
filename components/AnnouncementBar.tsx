'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const offers = [
  {
    full: 'BUY 2 AT 20% OFF ON ETHNIC PRODUCTS',
    short: 'BUY 2 AT 20% OFF',
    code: 'ETHNIC20',
  },
  {
    full: 'FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹1,499',
    short: 'FREE SHIPPING ABOVE ₹1,499',
  },
  {
    full: 'EXTRA 10% OFF ON YOUR FIRST ORDER',
    short: '10% OFF FIRST ORDER',
    code: 'VAISHN10',
  },
  {
    full: '100% SKIN-FRIENDLY & ANTI-ALLERGIC JEWELLERY',
    short: '100% ANTI-ALLERGIC JEWELLERY',
  },
  {
    full: '48-HOUR HASSLE-FREE RETURNS & STORE CREDIT',
    short: '48-HR EASY RETURNS',
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % offers.length);
  const prev = () => setIndex((prev) => (prev - 1 + offers.length) % offers.length);

  const current = offers[index];

  return (
    <div className="w-full select-none">
      {/* 1. Main Black Announcement Strip (Fixed at top) */}
      <div className="relative flex h-8 sm:h-9 items-center justify-between bg-black px-1.5 sm:px-4 text-[9.5px] xs:text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider text-white border-b border-white/10">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="grid h-7 w-6 sm:w-8 place-items-center text-white/70 transition hover:text-white shrink-0"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="relative h-5 flex-1 overflow-hidden px-1 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center font-medium tracking-[0.04em] sm:tracking-[0.12em]"
            >
              <Link
                href="/collections/offers"
                className="transition hover:text-gold-light inline-flex items-center justify-center max-w-full truncate"
              >
                <span className="hidden sm:inline">{current.full}</span>
                <span className="sm:hidden">{current.short}</span>
                {current.code && (
                  <span className="text-gold-light font-bold ml-1 sm:ml-1.5 whitespace-nowrap">
                    · CODE: {current.code}
                  </span>
                )}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          aria-label="Next announcement"
          className="grid h-7 w-6 sm:w-8 place-items-center text-white/70 transition hover:text-white shrink-0"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 2. Hypoallergenic Trust Micro-bar */}
      <div className="hidden sm:flex h-6 items-center justify-center gap-2 bg-[#2D1217] px-4 text-[10.5px] font-medium tracking-wide text-gold-light/95 border-b border-gold/15">
        <ShieldCheck size={13} className="text-gold" />
        <span>100% Skin-Friendly · Anti-Allergic Materials · Nickel & Lead Free</span>
      </div>
    </div>
  );
}
