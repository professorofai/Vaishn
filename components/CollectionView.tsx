'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { categoryLabel, Product } from '@/lib/data';
import ProductCard from './ProductCard';

const PRICE: [string, number, number][] = [['Under ₹1,000', 0, 999], ['₹1,000 – ₹1,999', 1000, 1999], ['₹2,000 – ₹3,999', 2000, 3999], ['₹4,000 & above', 4000, Infinity]];
const SORTS = [['featured', 'Featured'], ['best', 'Best Selling'], ['newest', 'Newest'], ['low', 'Price: Low to High'], ['high', 'Price: High to Low']] as const;
type Sort = (typeof SORTS)[number][0];
interface F { price: number[]; category: string[]; material: string[]; colour: string[]; collection: string[]; avail: string[] }
const empty: F = { price: [], category: [], material: [], colour: [], collection: [], avail: [] };
const occLabel: Record<string, string> = { ethnic: 'Ethnic', western: 'Western', everyday: 'Everyday Wear' };

export default function CollectionView({ title, desc, products }: { title: string; desc: string; products: Product[] }) {
  const [f, setF] = useState<F>(empty); const [sort, setSort] = useState<Sort>('featured'); const [mobile, setMobile] = useState(false);
  const uniq = (fn: (p: Product) => string[]) => Array.from(new Set(products.flatMap(fn)));
  const groups: { key: keyof F; title: string; opts: [string | number, string][] }[] = [
    { key: 'price', title: 'Price', opts: PRICE.map((p, i) => [i, p[0]]) },
    { key: 'category', title: 'Category', opts: uniq((p) => [p.category]).map((c) => [c, categoryLabel[c as keyof typeof categoryLabel]]) },
    { key: 'material', title: 'Material', opts: uniq((p) => [p.material]).map((m) => [m, m]) },
    { key: 'colour', title: 'Colour', opts: uniq((p) => [p.colour]).map((c) => [c, c]) },
    { key: 'collection', title: 'Collection', opts: uniq((p) => p.occasion).map((o) => [o, occLabel[o]]) },
    { key: 'avail', title: 'Availability', opts: [['in', 'In stock'], ['out', 'Out of stock']] },
  ];
  const toggle = (k: keyof F, v: string | number) => setF((s) => { const cur = s[k] as (string | number)[]; return { ...s, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] } as F; });
  const shown = useMemo(() => {
    const r = products.filter((p) =>
      (!f.price.length || f.price.some((i) => p.price >= PRICE[i][1] && p.price <= PRICE[i][2])) &&
      (!f.category.length || f.category.includes(p.category)) && (!f.material.length || f.material.includes(p.material)) &&
      (!f.colour.length || f.colour.includes(p.colour)) && (!f.collection.length || p.occasion.some((o) => f.collection.includes(o))) &&
      (!f.avail.length || f.avail.includes(p.stock > 0 ? 'in' : 'out')));
    const s = [...r];
    if (sort === 'best') s.sort((a, b) => b.reviews - a.reviews); else if (sort === 'newest') s.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    else if (sort === 'low') s.sort((a, b) => a.price - b.price); else if (sort === 'high') s.sort((a, b) => b.price - a.price);
    return s;
  }, [products, f, sort]);
  const active = groups.flatMap((g) => (f[g.key] as (string | number)[]).map((v) => ({ key: g.key, v, label: g.opts.find((o) => o[0] === v)?.[1] ?? String(v) })));

  const panel = (
    <div>
      {groups.map((g, gi) => (
        <details key={g.key} open={gi < 3} className="group border-b border-gold/25 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl font-semibold text-burgundy">{g.title}<ChevronDown size={16} className="transition group-open:rotate-180" /></summary>
          <ul className="mt-3 space-y-2.5">
            {g.opts.map(([v, l]) => (<li key={String(v)}><label className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={(f[g.key] as (string | number)[]).includes(v)} onChange={() => toggle(g.key, v)} className="h-4 w-4 accent-[#5A2536]" />{l}</label></li>))}
          </ul>
        </details>))}
    </div>
  );
  return (
    <div className="container-x py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="mb-5 text-xs text-charcoal/60"><Link href="/" className="hover:text-burgundy">Home</Link> <span className="mx-1.5">/</span> <Link href="/collections/all-jewellery" className="hover:text-burgundy">Collections</Link> <span className="mx-1.5">/</span> <span className="font-semibold text-charcoal">{title}</span></nav>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 max-w-2xl"><h1 className="font-display text-5xl font-semibold text-burgundy md:text-6xl">{title}</h1><p className="mt-3 text-charcoal/70">{desc}</p></motion.div>
      <div className="sticky top-[68px] z-20 -mx-4 mb-6 flex items-center justify-between border-y border-gold/25 bg-ivory/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:px-0">
        <p className="text-sm text-charcoal/70"><span className="font-bold text-charcoal">{shown.length}</span> {shown.length === 1 ? 'product' : 'products'}</p>
        <div className="flex items-center gap-3">
          <button onClick={() => setMobile(true)} className="flex items-center gap-2 border border-burgundy px-4 py-2 text-sm font-semibold text-burgundy lg:hidden"><SlidersHorizontal size={15} /> Filters{active.length > 0 && ` (${active.length})`}</button>
          <label className="flex items-center gap-2 text-sm"><span className="hidden text-charcoal/60 sm:inline">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-gold/50 bg-white px-3 py-2 text-sm outline-none focus:border-burgundy">{SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        </div>
      </div>
      {active.length > 0 && (<div className="mb-6 flex flex-wrap items-center gap-2">
        {active.map((a) => (<button key={`${a.key}${a.v}`} onClick={() => toggle(a.key, a.v)} className="flex items-center gap-1.5 bg-burgundy px-3 py-1.5 text-xs font-semibold text-white">{a.label}<X size={12} /></button>))}
        <button onClick={() => setF(empty)} className="text-xs font-semibold text-burgundy underline underline-offset-4">Clear all</button></div>)}
      <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block"><p className="border-b border-gold/25 pb-3 text-sm font-bold">Filters</p>{panel}</aside>
        <div>
          {shown.length === 0 ? (
            <div className="py-20 text-center"><p className="font-display text-3xl text-burgundy">No pieces match these filters</p><button onClick={() => setF(empty)} className="btn-burgundy mt-6">Clear filters</button></div>
          ) : (
            <motion.div key={sort + JSON.stringify(f)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {shown.map((p) => <ProductCard key={p.id} product={p} />)}
            </motion.div>)}
        </div>
      </div>
      <AnimatePresence>{mobile && (<>
        <motion.div className="fixed inset-0 z-50 bg-charcoal/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} />
        <motion.div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col bg-ivory" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.3 }}>
          <div className="flex items-center justify-between border-b border-gold/30 px-5 py-4"><p className="font-display text-2xl text-burgundy">Filters</p><button onClick={() => setMobile(false)} aria-label="Close filters"><X size={22} /></button></div>
          <div className="flex-1 overflow-y-auto px-5">{panel}</div>
          <div className="flex gap-3 border-t border-gold/30 p-4"><button onClick={() => setF(empty)} className="btn-outline flex-1">Clear</button><button onClick={() => setMobile(false)} className="btn-burgundy flex-1">Show {shown.length} items</button></div>
        </motion.div></>)}</AnimatePresence>
    </div>
  );
}
