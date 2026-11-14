'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { wishlist, count, openCart, openDrawer } = useStore();

  // Hide on checkout page or product page so it doesn't interfere with payment or sticky buy bar
  if (pathname === '/checkout' || pathname?.startsWith('/products/')) return null;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-gold/25 bg-[#FAF6F0]/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)' }}
    >
      <div className="grid grid-cols-5 h-14 items-center px-1 text-center">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center h-full py-1 transition-colors ${
            pathname === '/' ? 'text-burgundy' : 'text-charcoal/65 hover:text-burgundy'
          }`}
        >
          <Home size={19} strokeWidth={pathname === '/' ? 2.2 : 1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
        </Link>

        {/* 2. Categories Drawer */}
        <button
          onClick={openDrawer}
          type="button"
          className="flex flex-col items-center justify-center h-full py-1 text-charcoal/65 hover:text-burgundy transition-colors"
        >
          <Layers size={19} strokeWidth={1.7} />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Categories</span>
        </button>

        {/* 3. Offers / BOGO (Center Highlight) */}
        <Link
          href="/collections/offers"
          className="flex flex-col items-center justify-center h-full py-1 relative group"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-burgundy px-2.5 py-1 text-[10px] font-bold text-white shadow-sm transition group-hover:scale-105">
              <Sparkles size={11} className="text-gold-light" />
              Offers
            </span>
          </div>
        </Link>

        {/* 4. Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center h-full py-1 relative transition-colors ${
            pathname === '/wishlist' ? 'text-burgundy' : 'text-charcoal/65 hover:text-burgundy'
          }`}
        >
          <div className="relative">
            <Heart size={19} strokeWidth={pathname === '/wishlist' ? 2.2 : 1.7} className={pathname === '/wishlist' ? 'fill-burgundy' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-gold px-1 text-[9px] font-bold text-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Wishlist</span>
        </Link>

        {/* 5. Bag */}
        <button
          onClick={openCart}
          type="button"
          className="flex flex-col items-center justify-center h-full py-1 relative text-charcoal/65 hover:text-burgundy transition-colors"
        >
          <div className="relative">
            <ShoppingBag size={19} strokeWidth={1.7} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-burgundy px-1 text-[9px] font-bold text-white shadow-sm">
                {count}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Bag</span>
        </button>
      </div>
    </nav>
  );
}
