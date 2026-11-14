'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, RefreshCcw, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  cat: 'skin' | 'shipping' | 'returns' | 'care';
}

const faqs: FaqItem[] = [
  {
    cat: 'skin',
    q: 'Are VAISHN jewellery pieces safe for sensitive skin?',
    a: "Yes! VAISHN was founded by Aryan Pandey specifically to provide hypoallergenic, skin-friendly alternatives to cheap imitation jewellery. Our pieces use formulated alloys and skin-safe protective polishes designed to minimize rashes, green marks, and irritation.",
  },
  {
    cat: 'skin',
    q: 'Do your products contain real gold, silver, or diamonds?',
    a: "No. All items on VAISHN are premium unbranded artificial, costume, and imitation fashion jewellery composed of high-grade base alloys, electroplating, synthetic crystals, and zircon stones. No piece contains certified precious gold or natural mined diamonds.",
  },
  {
    cat: 'shipping',
    q: 'How long does delivery take and which courier do you use?',
    a: "We ship nationwide via Shiprocket using premium air courier networks including Bluedart, Delhivery, Shadowfax, and Xpressbees. Standard delivery typically takes 3 to 8 business days depending on your PIN code.",
  },
  {
    cat: 'shipping',
    q: 'Is Cash on Delivery (COD) available?',
    a: "Yes, Cash on Delivery is available across most serviceable PIN codes throughout India. You can also pay via instant UPI (PhonePe, Google Pay, Paytm) or Cards.",
  },
  {
    cat: 'shipping',
    q: 'What is the shipping charge?',
    a: "Shipping is completely FREE on all orders of ₹1,499 or more. For orders below ₹1,499, a nominal standard logistics fee of ₹99 applies.",
  },
  {
    cat: 'returns',
    q: 'What is the VAISHN return and wallet credit policy?',
    a: "Return requests must be submitted within 48 hours of confirmed delivery. As per our legal store policy, we strictly issue VAISHN Wallet store credit for approved returns (we do not offer bank transfers or cash payouts). Your wallet credit never expires and can be redeemed on any future jewellery purchase.",
  },
  {
    cat: 'returns',
    q: 'Why is a 360° unboxing video mandatory for damage claims?',
    a: "To protect both customers and our team against courier transit damage or tampering, an unedited single-take 360-degree video from the sealed Shiprocket courier flyer (showing the label and barcode) through unpacking and item inspection is strictly required within 24 hours of delivery.",
  },
  {
    cat: 'care',
    q: 'How should I care for my artificial jewellery to make it last?',
    a: "Keep your jewellery away from direct contact with water, sanitizers, perfumes, chemical deodorants, and hairsprays. Always store each piece separately in an airtight zip pouch or the VAISHN box to maintain its luster and shine.",
  },
];

export default function FaqPage() {
  const [filter, setFilter] = useState<'all' | 'skin' | 'shipping' | 'returns' | 'care'>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = filter === 'all' ? faqs : faqs.filter((f) => f.cat === filter);

  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">Home</Link>
          <span className="mx-1.5">/</span>
          <span className="font-semibold text-charcoal">Frequently Asked Questions</span>
        </nav>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy shadow-sm mb-3">
            <HelpCircle size={14} className="text-gold" /> Help & Support Desk
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm text-charcoal/70 max-w-lg mx-auto">
            Everything you need to know about our skin-friendly jewellery, order delivery via Shiprocket, and store policies.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'skin', label: 'Skin Safety & Material' },
            { id: 'shipping', label: 'Shipping & Delivery' },
            { id: 'returns', label: 'Returns & Wallet Credit' },
            { id: 'care', label: 'Jewellery Care' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilter(tab.id as any);
                setOpenIdx(0);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                filter === tab.id
                  ? 'bg-burgundy text-ivory shadow-sm'
                  : 'bg-white border border-gold/25 text-charcoal hover:bg-gold/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5 mb-12">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-gold/20 bg-white overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 text-left font-display text-lg md:text-xl font-semibold text-burgundy"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gold-dark transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-gold/15 bg-[#FAF6F0]/40 px-5 pb-5 pt-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="rounded-3xl border border-gold/25 bg-white p-6 md:p-8 text-center shadow-sm">
          <h3 className="font-display text-2xl font-semibold text-burgundy">
            Have a question not listed here?
          </h3>
          <p className="text-xs md:text-sm text-charcoal/70 mt-1 max-w-md mx-auto">
            Our customer care team is available to help you with any queries regarding your orders or jewellery pieces.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn-burgundy !px-6 !py-3 text-xs font-semibold">
              Contact Support Desk
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/40 bg-[#FAF6F0] px-6 py-3 text-xs font-semibold text-charcoal hover:bg-gold/15 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

