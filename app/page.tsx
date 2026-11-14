import Link from 'next/link';
import Hero from '@/components/Hero';
import { Benefits, CategoryGrid, StyleStrip, PromoBanners, ShopTheLook, SectionHead } from '@/components/Sections';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { products } from '@/lib/data';

export default function Home() {
  const best = products.filter((p) => p.bestseller);
  const fresh = products.filter((p) => p.isNew).slice(0, 8);
  return (
    <>
      <Hero /><Benefits /><CategoryGrid /><StyleStrip />
      <section className="container-x pt-16 md:pt-24"><SectionHead title="Best Sellers" sub="Loved by thousands — our most-gifted pieces." href="/collections/best-sellers" /><ProductCarousel items={best} /></section>
      <PromoBanners />
      <section className="container-x pt-16 md:pt-24">
        <SectionHead title="New Arrivals" sub="Just landed from the atelier." href="/collections/new-arrivals" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">{fresh.map((p, i) => (<Reveal key={p.id} delay={(i % 4) * 0.08}><ProductCard product={p} /></Reveal>))}</div>
        <div className="mt-10 text-center"><Link href="/collections/all-jewellery" className="btn-outline !px-10">Explore All Jewellery</Link></div>
      </section>
      <ShopTheLook />
    </>
  );
}
