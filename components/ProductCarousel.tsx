'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/lib/data';
import ProductCard from './ProductCard';
export default function ProductCarousel({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: 'smooth' });
  return (
    <div className="group/c relative">
      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:gap-5 md:px-0">
        {items.map((p) => (<div key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-[31%] lg:w-[23.7%]"><ProductCard product={p} /></div>))}
      </div>
      <button onClick={() => go(-1)} aria-label="Previous" className="absolute -left-4 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-white text-burgundy shadow-lg transition hover:bg-burgundy hover:text-white md:grid"><ChevronLeft size={20} /></button>
      <button onClick={() => go(1)} aria-label="Next" className="absolute -right-4 top-[38%] hidden h-11 w-11 place-items-center rounded-full bg-white text-burgundy shadow-lg transition hover:bg-burgundy hover:text-white md:grid"><ChevronRight size={20} /></button>
    </div>
  );
}
