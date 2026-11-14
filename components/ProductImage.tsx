import ProductArt from './ProductArt';
import type { Product, Tone } from '@/lib/data';
export default function ProductImage({ product, view = 0, tone, bare, className = '' }: { product: Product; view?: number; tone?: Tone; bare?: boolean; className?: string }) {
  const src = product.images?.[view] ?? product.images?.[0];
  if (src) return /* eslint-disable-next-line @next/next/no-img-element */ <img src={src} alt={product.name} className={`h-full w-full object-cover ${className}`} loading="lazy" />;
  return <ProductArt category={product.category} style={product.style} tone={tone ?? product.tone} view={view} bare={bare} className={className} />;
}
