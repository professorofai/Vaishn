import { Sparkles, HeartHandshake, Truck } from 'lucide-react';

export default function BrandBanner() {
  return (
    <section className="border-y border-gold/30 bg-[#F7EFE6] text-charcoal">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
          {/* Left: Luxury Emblem Box + "More Than Jewellery. It's Your Expression." */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <div className="grid h-14 w-14 sm:h-16 sm:w-16 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-gradient-to-br from-[#FFFDF9] to-[#F1E5D1] p-2.5 shadow-[0_4px_16px_rgba(184,149,88,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="VAISHN Emblem"
                width={48}
                height={48}
                style={{ mixBlendMode: 'multiply' }}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="font-display text-2xl sm:text-[28px] lg:text-[30px] font-normal tracking-wide text-charcoal leading-tight">
                More Than Jewellery.
              </p>
              <p className="mt-1 font-serif text-base sm:text-lg italic text-charcoal/80 leading-tight">
                It&apos;s Your Expression.
              </p>
            </div>
          </div>

          {/* Vertical Divider 1 (Desktop) */}
          <div className="hidden lg:block h-14 w-[1px] bg-gold/35 shrink-0" />

          {/* Center: Brand Philosophy Statement */}
          <div className="max-w-md text-center lg:text-left">
            <p className="text-xs sm:text-[13px] leading-relaxed text-charcoal/80">
              At <strong className="font-bold text-charcoal">VAISHN</strong>, we
              believe every piece of jewellery tells your story. Elegant, timeless
              and made to match your every mood and moment.
            </p>
          </div>

          {/* Vertical Divider 2 (Desktop) */}
          <div className="hidden lg:block h-14 w-[1px] bg-gold/35 shrink-0" />

          {/* Right: 3 Pillars (PREMIUM FINISH, HANDPICKED CURATIONS, EXPRESS SHIPROCKET) */}
          <div className="grid w-full sm:w-auto grid-cols-3 gap-4 sm:gap-8 lg:gap-10 text-center shrink-0 pt-2 lg:pt-0 border-t border-gold/20 lg:border-t-0">
            {/* 1. Premium Finish */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-8 items-center justify-center text-gold-dark">
                <Sparkles size={24} strokeWidth={1.5} className="text-gold-dark" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal leading-tight">
                PREMIUM<br />FINISH
              </span>
            </div>

            {/* 2. Handpicked Curations */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-8 items-center justify-center text-gold-dark">
                <HeartHandshake size={24} strokeWidth={1.5} className="text-gold-dark" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal leading-tight">
                HANDPICKED<br />CURATIONS
              </span>
            </div>

            {/* 3. Express Shiprocket */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-8 items-center justify-center text-gold-dark">
                <Truck size={24} strokeWidth={1.5} className="text-gold-dark" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal leading-tight">
                EXPRESS<br />SHIPROCKET
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

