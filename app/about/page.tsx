import Link from 'next/link';
import { ShieldCheck, Heart, Sparkles, Truck, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | VAISHN - Skin-Friendly Artificial Jewellery',
  description:
    'Established in November 2026 by Aryan Pandey, Vaishn is an initiative rooted in care and trust, providing skin-friendly, hypoallergenic artificial jewellery under Vaishn Fashion LLP.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-10 md:py-16 text-charcoal">
      <div className="container-x max-w-5xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-burgundy transition">
            Home
          </Link>{' '}
          <span className="mx-1.5">/</span>{' '}
          <span className="font-semibold text-charcoal">About VAISHN</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-burgundy shadow-sm">
            <Sparkles size={14} className="text-gold" />
            Brand Story & Heritage
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-burgundy sm:text-5xl md:text-6xl">
            About VAISHN
          </h1>
          <p className="mt-2 font-serif text-lg italic text-gold-dark">
            Shine In Your Own Way • Vaishn Fashion LLP
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-medium text-charcoal shadow-sm border border-gold/20">
              <Heart size={14} className="text-burgundy" /> Rooted in Care & Trust
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-medium text-charcoal shadow-sm border border-gold/20">
              <Award size={14} className="text-gold" /> Vaishn Fashion LLP
            </span>
          </div>
        </div>

        {/* Feature Image Banner */}
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-gold/25 shadow-xl aspect-[16/9] md:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/background image.jpg"
            alt="VAISHN Jewellery Collection"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/85 via-burgundy-dark/20 to-transparent flex items-end p-6 md:p-10">
            <div className="text-white max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
                Our Founder&apos;s Vision
              </p>
              <p className="font-display text-2xl md:text-3xl font-semibold mt-1">
                Beauty should never come at the cost of your skin&apos;s health.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid gap-10 md:grid-cols-12 mb-14">
          <div className="md:col-span-7 space-y-6">
            <div className="rounded-3xl border border-gold/20 bg-white p-7 md:p-9 shadow-sm">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-burgundy mb-4">
                The Inception of VAISHN
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-charcoal/80 mb-4">
                Established in <strong>November 2026</strong> by <strong>Aryan Pandey</strong>, &apos;Vaishn&apos; is not just a jewelry brand; it is an initiative rooted in care and trust. Operating as an artificial jewellery and retail brand under <strong>Vaishn Fashion LLP</strong> (vaishn.in), our venture is registered as a One Person Company (OPC) / Limited Liability Partnership based in Uttar Pradesh.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-charcoal/80">
                In today&apos;s world, we all love wearing trendy and beautiful artificial jewelry to keep up with the latest fashion. However, our founder, Aryan, recognized a significant and widespread issue—the low-quality jewelry available in the market often leads to skin infections, rashes, allergies, and other serious skin problems for customers. He firmly believed that the price of fashion and beauty should never come at the cost of our skin&apos;s health.
              </p>
            </div>

            <div className="rounded-3xl border border-gold/20 bg-white p-7 md:p-9 shadow-sm">
              <div className="flex items-center gap-2.5 text-burgundy mb-3">
                <ShieldCheck size={22} className="text-gold-dark" />
                <h3 className="font-display text-2xl font-semibold">Our Mission & Core Promise</h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-charcoal/80 mb-5">
                &apos;Vaishn&apos; was founded with the vision of solving this exact problem and providing a safe alternative. Our main objective is to offer you exquisite, stylish, and skin-friendly artificial jewellery at the most affordable prices.
              </p>
              <div className="rounded-2xl border border-gold/30 bg-[#FAF6F0] p-4 text-sm font-medium text-burgundy flex items-start gap-3">
                <Sparkles size={18} className="text-gold shrink-0 mt-0.5" />
                <span>
                  We ensure that whatever you wear is not only outwardly beautiful but also completely safe and comfortable for your skin.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sourcing & Quality */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border border-gold/25 bg-gradient-to-br from-white to-[#F6EFE5] p-7 md:p-8 shadow-sm">
              <span className="inline-block rounded-xl bg-gold/15 p-3 text-gold-dark mb-4">
                <Award size={26} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-burgundy mb-3">
                Sourcing & Quality Infrastructure
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
                Dedicated sourcing connections and reliable manufacturing partnerships have been established to guarantee high-grade hypoallergenic materials, ensuring that every product eliminates the skin irritation issues commonly caused by low-quality fashion jewellery.
              </p>
            </div>

            {/* Product Quality collage */}
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-sm aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Earrings.jpg" alt="Hypoallergenic Earrings" className="h-full w-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-sm aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Necklace.jpg" alt="Safe Alloy Necklace" className="h-full w-full object-cover hover:scale-105 transition duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (matching about page part 2.png) */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-semibold text-burgundy">
              The 4 Pillars of VAISHN
            </h2>
            <p className="text-sm text-charcoal/60 mt-1">
              Engineered with care, delivered with honesty.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark mb-4">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-semibold text-charcoal text-base">100% Skin-Friendly</h4>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Carefully formulated alloy & polishes that prevent rashes, discoloration, and skin irritation.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark mb-4">
                <Sparkles size={20} />
              </div>
              <h4 className="font-semibold text-charcoal text-base">Affordable Prices</h4>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                High-quality fashion jewellery crafted to be accessible and pocket-friendly for everyone.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark mb-4">
                <Heart size={20} />
              </div>
              <h4 className="font-semibold text-charcoal text-base">Exquisite & Stylish</h4>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Trendsetting aesthetic designs crafted for modern elegance and timeless Indian charm.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold-dark mb-4">
                <Truck size={20} />
              </div>
              <h4 className="font-semibold text-charcoal text-base">Doorstep Delivery</h4>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Insured, tamper-proof protective packaging delivered directly across India via Shiprocket.
              </p>
            </div>
          </div>
        </div>

        {/* Entity Banner & CTA */}
        <div className="rounded-3xl border border-gold/30 bg-burgundy-dark p-8 md:p-12 text-center text-ivory shadow-xl">
          <p className="text-xs uppercase tracking-widest text-gold-light mb-2">Official Registration</p>
          <p className="text-sm text-ivory/80 max-w-lg mx-auto">
            Registered Entity: <strong className="text-ivory font-semibold">Vaishn Fashion LLP</strong> • Uttar Pradesh, India • vaishn.in
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collections/all-jewellery"
              className="btn-gold !px-8 !py-4 text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2"
            >
              Explore Skin-Friendly Collection <ArrowRight size={16} />
            </Link>
            <Link
              href="/terms"
              className="rounded-full border border-ivory/30 px-6 py-3.5 text-xs font-medium text-ivory hover:bg-white/10 transition"
            >
              View Legal & Compliance Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

