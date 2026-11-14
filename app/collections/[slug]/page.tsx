import { notFound } from 'next/navigation';
import CollectionView from '@/components/CollectionView';
import { collections, products } from '@/lib/data';

export function generateStaticParams() { return Object.keys(collections).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) { const c = collections[params.slug]; return { title: c ? `${c.title} — VAISHN` : 'VAISHN' }; }
export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = collections[params.slug]; if (!c) notFound();
  return <CollectionView title={c.title} desc={c.desc} products={products.filter(c.filter)} />;
}
