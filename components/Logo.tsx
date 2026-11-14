import Link from 'next/link';

interface LogoProps {
  size?: number;
  wordmark?: boolean;
  tagline?: boolean;
  className?: string;
}

export default function Logo({
  size = 40,
  wordmark = true,
  tagline = true,
  className = '',
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`group flex flex-col items-center justify-center text-center leading-none ${className}`}
      aria-label="VAISHN home"
    >
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="VAISHN"
          width={size}
          height={size}
          style={{ height: size, width: size, mixBlendMode: 'multiply' }}
          className="object-contain transition-transform group-hover:scale-105"
        />
        {wordmark && (
          <span className="font-display text-[23px] font-semibold tracking-[0.24em] text-burgundy md:text-[26px]">
            VAISHN
          </span>
        )}
      </div>
      {tagline && (
        <span className="mt-1 font-serif text-[11px] italic tracking-wide text-gold-dark md:text-[12px]">
          Shine in your own way
        </span>
      )}
    </Link>
  );
}
