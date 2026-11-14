'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgePercent,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Star,
  Truck,
  Check,
  Feather,
  Gem,
} from 'lucide-react';
import {
  byId,
  categoryLabel,
  discountPct,
  formatPrice,
  Product,
  styleLabel,
  Tone,
  toneLabel,
} from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductImage from './ProductImage';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';

const reviewsData = [
  [
    'Ananya S.',
    5,
    'Looks even better in person',
    'The finish is gorgeous and it feels light. Received so many compliments at a wedding.',
  ],
  [
    'Meera K.',
    5,
    'Perfect gift',
    'Packaging was premium and the piece arrived on time. My sister loved it.',
  ],
  [
    'Riya P.',
    4,
    'Beautiful, slightly delicate',
    'Elegant design and great value. I keep it in the box between wears and it still looks new.',
  ],
  [
    'Divya R.',
    5,
    'Worth every rupee',
    'Matches both ethnic and western outfits. Will be ordering more from VAISHN.',
  ],
] as const;

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(n)
              ? 'fill-gold text-gold'
              : 'text-gold/40'
          }
        />
      ))}
    </span>
  );
}

function Acc({
  title,
  children,
  open,
}: {
  title: string;
  children: React.ReactNode;
  open?: boolean;
}) {
  const [o, setO] = useState(!!open);
  return (
    <div className="border-b border-gold/30">
      <button
        onClick={() => setO(!o)}
        aria-expanded={o}
        className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold text-burgundy"
      >
        {title}
        <ChevronDown
          className={`transition ${o ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>
      <AnimatePresence initial={false}>
        {o && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-charcoal/75">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductView({
  product: p,
  related,
}: {
  product: Product;
  related: Product[]
}) {
  const { add, toggleWish, wishlist, viewed, recent, openCart } = useStore();
  const tones: Tone[] =
    p.tone === 'silver'
      ? ['silver', 'gold', 'rose']
      : p.tone === 'oxidised'
      ? ['oxidised', 'silver']
      : p.tone === 'rose'
      ? ['rose', 'gold', 'silver']
      : ['gold', 'rose', 'silver'];

  const router = useRouter();
  const [tone, setTone] = useState<Tone>(p.tone);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    viewed(p.id);
  }, [p.id, viewed]);

  const wished = wishlist.includes(p.id);
  const out = p.stock === 0;
  const views = [0, 1, 2, 3];
  const recentItems = recent
    .filter((id) => id !== p.id)
    .map(byId)
    .filter(Boolean)
    .slice(0, 4) as Product[];

  const checkPin = () => {
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      return setPinMsg({ ok: false, t: 'Enter a valid 6-digit pincode.' });
    }
    const d = new Date();
    d.setDate(d.getDate() + 5);
    const e = new Date();
    e.setDate(e.getDate() + 3);
    const f = (x: Date) =>
      x.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    setPinMsg({
      ok: true,
      t: `Delivery between ${f(e)} and ${f(d)} · Cash on delivery available`,
    });
  };

  const addNow = () => {
    add(p.id, tone, qty, false);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-x py-6 md:py-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-charcoal/60">
        <Link href="/" className="hover:text-burgundy">
          Home
        </Link>{' '}
        <span className="mx-1.5">/</span>{' '}
        <Link
          href={`/collections/${
            p.category === 'sets' ? 'jewellery-sets' : p.category
          }`}
          className="hover:text-burgundy"
        >
          {categoryLabel[p.category]}
        </Link>{' '}
        <span className="mx-1.5">/</span>{' '}
        <span className="font-semibold text-charcoal">{p.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
        {/* Left Column: Gallery + Delivery Details & Trust Badges */}
        <div>
          {/* Mobile swipe gallery */}
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto md:hidden">
            {views.map((v) => (
              <div key={v} className="aspect-[4/5] w-full shrink-0 snap-center">
                <ProductImage product={p} view={v} tone={tone} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-charcoal/50 md:hidden">
            Swipe to see more →
          </p>

          {/* Desktop gallery */}
          <div className="hidden gap-4 md:flex">
            <div className="flex w-20 flex-col gap-3">
              {views.map((v) => (
                <button
                  key={v}
                  onClick={() => setImg(v)}
                  aria-label={`View image ${v + 1}`}
                  className={`aspect-[4/5] overflow-hidden border-2 transition ${
                    img === v
                      ? 'border-burgundy'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ProductImage product={p} view={v} tone={tone} />
                </button>
              ))}
            </div>
            <div
              className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden bg-ivory-deep"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setZoom({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              onMouseLeave={() => setZoom(null)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={img + tone}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full w-full"
                  style={{
                    transform: zoom ? 'scale(2)' : 'scale(1)',
                    transformOrigin: zoom
                      ? `${zoom.x}% ${zoom.y}%`
                      : 'center',
                    transition: 'transform .25s ease-out',
                  }}
                >
                  <ProductImage product={p} view={img} tone={tone} />
                </motion.div>
              </AnimatePresence>
              <span className="pointer-events-none absolute bottom-3 right-3 bg-white/90 px-2.5 py-1 text-[11px] font-semibold">
                Hover to zoom
              </span>
            </div>
          </div>

          {/* Delivery Details & Trust Badges (below the product image where space is left, matching 1st screenshot) */}
          <div className="mt-8 border-t border-gold/25 pt-6">
            <h3 className="text-base font-semibold text-charcoal">
              Delivery Details
            </h3>
            <div className="mt-2.5 flex max-w-md">
              <input
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && checkPin()}
                placeholder="Enter your pincode"
                className="min-w-0 flex-1 border border-gold/40 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-burgundy"
              />
              <button
                onClick={checkPin}
                className="bg-[#24211F] px-6 text-xs font-bold tracking-wider text-white transition hover:bg-burgundy"
              >
                CHECK
              </button>
            </div>
            {pinMsg && (
              <p
                className={`mt-2 text-xs font-medium ${
                  pinMsg.ok ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {pinMsg.t}
              </p>
            )}

            {/* 5 Trust Feature Badges matching 1st screenshot (excluding 4x lab tested) */}
            <div className="mt-7 grid grid-cols-3 gap-y-7 gap-x-4 text-center">
              {/* 1. 5 Days Return */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-charcoal">
                  <RotateCcw size={28} strokeWidth={1.4} />
                </div>
                <span className="text-xs font-semibold leading-tight text-charcoal">
                  5 Days<br />Return
                </span>
              </div>

              {/* 2. Skin Friendly */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-charcoal">
                  <Feather size={28} strokeWidth={1.4} />
                </div>
                <span className="text-xs font-semibold leading-tight text-charcoal">
                  Skin<br />Friendly
                </span>
              </div>

              {/* 3. Free Shipping */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-charcoal">
                  <Truck size={28} strokeWidth={1.4} />
                </div>
                <span className="text-xs font-semibold leading-tight text-charcoal">
                  Free<br />Shipping
                </span>
              </div>

              {/* 4. Made In India */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-charcoal">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-7 w-7 text-charcoal"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold leading-tight text-charcoal">
                  Made In<br />India
                </span>
              </div>

              {/* 5. Premium Quality */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center text-charcoal">
                  <Gem size={28} strokeWidth={1.4} />
                </div>
                <span className="text-xs font-semibold leading-tight text-charcoal">
                  Premium<br />Quality
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Actions */}
        <div className="md:pt-2">
          <p className="text-sm font-semibold text-gold-dark">
            {styleLabel[p.style]}
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold leading-tight text-burgundy md:text-5xl">
            {p.name}
          </h1>
          <a
            href="#reviews"
            className="mt-3 inline-flex items-center gap-2 text-sm"
          >
            <Stars n={p.rating} />
            <span className="font-semibold">{p.rating.toFixed(1)}</span>
            <span className="text-charcoal/55 underline underline-offset-4">
              {p.reviews} reviews
            </span>
          </a>
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-burgundy">
              {formatPrice(p.price)}
            </span>
            <span className="text-lg text-charcoal/45 line-through">
              {formatPrice(p.mrp)}
            </span>
            <span className="bg-gold/20 px-2.5 py-1 text-sm font-bold text-gold-dark">
              {discountPct(p)}% off
            </span>
          </div>
          <p className="mt-1 text-xs text-charcoal/55">Inclusive of all taxes</p>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/75">
            {p.description}
          </p>

          <div className="mt-6">
            <p className="mb-2.5 text-sm font-semibold">
              Finish:{' '}
              <span className="font-normal text-charcoal/70">
                {toneLabel[tone]}
              </span>
            </p>
            <div className="flex gap-3">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  aria-label={toneLabel[t]}
                  aria-pressed={tone === t}
                  className={`relative h-10 w-10 rounded-full border-2 p-0.5 transition ${
                    tone === t
                      ? 'border-burgundy'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{
                      background: {
                        gold: 'linear-gradient(135deg,#F7E3A8,#B8903C)',
                        rose: 'linear-gradient(135deg,#F9D9CA,#C98A74)',
                        silver: 'linear-gradient(135deg,#fff,#A9AEB4)',
                        oxidised: 'linear-gradient(135deg,#BDBAB0,#4B4A45)',
                      }[t],
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <div>
              <p className="mb-2.5 text-sm font-semibold">Quantity</p>
              <div className="flex items-center border border-gold/50 bg-white">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="grid h-11 w-11 place-items-center hover:bg-ivory"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQty(Math.min(Math.min(10, p.stock || 1), qty + 1))
                  }
                  className="grid h-11 w-11 place-items-center hover:bg-ivory"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <p
              className={`mt-6 text-sm font-semibold ${
                out
                  ? 'text-red-700'
                  : p.stock <= 5
                  ? 'text-orange-700'
                  : 'text-green-700'
              }`}
            >
              {out
                ? 'Out of stock'
                : p.stock <= 5
                ? `Only ${p.stock} left — order soon`
                : 'In stock'}
            </p>
          </div>

          <div className="mt-7 flex gap-3">
            <button
              disabled={out}
              onClick={addNow}
              className="btn-burgundy flex-1 !py-4 disabled:opacity-40"
            >
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
            <button
              disabled={out}
              onClick={() => {
                add(p.id, tone, qty, false);
                router.push('/checkout');
              }}
              className="btn-gold flex-1 !py-4 disabled:opacity-40"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWish(p.id)}
              aria-label="Toggle wishlist"
              className="grid h-[54px] w-[54px] shrink-0 place-items-center border border-burgundy text-burgundy transition hover:bg-burgundy/5"
            >
              <Heart
                size={20}
                className={wished ? 'fill-burgundy' : ''}
              />
            </button>
          </div>

          <div className="mt-6 space-y-2.5 bg-white p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-burgundy">
              <BadgePercent size={17} /> Offers for you
            </p>
            {[
              ['VAISHN10', 'Extra 10% off on your first order'],
              ['WELCOME15', '15% off — apply in cart'],
              ['FLAT200', '₹200 off on your bag'],
            ].map(([c, t]) => (
              <p key={c} className="flex items-center gap-3 text-sm">
                <span className="border border-dashed border-gold px-2 py-0.5 text-xs font-bold text-gold-dark">
                  {c}
                </span>
                {t}
              </p>
            ))}
          </div>

          {/* Product Specifications & Policies Accordion */}
          <div className="mt-7">
            <Acc title="Description" open>
              <p>
                {p.description} Every VAISHN piece is quality checked and shipped
                in a signature gift box.
              </p>
            </Acc>
            <Acc title="Material & Specifications">
              <ul className="space-y-1.5">
                <li>
                  <b>Material:</b> {p.material}
                </li>
                <li>
                  <b>Style:</b> {styleLabel[p.style]}
                </li>
                <li>
                  <b>Colour:</b> {p.colour}
                </li>
                <li>
                  <b>Category:</b> {categoryLabel[p.category]}
                </li>
                <li>
                  <b>Plating:</b> Anti-tarnish finish
                </li>
              </ul>
            </Acc>
            <Acc title="Product Care">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Store in the VAISHN box, away from moisture.</li>
                <li>Apply perfume and cosmetics before wearing jewellery.</li>
                <li>Wipe gently with a soft dry cloth after use.</li>
                <li>Avoid contact with water while bathing or swimming.</li>
              </ul>
            </Acc>
            <Acc title="Shipping & Returns">
              <p className="flex gap-2">
                <RotateCcw
                  size={16}
                  className="mt-0.5 shrink-0 text-gold-dark"
                />{' '}
                Free shipping above ₹1,499. Dispatched in 24–48 hours. Easy 15-day
                returns and exchanges on unused pieces with original packaging.
              </p>
            </Acc>
          </div>
        </div>
      </div>

      <section id="reviews" className="mt-20 scroll-mt-32">
        <h2 className="section-title mb-8">Customer Reviews</h2>
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <div className="bg-white p-6 text-center">
            <p className="font-display text-6xl font-semibold text-burgundy">
              {p.rating.toFixed(1)}
            </p>
            <div className="mt-1 flex justify-center">
              <Stars n={p.rating} size={18} />
            </div>
            <p className="mt-1 text-sm text-charcoal/60">
              Based on {p.reviews} reviews
            </p>
            <div className="mt-4 space-y-1.5">
              {[5, 4, 3, 2, 1].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span className="w-3">{s}</span>
                  <div className="h-1.5 flex-1 bg-ivory-deep">
                    <div
                      className="h-full bg-gold"
                      style={{ width: `${[72, 20, 5, 2, 1][i]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ul className="space-y-4">
            {reviewsData.map(([n, r, t, b]) => (
              <li key={n} className="bg-white p-5">
                <div className="flex items-center justify-between">
                  <Stars n={r} />
                  <span className="text-xs text-green-700">Verified buyer</span>
                </div>
                <p className="mt-2 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-charcoal/70">{b}</p>
                <p className="mt-2 text-xs text-charcoal/50">{n}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-8">You May Also Like</h2>
          <ProductCarousel items={related} />
        </section>
      )}
      {recentItems.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {recentItems.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
