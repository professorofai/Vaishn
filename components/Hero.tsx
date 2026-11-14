'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import ProductArt from './ProductArt';
import type { Category, Style, Tone } from '@/lib/data';

interface Slide {
  eyebrow?: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  bg?: string;
  dark: boolean;
  art?: [Category, Style, Tone];
  image?: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    title: 'Shine In Your Own Way',
    text: 'Exquisite, skin-friendly artificial jewellery crafted with hypoallergenic alloys to eliminate irritation, rashes, and discomfort.',
    cta: 'Explore Now',
    href: '/collections/all-jewellery',
    image: '/background image.jpg',
    dark: true,
  },
  {
    eyebrow: 'The Festive Edit',
    title: 'Heirloom elegance, made for today',
    text: 'Hand-set kundan, temple gold and lustrous pearls for the celebrations that matter most.',
    cta: 'Shop Now',
    href: '/collections/festive',
    bg: 'linear-gradient(120deg,#3E1624 0%,#5A2536 55%,#7A3348 100%)',
    dark: true,
    art: ['necklaces', 'kundan', 'gold'],
  },
  {
    eyebrow: 'New Arrivals',
    title: 'Pearls, pure and timeless',
    text: 'Soft luminous strands and drops that move effortlessly from sarees to sundresses.',
    cta: 'Shop Now',
    href: '/collections/pearl',
    bg: 'linear-gradient(120deg,#F3E7D6 0%,#EBD9BF 60%,#E4CDA6 100%)',
    dark: false,
    art: ['earrings', 'pearl', 'gold'],
  },
  {
    eyebrow: 'Up to 50% off',
    title: 'Everyday sparkle, every single day',
    text: 'Light American diamond pieces designed for desks, dinners and everything in between.',
    cta: 'Shop Offers',
    href: '/collections/offers',
    bg: 'linear-gradient(120deg,#24211F 0%,#352C27 60%,#4A3B31 100%)',
    dark: true,
    art: ['rings', 'american-diamond', 'silver'],
  },
];

const sparkles = [
  [12, 22, 0],
  [30, 70, 1.1],
  [58, 15, 2],
  [72, 80, 0.6],
  [88, 30, 1.7],
  [45, 90, 2.4],
  [92, 62, 0.3],
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 7500);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden" aria-roledescription="carousel">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[540px] md:min-h-[620px] flex items-center"
          style={s.bg ? { background: s.bg } : undefined}
        >
          {/* If slide has a real photo background */}
          {s.image && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(30,12,18,0.92) 0%, rgba(30,12,18,0.85) 45%, rgba(30,12,18,0.3) 85%, rgba(0,0,0,0.1) 100%)',
                }}
              />
            </>
          )}

          {sparkles.map(([x, y, d], k) => (
            <span
              key={k}
              className="animate-twinkle absolute h-2 w-2 rotate-45 bg-gold-light pointer-events-none"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}
            />
          ))}

          <div className="container-x relative z-10 grid w-full items-center gap-8 py-12 md:grid-cols-2">
            <div className={s.dark ? 'text-ivory' : 'text-charcoal'}>
              {s.badge && (
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/25 backdrop-blur-md px-3.5 py-1 mb-4 border border-gold/40 text-gold-light text-xs font-medium tracking-wide">
                  <ShieldCheck size={14} className="text-gold-light" />
                  {s.badge}
                </div>
              )}

              {s.eyebrow && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`mb-3 text-xs md:text-sm font-semibold tracking-wider uppercase ${
                    s.dark ? 'text-gold-light' : 'text-gold-dark'
                  }`}
                >
                  {s.eyebrow}
                </motion.p>
              )}

              <h1 className="font-display text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl">
                {s.title.split(' ').map((w, k) => (
                  <span
                    key={k}
                    className="mr-[0.25em] inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.25 + k * 0.08,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`mt-6 max-w-md text-sm md:text-base leading-relaxed ${
                  s.dark ? 'text-ivory/85' : 'text-charcoal/70'
                }`}
              >
                {s.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={s.href}
                  className={
                    s.dark
                      ? 'btn-gold !px-8 !py-3.5 text-sm md:text-base shadow-lg hover:shadow-xl'
                      : 'btn-burgundy !px-8 !py-3.5 text-sm md:text-base'
                  }
                >
                  {s.cta}
                </Link>
              </motion.div>
            </div>

            {/* Right side for art slides */}
            {s.art && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="relative mx-auto aspect-square w-[78%] max-w-[500px] md:w-full"
              >
                <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/60" />
                <div className="absolute inset-[7%] rounded-full border border-gold/40" />
                <div
                  className="absolute inset-[14%] rounded-full"
                  style={{
                    background: s.dark
                      ? 'radial-gradient(circle,rgba(255,255,255,.14),transparent 70%)'
                      : 'radial-gradient(circle,rgba(255,255,255,.7),transparent 70%)',
                  }}
                />
                <div className="animate-floaty absolute inset-[6%]">
                  <ProductArt
                    category={s.art[0]}
                    style={s.art[1]}
                    tone={s.art[2]}
                    bare
                    className="drop-shadow-[0_24px_30px_rgba(0,0,0,.28)]"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => setI((i + slides.length - 1) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-burgundy transition hover:bg-white md:grid z-20 shadow-md"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => setI((i + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-burgundy transition hover:bg-white md:grid z-20 shadow-md"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {slides.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Slide ${k + 1}`}
            className="relative h-1.5 w-10 overflow-hidden bg-gold/40 rounded-full"
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
