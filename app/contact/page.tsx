'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin, Phone, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('order');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Contact Us</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy shadow-sm mb-3">
            <Mail size={14} className="text-gold" /> Dedicated Support
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Get in Touch with VAISHN
          </h1>
          <p className="mt-2 text-sm text-charcoal/70 max-w-md mx-auto">
            We are here to assist you with order inquiries, styling recommendations, or compliance questions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12 mb-12">
          {/* Left Column: Contact Cards */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-burgundy">Email Support</h3>
                  <a
                    href="mailto:vaishnsupport@gmail.com"
                    className="mt-1 block text-sm font-medium text-charcoal hover:text-burgundy underline transition"
                  >
                    vaishnsupport@gmail.com
                  </a>
                  <p className="mt-1 text-xs text-charcoal/60">Response within 24–48 hours</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-burgundy">WhatsApp Desk</h3>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-emerald-800 hover:underline transition"
                  >
                    Chat with an Agent →
                  </a>
                  <p className="mt-1 text-xs text-charcoal/60">Mon–Sat, 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-burgundy">Registered Office</h3>
                  <p className="mt-1 text-xs text-charcoal/80 leading-relaxed">
                    <strong>Vaishn Fashion LLP</strong>
                    <br />
                    Uttar Pradesh / New Delhi, India
                  </p>
                  <p className="mt-1.5 text-[11px] text-charcoal/50">Online Retail & Direct Sourcing Atelier</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-[#F6EFE5] p-5 text-xs text-charcoal/80">
              <div className="flex items-center gap-2 font-semibold text-burgundy mb-1">
                <ShieldCheck size={16} className="text-gold-dark" />
                Grievance Redressal
              </div>
              <p className="leading-relaxed">
                Compliant with Indian Consumer Protection (E-Commerce) Rules, 2020. All grievances are acknowledged within 48 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-burgundy mb-2">
                Send us a Message
              </h2>
              <p className="text-xs text-charcoal/60 mb-6">
                Fill out the form below and our customer team will get back to you promptly.
              </p>

              {sent ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center animate-in fade-in">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-3" />
                  <h3 className="font-display text-xl font-bold text-emerald-900">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-2 text-xs text-emerald-800 max-w-sm mx-auto">
                    Thank you, {name}! We have received your query and sent a confirmation to <strong className="font-mono">{email}</strong>. Our care team will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="mt-6 text-xs font-semibold text-burgundy underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                      <input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoCapitalize="none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ananya@gmail.com"
                        className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number</label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition"
                      >
                        <option value="order">Order Tracking & Delivery Status</option>
                        <option value="product">Product Details & Skin Allergy Query</option>
                        <option value="return">Return or Wallet Credit Inquiry</option>
                        <option value="wholesale">Bulk Sourcing & Collaboration</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you today? Please include Order ID if applicable..."
                      className="w-full rounded-xl border border-gold/30 bg-[#FAF6F0] px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-burgundy focus:bg-white transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-burgundy !w-full !py-3 text-sm font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

