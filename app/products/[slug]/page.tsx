import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import { products } from '@/lib/data';

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) { const p = products.find((x) => x.slug === params.slug); return { title: p ? `${p.name} — VAISHN` : 'VAISHN' }; }
export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = products.find((x) => x.slug === params.slug); if (!p) notFound();
  const related = products.filter((x) => x.id !== p.id && (x.category === p.category || x.style === p.style)).slice(0, 8);
  return <ProductView key={p.id} product={p} related={related} />;
}
