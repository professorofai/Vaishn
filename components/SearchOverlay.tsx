'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { categoryLabel, formatPrice, products, styleLabel } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductImage from './ProductImage';

const trending = ['Kundan', 'Pearl', 'Earrings', 'Mangalsutra', 'Diamond', 'Oxidised'];
export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore(); const [q, setQ] = useState(''); const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (searchOpen) setTimeout(() => ref.current?.focus(), 150); else setQ(''); }, [searchOpen]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && closeSearch(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [closeSearch]);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase().split(/\s+/).filter(Boolean); if (!t.length) return [];
    return products.filter((p) => { const hay = `${p.name} ${categoryLabel[p.category]} ${styleLabel[p.style]} ${p.material} ${p.colour} ${p.occasion.join(' ')}`.toLowerCase(); return t.every((w) => hay.includes(w) || hay.includes(w.replace(/s$/, ''))); }).slice(0, 8);
  }, [q]);
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={closeSearch} />
          <motion.div initial={{ y: -40 }} animate={{ y: 0 }} exit={{ y: -40 }} transition={{ type: 'spring', damping: 28, stiffness: 260 }} className="relative max-h-[88dvh] overflow-y-auto bg-ivory shadow-2xl">
            <div className="container-x py-5 md:py-7">
              <div className="flex items-center gap-3 border-b-2 border-burgundy pb-3">
                <Search className="text-burgundy" size={22} />
                <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for earrings, kundan, mangalsutra…" className="w-full bg-transparent font-display text-xl text-charcoal outline-none placeholder:text-charcoal/40 md:text-3xl" />
                <button onClick={closeSearch} aria-label="Close search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-burgundy/10"><X size={22} /></button>
              </div>
              {!q.trim() ? (
                <div className="py-8"><p className="mb-3 text-sm font-semibold text-burgundy">Popular searches</p>
                  <div className="flex flex-wrap gap-2">{trending.map((t) => (<button key={t} onClick={() => setQ(t)} className="border border-gold/50 px-4 py-2 text-sm transition hover:bg-burgundy hover:text-white">{t}</button>))}</div></div>
              ) : results.length === 0 ? (
                <p className="py-12 text-center text-charcoal/60">No matches for “{q}”. Try a category such as earrings or a style such as pearl.</p>
              ) : (
                <ul className="grid gap-3 py-6 md:grid-cols-2 lg:grid-cols-4">
                  {results.map((p, i) => (
                    <motion.li key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link href={`/products/${p.slug}`} onClick={closeSearch} className="flex items-center gap-3 bg-white p-2 transition hover:shadow-md">
                        <div className="h-20 w-16 shrink-0 overflow-hidden"><ProductImage product={p} /></div>
                        <div className="min-w-0"><p className="truncate text-sm font-semibold">{p.name}</p><p className="text-xs text-charcoal/55">{categoryLabel[p.category]}</p><p className="mt-1 text-sm font-bold text-burgundy">{formatPrice(p.price)}</p></div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
