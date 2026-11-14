'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Tag,
  Wallet,
  AlertTriangle,
} from 'lucide-react';
import { useStore, PlacedOrder } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import ProductImage from '@/components/ProductImage';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lines,
    subtotal,
    mrpTotal,
    productSavings,
    couponDiscount,
    shipping,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    user,
    walletBalance,
    placeOrder,
  } = useStore();

  // Contact & Delivery form
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [pincode, setPincode] = useState('110001');
  const [address, setAddress] = useState('Flat 402, Royale Crest, High Street');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Wallet deduction toggle
  const [useWallet, setUseWallet] = useState(false);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');

  // Terms agreement
  const [agreed, setAgreed] = useState(true);

  // State for placed order
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  // Pincode auto-city
  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    if (clean.length === 6) {
      if (clean.startsWith('11')) {
        setCity('New Delhi');
        setState('Delhi');
      } else if (clean.startsWith('22')) {
        setCity('Lucknow');
        setState('Uttar Pradesh');
      } else if (clean.startsWith('40')) {
        setCity('Mumbai');
        setState('Maharashtra');
      } else if (clean.startsWith('56')) {
        setCity('Bengaluru');
        setState('Karnataka');
      } else if (clean.startsWith('70')) {
        setCity('Kolkata');
        setState('West Bengal');
      }
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (!ok) {
      setCouponError('Invalid code. Try VAISHN10 or WELCOME15 or FLAT200');
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  const walletDeduction = useWallet ? Math.min(total, walletBalance) : 0;
  const finalPayable = Math.max(0, total - walletDeduction);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert('Please fill all delivery details.');
      return;
    }
    if (!agreed) {
      alert('Please accept the store terms & unboxing video policy.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder({
        address,
        city,
        pincode,
        paymentMethod:
          paymentMethod === 'cod'
            ? 'Cash on Delivery (COD)'
            : paymentMethod === 'upi'
            ? `UPI (${upiApp.toUpperCase()})`
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : 'Net Banking',
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
      });
      setIsSubmitting(false);
      setConfirmedOrder(order);
    }, 1200);
  };

  const handleAutoFill = () => {
    setName('Aryan Pandey');
    setPhone('+91 98765 43210');
    setEmail('aryan@vaishn.in');
    setPincode('226010');
    setAddress('B-42, Gomti Nagar');
    setCity('Lucknow');
    setState('Uttar Pradesh');
  };

  // If order was confirmed, show the Confirmation Screen!
  if (confirmedOrder) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
        <div className="container-x max-w-2xl text-center">
          <div className="rounded-3xl border border-gold/30 bg-white p-8 md:p-12 shadow-xl animate-in fade-in zoom-in-95 duration-400">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-700 shadow-inner mb-6">
              <CheckCircle2 size={44} className="stroke-[2.2]" />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark mb-2">
              <Sparkles size={13} /> Order Successfully Placed
            </span>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy">
              Thank You, {name}!
            </h1>

            <p className="mt-2 text-sm text-charcoal/70">
              Your order <strong className="font-mono text-charcoal text-base">{confirmedOrder.id}</strong> is confirmed.
            </p>

            {/* Tracking Summary Card */}
            <div className="mt-8 rounded-2xl border border-gold/25 bg-[#FAF6F0] p-5 text-left space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-3">
                <div>
                  <span className="text-[11px] text-charcoal/50 uppercase tracking-wider font-semibold">
                    Shiprocket AWB
                  </span>
                  <p className="font-mono text-sm font-bold text-burgundy">{confirmedOrder.awb}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-charcoal/50 uppercase tracking-wider font-semibold">
                    Est. Delivery
                  </span>
                  <p className="text-sm font-semibold text-charcoal">In 3–5 Business Days</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span className="text-charcoal/50">Payment Mode</span>
                  <p className="font-medium text-charcoal mt-0.5">{confirmedOrder.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-charcoal/50">Total Paid</span>
                  <p className="font-bold text-burgundy mt-0.5">{formatPrice(confirmedOrder.total)}</p>
                </div>
              </div>

              <div className="text-xs pt-1 border-t border-gold/15">
                <span className="text-charcoal/50">Shipping Destination</span>
                <p className="font-medium text-charcoal mt-0.5">{confirmedOrder.address}</p>
              </div>
            </div>

            {/* Unboxing reminder reminder */}
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-950 text-left flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Store Reminder:</strong> As per store terms, please take an unedited 360° video from the sealed Shiprocket courier pouch before breaking the seal to validate any transit claims.
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/track"
                className="btn-burgundy !px-8 !py-3.5 text-sm font-semibold inline-flex items-center gap-2"
              >
                <Truck size={16} /> Track Shipment Live
              </Link>
              <Link
                href="/"
                className="rounded-full border border-gold/40 bg-white px-6 py-3.5 text-xs font-semibold text-charcoal hover:bg-gold/10 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (lines.length === 0) {
    return (
      <div className="bg-[#FAF6F0] min-h-screen py-16 text-center text-charcoal">
        <div className="container-x max-w-md">
          <div className="rounded-3xl border border-gold/25 bg-white p-10 shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-gold-dark mb-4" />
            <h1 className="font-display text-3xl font-bold text-burgundy">Your Bag is Empty</h1>
            <p className="mt-2 text-xs text-charcoal/65">
              Add your favourite skin-friendly jewellery pieces to proceed with checkout.
            </p>
            <Link href="/collections/all-jewellery" className="btn-burgundy mt-6 !px-8 !py-3 text-xs block font-semibold">
              Explore Jewellery Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-8 md:py-14 text-charcoal">
      <div className="container-x max-w-6xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span>Shopping Bag</span>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Secure Checkout</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-burgundy">
              Express Checkout
            </h1>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Encrypted 256-bit SSL · Shiprocket Express Logistics
            </p>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-white px-3.5 py-1.5 text-xs font-medium text-gold-dark hover:bg-gold/10 transition shadow-sm"
          >
            <Sparkles size={13} className="text-gold" /> Auto-Fill Demo Address
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-gold/15 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-burgundy text-white text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-display text-xl font-semibold text-burgundy">
                    Contact Information
                  </h2>
                </div>
                {user && (
                  <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-dark">
                    Signed In: {user.name}
                  </span>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aryan Pandey"
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Mobile Number (for Shiprocket OTP) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-semibold text-charcoal mb-1">Email (for Invoice & Receipt)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aryan@vaishn.in"
                  className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                />
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 border-b border-gold/15 pb-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-burgundy text-white text-xs font-bold">
                  2
                </span>
                <h2 className="font-display text-xl font-semibold text-burgundy">
                  Delivery Address
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 110001"
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm font-mono text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Flat / House No., Apartment, Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Royale Crest, High Street"
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India"
                      className="w-full rounded-xl border border-gold/20 bg-gray-50 px-3.5 py-2.5 text-sm text-charcoal/60 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 border-b border-gold/15 pb-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-burgundy text-white text-xs font-bold">
                  3
                </span>
                <h2 className="font-display text-xl font-semibold text-burgundy">
                  Payment Method
                </h2>
              </div>

              {/* VAISHN Wallet credit toggle */}
              {walletBalance > 0 && (
                <div className="rounded-2xl border-2 border-gold/40 bg-[#FFFDF9] p-4 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet size={22} className="text-burgundy" />
                    <div>
                      <p className="text-xs font-bold text-charcoal">Redeem VAISHN Wallet Balance</p>
                      <p className="text-[11px] text-charcoal/60">Available: ₹{walletBalance}</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                      className="rounded border-gold text-burgundy focus:ring-burgundy h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-burgundy">Apply Balance</span>
                  </label>
                </div>
              )}

              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`block rounded-2xl border p-4 cursor-pointer transition ${
                  paymentMethod === 'upi' ? 'border-burgundy bg-[#FAF6F0]' : 'border-gold/25 bg-white hover:border-gold'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-burgundy focus:ring-burgundy"
                      />
                      <div>
                        <p className="text-xs font-bold text-charcoal">UPI Instant Payment</p>
                        <p className="text-[11px] text-charcoal/60">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Zero Fees
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-gold/20 flex gap-2">
                      {(['gpay', 'phonepe', 'paytm'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`flex-1 rounded-xl py-2 text-xs font-semibold capitalize border transition ${
                            upiApp === app ? 'bg-burgundy text-white border-burgundy' : 'bg-white text-charcoal border-gold/30'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  )}
                </label>

                {/* Cash on Delivery */}
                <label className={`block rounded-2xl border p-4 cursor-pointer transition ${
                  paymentMethod === 'cod' ? 'border-burgundy bg-[#FAF6F0]' : 'border-gold/25 bg-white hover:border-gold'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-burgundy focus:ring-burgundy"
                    />
                    <div>
                      <p className="text-xs font-bold text-charcoal">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-charcoal/60">Pay cash or UPI at your doorstep upon delivery</p>
                    </div>
                  </div>
                </label>

                {/* Cards */}
                <label className={`block rounded-2xl border p-4 cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-burgundy bg-[#FAF6F0]' : 'border-gold/25 bg-white hover:border-gold'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-burgundy focus:ring-burgundy"
                    />
                    <div>
                      <p className="text-xs font-bold text-charcoal">Credit / Debit Card</p>
                      <p className="text-[11px] text-charcoal/60">Visa, MasterCard, RuPay, Maestro</p>
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`block rounded-2xl border p-4 cursor-pointer transition ${
                  paymentMethod === 'netbanking' ? 'border-burgundy bg-[#FAF6F0]' : 'border-gold/25 bg-white hover:border-gold'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                      className="text-burgundy focus:ring-burgundy"
                    />
                    <div>
                      <p className="text-xs font-bold text-charcoal">Net Banking</p>
                      <p className="text-[11px] text-charcoal/60">SBI, HDFC, ICICI, Axis, Kotak, and 50+ banks</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Policy agreement */}
              <div className="mt-5 rounded-xl border border-gold/25 bg-[#FAF6F0] p-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-gold text-burgundy focus:ring-burgundy"
                  />
                  <span className="text-[11px] text-charcoal/80 leading-relaxed">
                    I agree to the <Link href="/terms" target="_blank" className="text-burgundy underline">Terms of Service</Link>, and understand that items are skin-friendly imitation fashion jewellery. I confirm that a continuous 360° unboxing video before breaking the courier seal is required for any transit claims.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-gold/25 bg-white p-6 shadow-sm sticky top-28">
              <h2 className="font-display text-xl font-semibold text-burgundy mb-4 border-b border-gold/15 pb-3">
                Order Summary ({lines.length} items)
              </h2>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-gold/10">
                {lines.map((item) => (
                  <div key={item.id + item.variant} className="flex gap-3 pt-3 first:pt-0">
                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-ivory-deep border border-gold/15">
                      <ProductImage product={item.product} tone={item.variant} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="font-semibold text-charcoal line-clamp-1">{item.product.name}</p>
                      <p className="text-charcoal/50 capitalize mt-0.5">Tone: {item.variant} · Qty: {item.qty}</p>
                      <p className="font-bold text-burgundy mt-1">{formatPrice(item.product.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="mt-5 pt-4 border-t border-gold/15">
                {coupon ? (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <Tag size={14} /> {coupon} applied ({formatPrice(couponDiscount)} off)
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-600 hover:underline text-[11px] font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon (e.g. VAISHN10)"
                        className="flex-1 rounded-xl border border-gold/30 bg-[#FAF6F0] px-3 py-2 text-xs uppercase outline-none focus:border-burgundy"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="btn-burgundy !px-4 !py-2 text-xs font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-5 pt-4 border-t border-gold/15 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal MRP</span>
                  <span>{formatPrice(mrpTotal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Catalog Discount</span>
                  <span>− {formatPrice(productSavings)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Savings</span>
                    <span>− {formatPrice(couponDiscount)}</span>
                  </div>
                )}
                {walletDeduction > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>VAISHN Wallet Credit</span>
                    <span>− {formatPrice(walletDeduction)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Shiprocket Express Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-gold/30 pt-3 text-base font-bold text-burgundy">
                  <span>Total Payable</span>
                  <span>{formatPrice(finalPayable)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-burgundy mt-6 !w-full !py-4 text-sm font-semibold tracking-wide disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Confirming Order with Shiprocket...' : `Place Order · ${formatPrice(finalPayable)}`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-charcoal/50">
                <ShieldCheck size={14} className="text-gold-dark" />
                <span>100% Secure Checkout · Vaishn Fashion LLP</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
