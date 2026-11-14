import { Sparkles, HeartHandshake, Truck } from 'lucide-react';

export default function BrandBanner() {
  return (
    <section className="border-y border-gold/30 bg-[#F6EFE5] text-charcoal">
      <div className="container-x py-7 md:py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          {/* Left: Emblem + "More Than Jewellery. It's Your Expression." */}
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white p-2 shadow-md md:h-16 md:w-16">
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
              <p className="font-serif text-2xl font-medium tracking-tight text-charcoal md:text-[26px] leading-tight">
                More Than Jewellery.
              </p>
              <p className="mt-0.5 font-serif text-base italic text-charcoal/80 md:text-lg leading-tight">
                It&apos;s Your Expression.
              </p>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="hidden h-14 w-px bg-gold/30 md:block" />

          {/* Center: Brand Philosophy Statement */}
          <div className="max-w-md text-center md:text-left">
            <p className="text-xs leading-relaxed text-charcoal/75 md:text-[13px]">
              At <strong className="font-bold text-charcoal">VAISHN</strong>, we
              believe every piece of jewellery tells your story. Elegant, timeless
              and made to match your every mood and moment.
            </p>
          </div>

          {/* Vertical Divider 2 */}
          <div className="hidden h-14 w-px bg-gold/30 md:block" />

          {/* Right: 3 Value Props (PREMIUM FINISH, HANDPICKED CURATIONS, EXPRESS SHIPROCKET) */}
          <div className="grid grid-cols-3 gap-6 text-center sm:gap-8">
            <div className="flex flex-col items-center">
              <div className="mb-2 text-gold-dark">
                <Sparkles size={22} className="text-gold-dark" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal leading-tight">
                PREMIUM<br />FINISH
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2 text-gold-dark">
                <HeartHandshake size={22} className="text-gold-dark" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal leading-tight">
                HANDPICKED<br />CURATIONS
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-2 text-gold-dark">
                <Truck size={22} className="text-gold-dark" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal leading-tight">
                EXPRESS<br />SHIPROCKET
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

