import Link from 'next/link';
import { Metadata } from 'next';
import { AlertTriangle, CheckCircle, FileText, Lock, Mail, Printer, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Compliance | VAISHN',
  description:
    'Official Terms of Service, Legal Policies, and Store Agreement for VAISHN (Vaishn Fashion LLP).',
};

export default function TermsPage() {
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
            <span className="font-semibold text-charcoal">Terms & Conditions</span>
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

        {/* Header Block (Exact replica of terms and conditions.pdf page 1) */}
        <div className="rounded-3xl border border-gold/25 bg-white p-7 md:p-10 shadow-sm mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#FAF6F0] px-4 py-1 text-xs font-semibold tracking-wider text-burgundy uppercase">
            Official Store Policies & Legal Agreement
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-burgundy">
            Terms of Service & Privacy
          </h1>

          <p className="mt-3 text-sm md:text-base text-charcoal/70 max-w-2xl mx-auto">
            Please read these terms carefully before placing an order or using our store. Operating with complete transparency, buyer clarity, and legal diligence.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-gold/15 pt-5 text-xs text-charcoal/65">
            <div>
              <span className="font-semibold text-charcoal">Effective Date:</span> 24/09/2026
            </div>
            <div>
              <span className="font-semibold text-charcoal">Platform Operator:</span> VAISHN (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            </div>
            <div>
              <span className="font-semibold text-charcoal">Jurisdiction:</span> New Delhi, India
            </div>
          </div>
        </div>

        {/* Tab switcher: Terms & Conditions / Privacy Policy */}
        <div className="flex border-b border-gold/30 mb-8">
          <Link
            href="/terms"
            className="flex items-center gap-2 border-b-2 border-burgundy px-6 py-3 font-display text-lg font-semibold text-burgundy"
          >
            <FileText size={18} /> Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-2 border-b-2 border-transparent px-6 py-3 font-display text-lg font-medium text-charcoal/60 hover:text-burgundy transition"
          >
            <Lock size={18} /> Privacy Policy
          </Link>
        </div>

        {/* Key Customer Summary & Mandatory Disclaimers Callout Box */}
        <div className="rounded-2xl border-2 border-[#D8BC85] bg-[#FFFBF5] p-6 md:p-8 shadow-sm mb-10">
          <div className="flex items-center gap-3 text-burgundy mb-4">
            <AlertTriangle className="text-gold-dark shrink-0" size={24} />
            <h2 className="font-display text-xl md:text-2xl font-semibold">
              Key Customer Summary & Mandatory Disclaimers
            </h2>
          </div>
          <p className="text-xs md:text-sm text-charcoal/75 mb-6">
            By accessing <strong>VAISHN</strong>, creating an account, or placing an order, you confirm that you have read, understood, and consented to the following binding conditions:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Box 1 */}
            <div className="rounded-xl border border-gold/25 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-charcoal">
                    Artificial & Imitation Jewellery Only
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                    All items are strictly unbranded fashion jewellery made of base alloys and synthetic stones. No piece contains fine gold, silver, platinum, or certified natural diamonds.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl border border-gold/25 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-charcoal">
                    Strictly VAISHN Wallet Credit (No Bank Refunds)
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                    We never issue cash payouts or bank reversals. Approved returns are credited solely to your non-withdrawable VAISHN Wallet for future store purchases.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="rounded-xl border border-gold/25 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-charcoal">
                    Mandatory 360° Unboxing Video (24 Hours)
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                    Transit damage or missing claims require an unedited continuous 360° video from the sealed Shiprocket courier bag to item inspection.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 */}
            <div className="rounded-xl border border-gold/25 bg-white p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={18} className="text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-charcoal">
                    Skin Sensitivity & Allergy Wearer Risk
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/70 leading-relaxed">
                    Pieces contain industrial base metals (brass, zinc, alloys) and are not guaranteed nickel-free. Customers wear pieces at their own risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="rounded-2xl border border-gold/25 bg-white p-6 shadow-sm mb-10">
          <h3 className="font-display text-lg font-semibold text-burgundy mb-3 uppercase tracking-wider text-xs">
            Table of Contents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-charcoal/80">
            <a href="#section-1" className="hover:text-burgundy hover:underline">1. Product Nature & Sourcing</a>
            <a href="#section-2" className="hover:text-burgundy hover:underline">2. No Warranty & Variations</a>
            <a href="#section-3" className="hover:text-burgundy hover:underline">3. Skin Sensitivity & Disclaimers</a>
            <a href="#section-4" className="hover:text-burgundy hover:underline">4. Shipping via Shiprocket</a>
            <a href="#section-5" className="hover:text-burgundy hover:underline">5. Returns & Wallet Credit Policy</a>
            <a href="#section-6" className="hover:text-burgundy hover:underline">6. Mandatory Unboxing Video</a>
            <a href="#section-7" className="hover:text-burgundy hover:underline">7. Limitation of Liability</a>
            <a href="#section-8" className="hover:text-burgundy hover:underline">8. Governing Law & Jurisdiction</a>
            <a href="#section-9" className="hover:text-burgundy hover:underline">9. Grievance Redressal</a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div id="section-1" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">1</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Product Nature, Sourcing & Independent Retailer Notice
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>1.1. Curated / Sourced Goods:</strong> Products sold on VAISHN are independently sourced from third-party wholesale merchants, regional manufacturing hubs, and open commercial markets. VAISHN functions strictly as a direct-to-consumer curator, marketer, and reseller.</p>
              <p><strong>1.2. No Precious Content (Artificial & Costume Jewellery Only):</strong> All items available on our store are strictly artificial, costume, and imitation jewellery composed of base alloys, electroplating, synthetic stones, glass, crystals, acrylics, and beads. No piece contains fine gold, silver, platinum, or certified natural diamonds.</p>
              <p><strong>1.3. No Affiliation / Non-Branded Items:</strong> Unless explicitly stated in writing, items sold are unbranded fashion pieces. Any visual similarity or aesthetic resemblance to proprietary runway designs, luxury heritage brands, or designer items is purely coincidental. VAISHN does not claim affiliation with, authorization from, nor endorsement by, any luxury fashion labels or registered trademark owners.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div id="section-2" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">2</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                No Manufacturer Warranty & Finish Variations
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>2.1. No Warranties on Finish Longevity:</strong> Given the intrinsic nature of local market fashion accessories and imitation plating, products carry no explicit or implied warranties on polish longevity, stone retention, anti-tarnish duration, or color fading.</p>
              <p><strong>2.2. User Care Responsibility:</strong> The lifespan and appearance of sourced fashion jewellery depends entirely on user care. Sourced fashion jewellery must be stored dry inside airtight pouches and kept strictly away from water, moisture, perfumes, chemical deodorants, soaps, hair sprays, and excessive sweat.</p>
              <p><strong>2.3. Sourcing Batch & Handmade Variations:</strong> As items are procured across distinct production batches from various artisan clusters, slight variations in enamel color tone, bead size, metal undertone, weight, or handmade finish may occur between batches and will not be considered a defect.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div id="section-3" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">3</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Skin Sensitivity, Allergies & Wearer Disclaimer
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>3.1. Industrial Base Metal Content:</strong> Fashion and imitation jewellery commonly contains industrial base metals (such as brass, copper, zinc, iron, or mixed alloys). VAISHN does not guarantee that products are hypoallergenic, 100% nickel-free, or lead-free.</p>
              <p><strong>3.2. Legal Disclaimer of Dermatological Liability:</strong> VAISHN expressly disclaims all legal liability for any dermatological reactions, allergic contact dermatitis, skin sensitivities, rashes, itching, or skin discoloration resulting from wearing our sourced items. Customers with sensitive skin or known metal allergies purchase and wear these pieces strictly at their own risk and sole discretion.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div id="section-4" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">4</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Shipping & Logistics via Shiprocket
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>4.1. Order Fulfillment Partner:</strong> Order fulfillment, automated dispatch, air-waybill generation, and shipping operations are handled through our logistics aggregator partner, Shiprocket, and its contracted express courier networks (including Bluedart, Delhivery, Shadowfax, Xpressbees, Ekart, etc.).</p>
              <p><strong>4.2. Delivery Timelines & Logistics Delays:</strong> Standard delivery timelines (typically 3–8 business days from dispatch date) are courier estimates only. VAISHN is not legally liable for logistics delays caused by courier route congestion, bad weather, civil disruptions, festival surges, national holidays, or inaccurate delivery coordinates/PIN codes provided by the customer.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div id="section-5" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">5</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Return, Exchange & VAISHN Wallet Store Credit Policy
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <div className="rounded-xl border border-gold/30 bg-[#FFFBF5] p-3.5 text-xs font-medium text-burgundy">
                <strong>5.1. Strictly Wallet Credit Only (No Cash / Bank Refunds):</strong> VAISHN does not issue bank transfers, cash payouts, UPI reversals, or credit card charge reversals under any circumstance. All approved returns or exchange settlements are provided solely in the form of VAISHN Wallet store credit.
              </div>
              <p><strong>5.2. Return Request Window (48 Hours):</strong> Eligible return requests must be submitted within 48 hours of confirmed delivery as tracked via the Shiprocket tracking system. Requests made after 48 hours will not be entertained.</p>
              <p><strong>5.3. Mandatory Condition for Returns:</strong> To qualify for return approval, the item must remain completely unworn, untried for extended periods, unaltered, clean, and securely packed inside its original transparent sleeve/box with all tags, barcodes, and protective padding 100% intact.</p>
              <p><strong>5.4. Wallet Credit Issuance:</strong> Once the returned unit is physically received at our warehouse hub and clears multi-point verification by our inspection team, the net product purchase price will be issued to your registered VAISHN Wallet balance.</p>
              <p><strong>5.5. Binding Wallet Terms:</strong> VAISHN Wallet store credit is strictly non-transferable between accounts, cannot be converted into cash, cannot be withdrawn into a bank account, credit card, or UPI ID, and can solely be redeemed for future purchases across our online store catalog.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div id="section-6" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">6</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Mandatory Unboxing Video for Damaged / Missing Claims
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>6.1. Reporting Window (Within 24 Hours):</strong> Any claim regarding transit breakage, broken clasp/hooks, fallen stones, wrong item sent, or missing pieces must be reported to our support team within 24 hours of delivery.</p>
              <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-xs text-red-950">
                <strong>6.2. Strict Unedited 360-Degree Video Prerequisite:</strong> A continuous, unedited, single-take 360-degree unboxing video starting from the sealed outer Shiprocket courier flyer/box (clearly displaying the shipping label and tracking AWB barcode) up to the physical inspection of the item is strictly required to validate transit claims. Without complete video proof captured before breaking the outer seal, the claim shall stand summarily rejected without further review.
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div id="section-7" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">7</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Limitation of Liability & Force Majeure
              </h3>
            </div>
            <div className="space-y-3 text-xs md:text-sm leading-relaxed text-charcoal/80">
              <p><strong>7.1. Aggregate Liability Cap:</strong> To the maximum extent permitted by applicable Indian law, VAISHN&apos;s total aggregate financial liability arising out of or related to any product, transaction, contract, negligence, or tort shall in no event exceed the actual net amount paid by the customer for that specific ordered product.</p>
              <p><strong>7.2. Force Majeure:</strong> VAISHN shall not be liable for any failure or delay in fulfilling orders resulting from circumstances beyond its reasonable control, including but not limited to acts of God, extreme floods, courier strikes, riots, war, power outages, regional curfews, lockdown orders, or government regulations.</p>
              <p><strong>7.3. Severability:</strong> If any provision of these Terms is found to be unlawful, void, or unenforceable by any competent court, that specific provision shall be deemed severable and shall not affect the validity or enforceability of any remaining provisions.</p>
            </div>
          </div>

          {/* Section 8 */}
          <div id="section-8" className="rounded-2xl border border-gold/20 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">8</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Governing Law & Jurisdiction
              </h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
              These Terms and Conditions, purchase contracts, and any disputes or claims arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute, action, or proceeding arising under or relating to these Terms shall fall under the exclusive jurisdiction of the competent courts in <strong>New Delhi, India</strong>.
            </p>
          </div>

          {/* Section 9 */}
          <div id="section-9" className="rounded-2xl border border-gold/25 bg-gradient-to-br from-white to-[#F6EFE5] p-7 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold/15 text-xs font-bold text-burgundy">9</span>
              <h3 className="font-display text-xl font-semibold text-burgundy">
                Customer Grievance & Compliance Desk
              </h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-charcoal/80 mb-4">
              In accordance with the Indian Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020, any customer queries, complaints, or legal notices may be directed to our designated Grievance Support Desk:
            </p>
            <div className="rounded-2xl border border-gold/30 bg-white p-4 text-xs md:text-sm space-y-1.5">
              <p>
                <strong>Support & Grievance Email:</strong>{' '}
                <a href="mailto:vaishnsupport@gmail.com" className="text-burgundy underline font-medium">
                  vaishnsupport@gmail.com
                </a>
              </p>
              <p className="text-charcoal/70">
                <strong>Response Timeline:</strong> All legitimate grievances will be acknowledged within 48 business hours and redressed within 30 days as prescribed under applicable Indian regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white px-5 py-2.5 text-xs font-semibold text-burgundy hover:bg-gold/10 transition"
          >
            ← Return to Store Home
          </Link>
          <Link
            href="/collections/all-jewellery"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-xs font-semibold text-ivory hover:bg-burgundy-dark transition"
          >
            Explore Jewellery Catalog →
          </Link>
        </div>
      </div>
    </div>
  );
}

