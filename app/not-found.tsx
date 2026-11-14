import Link from 'next/link';
export default function NotFound() {
  return (<div className="container-x grid place-items-center gap-4 py-28 text-center"><p className="font-display text-6xl text-burgundy">Page not found</p><p className="text-charcoal/60">The piece or page you are looking for has moved.</p><Link href="/" className="btn-burgundy">Back to home</Link></div>);
}
