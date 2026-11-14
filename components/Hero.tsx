'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  eyebrow?: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: 'Shine In Your Own Way',
    text: 'Exquisite, skin-friendly artificial jewellery crafted with hypoallergenic alloys to eliminate irritation, rashes, and discomfort.',
    cta: 'Explore Now',
    href: '/collections/all-jewellery',
    image: '/background image.jpg',
  },
  {
    eyebrow: 'The Festive Edit',
    title: 'Heirloom Elegance, Made for Today',
    text: 'Handcrafted kundan and temple gold finishes for the celebrations that matter most.',
    cta: 'Shop Necklaces',
    href: '/collections/necklaces',
    image: '/Necklace.jpg',
  },
  {
    eyebrow: 'Signature Drops',
    title: 'Lightweight Luxury, Pure Sparkle',
    text: 'Intricately set stones engineered for featherlight all-day comfort. 100% anti-allergic.',
    cta: 'Shop Earrings',
    href: '/collections/earrings',
    image: '/Earrings.jpg',
  },
  {
    eyebrow: 'Atelier Collection',
    title: 'Timeless Bangles & Bracelets',
    text: 'Lustrous gold plating and anti-tarnish protective finish, designed to match every mood and moment.',
    cta: 'Shop Bracelets',
    href: '/collections/bracelets',
    image: '/bracelet.jpg',
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7500);
    return () => clearInterval(t);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setI((prev) => (prev + 1) % slides.length);
      } else {
        setI((prev) => (prev + slides.length - 1) % slides.length);
      }
    }
    setTouchStartX(null);
  };

  const s = slides[i];

  return (
    <section
      className="relative overflow-hidden select-none bg-black"
      aria-roledescription="carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[500px] sm:min-h-[560px] md:min-h-[640px] lg:min-h-[700px] flex items-center"
        >
          {/* Full-bleed Background Photograph */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 h-full w-full object-cover object-center md:object-right"
          />

          {/* Luxury Cinematic Dark Vignette Overlay for Crisp Typography */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(16,7,12,0.88) 0%, rgba(16,7,12,0.72) 42%, rgba(16,7,12,0.3) 78%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          <div className="container-x relative z-10 w-full py-14 sm:py-16 md:py-20">
            <div className="max-w-2xl text-white">
              {s.eyebrow && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-3 font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold-light"
                >
                  {s.eyebrow}
                </motion.p>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08]"
              >
                {s.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="mt-4 sm:mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-white/85 font-normal"
              >
                {s.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={s.href}
                  className="btn-gold !px-8 !py-3.5 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl"
                >
                  {s.cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Navigation Arrows */}
      <button
        onClick={() => setI((i + slides.length - 1) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 transition hover:bg-white hover:text-burgundy md:grid z-20 shadow-md"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => setI((i + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 transition hover:bg-white hover:text-burgundy md:grid z-20 shadow-md"
      >
        <ChevronRight size={22} />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2.5 z-20">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Slide ${k + 1}`}
            className="relative h-1 w-8 sm:w-10 overflow-hidden bg-white/30 rounded-full transition-all"
          >
            {k === i && (
              <motion.span
                key={`p${i}`}
                className="absolute inset-0 origin-left bg-gold-light"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 7.5, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
