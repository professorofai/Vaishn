import Link from 'next/link';

interface LogoProps {
  size?: number;
  wordmark?: boolean;
  tagline?: boolean;
  align?: 'left' | 'center';
  className?: string;
}

export default function Logo({
  size = 32,
  wordmark = true,
  tagline = true,
  align = 'center',
  className = '',
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      } leading-none ${className}`}
      aria-label="VAISHN home"
    >
      <div className="flex items-center gap-1 sm:gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="VAISHN"
          width={size}
          height={size}
          style={{ mixBlendMode: 'multiply' }}
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 object-contain transition-transform group-hover:scale-105 shrink-0"
        />
        {wordmark && (
          <span className="font-display text-[15px] sm:text-[19px] md:text-[23px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-burgundy whitespace-nowrap">
            VAISHN
          </span>
        )}
      </div>
      {tagline && (
        <span className="mt-0.5 sm:mt-1 font-serif text-[8.5px] sm:text-[10px] md:text-[11px] italic tracking-wide text-gold-dark whitespace-nowrap">
          Shine in your own way
        </span>
      )}
    </Link>
  );
}
