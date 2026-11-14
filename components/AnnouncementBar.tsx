'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Package, Phone, RotateCcw, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const offers = [
  'BUY 2 AT 20% OFF ON ETHNIC PRODUCTS · CODE: ETHNIC20',
  'FREE EXPRESS SHIPPING ON ORDERS ABOVE ₹1,499',
  'EXTRA 10% OFF ON YOUR FIRST ORDER · CODE: VAISHN10',
  '100% SKIN-FRIENDLY & HYPOALLERGENIC JEWELLERY',
  '48-HOUR HASSLE-FREE RETURNS & VAISHN STORE CREDIT',
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

  return (
    <div className="border-b border-charcoal/10 bg-ivory">
      {/* Top Black Announcement Strip with Arrows */}
      <div className="relative flex h-9 items-center justify-between bg-charcoal px-3 text-[11px] font-semibold tracking-wider text-ivory md:h-10 md:text-xs">
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="grid h-7 w-7 place-items-center text-ivory/70 transition hover:text-white"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="relative h-5 flex-1 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center font-medium tracking-[0.14em]"
            >
              <Link
                href="/collections/offers"
                className="transition hover:text-gold-light"
              >
                {offers[index]}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={next}
          aria-label="Next announcement"
          className="grid h-7 w-7 place-items-center text-ivory/70 transition hover:text-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Secondary Utility Links (Store Locator, Track Package, Contact Us, Returns) */}
      <div className="container-x hidden h-8 items-center justify-between text-[11px] text-charcoal/70 md:flex">
        <div className="flex items-center gap-6 font-medium">
          <Link
            href="/about"
            className="flex items-center gap-1.5 transition hover:text-burgundy"
          >
            <MapPin size={12} className="text-gold-dark" /> About Atelier
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-1.5 transition hover:text-burgundy"
          >
            <Package size={12} className="text-gold-dark" /> Track Package
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 transition hover:text-burgundy"
          >
            <Phone size={12} className="text-gold-dark" /> Contact Us
          </Link>
          <Link
            href="/returns"
            className="flex items-center gap-1.5 transition hover:text-burgundy"
          >
            <RotateCcw size={12} className="text-gold-dark" /> Returns & Wallet
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-burgundy">
          <ShieldCheck size={13} className="text-gold-dark" />
          100% Certified Skin-Friendly Jewellery
        </div>
      </div>
    </div>
  );
}
