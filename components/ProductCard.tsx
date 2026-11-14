'use client';
import Link from 'next/link';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { discountPct, formatPrice, Product } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductImage from './ProductImage';

export default function ProductCard({ product: p }: { product: Product }) {
  const { toggleWish, wishlist, add } = useStore();
  const wished = wishlist.includes(p.id); const out = p.stock === 0;
  return (
    <div className="group relative flex flex-col bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        <Link href={`/products/${p.slug}`} aria-label={p.name} className="absolute inset-0 block">
          <div className="absolute inset-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"><ProductImage product={p} view={0} /></div>
          <div className="absolute inset-0 scale-100 opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"><ProductImage product={p} view={1} /></div>
        </Link>
        <div className="pointer-events-none absolute left-0 top-3 flex flex-col gap-1.5">
          <span className="bg-burgundy px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white">SALE</span>
          {p.isNew && <span className="bg-gold px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white">NEW</span>}
        </div>
        <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleWish(p.id)} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-burgundy shadow-sm transition hover:bg-white">
          <Heart size={17} className={wished ? 'fill-burgundy' : ''} />
        </motion.button>
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-white/95 px-2 py-1 text-[11px] font-semibold">
          {p.rating.toFixed(1)} <Star size={11} className="fill-gold text-gold" /> <span className="font-normal text-charcoal/50">| {p.reviews}</span>
        </div>
        {out && <div className="absolute inset-0 grid place-items-center bg-white/60 text-sm font-semibold tracking-widest text-charcoal">SOLD OUT</div>}
      </div>
      <div className="flex flex-1 flex-col p-3 md:p-4">
        <Link href={`/products/${p.slug}`} className="line-clamp-1 text-[13px] font-semibold text-charcoal hover:text-burgundy md:text-sm">{p.name}</Link>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
          <span className="text-[15px] font-bold text-burgundy">{formatPrice(p.price)}</span>
          <span className="text-xs text-charcoal/45 line-through">{formatPrice(p.mrp)}</span>
          <span className="text-xs font-semibold text-gold-dark">{discountPct(p)}% off</span>
        </div>
        <button disabled={out} onClick={() => add(p.id)} className="btn-outline mt-3 w-full !py-2.5 disabled:cursor-not-allowed disabled:opacity-40"><ShoppingBag size={14} /> Add to Cart</button>
      </div>
    </div>
  );
}
