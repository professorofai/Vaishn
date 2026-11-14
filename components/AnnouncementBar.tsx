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
    <div className="relative flex h-9 items-center justify-between bg-[#24211F] px-4 text-[11px] font-semibold tracking-wider text-ivory md:h-10 md:text-xs border-b border-gold/20 select-none">
      <button
        onClick={prev}
        aria-label="Previous announcement"
        className="grid h-7 w-7 place-items-center text-ivory/60 transition hover:text-white"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="relative h-5 flex-1 overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
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
        className="grid h-7 w-7 place-items-center text-ivory/60 transition hover:text-white"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
