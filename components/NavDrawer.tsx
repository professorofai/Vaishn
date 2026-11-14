'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  User,
  Layers,
  ChevronDown,
  ChevronRight,
  PenLine,
  Package,
  Wallet,
  Mail,
  Search,
  Heart,
  ShoppingBag,
  ArrowLeft,
  Check,
  LogOut,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductArt from './ProductArt';
import type { Category, Style, Tone } from '@/lib/data';

interface CategoryItem {
  name: string;
  href: string;
  art: [Category, Style, Tone];
  image?: string;
}

const categoriesList: CategoryItem[] = [
  { name: 'Earrings', href: '/collections/earrings', art: ['earrings', 'kundan', 'gold'], image: '/Earrings.jpg' },
  { name: 'Necklaces & Chains', href: '/collections/necklaces', art: ['necklaces', 'pearl', 'gold'], image: '/Necklace.jpg' },
  { name: 'Rings', href: '/collections/rings', art: ['rings', 'american-diamond', 'silver'], image: '/ring.jpg' },
  { name: 'Bangles & Kadas', href: '/collections/bangles', art: ['bangles', 'kundan', 'gold'], image: '/bracelet.jpg' },
  { name: 'Bracelets', href: '/collections/bracelets', art: ['bracelets', 'pearl', 'gold'], image: '/bracelet.jpg' },
  { name: 'Jewellery Sets', href: '/collections/jewellery-sets', art: ['sets', 'traditional', 'gold'], image: '/background image.jpg' },
  { name: 'Mangalsutra', href: '/collections/mangalsutra', art: ['mangalsutra', 'traditional', 'gold'], image: '/Necklace.jpg' },
  { name: 'All Jewellery', href: '/collections/all-jewellery', art: ['necklaces', 'kundan', 'gold'], image: '/background image.jpg' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveView = 'main' | 'auth' | 'orders' | 'wallet';

export default function NavDrawer({ isOpen, onClose }: Props) {
  const {
    wishlist,
    count,
    openCart,
    openSearch,
    user,
    login,
    logout,
    updateProfile,
    walletBalance,
    redeemVoucher,
    orders,
  } = useStore();

  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('main');

  // Auth form state
  const [nameInput, setNameInput] = useState('');
  const [contactInput, setContactInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [authStep, setAuthStep] = useState<'input' | 'otp'>('input');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Edit profile state
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editSaved, setEditSaved] = useState(false);

  // Order tracking input
  const [orderQuery, setOrderQuery] = useState('');
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  // Wallet voucher
  const [voucher, setVoucher] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const resetView = () => {
    setActiveView('main');
    setAuthStep('input');
    setAuthSuccess(false);
    setSearchStatus(null);
    setVoucherMsg(null);
  };

  const handleClose = () => {
    resetView();
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;
    setAuthStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: nameInput.trim() || 'Aryan Pandey',
      phone: contactInput.trim() || '+91 98765 43210',
      email: contactInput.includes('@') ? contactInput.trim() : undefined,
    });
    setAuthSuccess(true);
    setTimeout(() => {
      setActiveView('main');
      setAuthStep('input');
      setAuthSuccess(false);
    }, 1200);
  };

  const handleQuickLogin = () => {
    login({
      name: 'Aryan Pandey',
      phone: '+91 98765 43210',
      email: 'aryan@vaishn.in',
    });
    setActiveView('main');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || user?.name,
      email: editEmail.trim() || user?.email,
    });
    setEditSaved(true);
    setTimeout(() => setEditSaved(false), 2000);
  };

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucher.trim()) return;
    const res = redeemVoucher(voucher);
    setVoucherMsg({ ok: res.ok, text: res.msg });
    if (res.ok) setVoucher('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Left Drawer */}
          <motion.aside
            role="dialog"
            aria-label="Navigation drawer"
            className="absolute inset-y-0 left-0 flex h-dvh w-full max-w-[380px] flex-col bg-[#FAF6F0] shadow-2xl sm:max-w-[410px]"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          >
            {/* 1. Top Bar */}
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gold/20 bg-[#F6EFE5] px-5">
              {activeView === 'main' ? (
                <Link
                  href="/"
                  onClick={handleClose}
                  className="flex items-center gap-2.5"
                  aria-label="VAISHN home"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.jpg"
                    alt="VAISHN"
                    width={34}
                    height={34}
                    style={{ mixBlendMode: 'multiply' }}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="font-display text-[22px] font-semibold tracking-[0.24em] text-burgundy">
                    VAISHN
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => setActiveView('main')}
                  className="flex items-center gap-2 text-sm font-semibold text-burgundy"
                >
                  <ArrowLeft size={18} /> Back
                </button>
              )}

              <button
                onClick={handleClose}
                aria-label="Close drawer"
                className="grid h-9 w-9 place-items-center rounded-full border border-charcoal/15 bg-white text-charcoal/70 shadow-sm transition hover:bg-ivory hover:text-burgundy"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* 2. Body Views */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {activeView === 'main' && (
                <div className="space-y-3.5">
                  {/* Profile Card */}
                  <div
                    onClick={() => setActiveView('auth')}
                    className="flex cursor-pointer items-center gap-3.5 rounded-2xl border border-gold/25 bg-white p-3.5 shadow-sm transition hover:border-burgundy/40"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-[#FAF6F0] text-gold-dark font-display font-semibold text-base">
                      {user ? user.name.slice(0, 1).toUpperCase() : <User size={22} strokeWidth={1.8} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-charcoal">
                        {user ? user.name : 'Guest Customer'}
                      </p>
                      <p className="text-xs text-charcoal/60 truncate">
                        {user ? user.phone : 'Welcome to VAISHN · Tap to sign in'}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-charcoal/40" />
                  </div>

                  {/* Collections Card: Accordion with 8 Categories */}
                  <div className="rounded-2xl border border-gold/25 bg-white shadow-sm transition">
                    <button
                      onClick={() => setCollectionsOpen(!collectionsOpen)}
                      aria-expanded={collectionsOpen}
                      className="flex w-full items-center justify-between p-3.5 text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Layers size={18} className="text-gold-dark shrink-0" />
                        <span className="font-display text-sm font-semibold tracking-wider text-charcoal uppercase">
                          COLLECTIONS
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#F4ECE1] px-2.5 py-0.5 text-[11px] font-semibold text-gold-dark">
                          8 Categories
                        </span>
                        <ChevronDown
                          size={17}
                          className={`text-charcoal/60 transition-transform duration-200 ${
                            collectionsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {collectionsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-gold/15 bg-[#FAF6F0]/60 px-3 py-2.5"
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {categoriesList.map((c) => (
                              <Link
                                key={c.name}
                                href={c.href}
                                onClick={handleClose}
                                className="group flex items-center gap-2 rounded-xl border border-gold/15 bg-white p-2 transition hover:border-burgundy hover:shadow-sm"
                              >
                                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-ivory-deep">
                                  {c.image ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={c.image}
                                      alt={c.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <ProductArt
                                      category={c.art[0]}
                                      style={c.art[1]}
                                      tone={c.art[2]}
                                      bare
                                      className="h-full w-full"
                                    />
                                  )}
                                </div>
                                <span className="line-clamp-1 text-[11px] font-medium text-charcoal group-hover:text-burgundy">
                                  {c.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Menu List */}
                  <div className="rounded-2xl border border-gold/25 bg-white p-2 shadow-sm divide-y divide-gold/15">
                    {/* 1. View & Edit Profile */}
                    <button
                      onClick={() => setActiveView('auth')}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <PenLine size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          View & Edit Profile
                        </span>
                      </div>
                      <span className="text-xs text-charcoal/50">
                        {user ? 'Manage' : 'Sign In'}
                      </span>
                    </button>

                    {/* 2. My Orders */}
                    <button
                      onClick={() => setActiveView('orders')}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <Package size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          My Orders
                        </span>
                      </div>
                      <span className="text-xs text-charcoal/50">
                        {orders.length} placed
                      </span>
                    </button>

                    {/* 3. My Wallet */}
                    <button
                      onClick={() => setActiveView('wallet')}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <Wallet size={18} strokeWidth={1.8} />
                        <div className="text-left">
                          <p className="text-[13px] font-medium text-charcoal leading-tight">
                            My Wallet
                          </p>
                          <p className="text-[11px] text-charcoal/50">
                            Returns & Store Credit
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-[#F4ECE1] px-2.5 py-0.5 text-xs font-semibold text-charcoal">
                          ₹{walletBalance}
                        </span>
                        <ChevronRight size={16} className="text-charcoal/40" />
                      </div>
                    </button>

                    {/* 4. Contact Us */}
                    <Link
                      href="/contact"
                      onClick={handleClose}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <Mail size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          Contact Us
                        </span>
                      </div>
                      <span className="text-xs text-charcoal/70">
                        Help Desk
                      </span>
                    </Link>

                    {/* 5. Search Jewellery */}
                    <button
                      onClick={() => {
                        handleClose();
                        openSearch();
                      }}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <Search size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          Search Jewellery
                        </span>
                      </div>
                      <span className="text-xs text-charcoal/50">Explore</span>
                    </button>

                    {/* 6. My Wishlist */}
                    <Link
                      href="/wishlist"
                      onClick={handleClose}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <Heart size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          My Wishlist
                        </span>
                      </div>
                      {wishlist.length > 0 && (
                        <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-bold text-gold-dark">
                          {wishlist.length} saved
                        </span>
                      )}
                    </Link>

                    {/* 7. My Shopping Bag */}
                    <button
                      onClick={() => {
                        handleClose();
                        openCart();
                      }}
                      className="flex w-full items-center justify-between px-3 py-3 text-left transition hover:bg-[#FAF6F0]/60 rounded-xl"
                    >
                      <div className="flex items-center gap-3 text-[#8F6F38]">
                        <ShoppingBag size={18} strokeWidth={1.8} />
                        <span className="text-[13px] font-medium text-charcoal">
                          My Shopping Bag
                        </span>
                      </div>
                      {count > 0 && (
                        <span className="rounded-full bg-burgundy px-2 py-0.5 text-xs font-bold text-white">
                          {count} items
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Auth Action Button */}
                  <div className="pt-1">
                    {user ? (
                      <button
                        onClick={logout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-charcoal/20 bg-white py-3 text-xs font-semibold text-charcoal shadow-sm transition hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      >
                        <LogOut size={15} />
                        <span>Sign Out ({user.name})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveView('auth')}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1615] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-burgundy"
                      >
                        <User size={16} />
                        <span>Sign In / Register</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* View: Auth / Profile */}
              {activeView === 'auth' && (
                <div className="rounded-2xl border border-gold/25 bg-white p-5 shadow-sm space-y-4">
                  {user ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-display text-2xl font-semibold text-burgundy">
                          My Profile
                        </p>
                        <button
                          onClick={logout}
                          className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <LogOut size={13} /> Sign Out
                        </button>
                      </div>

                      {editSaved && (
                        <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200 flex items-center gap-2">
                          <Check size={14} /> Profile details saved!
                        </div>
                      )}

                      <form onSubmit={handleSaveProfile} className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-charcoal/70">Full Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="mt-1 w-full border border-gold/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-burgundy"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-charcoal/70">Mobile Number</label>
                          <input
                            type="text"
                            disabled
                            value={user.phone}
                            className="mt-1 w-full border border-gold/20 bg-gray-50 rounded-lg px-3 py-2 text-sm text-charcoal/60 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-charcoal/70">Email Address</label>
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="mt-1 w-full border border-gold/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-burgundy"
                          />
                        </div>

                        <button type="submit" className="btn-burgundy w-full !py-2.5 text-xs font-semibold mt-2">
                          Update Profile
                        </button>
                      </form>
                    </div>
                  ) : authSuccess ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check size={24} />
                      </div>
                      <p className="text-base font-semibold text-charcoal">
                        Signed in successfully!
                      </p>
                      <p className="text-xs text-charcoal/60">
                        Welcome to VAISHN
                      </p>
                    </div>
                  ) : authStep === 'otp' ? (
                    <form onSubmit={handleVerifyOtp} className="space-y-3 pt-2">
                      <div className="text-center">
                        <p className="font-display text-2xl font-semibold text-burgundy">
                          Verify OTP
                        </p>
                        <p className="mt-1 text-xs text-charcoal/60">
                          Enter 4-digit code sent to {contactInput}
                        </p>
                      </div>

                      <div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          placeholder="e.g. 1234"
                          autoFocus
                          className="mt-2 w-full text-center tracking-widest text-lg font-mono border border-gold/40 rounded-lg py-2.5 outline-none focus:border-burgundy"
                        />
                      </div>

                      <button type="submit" className="btn-burgundy w-full !py-3 text-xs font-semibold">
                        Verify & Sign In
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuthStep('input')}
                        className="w-full text-center text-xs text-charcoal/60 hover:underline pt-1"
                      >
                        Change number / email
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="font-display text-2xl font-semibold text-burgundy">
                          Sign In / Register
                        </p>
                        <p className="mt-1 text-xs text-charcoal/60">
                          Access orders, track deliveries, and manage your wishlist.
                        </p>
                      </div>

                      {/* Demo One-Click Login for immediate preview */}
                      <button
                        type="button"
                        onClick={handleQuickLogin}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gold/15 border border-gold/40 py-2.5 text-xs font-semibold text-gold-dark hover:bg-gold/25 transition"
                      >
                        <Sparkles size={14} className="text-gold" />
                        1-Click Demo Login (as Aryan Pandey)
                      </button>

                      <div className="relative text-center my-2">
                        <span className="bg-white px-2 text-[10px] uppercase text-charcoal/40 font-semibold tracking-wider relative z-10">
                          Or sign in with phone
                        </span>
                        <div className="absolute inset-x-0 top-1/2 border-t border-gold/20" />
                      </div>

                      <form onSubmit={handleSendOtp} className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-charcoal/70">Your Name</label>
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="e.g. Aryan Pandey"
                            className="mt-1 w-full border border-gold/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-burgundy"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-charcoal/70">
                            Mobile Number or Email
                          </label>
                          <input
                            required
                            value={contactInput}
                            onChange={(e) => setContactInput(e.target.value)}
                            placeholder="e.g. 9876543210"
                            className="mt-1 w-full border border-gold/40 rounded-lg px-3 py-2 text-sm outline-none focus:border-burgundy"
                          />
                        </div>
                        <button type="submit" className="btn-burgundy w-full !py-3 text-xs font-semibold">
                          Continue with OTP
                        </button>
                        <p className="text-center text-[10px] text-charcoal/50 leading-relaxed">
                          By continuing, you agree to VAISHN Terms of Service & Privacy Policy.
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* View: Order Tracking & Placed Orders */}
              {activeView === 'orders' && (
                <div className="rounded-2xl border border-gold/25 bg-white p-5 shadow-sm space-y-4">
                  <div>
                    <p className="font-display text-2xl font-semibold text-burgundy">
                      My Orders
                    </p>
                    <p className="mt-1 text-xs text-charcoal/60">
                      Track status and order history.
                    </p>
                  </div>

                  {/* List of orders */}
                  {orders.length > 0 ? (
                    <div className="space-y-3">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="rounded-xl border border-gold/20 bg-[#FAF6F0]/60 p-3 text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-charcoal font-mono">{o.id}</span>
                            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                              {o.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-charcoal/60">Date: {o.date} · Total: <strong>₹{o.total}</strong></p>
                          <div className="flex items-center justify-between pt-1 border-t border-gold/15">
                            <span className="text-[10px] text-charcoal/50">AWB: {o.awb}</span>
                            <Link
                              href="/track"
                              onClick={handleClose}
                              className="text-[11px] font-semibold text-burgundy hover:underline inline-flex items-center gap-1"
                            >
                              Track Live <ExternalLink size={11} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-charcoal/60 text-center py-4">No orders placed yet.</p>
                  )}

                  {/* Search by AWB / Order ID */}
                  <div className="pt-2 border-t border-gold/15">
                    <p className="text-xs font-semibold text-charcoal/70 mb-2">Track Any Order</p>
                    <div className="flex gap-2">
                      <input
                        value={orderQuery}
                        onChange={(e) => setOrderQuery(e.target.value)}
                        placeholder="e.g. VSH-784920"
                        className="flex-1 border border-gold/40 rounded-lg px-3 py-2 text-xs uppercase outline-none focus:border-burgundy"
                      />
                      <Link
                        href="/track"
                        onClick={handleClose}
                        className="btn-burgundy !py-2 !px-3 text-xs font-semibold"
                      >
                        Track
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* View: Wallet */}
              {activeView === 'wallet' && (
                <div className="rounded-2xl border border-gold/25 bg-white p-5 shadow-sm space-y-4">
                  <div>
                    <p className="font-display text-2xl font-semibold text-burgundy">
                      My VAISHN Wallet
                    </p>
                    <p className="mt-1 text-xs text-charcoal/60">
                      Store credits and return refunds.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-[#FFFDF9] to-[#F6EFE5] p-5 text-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                      Available Balance
                    </span>
                    <p className="font-display text-4xl font-bold text-burgundy mt-1">
                      ₹{walletBalance.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-charcoal/50 mt-1">
                      Auto-applies at checkout on future purchases
                    </p>
                  </div>

                  <form onSubmit={handleRedeem} className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-charcoal/70">
                      Redeem Gift Card or Store Voucher
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                        placeholder="Try code: VAISHN500"
                        className="min-w-0 flex-1 border border-gold/40 rounded-lg px-3 py-2 text-xs uppercase outline-none focus:border-burgundy"
                      />
                      <button type="submit" className="btn-burgundy !py-2 !px-4 text-xs font-semibold">
                        Redeem
                      </button>
                    </div>

                    {voucherMsg && (
                      <p
                        className={`text-xs font-semibold mt-1.5 p-2 rounded-lg ${
                          voucherMsg.ok
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        {voucherMsg.text}
                      </p>
                    )}
                  </form>

                  <div className="rounded-xl border border-gold/15 bg-[#FAF6F0] p-3 text-[11px] text-charcoal/70 leading-relaxed">
                    <strong>Wallet Note:</strong> In accordance with our store policy, approved return items are credited directly to your VAISHN Wallet and never expire.
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Footer (with safe-area bottom for iOS home bar) */}
            <div
              className="border-t border-gold/20 bg-[#F6EFE5] px-4 py-3.5 text-center"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 14px)' }}
            >
              <p className="font-serif text-xs italic text-charcoal/80">
                Shine In Your Own Way
              </p>
              <p className="text-[11px] font-medium tracking-wider text-charcoal/60 mt-0.5">
                VAISHN Fashion Jewellery
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
