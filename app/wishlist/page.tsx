'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { byId, Product } from '@/lib/data';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useStore(); const items = wishlist.map(byId).filter(Boolean) as Product[];
  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-5xl font-semibold text-burgundy md:text-6xl">Wishlist</h1>
      {items.length === 0 ? (
        <div className="grid place-items-center gap-4 py-24 text-center"><Heart size={48} className="text-gold" strokeWidth={1.2} /><p className="font-display text-3xl text-burgundy">Nothing saved yet</p><p className="text-sm text-charcoal/60">Tap the heart on any piece to save it here.</p><Link href="/collections/all-jewellery" className="btn-burgundy">Explore jewellery</Link></div>
      ) : (<div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>)}
    </div>
  );
}
