'use client';
import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF6F0] text-charcoal border-t border-gold/20 pt-10 pb-6 md:pt-12 md:pb-7">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 4 Equal Columns expanded comfortably across width */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 md:gap-10 lg:gap-12 pb-8 md:pb-10">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <div>
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl md:text-3xl tracking-[0.22em] text-charcoal font-medium">
                  VAISHN
                </span>
                <p className="font-serif text-xs italic tracking-wider text-charcoal/70 mt-1">
                  Shine In Your Own Way
                </p>
              </Link>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-8 w-8 place-items-center rounded-lg border border-charcoal/30 text-charcoal transition hover:border-burgundy hover:text-burgundy hover:bg-white"
              >
                <Instagram size={15} strokeWidth={1.7} />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-8 w-8 place-items-center rounded-lg border border-charcoal/30 text-charcoal transition hover:border-burgundy hover:text-burgundy hover:bg-white"
              >
                <MessageCircle size={15} strokeWidth={1.7} />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal uppercase mb-4">
              SHOP
            </p>
            <ul className="space-y-2.5 text-xs text-charcoal/75">
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-burgundy transition">
                  New In
                </Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:text-burgundy transition">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/collections/necklaces" className="hover:text-burgundy transition">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:text-burgundy transition">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/collections/bracelets" className="hover:text-burgundy transition">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link href="/collections/jewellery-sets" className="hover:text-burgundy transition">
                  Pendants Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/all-jewellery" className="hover:text-burgundy transition">
                  Anklets
                </Link>
              </li>
              <li>
                <Link href="/collections/all-jewellery" className="hover:text-burgundy transition">
                  Others
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal uppercase mb-4">
              HELP
            </p>
            <ul className="space-y-2.5 text-xs text-charcoal/75">
              <li>
                <Link href="/contact" className="hover:text-burgundy transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-burgundy transition">
                  Track Package
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-burgundy transition">
                  Returns & Store Credit
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-burgundy transition">
                  FAQs & Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div>
            <p className="text-xs font-semibold tracking-wider text-charcoal uppercase mb-4">
              ABOUT
            </p>
            <ul className="space-y-2.5 text-xs text-charcoal/75">
              <li>
                <Link href="/about" className="hover:text-burgundy transition">
                  About VAISHN
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-burgundy transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-burgundy transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Centered Copyright */}
        <div className="border-t border-charcoal/10 pt-5 text-center">
          <p className="text-xs text-charcoal/50 tracking-wider">
            © 2026 VAISHN. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
