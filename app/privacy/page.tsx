import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, Lock, Mail, ShieldCheck, Database, Eye, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | VAISHN - Skin-Friendly Jewellery',
  description:
    'VAISHN Privacy Policy: Learn how Vaishn Fashion LLP collects, protects, and handles your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF6F0] min-h-screen py-8 md:py-14 text-charcoal">
      <div className="container-x max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between text-xs text-charcoal/60">
          <div>
            <Link href="/" className="hover:text-burgundy transition">
              Home
            </Link>{' '}
            <span className="mx-1.5">/</span>{' '}
            <span>Legal & Compliance</span>{' '}
            <span className="mx-1.5">/</span>{' '}
            <span className="font-semibold text-charcoal">Privacy Policy</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:vaishnsupport@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-white px-3 py-1 text-xs font-medium text-burgundy hover:bg-gold/10 transition"
            >
              <Mail size={13} /> Grievance Desk
            </a>
          </div>
        </nav>

        {/* Header Block */}
        <div className="rounded-3xl border border-gold/25 bg-white p-7 md:p-10 shadow-sm mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#FAF6F0] px-4 py-1 text-xs font-semibold tracking-wider text-burgundy uppercase">
            Official Store Policies & Legal Agreement
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Terms of Service & Privacy
          </h1>

          <p className="mt-3 text-sm md:text-base text-charcoal/70 max-w-2xl mx-auto">
            Operating with full data integrity and consumer privacy protections under the Information Technology Act, 2000 and Digital Personal Data Protection guidelines.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-gold/15 pt-5 text-xs text-charcoal/65">
            <div>
              <span className="font-semibold text-charcoal">Effective Date:</span> 24/09/2026
            </div>
            <div>
              <span className="font-semibold text-charcoal">Platform Operator:</span> VAISHN (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            </div>
            <div>
              <span className="font-semibold text-charcoal">Entity:</span> Vaishn Fashion LLP (Uttar Pradesh)
            </div>
          </div>
        </div>

        {/* Tab switcher: Terms & Conditions / Privacy Policy */}
        <div className="flex border-b border-gold/30 mb-8">
          <Link
            href="/terms"
            className="flex items-center gap-2 border-b-2 border-transparent px-6 py-3 font-display text-lg font-medium text-charcoal/60 hover:text-burgundy transition"
          >
            <FileText size={18} /> Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 border-b-2 border-burgundy px-6 py-3 font-display text-lg font-semibold text-burgundy"
          >
            <Lock size={18} /> Privacy Policy
          </Link>
        </div>

        {/* Privacy Highlight Banner */}
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-white to-[#F6EFE5] p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 text-burgundy mb-3">
            <ShieldCheck size={26} className="text-gold-dark" />
            <h2 className="font-display text-xl md:text-2xl font-semibold">
              Our Privacy Commitment to You
            </h2>
          </div>
          <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
            At <strong>VAISHN</strong> (Vaishn Fashion LLP), we respect your privacy and are committed to safeguarding your personal information. We never sell, rent, or trade customer contact details or purchase histories to third-party telemarketers or ad brokers.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Database size={20} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold text-burgundy">
                1. Information We Collect
              </h3>
            </div>
            <div className="space-y-2.5 text-xs md:text-sm text-charcoal/80 leading-relaxed">
              <p>When you browse, create an account, or order from VAISHN, we may collect:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>Contact Information:</strong> Your full name, mobile number (for OTP verification and delivery updates), and email address.</li>
                <li><strong>Shipping & Invoicing Details:</strong> Physical delivery address, city, state, postal PIN code, and landmark.</li>
                <li><strong>Order History:</strong> Product items ordered, dates, payment method chosen (COD, UPI, Cards), and VAISHN Wallet transaction logs.</li>
                <li><strong>Device & Browsing Data:</strong> IP address, browser type, referring pages, and cookies to keep your shopping cart and wishlist saved.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Lock size={20} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold text-burgundy">
                2. How We Protect Payment Information
              </h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              VAISHN does <strong>not</strong> collect, process, or store full credit card numbers, debit card CVVs, or UPI PINs on our servers. All digital transactions are handled directly through PCI-DSS compliant, RBI-authorized Indian payment gateways (such as Razorpay / Cashfree / PayU) using 256-bit SSL encryption.
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Eye size={20} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold text-burgundy">
                3. Order Fulfillment & Third-Party Logistics
              </h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              To deliver your packages safely to your doorstep, your name, contact phone number, and delivery address are shared with our logistics aggregator, <strong>Shiprocket</strong>, and its contracted express courier partners (Bluedart, Delhivery, Shadowfax, Xpressbees, Ekart). These partners use your details strictly for dispatch, transit tracking, and delivery OTP confirmation.
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Bell size={20} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold text-burgundy">
                4. SMS & WhatsApp Communication
              </h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              By providing your mobile number at checkout or signup, you consent to receive transactional updates (Order Confirmation, Shiprocket Dispatch AWB, Out for Delivery alerts) via SMS or WhatsApp. You can opt out of promotional messages at any time by contacting our support desk.
            </p>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail size={20} className="text-gold-dark" />
              <h3 className="font-display text-xl font-semibold text-burgundy">
                5. Your Rights & Grievance Contact
              </h3>
            </div>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed mb-4">
              You have the right to request access to your stored profile data, rectify incorrect information, or request account deletion. For any questions or data concerns:
            </p>
            <div className="rounded-xl border border-gold/30 bg-[#FAF6F0] p-4 text-xs md:text-sm">
              <p><strong>Grievance Officer:</strong> Vaishn Fashion Compliance Desk</p>
              <p><strong>Email:</strong> <a href="mailto:vaishnsupport@gmail.com" className="text-burgundy underline">vaishnsupport@gmail.com</a></p>
              <p className="text-charcoal/70 mt-1">Resolution guaranteed within 30 days as prescribed under the Consumer Protection (E-Commerce) Rules, 2020.</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-5 py-2.5 text-xs font-semibold text-burgundy hover:bg-gold/10 transition"
          >
            ← Return to Store Home
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-xs font-semibold text-ivory hover:bg-burgundy-dark transition"
          >
            Read Terms & Conditions →
          </Link>
        </div>
      </div>
    </div>
  );
}

