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
      className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] sm:h-[18px] sm:min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[9px] sm:text-[10px] font-bold text-white shadow-sm"
    >
      {n}
    </motion.span>
  );
}

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

  return (
    <>
      <header className="border-b border-gold/25 bg-[#FAF6F0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[58px] sm:h-[68px] md:h-[76px] items-center justify-between px-2.5 sm:px-6 md:px-8 max-w-[1600px]">
          {/* Left: Hamburger Menu Button + Categories Label (Symmetric width to right) */}
          <div className="flex items-center justify-start w-[96px] sm:w-[130px] md:w-[150px] shrink-0">
            <button
              onClick={openDrawer}
              aria-label="Open menu drawer"
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark"
            >
              <Menu size={20} strokeWidth={1.8} className="sm:hidden" />
              <Menu size={22} strokeWidth={1.8} className="hidden sm:block" />
            </button>
            <span
              onClick={openDrawer}
              className="hidden sm:inline-block ml-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal/80 hover:text-burgundy cursor-pointer select-none"
            >
              Categories
            </span>
          </div>

          {/* Center: Brand Logo (Naturally centered in flex layout, physically separated from buttons) */}
          <div className="flex-1 flex items-center justify-center min-w-0 px-1 overflow-hidden">
            <Logo size={32} align="center" />
          </div>

          {/* Right Side: Search, Account, Wishlist, Cart */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1.5 w-[96px] sm:w-[130px] md:w-[150px] shrink-0">
            {/* Search Button */}
            <button
              onClick={openSearch}
              aria-label="Search jewellery"
              className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark"
              title="Search jewellery"
            >
              <Search size={18} strokeWidth={1.8} className="sm:hidden" />
              <Search size={20} strokeWidth={1.8} className="hidden sm:block" />
            </button>

            {/* Account Icon with VIP Sparkle Badge */}
            <div className="relative" onMouseLeave={() => setAcct(false)}>
              <button
                className="relative grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark"
                aria-label="My Account"
                onClick={() => setAcct(!acct)}
              >
                <User size={18} strokeWidth={1.8} className="sm:hidden" />
                <User size={20} strokeWidth={1.8} className="hidden sm:block" />
                <span className="absolute -bottom-0.5 -right-0.5 text-gold-dark">
                  <Sparkles size={10} className="fill-gold text-gold" />
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

            {/* Wishlist Link (Hidden on mobile header, available in bottom nav / drawer) */}
            <Link
              href="/wishlist"
              className="relative hidden sm:grid h-9 w-9 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart size={20} strokeWidth={1.8} />
              <Count n={wishlist.length} />
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="relative grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full text-burgundy transition hover:bg-gold/10 hover:text-gold-dark"
              title="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.8} className="sm:hidden" />
              <ShoppingBag size={20} strokeWidth={1.8} className="hidden sm:block" />
              <Count n={count} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation & Account Drawer */}
      <NavDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
