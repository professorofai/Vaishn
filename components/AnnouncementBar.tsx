'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const offers = [
  { text: 'BUY 2 AT 20% OFF ON ETHNIC PRODUCTS', code: 'ETHNIC20' },
  { text: 'FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹1,499' },
  { text: 'EXTRA 10% OFF ON YOUR FIRST ORDER', code: 'VAISHN10' },
  { text: '100% SKIN-FRIENDLY & ANTI-ALLERGIC JEWELLERY' },
  { text: '48-HOUR HASSLE-FREE RETURNS & STORE CREDIT' },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % offers.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + offers.length) % offers.length);
  const next = () => setIndex((i) => (i + 1) % offers.length);

  const current = offers[index];

  return (
    <div className="w-full select-none">
      {/* 1. Main Black Announcement Strip (Fixed at top) */}
      <div className="relative flex h-8 sm:h-9 items-center justify-between bg-black px-2 sm:px-4 text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider text-white border-b border-white/10">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center text-white/70 transition hover:text-white shrink-0"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="relative h-5 flex-1 overflow-hidden px-1 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center font-medium tracking-[0.1em] sm:tracking-[0.14em] truncate"
            >
              <Link
                href="/collections/offers"
                className="transition hover:text-gold-light truncate max-w-[85vw] sm:max-w-none"
              >
                <span>{current.text}</span>
                {current.code && (
                  <span className="text-gold-light font-bold ml-1.5">
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
          className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center text-white/70 transition hover:text-white shrink-0"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 2. Secondary Utility Links Strip (Desktop only, matches reference screenshot) */}
      <div className="hidden md:flex h-7 items-center justify-between border-b border-gold/20 bg-[#FAF6F0] px-6 text-[11px] text-charcoal/70">
        <div className="flex items-center gap-6 font-medium">
          <Link
            href="/track"
            className="transition hover:text-burgundy"
          >
            Track Package
          </Link>
          <Link
            href="/contact"
            className="transition hover:text-burgundy"
          >
            Contact Us
          </Link>
          <Link
            href="/returns"
            className="transition hover:text-burgundy"
          >
            Returns & Store Credit
          </Link>
          <Link
            href="/faq"
            className="transition hover:text-burgundy"
          >
            FAQs & Care Guide
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-burgundy tracking-wide">
          <ShieldCheck size={13} className="text-gold-dark" />
          100% Certified Skin-Friendly Jewellery
        </div>
      </div>
    </div>
  );
}
