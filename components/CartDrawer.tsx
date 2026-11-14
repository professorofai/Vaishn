'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Tag, Trash2, X, Truck } from 'lucide-react';
import { formatPrice, products, toneLabel } from '@/lib/data';
import { COUPONS, FREE_SHIP, useStore } from '@/lib/store';
import ProductImage from './ProductImage';

export default function CartDrawer() {
  const s = useStore(); const [code, setCode] = useState(''); const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const inCart = new Set(s.lines.map((l) => l.id));
  const rec = products.filter((p) => !inCart.has(p.id) && p.stock > 0 && p.bestseller).slice(0, 6);
  const progress = Math.min(100, (s.subtotal / FREE_SHIP) * 100);
  const apply = () => { const ok = s.applyCoupon(code); setMsg(ok ? { ok, t: `${code.toUpperCase()} applied — ${COUPONS[code.trim().toUpperCase()].label}` } : { ok, t: 'That code is not valid. Try VAISHN10.' }); if (ok) setCode(''); };
  return (
    <AnimatePresence>
      {s.cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div className="absolute inset-0 bg-charcoal/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={s.closeCart} />
          <motion.aside role="dialog" aria-label="Shopping cart" className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-[440px] flex-col bg-ivory shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 300 }}>
            <div className="flex items-center justify-between border-b border-gold/30 px-5 py-4">
              <h2 className="font-display text-2xl font-semibold text-burgundy">Your Bag <span className="text-base font-normal text-charcoal/50">({s.count})</span></h2>
              <button onClick={s.closeCart} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full hover:bg-burgundy/10"><X size={22} /></button>
            </div>
            {s.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag size={48} className="text-gold" strokeWidth={1.2} /><p className="font-display text-2xl text-burgundy">Your bag is empty</p>
                <p className="text-sm text-charcoal/60">Add something you love from our collection.</p>
                <Link href="/collections/best-sellers" onClick={s.closeCart} className="btn-burgundy">Shop Best Sellers</Link>
              </div>
            ) : (<>
              <div className="flex-1 overflow-y-auto">
                <div className="bg-white px-5 py-3 text-xs">
                  <p className="mb-2 flex items-center gap-2"><Truck size={14} className="text-gold-dark" />{s.subtotal >= FREE_SHIP ? 'You have unlocked free shipping' : `Add ${formatPrice(FREE_SHIP - s.subtotal)} more for free shipping`}</p>
                  <div className="h-1.5 bg-ivory-deep"><motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" animate={{ width: `${progress}%` }} /></div>
                </div>
                <ul className="divide-y divide-gold/20 px-5">
                  <AnimatePresence initial={false}>
                    {s.lines.map((l) => (
                      <motion.li key={l.id + l.variant} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, x: 60, height: 0 }} className="flex gap-4 py-4">
                        <Link href={`/products/${l.product.slug}`} onClick={s.closeCart} className="h-28 w-24 shrink-0 overflow-hidden"><ProductImage product={l.product} tone={l.variant} /></Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex justify-between gap-2"><p className="text-sm font-semibold leading-snug">{l.product.name}</p>
                            <button onClick={() => s.remove(l.id, l.variant)} aria-label={`Remove ${l.product.name}`} className="text-charcoal/40 hover:text-burgundy"><Trash2 size={16} /></button></div>
                          <p className="mt-0.5 text-xs text-charcoal/55">Finish: {toneLabel[l.variant]}</p>
                          <div className="mt-auto flex items-end justify-between">
                            <div className="flex items-center border border-gold/50 bg-white">
                              <button aria-label="Decrease" onClick={() => s.setQty(l.id, l.variant, l.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-ivory"><Minus size={14} /></button>
                              <span className="w-8 text-center text-sm font-semibold">{l.qty}</span>
                              <button aria-label="Increase" onClick={() => s.setQty(l.id, l.variant, l.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-ivory"><Plus size={14} /></button>
                            </div>
                            <div className="text-right"><p className="text-sm font-bold text-burgundy">{formatPrice(l.product.price * l.qty)}</p><p className="text-xs text-charcoal/45 line-through">{formatPrice(l.product.mrp * l.qty)}</p></div>
                          </div>
                        </div>
                      </motion.li>))}
                  </AnimatePresence>
                </ul>
                {rec.length > 0 && (
                  <div className="border-t border-gold/20 bg-white/60 px-5 py-5"><p className="mb-3 font-display text-xl text-burgundy">You May Also Like</p>
                    <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
                      {rec.map((p) => (<div key={p.id} className="w-32 shrink-0"><div className="h-36 overflow-hidden"><ProductImage product={p} /></div>
                        <p className="mt-1.5 line-clamp-1 text-xs font-semibold">{p.name}</p><p className="text-xs font-bold text-burgundy">{formatPrice(p.price)}</p>
                        <button onClick={() => s.add(p.id, undefined, 1, false)} className="mt-1.5 w-full border border-burgundy py-1.5 text-xs font-semibold text-burgundy transition hover:bg-burgundy hover:text-white">+ Add</button></div>))}
                    </div></div>)}
              </div>
              <div className="border-t border-gold/30 bg-white px-5 pb-5 pt-4">
                {s.coupon ? (
                  <div className="mb-3 flex items-center justify-between bg-ivory px-3 py-2 text-sm"><span className="flex items-center gap-2 font-semibold text-burgundy"><Tag size={15} />{s.coupon} · {COUPONS[s.coupon].label}</span><button onClick={() => { s.removeCoupon(); setMsg(null); }} className="text-xs underline">Remove</button></div>
                ) : (
                  <div className="mb-3"><div className="flex"><input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && apply()} placeholder="Coupon code" className="min-w-0 flex-1 border border-gold/50 px-3 py-2.5 text-sm uppercase outline-none focus:border-burgundy" />
                    <button onClick={apply} className="bg-charcoal px-5 text-sm font-semibold text-white hover:bg-burgundy">Apply</button></div>
                    {msg && <p className={`mt-1.5 text-xs ${msg.ok ? 'text-green-700' : 'text-red-700'}`}>{msg.t}</p>}</div>
                )}
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-charcoal/65">Subtotal</dt><dd>{formatPrice(s.subtotal)}</dd></div>
                  <div className="flex justify-between text-green-700"><dt>Discount on MRP</dt><dd>− {formatPrice(s.productSavings)}</dd></div>
                  {s.couponDiscount > 0 && <div className="flex justify-between text-green-700"><dt>Coupon</dt><dd>− {formatPrice(s.couponDiscount)}</dd></div>}
                  <div className="flex justify-between"><dt className="text-charcoal/65">Shipping</dt><dd>{s.shipping ? formatPrice(s.shipping) : 'Free'}</dd></div>
                  <div className="flex justify-between border-t border-gold/30 pt-2 text-lg font-bold text-burgundy"><dt>Total</dt><dd>{formatPrice(s.total)}</dd></div>
                </dl>
                <Link
                  href="/checkout"
                  onClick={s.closeCart}
                  className="btn-burgundy mt-4 w-full !py-4 text-sm block text-center font-semibold tracking-wide"
                >
                  Checkout · {formatPrice(s.total)}
                </Link>
              </div>
            </>)}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
