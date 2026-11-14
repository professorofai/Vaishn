'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, RefreshCcw, ShieldCheck, Truck, ArrowRight, Plus } from 'lucide-react';
import { byId, discountPct, formatPrice, styleLabel, Style, Category, Tone } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductArt from './ProductArt';
import ProductImage from './ProductImage';
import Reveal from './Reveal';

export function SectionHead({ title, sub, href, cta = 'View All' }: { title: string; sub?: string; href?: string; cta?: string }) {
  return (
    <Reveal className="mb-8 flex items-end justify-between gap-4 md:mb-10">
      <div><h2 className="section-title">{title}</h2>{sub && <p className="mt-1.5 max-w-xl text-sm text-charcoal/65 md:text-base">{sub}</p>}</div>
      {href && <Link href={href} className="group flex shrink-0 items-center gap-1.5 border-b border-burgundy pb-0.5 text-sm font-semibold text-burgundy">{cta} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link>}
    </Reveal>
  );
}

const benefits = [[Gem, 'Premium Quality', 'Skin-friendly, tarnish-resistant finish'], [ShieldCheck, 'Secure Payment', '100% protected checkout'], [RefreshCcw, 'Easy Returns', '15-day hassle-free returns'], [Truck, 'Reliable Delivery', 'Tracked shipping across India']] as const;
export function Benefits() {
  return (
    <section className="border-b border-gold/20 bg-white"><div className="container-x grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
      {benefits.map(([Icon, t, d], i) => (
        <motion.div key={t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center justify-center gap-3 px-2 text-left">
          <Icon size={30} strokeWidth={1.3} className="shrink-0 text-gold-dark" /><div><p className="text-[13px] font-bold text-burgundy md:text-sm">{t}</p><p className="hidden text-xs text-charcoal/60 sm:block">{d}</p></div>
        </motion.div>))}
    </div></section>
  );
}

const cats: { slug: string; label: string; art: [Category, Style, Tone]; bg: string; image?: string }[] = [
  { slug: 'earrings', label: 'Earrings', art: ['earrings', 'kundan', 'gold'], bg: '#EADCCB', image: '/Earrings.jpg' },
  { slug: 'necklaces', label: 'Necklaces', art: ['necklaces', 'pearl', 'gold'], bg: '#F0E4D4', image: '/Necklace.jpg' },
  { slug: 'rings', label: 'Rings', art: ['rings', 'american-diamond', 'silver'], bg: '#E8D9C6', image: '/ring.jpg' },
  { slug: 'bangles', label: 'Bangles', art: ['bangles', 'kundan', 'gold'], bg: '#F0E4D4', image: '/bracelet.jpg' },
  { slug: 'bracelets', label: 'Bracelets', art: ['bracelets', 'pearl', 'gold'], bg: '#EADCCB', image: '/bracelet.jpg' },
  { slug: 'jewellery-sets', label: 'Jewellery Sets', art: ['sets', 'traditional', 'gold'], bg: '#E8D9C6', image: '/background image.jpg' },
  { slug: 'mangalsutra', label: 'Mangalsutra', art: ['mangalsutra', 'traditional', 'gold'], bg: '#F0E4D4', image: '/Necklace.jpg' },
];
export function CategoryGrid() {
  return (
    <section className="container-x pt-16 md:pt-24">
      <SectionHead title="Shop by Category" sub="Find the piece that completes your look." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-7">
        {cats.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Link href={`/collections/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-md" style={{ background: c.bg }}>
              <div className="h-full w-full transition duration-700 group-hover:scale-110">
                {c.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={c.image} alt={c.label} className="h-full w-full object-cover" />
                ) : (
                  <ProductArt category={c.art[0]} style={c.art[1]} tone={c.art[2]} bare className="p-2" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-dark/90 via-burgundy-dark/40 to-transparent px-3 pb-3 pt-12 text-center">
                <span className="font-display text-lg md:text-xl font-semibold text-white tracking-wide">{c.label}</span>
              </div>
            </Link>
          </Reveal>))}
      </div>
    </section>
  );
}

const styles: { slug: Style; art: [Category, Tone] }[] = [
  { slug: 'kundan', art: ['necklaces', 'gold'] }, { slug: 'pearl', art: ['earrings', 'gold'] }, { slug: 'oxidised', art: ['bangles', 'oxidised'] },
  { slug: 'gold-plated', art: ['bracelets', 'gold'] }, { slug: 'american-diamond', art: ['rings', 'silver'] }, { slug: 'minimal', art: ['necklaces', 'rose'] }, { slug: 'traditional', art: ['mangalsutra', 'gold'] },
];
export function StyleStrip() {
  return (
    <section className="container-x pt-16 md:pt-24">
      <SectionHead title="Shop by Style" />
      <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-between md:gap-4 md:px-0">
        {styles.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05} className="shrink-0">
            <Link href={`/collections/${s.slug}`} className="group flex w-28 flex-col items-center gap-3 md:w-36">
              <span className="relative block h-28 w-28 overflow-hidden rounded-full border-2 border-gold/50 p-1 transition duration-500 group-hover:border-burgundy group-hover:shadow-lg md:h-36 md:w-36">
                <span className="block h-full w-full overflow-hidden rounded-full bg-ivory-deep"><span className="block h-full w-full transition duration-700 group-hover:scale-110"><ProductArt category={s.art[0]} style={s.slug} tone={s.art[1]} view={2} /></span></span>
              </span>
              <span className="text-center text-[13px] font-semibold text-charcoal group-hover:text-burgundy">{styleLabel[s.slug]}</span>
            </Link>
          </Reveal>))}
      </div>
    </section>
  );
}

const promos = [
  { t: 'Ethnic', sub: 'Rooted in tradition', href: '/collections/ethnic', bg: 'linear-gradient(160deg,#3E1624,#7A3348)', art: ['necklaces', 'kundan', 'gold'] as [Category, Style, Tone] },
  { t: 'Western', sub: 'Made to sparkle', href: '/collections/western', bg: 'linear-gradient(160deg,#24211F,#4A3B31)', art: ['bracelets', 'american-diamond', 'silver'] as [Category, Style, Tone] },
  { t: 'Festive', sub: 'Celebrate in gold', href: '/collections/festive', bg: 'linear-gradient(160deg,#8F6F38,#D8BC85)', art: ['earrings', 'traditional', 'gold'] as [Category, Style, Tone] },
];
export function PromoBanners() {
  return (
    <section className="container-x grid gap-4 pt-16 md:grid-cols-3 md:gap-5 md:pt-24">
      {promos.map((p, i) => (
        <Reveal key={p.t} delay={i * 0.12}>
          <Link href={p.href} className="group relative flex h-[380px] items-end overflow-hidden p-7 text-white md:h-[500px]" style={{ background: p.bg }}>
            <div className="absolute inset-x-6 top-4 h-[68%] transition duration-700 group-hover:scale-110 group-hover:-rotate-3"><ProductArt category={p.art[0]} style={p.art[1]} tone={p.art[2]} bare className="drop-shadow-2xl" /></div>
            <div className="absolute inset-3 border border-white/30 transition-all duration-500 group-hover:inset-5" />
            <div className="relative"><p className="text-sm text-white/80">{p.sub}</p><p className="font-display text-5xl font-semibold">{p.t}</p><span className="mt-3 inline-flex items-center gap-1.5 border-b border-white/70 pb-0.5 text-sm font-semibold">Explore <ArrowRight size={14} className="transition group-hover:translate-x-1.5" /></span></div>
          </Link>
        </Reveal>))}
    </section>
  );
}

const looks = [
  { title: 'The Bridal Glow', sub: 'Regal kundan layered over a deep burgundy drape.', drape: '#5A2536', hair: '#1B1412', skin: '#D9A98A', hot: [{ id: 'rani-kundan-choker', x: 50, y: 61 }, { id: 'aarohi-kundan-jhumkas', x: 33, y: 37 }], neck: 'kundan' },
  { title: 'Evening Sparkle', sub: 'Diamond-bright pieces over a classic black dress.', drape: '#24211F', hair: '#2A1B14', skin: '#E3B99B', hot: [{ id: 'anaya-diamond-pendant', x: 50, y: 61 }, { id: 'noor-american-diamond-studs', x: 33, y: 37 }], neck: 'ad' },
];
export function ShopTheLook() {
  const { add } = useStore(); const [active, setActive] = useState<string | null>(null);
  return (
    <section className="container-x pt-16 md:pt-24">
      <SectionHead title="Shop the Look" sub="Tap the glowing points to meet the pieces." />
      <div className="grid gap-5 md:grid-cols-2">
        {looks.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.12}>
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#EDDDC8] to-[#D9BF9F]" onClick={() => setActive(null)}>
              <svg viewBox="0 0 300 375" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path d="M110 150 C95 70 205 70 190 150 C195 200 105 200 110 150Z" fill={l.hair} transform="translate(0 -22) scale(1 1.15) translate(0 -14)" />
                <rect x="132" y="170" width="36" height="60" fill={l.skin} />
                <ellipse cx="150" cy="130" rx="38" ry="48" fill={l.skin} />
                <path d="M112 128 C112 70 188 70 188 128 C176 100 124 100 112 128Z" fill={l.hair} />
                <path d="M30 375 C40 270 100 225 150 232 C200 225 260 270 270 375Z" fill={l.drape} />
                <path d="M110 232 C130 262 170 262 190 232 L170 228 C160 244 140 244 130 228Z" fill={l.skin} />
                <path d="M118 228 C128 262 172 262 182 228" fill="none" stroke="#B89558" strokeWidth="2.5" opacity=".95" />
                {l.neck === 'kundan' ? [0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={122 + k * 9.3} cy={246 + Math.sin((k / 6) * Math.PI) * 14} r="4.4" fill={k % 2 ? '#2F9E78' : '#C2263F'} stroke="#B89558" strokeWidth="1.5" />) : [0, 1, 2, 3, 4, 5, 6].map((k) => <circle key={k} cx={122 + k * 9.3} cy={246 + Math.sin((k / 6) * Math.PI) * 14} r="3" fill="#F4FAFF" stroke="#9CA3AA" strokeWidth="1" />)}
                <circle cx="112" cy="140" r="5" fill="#B89558" /><circle cx="188" cy="140" r="5" fill="#B89558" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-dark/80 to-transparent p-5 pt-16 text-white"><p className="font-display text-3xl font-semibold">{l.title}</p><p className="text-sm text-white/80">{l.sub}</p></div>
              {l.hot.map((h) => { const p = byId(h.id)!; const key = `${i}-${h.id}`; const on = active === key; return (
                <div key={key} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }} onClick={(e) => e.stopPropagation()}>
                  <button aria-label={`View ${p.name}`} onClick={() => setActive(on ? null : key)} className="relative -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-burgundy shadow-lg">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/70" /><Plus size={16} className={`relative transition ${on ? 'rotate-45' : ''}`} /></button>
                  <AnimatePresence>{on && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} className={`absolute z-10 mt-2 flex w-60 gap-3 bg-white p-2.5 shadow-2xl ${h.x < 45 ? '-left-4' : '-right-4'}`}>
                      <Link href={`/products/${p.slug}`} className="h-20 w-16 shrink-0 overflow-hidden"><ProductImage product={p} /></Link>
                      <div className="min-w-0 flex-1"><Link href={`/products/${p.slug}`} className="line-clamp-2 text-[13px] font-semibold leading-tight hover:text-burgundy">{p.name}</Link>
                        <p className="mt-1 text-sm font-bold text-burgundy">{formatPrice(p.price)} <span className="text-xs font-normal text-gold-dark">{discountPct(p)}% off</span></p>
                        <button onClick={() => add(p.id)} className="mt-1.5 w-full bg-burgundy py-1.5 text-xs font-semibold text-white">Add to Cart</button></div>
                    </motion.div>)}</AnimatePresence>
                </div>); })}
            </div>
          </Reveal>))}
      </div>
    </section>
  );
}
