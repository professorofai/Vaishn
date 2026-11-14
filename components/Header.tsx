'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, User, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import Logo from './Logo';
import NavDrawer from './NavDrawer';

function Count({ n }: { n: number }) {
  if (!n) return null;
  return (
    <motion.span
      key={n}
      initial={{ scale: 1.8 }}
      animate={{ scale: 1 }}
      className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-white shadow-sm"
    >
      {n}
    </motion.span>
  );
}

const navCategories = [
  { name: 'New In', href: '/collections/new-arrivals' },
  { name: 'Earrings', href: '/collections/earrings' },
  { name: 'Necklaces', href: '/collections/necklaces' },
  { name: 'Rings', href: '/collections/rings' },
  { name: 'Bracelets', href: '/collections/bracelets' },
  { name: 'Sets', href: '/collections/jewellery-sets' },
  { name: 'Festive', href: '/collections/festive' },
  { name: 'Offers', href: '/collections/offers', highlight: true },
];

export default function Header() {
  const {
    count,
    wishlist,
    openCart,
    openSearch,
    user,
    logout,
    walletBalance,
    drawerOpen,
    openDrawer,
    closeDrawer,
  } = useStore();
  const [acct, setAcct] = useState(false);

  const iconBtn =
    'relative grid h-10 w-10 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark';

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold/25 bg-[#FAF6F0]/95 backdrop-blur-md shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="container-x flex h-[72px] sm:h-[76px] items-center justify-between lg:h-[84px] gap-4">
          {/* Left: Mobile Hamburger OR Desktop Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={openDrawer}
              aria-label="Open menu drawer"
              className="grid h-10 w-10 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 lg:hidden"
            >
              <Menu size={24} strokeWidth={1.8} />
            </button>

            {/* Desktop Brand Logo */}
            <div className="hidden lg:block shrink-0">
              <Logo size={38} align="left" />
            </div>
          </div>

          {/* Mobile Centered Brand Logo */}
          <div className="lg:hidden flex items-center justify-center">
            <Logo size={34} align="center" className="scale-95 sm:scale-100" />
          </div>

          {/* Center: Desktop Horizontal Category Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navCategories.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[12px] xl:text-[13px] font-medium tracking-[0.12em] uppercase transition-colors relative py-1.5 ${
                  item.highlight
                    ? 'text-burgundy font-semibold hover:text-gold-dark'
                    : 'text-charcoal/80 hover:text-burgundy'
                }`}
              >
                {item.name}
                {item.highlight && (
                  <span className="ml-1.5 inline-block rounded-full bg-gold/25 px-1.5 py-0.5 text-[9px] font-bold text-burgundy tracking-normal">
                    SALE
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side: Desktop Categories Button, Search, Wishlist, Account, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Desktop "All Categories" Drawer Button */}
            <button
              onClick={openDrawer}
              className="hidden 2xl:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal hover:bg-gold/10 hover:text-burgundy transition shadow-sm mr-1"
            >
              <Menu size={14} /> Categories
            </button>

            {/* Search Button */}
            <button
              onClick={openSearch}
              aria-label="Search jewellery"
              className={iconBtn}
              title="Search jewellery"
            >
              <Search size={21} strokeWidth={1.8} />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className={`${iconBtn} hidden sm:grid`}
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart size={21} strokeWidth={1.8} />
              <Count n={wishlist.length} />
            </Link>

            {/* Account Icon with VIP Sparkle Badge */}
            <div
              className="relative"
              onMouseLeave={() => setAcct(false)}
            >
              <button
                className={iconBtn}
                aria-label="My Account"
                onClick={() => setAcct(!acct)}
              >
                <User size={21} strokeWidth={1.8} />
                <span className="absolute -bottom-0.5 -right-0.5 text-gold-dark">
                  <Sparkles size={11} className="fill-gold text-gold" />
                </span>
              </button>

              <AnimatePresence>
                {acct && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 w-64 rounded-2xl border border-gold/30 bg-white p-4 shadow-xl"
                  >
                    {user ? (
                      <div>
                        <div className="border-b border-gold/15 pb-3">
                          <p className="font-display text-lg font-semibold text-burgundy">
                            {user.name}
                          </p>
                          <p className="text-xs text-charcoal/60 truncate">{user.phone}</p>
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FAF6F0] border border-gold/25 px-2.5 py-0.5 text-xs text-charcoal">
                            <span className="font-medium text-gold-dark">Wallet:</span> ₹{walletBalance}
                          </div>
                        </div>

                        <div className="py-2 space-y-1">
                          <button
                            onClick={() => {
                              setAcct(false);
                              openDrawer();
                            }}
                            className="w-full text-left px-2 py-1.5 text-xs font-medium text-charcoal hover:bg-[#FAF6F0] rounded-lg transition"
                          >
                            View & Edit Profile
                          </button>
                          <button
                            onClick={() => {
                              setAcct(false);
                              openDrawer();
                            }}
                            className="w-full text-left px-2 py-1.5 text-xs font-medium text-charcoal hover:bg-[#FAF6F0] rounded-lg transition"
                          >
                            My Orders & Tracking
                          </button>
                        </div>

                        <div className="border-t border-gold/15 pt-2">
                          <button
                            onClick={() => {
                              logout();
                              setAcct(false);
                            }}
                            className="w-full text-left px-2 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-display text-xl font-semibold text-burgundy">
                          Welcome to VAISHN
                        </p>
                        <p className="mb-3.5 mt-1 text-xs text-charcoal/60">
                          Sign in to track orders, save wishlist pieces, and get member perks.
                        </p>
                        <button
                          onClick={() => {
                            setAcct(false);
                            openDrawer();
                          }}
                          className="btn-burgundy mb-2 w-full !py-2.5 text-xs"
                        >
                          Sign In / Register
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart Button */}
            <button
              className={iconBtn}
              onClick={openCart}
              aria-label="Shopping bag"
              title="Shopping bag"
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
              <Count n={count} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Left Drawer */}
      <NavDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
