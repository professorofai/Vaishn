'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Package, Search, Truck, CheckCircle2, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    awb: string;
    carrier: string;
    status: string;
    eta: string;
    destination: string;
    steps: { title: string; time: string; done: boolean; current?: boolean }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      const clean = query.trim().toUpperCase();
      // Generate tracking response
      setResult({
        id: clean.startsWith('VSH') ? clean : `VSH-${clean.slice(-6) || '928104'}`,
        awb: `SR${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        carrier: 'Shiprocket Express (Bluedart Air)',
        status: 'In Transit',
        eta: 'In 2–3 Days',
        destination: 'India',
        steps: [
          { title: 'Order Confirmed & Verified', time: '13 Nov 2026, 04:30 PM', done: true },
          { title: 'Packed at VAISHN Fulfillment Hub', time: '14 Nov 2026, 10:15 AM', done: true },
          { title: 'Handed over to Shiprocket Express', time: '14 Nov 2026, 02:40 PM', done: true, current: true },
          { title: 'In Transit to Regional Sorting Facility', time: 'Expected Tomorrow', done: false },
          { title: 'Out for Doorstep Delivery', time: 'Pending', done: false },
        ],
      });
    }, 600);
  };

  const sampleTrack = () => {
    setQuery('VSH-784920');
    setResult({
      id: 'VSH-784920',
      awb: 'SR948201847IN',
      carrier: 'Shiprocket Express (Delhivery Air)',
      status: 'Out for Delivery',
      eta: 'Today by 7:00 PM',
      destination: 'Lucknow, Uttar Pradesh',
      steps: [
        { title: 'Order Confirmed & Verified', time: '12 Nov 2026, 02:15 PM', done: true },
        { title: 'Packed in Tamper-Proof Pouch', time: '13 Nov 2026, 09:30 AM', done: true },
        { title: 'Dispatched via Shiprocket AWB', time: '13 Nov 2026, 03:00 PM', done: true },
        { title: 'Arrived at Local Delivery Center', time: '14 Nov 2026, 07:45 AM', done: true },
        { title: 'Out for Doorstep Delivery', time: '14 Nov 2026, 10:30 AM', done: true, current: true },
      ],
    });
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Track Package</span>
        </nav>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy shadow-sm mb-3">
            <Truck size={14} className="text-gold" />
            Live Logistics via Shiprocket
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Track Your Order
          </h1>
          <p className="mt-2 text-sm text-charcoal/70 max-w-md mx-auto">
            Enter your Order ID (e.g. VSH-784920) or your Shiprocket AWB number to check real-time courier status.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 shadow-sm mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="text"
                autoCapitalize="characters"
                autoCorrect="off"
                enterKeyHint="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. VSH-784920) or AWB..."
                required
                className="w-full rounded-2xl border border-gold/30 bg-[#FAF6F0]/60 pl-11 pr-4 py-3.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-burgundy !px-8 !py-3.5 text-sm font-semibold whitespace-nowrap disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track Package'}
            </button>
          </form>

          <div className="mt-3 flex items-center justify-between text-xs text-charcoal/60 px-1">
            <span>Need an example?</span>
            <button
              type="button"
              onClick={sampleTrack}
              className="text-burgundy font-medium hover:underline flex items-center gap-1"
            >
              Load Demo Tracking (VSH-784920) <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Tracking Result View */}
        {result && (
          <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 shadow-md space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold">
                  Order Reference
                </span>
                <p className="font-display text-2xl font-bold text-burgundy">{result.id}</p>
                <p className="text-xs text-charcoal/60 mt-0.5">AWB: <span className="font-mono text-charcoal">{result.awb}</span></p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 size={13} /> {result.status}
                </span>
                <p className="text-xs text-charcoal/60 mt-1">Est. Delivery: <strong className="text-charcoal">{result.eta}</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FAF6F0] p-4 text-xs">
              <div>
                <span className="text-charcoal/50">Courier Partner</span>
                <p className="font-semibold text-charcoal mt-0.5">{result.carrier}</p>
              </div>
              <div>
                <span className="text-charcoal/50">Delivery Destination</span>
                <p className="font-semibold text-charcoal mt-0.5">{result.destination}</p>
              </div>
            </div>

            {/* Timeline Steps */}
            <div>
              <h3 className="font-display text-lg font-semibold text-burgundy mb-4">
                Shipment Journey
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold/30">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <span
                      className={`absolute -left-6 top-1 grid h-5 w-5 place-items-center rounded-full text-white text-[10px] ${
                        step.done
                          ? 'bg-burgundy ring-4 ring-[#FAF6F0]'
                          : 'bg-charcoal/20 ring-4 ring-white'
                      }`}
                    >
                      {step.done ? <CheckCircle2 size={12} /> : idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold ${step.done ? 'text-charcoal' : 'text-charcoal/40'}`}>
                        {step.title}
                        {step.current && (
                          <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold-dark">
                            Current Status
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-charcoal/50 mt-0.5">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-amber-50/50 p-4 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck size={18} className="text-gold-dark shrink-0 mt-0.5" />
              <div>
                <strong>Remember:</strong> In accordance with our store policy, please take a continuous 360° unboxing video before breaking the outer seal for any transit claim verification.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

