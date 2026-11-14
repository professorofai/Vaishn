'use client';
import { useState } from 'react';
import Link from 'next/link';
import { RefreshCcw, Video, Wallet, Clock, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function ReturnsPage() {
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('damaged');
  const [hasVideo, setHasVideo] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasVideo && reason === 'damaged') {
      alert('A 360° unboxing video is mandatory for damage / missing claims as per store policy.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Returns & Wallet Policy</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy shadow-sm mb-3">
            <RefreshCcw size={14} className="text-gold" /> Store Credit Settlement
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Return & Wallet Credit Policy
          </h1>
          <p className="mt-2 text-sm text-charcoal/70 max-w-lg mx-auto">
            Transparent, straightforward procedures to submit returns and receive instant store credit.
          </p>
        </div>

        {/* 3 Key Rules Cards */}
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark mb-4">
              <Clock size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-burgundy">48-Hour Return Window</h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
              Return requests must be initiated within <strong>48 hours</strong> of confirmed delivery as reported by Shiprocket tracking.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-gold/40 bg-[#FFFDF9] p-6 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-burgundy/10 text-burgundy mb-4">
              <Wallet size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-burgundy">Strictly Store Credit</h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
              Approved returns are settled <strong>solely as VAISHN Wallet credit</strong>. We never issue bank refunds, UPI reversals, or cash payouts.
            </p>
          </div>

          <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-700 mb-4">
              <Video size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold text-burgundy">360° Unboxing Video</h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
              Damage or missing claims require an <strong>unedited 360° video</strong> starting from the sealed courier pouch before breaking the seal.
            </p>
          </div>
        </div>

        {/* Unboxing Policy Deep Dive (from terms.pdf section 6) */}
        <div id="unboxing" className="rounded-3xl border border-red-200 bg-red-50/70 p-6 md:p-8 mb-10">
          <div className="flex items-start gap-3.5">
            <ShieldAlert size={26} className="text-red-700 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-xl font-bold text-red-950">
                Mandatory 360° Video Prerequisite for Damage Claims
              </h2>
              <p className="mt-2 text-xs md:text-sm text-red-900 leading-relaxed">
                Any claim regarding transit breakage, loose stones, bent clasps, or missing pieces must be reported within <strong>24 hours of delivery</strong>. You must provide a continuous, unedited, single-take 360-degree unboxing video clearly displaying the shipping label and tracking AWB barcode before opening the parcel.
              </p>
              <p className="mt-2 text-xs font-semibold text-red-950">
                * Without complete video proof captured prior to breaking the outer courier seal, transit claims stand summarily rejected.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Return Request Form */}
        <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-burgundy mb-2">
            Initiate a Return or Exchange Request
          </h2>
          <p className="text-xs text-charcoal/65 mb-6">
            Enter your order details below to register your request with our inspection desk.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center animate-in fade-in">
              <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-3" />
              <h3 className="font-display text-xl font-bold text-emerald-900">
                Return Request Registered
              </h3>
              <p className="mt-2 text-xs text-emerald-800 max-w-md mx-auto">
                Your request for order <strong className="font-mono">{orderId}</strong> has been received. Our compliance officer will review your details and send verification steps to your registered email and WhatsApp within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setOrderId('');
                }}
                className="mt-5 text-xs font-semibold text-burgundy underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">
                    Order ID (from invoice or SMS)
                  </label>
                  <input
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. VSH-784920"
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-4 py-3 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1.5">
                    Reason for Return
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-4 py-3 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                  >
                    <option value="damaged">Transit Damage / Broken Piece (360° Video Required)</option>
                    <option value="wrong">Wrong Item Received</option>
                    <option value="size">Size / Fit Mismatch</option>
                    <option value="quality">General Return for Store Credit</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-gold/20 bg-[#FAF6F0] p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasVideo}
                    onChange={(e) => setHasVideo(e.target.checked)}
                    className="mt-0.5 rounded border-gold/40 text-burgundy focus:ring-burgundy"
                  />
                  <span className="text-xs text-charcoal/80 leading-relaxed">
                    I confirm that the item is unworn with original tags intact, and I have recorded a continuous 360° unboxing video from the sealed courier pouch to share with the support team.
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-burgundy !w-full !py-3.5 text-sm font-semibold">
                Submit Return Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

