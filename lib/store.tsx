'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { byId, Product, Tone } from './data';

export interface CartItem { id: string; variant: Tone; qty: number }

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  pincode?: string;
}

export interface PlacedOrder {
  id: string;
  date: string;
  items: Line[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: string;
  awb: string;
  carrier: string;
  address: string;
  paymentMethod: string;
}

export const COUPONS: Record<string, { label: string; pct?: number; flat?: number }> = {
  VAISHN10: { label: '10% off', pct: 10 },
  WELCOME15: { label: '15% off', pct: 15 },
  FLAT200: { label: '₹200 off', flat: 200 },
};

export const VOUCHERS: Record<string, number> = {
  VAISHN500: 500,
  WELCOME250: 250,
  FESTIVE1000: 1000,
};

export const FREE_SHIP = 1499;
export const SHIP_FEE = 99;

export interface Line extends CartItem { product: Product }

interface Ctx {
  lines: Line[]; count: number; subtotal: number; mrpTotal: number; productSavings: number; couponDiscount: number; shipping: number; total: number;
  coupon: string | null; applyCoupon: (c: string) => boolean; removeCoupon: () => void;
  add: (id: string, variant?: Tone, qty?: number, open?: boolean) => void;
  remove: (id: string, variant: Tone) => void; setQty: (id: string, variant: Tone, qty: number) => void;
  clearCart: () => void;
  wishlist: string[]; toggleWish: (id: string) => void;
  recent: string[]; viewed: (id: string) => void;
  cartOpen: boolean; openCart: () => void; closeCart: () => void;
  searchOpen: boolean; openSearch: () => void; closeSearch: () => void;
  
  // User Profile & Authentication
  user: UserProfile | null;
  login: (userData: { name: string; phone: string; email?: string }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  // Wallet
  walletBalance: number;
  redeemVoucher: (code: string) => { ok: boolean; msg: string };

  // Orders
  orders: PlacedOrder[];
  placeOrder: (orderData: {
    address: string;
    city: string;
    pincode: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  }) => PlacedOrder;
}

const StoreCtx = createContext<Ctx | null>(null);
export const useStore = () => { const c = useContext(StoreCtx); if (!c) throw new Error('StoreProvider missing'); return c; };

const read = <T,>(k: string, d: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : d;
  } catch {
    return d;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setCart(read('vaishn-cart', []));
    setWishlist(read('vaishn-wishlist', []));
    setRecent(read('vaishn-recent', []));
    setCoupon(read('vaishn-coupon', null));
    setUser(read('vaishn-user', null));
    setWalletBalance(read('vaishn-wallet', 0));
    setOrders(read('vaishn-orders', [
      {
        id: 'VSH-784920',
        date: '13 Nov 2026',
        items: [
          { id: 'aarohi-kundan-jhumkas', variant: 'gold', qty: 1, product: byId('aarohi-kundan-jhumkas')! },
        ],
        subtotal: 1299,
        discount: 0,
        shipping: 99,
        total: 1398,
        status: 'In Transit',
        awb: 'SR948201847IN',
        carrier: 'Shiprocket Express (Bluedart)',
        address: 'B-42, Gomti Nagar, Lucknow, UP - 226010',
        paymentMethod: 'Cash on Delivery (COD)',
      },
    ]));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem('vaishn-cart', JSON.stringify(cart));
      localStorage.setItem('vaishn-wishlist', JSON.stringify(wishlist));
      localStorage.setItem('vaishn-recent', JSON.stringify(recent));
      localStorage.setItem('vaishn-coupon', JSON.stringify(coupon));
      localStorage.setItem('vaishn-user', JSON.stringify(user));
      localStorage.setItem('vaishn-wallet', JSON.stringify(walletBalance));
      localStorage.setItem('vaishn-orders', JSON.stringify(orders));
    } catch {}
  }, [cart, wishlist, recent, coupon, user, walletBalance, orders, ready]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen ? 'hidden' : '';
  }, [cartOpen, searchOpen]);

  const add = useCallback((id: string, variant?: Tone, qty = 1, open = true) => {
    const p = byId(id); if (!p) return; const v = variant ?? p.tone;
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id && x.variant === v);
      if (i >= 0) return c.map((x, j) => (j === i ? { ...x, qty: Math.min(x.qty + qty, 10) } : x));
      return [...c, { id, variant: v, qty }];
    });
    if (open) setCartOpen(true);
  }, []);

  const remove = useCallback((id: string, v: Tone) => setCart((c) => c.filter((x) => !(x.id === id && x.variant === v))), []);
  const setQty = useCallback((id: string, v: Tone, qty: number) =>
    setCart((c) => (qty < 1 ? c.filter((x) => !(x.id === id && x.variant === v)) : c.map((x) => (x.id === id && x.variant === v ? { ...x, qty: Math.min(qty, 10) } : x)))), []);
  const clearCart = useCallback(() => setCart([]), []);
  const toggleWish = useCallback((id: string) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])), []);
  const viewed = useCallback((id: string) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 10)), []);
  const applyCoupon = useCallback((c: string) => { const k = c.trim().toUpperCase(); if (COUPONS[k]) { setCoupon(k); return true; } return false; }, []);

  // Auth operations
  const login = useCallback((userData: { name: string; phone: string; email?: string }) => {
    setUser({
      name: userData.name || 'Aryan Pandey',
      phone: userData.phone,
      email: userData.email || 'aryan@vaishn.in',
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  }, []);

  // Wallet operations
  const redeemVoucher = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (VOUCHERS[clean]) {
      const amount = VOUCHERS[clean];
      setWalletBalance((prev) => prev + amount);
      return { ok: true, msg: `₹${amount} added to your VAISHN Wallet successfully!` };
    }
    return { ok: false, msg: 'Invalid or expired voucher code. Try VAISHN500.' };
  }, []);

  // Place order
  const placeOrder = useCallback((orderData: {
    address: string;
    city: string;
    pincode: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  }) => {
    const lines = cart.map((c) => ({ ...c, product: byId(c.id)! })).filter((l) => l.product);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const cp = coupon ? COUPONS[coupon] : null;
    const discount = cp ? Math.min(subtotal, cp.pct ? Math.round((subtotal * cp.pct) / 100) : cp.flat ?? 0) : 0;
    const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIP ? 0 : SHIP_FEE;
    const total = subtotal - discount + shipping;

    const newOrder: PlacedOrder = {
      id: `VSH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: lines,
      subtotal,
      discount,
      shipping,
      total,
      status: 'Order Confirmed',
      awb: `SR${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: 'Shiprocket Express (Bluedart Air)',
      address: `${orderData.address}, ${orderData.city} - ${orderData.pincode}`,
      paymentMethod: orderData.paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCoupon(null);
    return newOrder;
  }, [cart, coupon]);

  const value = useMemo<Ctx>(() => {
    const lines = cart.map((c) => ({ ...c, product: byId(c.id)! })).filter((l) => l.product);
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const mrpTotal = lines.reduce((s, l) => s + l.product.mrp * l.qty, 0);
    const cp = coupon ? COUPONS[coupon] : null;
    const couponDiscount = cp ? Math.min(subtotal, cp.pct ? Math.round((subtotal * cp.pct) / 100) : cp.flat ?? 0) : 0;
    const shipping = subtotal === 0 || subtotal - couponDiscount >= FREE_SHIP ? 0 : SHIP_FEE;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      mrpTotal,
      productSavings: mrpTotal - subtotal,
      couponDiscount,
      shipping,
      total: subtotal - couponDiscount + shipping,
      coupon,
      applyCoupon,
      removeCoupon: () => setCoupon(null),
      add,
      remove,
      setQty,
      clearCart,
      wishlist,
      toggleWish,
      recent,
      viewed,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      user,
      login,
      logout,
      updateProfile,
      walletBalance,
      redeemVoucher,
      orders,
      placeOrder,
    };
  }, [
    cart,
    coupon,
    wishlist,
    recent,
    cartOpen,
    searchOpen,
    user,
    walletBalance,
    orders,
    add,
    remove,
    setQty,
    clearCart,
    toggleWish,
    viewed,
    applyCoupon,
    login,
    logout,
    updateProfile,
    redeemVoucher,
    placeOrder,
  ]);

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
