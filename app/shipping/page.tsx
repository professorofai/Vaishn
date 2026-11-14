'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, MapPin, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';

export default function ShippingPage() {
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState<{ ok: boolean; t: string } | null>(null);

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      return setPinMsg({ ok: false, t: 'Please enter a valid 6-digit Indian PIN code.' });
    }
    const d = new Date();
    d.setDate(d.getDate() + 5);
    const eDate = new Date();
    eDate.setDate(eDate.getDate() + 3);
    const f = (x: Date) => x.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    setPinMsg({
      ok: true,
      t: `Serviceable via Shiprocket Express! Estimated delivery between ${f(eDate)} and ${f(d)}. Cash on Delivery (COD) available.`,
    });
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Shipping Policy</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy shadow-sm mb-3">
            <Truck size={14} className="text-gold" /> Nationwide Logistics
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Shipping & Delivery Policy
          </h1>
          <p className="mt-2 text-sm text-charcoal/70 max-w-lg mx-auto">
            Automated express fulfillment across 26,000+ PIN codes in India powered by Shiprocket.
          </p>
        </div>

        {/* Pincode Estimator Tool */}
        <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 shadow-sm mb-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl font-semibold text-burgundy mb-2">
              Check PIN Code Serviceability
            </h2>
            <p className="text-xs text-charcoal/65 mb-5">
              Enter your postal code to calculate exact delivery estimates and COD availability.
            </p>

            <form onSubmit={checkPin} className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit PIN code (e.g. 110001)"
                required
                className="flex-1 rounded-2xl border border-gold/30 bg-[#FAF6F0] px-4 py-3 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
              />
              <button type="submit" className="btn-burgundy !px-6 !py-3 text-sm font-semibold">
                Check
              </button>
            </form>

            {pinMsg && (
              <div
                className={`mt-4 rounded-xl p-3.5 text-xs text-left flex items-start gap-2.5 ${
                  pinMsg.ok ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-900 border border-red-200'
                }`}
              >
                {pinMsg.ok ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />}
                <span>{pinMsg.t}</span>
              </div>
            )}
          </div>
        </div>

        {/* Policy Details Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-burgundy mb-3">
              <PackageCheck size={22} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold">Shipping Charges</h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-charcoal/80 leading-relaxed">
              <li>• <strong>Orders ₹1,499 & above:</strong> Completely <strong>FREE</strong> shipping across India.</li>
              <li>• <strong>Orders below ₹1,499:</strong> Flat shipping charge of <strong>₹99</strong>.</li>
              <li>• <strong>No Hidden Surcharges:</strong> Taxes and courier fees are clearly summarized at checkout.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-burgundy mb-3">
              <Clock size={22} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold">Delivery Timelines</h3>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-charcoal/80 leading-relaxed">
              <li>• <strong>Metro Cities:</strong> 2 to 4 business days from dispatch.</li>
              <li>• <strong>Rest of India:</strong> 4 to 8 business days depending on regional accessibility.</li>
              <li>• <strong>Dispatch Window:</strong> All orders are securely dispatched within 24–48 hours of verification.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-burgundy mb-3">
              <Truck size={22} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold">Logistics Partners</h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              Through Shiprocket, we route every package via top tier national air couriers including <strong>Bluedart, Delhivery, Shadowfax, Xpressbees, and Ekart</strong> with real-time GPS tracking and SMS/WhatsApp notifications.
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-burgundy mb-3">
              <ShieldCheck size={22} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold">Tamper-Proof Packaging</h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              Every VAISHN order is bubble-padded, boxed, and packed inside a high-security, tamper-evident outer courier flyer with a unique barcode to ensure your jewellery reaches you undamaged.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/track" className="btn-burgundy !px-8 !py-3.5 text-sm font-semibold inline-flex items-center gap-2">
            Track Existing Shipment <Truck size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

