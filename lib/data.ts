export type Category = 'earrings' | 'necklaces' | 'rings' | 'bangles' | 'bracelets' | 'sets' | 'mangalsutra';
export type Style = 'kundan' | 'pearl' | 'oxidised' | 'gold-plated' | 'american-diamond' | 'minimal' | 'traditional';
export type Tone = 'gold' | 'rose' | 'silver' | 'oxidised';
export type Occasion = 'ethnic' | 'western' | 'everyday';

export interface Product {
  id: string; slug: string; name: string; category: Category; style: Style;
  material: string; colour: string; tone: Tone; price: number; mrp: number;
  rating: number; reviews: number; occasion: Occasion[]; bestseller: boolean; isNew: boolean;
  stock: number; description: string;
  /** Optional real photos. Replace with your catalogue images: ['/products/a.jpg', ...]. When empty, illustrated artwork is shown. */
  images?: string[];
}

export const categoryLabel: Record<Category, string> = {
  earrings: 'Earrings', necklaces: 'Necklaces', rings: 'Rings', bangles: 'Bangles',
  bracelets: 'Bracelets', sets: 'Jewellery Sets', mangalsutra: 'Mangalsutra',
};
export const styleLabel: Record<Style, string> = {
  kundan: 'Kundan', pearl: 'Pearl', oxidised: 'Oxidised', 'gold-plated': 'Gold Plated',
  'american-diamond': 'American Diamond', minimal: 'Minimal Jewellery', traditional: 'Traditional Jewellery',
};
export const toneLabel: Record<Tone, string> = { gold: 'Antique Gold', rose: 'Rose Gold', silver: 'Silver', oxidised: 'Oxidised' };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
// name, category, style, material, colour, tone, price, mrp, rating, reviews, occasions (e/w/d), flags (b=bestseller, n=new)
type Row = [string, Category, Style, string, string, Tone, number, number, number, number, string, string];
const rows: Row[] = [
  ['Aarohi Kundan Jhumkas', 'earrings', 'kundan', 'Brass', 'Gold', 'gold', 1299, 2599, 4.8, 214, 'e', 'b'],
  ['Meher Pearl Drops', 'earrings', 'pearl', 'Alloy', 'Pearl White', 'gold', 899, 1799, 4.7, 342, 'ew', 'bn'],
  ['Zoya Oxidised Chandbalis', 'earrings', 'oxidised', 'Brass', 'Oxidised Silver', 'oxidised', 749, 1499, 4.5, 128, 'ed', 'n'],
  ['Ira Gold Hoops', 'earrings', 'minimal', 'Stainless Steel', 'Gold', 'gold', 599, 1199, 4.6, 512, 'wd', 'b'],
  ['Noor American Diamond Studs', 'earrings', 'american-diamond', '925 Silver', 'Silver', 'silver', 999, 1999, 4.9, 276, 'wd', 'n'],
  ['Tara Temple Earrings', 'earrings', 'traditional', 'Brass', 'Maroon', 'gold', 1499, 2999, 4.7, 97, 'e', ''],
  ['Rani Kundan Choker', 'necklaces', 'kundan', 'Brass', 'Gold', 'gold', 2299, 4599, 4.8, 188, 'e', 'b'],
  ['Mira Pearl Strand', 'necklaces', 'pearl', 'Alloy', 'Pearl White', 'gold', 1799, 3299, 4.7, 241, 'ew', 'bn'],
  ['Siya Layered Chain', 'necklaces', 'minimal', 'Stainless Steel', 'Gold', 'gold', 1199, 2399, 4.6, 305, 'wd', ''],
  ['Anaya Diamond Pendant', 'necklaces', 'american-diamond', '925 Silver', 'Silver', 'silver', 1599, 3199, 4.8, 163, 'w', 'n'],
  ['Devika Temple Haar', 'necklaces', 'traditional', 'Brass', 'Gold', 'gold', 2799, 5599, 4.9, 76, 'e', ''],
  ['Kavya Oxidised Statement Necklace', 'necklaces', 'oxidised', 'Brass', 'Oxidised Silver', 'oxidised', 1399, 2799, 4.4, 119, 'ew', ''],
  ['Elara Solitaire Ring', 'rings', 'american-diamond', '925 Silver', 'Silver', 'silver', 799, 1599, 4.8, 421, 'wd', 'b'],
  ['Vihana Floral Ring', 'rings', 'gold-plated', 'Brass', 'Rose Gold', 'rose', 499, 999, 4.5, 203, 'd', 'n'],
  ['Zia Pearl Cocktail Ring', 'rings', 'pearl', 'Alloy', 'Pearl White', 'gold', 649, 1299, 4.6, 87, 'w', ''],
  ['Rudhi Kundan Ring', 'rings', 'kundan', 'Brass', 'Gold', 'gold', 899, 1799, 4.7, 64, 'e', 'n'],
  ['Mayur Oxidised Ring', 'rings', 'oxidised', 'Brass', 'Oxidised Silver', 'oxidised', 549, 1099, 4.4, 52, 'ed', ''],
  ['Heer Kundan Bangle Set', 'bangles', 'kundan', 'Brass', 'Gold', 'gold', 1999, 3999, 4.8, 154, 'e', 'b'],
  ['Gulab Gold Plated Kada', 'bangles', 'gold-plated', 'Brass', 'Gold', 'gold', 1299, 2599, 4.6, 98, 'ed', ''],
  ['Ishani Oxidised Bangles', 'bangles', 'oxidised', 'Brass', 'Oxidised Silver', 'oxidised', 899, 1799, 4.5, 141, 'ed', ''],
  ['Pari Diamond Cuff', 'bangles', 'american-diamond', '925 Silver', 'Silver', 'silver', 1699, 3399, 4.7, 71, 'w', 'n'],
  ['Nysa Stackable Bangles', 'bangles', 'minimal', 'Stainless Steel', 'Rose Gold', 'rose', 799, 1599, 4.6, 233, 'd', 'b'],
  ['Sana Tennis Bracelet', 'bracelets', 'american-diamond', '925 Silver', 'Silver', 'silver', 1499, 2999, 4.9, 312, 'w', 'b'],
  ['Mehr Pearl Bracelet', 'bracelets', 'pearl', 'Alloy', 'Pearl White', 'gold', 899, 1799, 4.6, 119, 'ew', ''],
  ['Ayra Charm Bracelet', 'bracelets', 'minimal', 'Stainless Steel', 'Rose Gold', 'rose', 699, 1399, 4.5, 275, 'd', 'n'],
  ['Kiara Oxidised Cuff', 'bracelets', 'oxidised', 'Brass', 'Oxidised Silver', 'oxidised', 799, 1599, 4.4, 66, 'w', ''],
  ['Vanya Gold Chain Bracelet', 'bracelets', 'gold-plated', 'Brass', 'Gold', 'gold', 649, 1299, 4.6, 188, 'd', ''],
  ['Maharani Bridal Kundan Set', 'sets', 'kundan', 'Brass', 'Gold', 'gold', 4499, 8999, 4.9, 132, 'e', 'bn'],
  ['Aditi Pearl Necklace Set', 'sets', 'pearl', 'Alloy', 'Pearl White', 'gold', 2499, 4999, 4.8, 109, 'e', 'b'],
  ['Sanvi Diamond Party Set', 'sets', 'american-diamond', '925 Silver', 'Silver', 'silver', 2999, 5999, 4.8, 84, 'w', 'n'],
  ['Rudra Temple Set', 'sets', 'traditional', 'Brass', 'Maroon', 'gold', 3499, 6999, 4.7, 58, 'e', ''],
  ['Isha Minimal Pendant Set', 'sets', 'minimal', 'Stainless Steel', 'Gold', 'gold', 1299, 2599, 4.5, 164, 'wd', ''],
  ['Suhani Classic Mangalsutra', 'mangalsutra', 'traditional', 'Brass', 'Gold', 'gold', 1499, 2999, 4.8, 201, 'e', 'b'],
  ['Shrishti Diamond Mangalsutra', 'mangalsutra', 'american-diamond', '925 Silver', 'Silver', 'silver', 1999, 3999, 4.8, 93, 'ew', 'n'],
  ['Tanvi Minimal Mangalsutra', 'mangalsutra', 'minimal', 'Stainless Steel', 'Gold', 'gold', 1299, 2599, 4.7, 146, 'ed', ''],
  ['Aarna Two Line Mangalsutra', 'mangalsutra', 'gold-plated', 'Brass', 'Gold', 'gold', 1799, 3499, 4.6, 72, 'e', ''],
];

const blurb: Record<Category, string> = {
  earrings: 'Lightweight and comfortable for all-day wear, with a secure push-back closure.',
  necklaces: 'Sits beautifully at the collarbone and pairs with both festive and everyday outfits.',
  rings: 'Adjustable band that fits most finger sizes, finished with careful hand-set detailing.',
  bangles: 'Smooth inner finish for comfort, crafted to stack or to be worn as a statement.',
  bracelets: 'A delicate yet distinctive wrist piece with a secure lobster clasp.',
  sets: 'A coordinated set designed to be worn together, ready to gift in a VAISHN box.',
  mangalsutra: 'A contemporary take on the auspicious classic, designed for daily wear.',
};
const styleNote: Record<Style, string> = {
  kundan: 'Inspired by royal Rajasthani craft with hand-set kundan-style stones.',
  pearl: 'Lustrous faux pearls with a soft, luminous sheen.',
  oxidised: 'An antique oxidised finish with rich, earthy character.',
  'gold-plated': 'Finished with a durable 1 micron gold plating for a warm glow.',
  'american-diamond': 'Brilliant-cut zircon stones that catch the light like diamonds.',
  minimal: 'Clean lines and understated design for effortless layering.',
  traditional: 'Temple-inspired motifs rooted in South Indian heritage.',
};

const productImagesMap: Partial<Record<string, string[]>> = {
  'aarohi-kundan-jhumkas': ['/Earrings.jpg'],
  'noor-american-diamond-studs': ['/Earrings.jpg'],
  'meher-pearl-drops': ['/Earrings.jpg'],
  'zoya-oxidised-chandbalis': ['/Earrings.jpg'],
  'ira-gold-hoops': ['/Earrings.jpg'],
  'tara-temple-earrings': ['/Earrings.jpg'],

  'rani-kundan-choker': ['/Necklace.jpg'],
  'anaya-diamond-pendant': ['/Necklace.jpg'],
  'mira-pearl-strand': ['/Necklace.jpg'],
  'siya-layered-chain': ['/Necklace.jpg'],
  'devika-temple-haar': ['/Necklace.jpg'],
  'kavya-oxidised-statement-necklace': ['/Necklace.jpg'],

  'elara-solitaire-ring': ['/ring.jpg'],
  'vihana-floral-ring': ['/ring.jpg'],
  'zia-pearl-cocktail-ring': ['/ring.jpg'],
  'rudhi-kundan-ring': ['/ring.jpg'],
  'mayur-oxidised-ring': ['/ring.jpg'],

  'sana-tennis-bracelet': ['/bracelet.jpg'],
  'mehr-pearl-bracelet': ['/bracelet.jpg'],
  'ayra-charm-bracelet': ['/bracelet.jpg'],
  'kiara-oxidised-cuff': ['/bracelet.jpg'],
  'vanya-gold-chain-bracelet': ['/bracelet.jpg'],

  'heer-kundan-bangle-set': ['/bracelet.jpg'],
  'gulab-gold-plated-kada': ['/bracelet.jpg'],
  'ishani-oxidised-bangles': ['/bracelet.jpg'],
  'pari-diamond-cuff': ['/bracelet.jpg'],
  'nysa-stackable-bangles': ['/bracelet.jpg'],

  'maharani-bridal-kundan-set': ['/background image.jpg', '/Necklace.jpg', '/Earrings.jpg', '/ring.jpg'],
  'aditi-pearl-necklace-set': ['/Necklace.jpg', '/Earrings.jpg'],
  'sanvi-diamond-party-set': ['/Necklace.jpg', '/Earrings.jpg', '/bracelet.jpg'],
  'rudra-temple-set': ['/Necklace.jpg', '/Earrings.jpg'],
  'isha-minimal-pendant-set': ['/Necklace.jpg', '/Earrings.jpg'],

  'suhani-classic-mangalsutra': ['/Necklace.jpg'],
  'shrishti-diamond-mangalsutra': ['/Necklace.jpg'],
  'tanvi-minimal-mangalsutra': ['/Necklace.jpg'],
  'aarna-two-line-mangalsutra': ['/Necklace.jpg'],
};

export const products: Product[] = rows.map((r, i) => {
  const [name, category, style, material, colour, tone, price, mrp, rating, reviews, occ, flags] = r;
  const occasion: Occasion[] = [];
  if (occ.includes('e')) occasion.push('ethnic');
  if (occ.includes('w')) occasion.push('western');
  if (occ.includes('d')) occasion.push('everyday');
  const stock = reviews % 9 === 0 ? 0 : reviews % 5 === 0 ? 3 : 12 + (reviews % 15);
  const id = slugify(name);
  const images = productImagesMap[id] ?? (
    category === 'earrings' ? ['/Earrings.jpg'] :
    category === 'necklaces' ? ['/Necklace.jpg'] :
    category === 'bracelets' || category === 'bangles' ? ['/bracelet.jpg'] :
    category === 'rings' ? ['/ring.jpg'] :
    category === 'sets' ? ['/background image.jpg', '/Necklace.jpg'] :
    ['/Necklace.jpg']
  );
  return {
    id, slug: id, name, category, style, material, colour, tone, price, mrp, rating, reviews,
    occasion, bestseller: flags.includes('b'), isNew: flags.includes('n') || i % 11 === 0, stock,
    description: `${name} brings together ${styleNote[style].toLowerCase()} ${blurb[category]}`,
    images,
  };
});

export const byId = (id: string) => products.find((p) => p.id === id);
export const discountPct = (p: { price: number; mrp: number }) => Math.round(((p.mrp - p.price) / p.mrp) * 100);
export const formatPrice = (n: number) => '₹' + n.toLocaleString('en-IN');

export interface Collection { title: string; desc: string; filter: (p: Product) => boolean }
const cat = (c: Category) => (p: Product) => p.category === c;
const sty = (s: Style) => (p: Product) => p.style === s;
export const collections: Record<string, Collection> = {
  'new-arrivals': { title: 'New Arrivals', desc: 'Fresh from the atelier — the latest additions to the VAISHN collection.', filter: (p) => p.isNew },
  'best-sellers': { title: 'Best Sellers', desc: 'The pieces our customers love most, again and again.', filter: (p) => p.bestseller },
  ethnic: { title: 'Ethnic Jewellery', desc: 'Heritage-inspired designs for weddings, festivals and celebrations.', filter: (p) => p.occasion.includes('ethnic') },
  western: { title: 'Western Jewellery', desc: 'Modern, sparkling pieces for parties, brunches and nights out.', filter: (p) => p.occasion.includes('western') },
  'everyday-wear': { title: 'Everyday Wear', desc: 'Light, skin-friendly pieces designed to be worn from morning to midnight.', filter: (p) => p.occasion.includes('everyday') },
  festive: { title: 'The Festive Edit', desc: 'Rich kundan and temple jewellery to light up your celebrations.', filter: (p) => p.occasion.includes('ethnic') && ['kundan', 'traditional', 'pearl'].includes(p.style) },
  earrings: { title: 'Earrings', desc: 'From statement jhumkas to everyday studs and hoops.', filter: cat('earrings') },
  necklaces: { title: 'Necklaces', desc: 'Chokers, pendants and layered chains in every mood.', filter: cat('necklaces') },
  rings: { title: 'Rings', desc: 'Adjustable rings from delicate solitaires to bold cocktail pieces.', filter: cat('rings') },
  bangles: { title: 'Bangles', desc: 'Stackable bangles, kadas and cuffs for every wrist.', filter: cat('bangles') },
  bracelets: { title: 'Bracelets', desc: 'Tennis, charm and chain bracelets with a secure clasp.', filter: cat('bracelets') },
  'jewellery-sets': { title: 'Jewellery Sets', desc: 'Perfectly matched sets that are ready to wear and ready to gift.', filter: cat('sets') },
  mangalsutra: { title: 'Mangalsutra', desc: 'Modern mangalsutras that honour tradition and suit everyday life.', filter: cat('mangalsutra') },
  'all-jewellery': { title: 'All Jewellery', desc: 'The complete VAISHN collection of premium Indian jewellery.', filter: () => true },
  offers: { title: 'Offers', desc: 'Our best deals — up to 50% off on selected jewellery.', filter: (p) => discountPct(p) >= 50 },
  kundan: { title: 'Kundan Jewellery', desc: 'Regal kundan-style pieces with a jewel-box colour palette.', filter: sty('kundan') },
  pearl: { title: 'Pearl Jewellery', desc: 'Timeless pearls for a soft, luminous look.', filter: sty('pearl') },
  oxidised: { title: 'Oxidised Jewellery', desc: 'Earthy oxidised finishes with bohemian soul.', filter: sty('oxidised') },
  'gold-plated': { title: 'Gold Plated Jewellery', desc: 'Warm, glowing gold-plated pieces with lasting shine.', filter: sty('gold-plated') },
  'american-diamond': { title: 'American Diamond Jewellery', desc: 'Dazzling AD pieces with brilliant sparkle.', filter: sty('american-diamond') },
  minimal: { title: 'Minimal Jewellery', desc: 'Understated designs for effortless everyday style.', filter: sty('minimal') },
  traditional: { title: 'Traditional Jewellery', desc: 'Temple and heritage designs rooted in Indian craft.', filter: sty('traditional') },
  'under-499': { title: 'Jewellery Under ₹499', desc: 'Affordable, everyday sparkle under ₹499.', filter: (p) => p.price <= 499 },
  'under-999': { title: 'Jewellery Under ₹999', desc: 'Handpicked premium designs under ₹999.', filter: (p) => p.price <= 999 },
  'under-1499': { title: 'Jewellery Under ₹1,499', desc: 'Statement pieces crafted for celebration under ₹1,499.', filter: (p) => p.price <= 1499 },
  'under-1999': { title: 'Jewellery Under ₹1,999', desc: 'Luxury festive and bridal designs under ₹1,999.', filter: (p) => p.price <= 1999 },
};

type NavLink = [string, string];
export interface NavItem { label: string; href: string; mega?: { cols: { title: string; links: NavLink[] }[]; feature: string } }
const catLinks: NavLink[] = [['Earrings', '/collections/earrings'], ['Necklaces', '/collections/necklaces'], ['Rings', '/collections/rings'], ['Bangles', '/collections/bangles'], ['Bracelets', '/collections/bracelets'], ['Jewellery Sets', '/collections/jewellery-sets'], ['Mangalsutra', '/collections/mangalsutra']];
const styleLinks: NavLink[] = [['Kundan', '/collections/kundan'], ['Pearl', '/collections/pearl'], ['Oxidised', '/collections/oxidised'], ['Gold Plated', '/collections/gold-plated'], ['American Diamond', '/collections/american-diamond'], ['Minimal', '/collections/minimal'], ['Traditional', '/collections/traditional']];
export const nav: NavItem[] = [
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Best Sellers', href: '/collections/best-sellers' },
  { label: 'Ethnic', href: '/collections/ethnic', mega: { feature: 'maharani-bridal-kundan-set', cols: [{ title: 'Shop Ethnic', links: [['Necklaces', '/collections/necklaces'], ['Earrings', '/collections/earrings'], ['Bangles', '/collections/bangles'], ['Mangalsutra', '/collections/mangalsutra'], ['Jewellery Sets', '/collections/jewellery-sets']] }, { title: 'By Style', links: [['Kundan', '/collections/kundan'], ['Traditional', '/collections/traditional'], ['Pearl', '/collections/pearl'], ['The Festive Edit', '/collections/festive']] }] } },
  { label: 'Western', href: '/collections/western', mega: { feature: 'sana-tennis-bracelet', cols: [{ title: 'Shop Western', links: [['Earrings', '/collections/earrings'], ['Necklaces', '/collections/necklaces'], ['Rings', '/collections/rings'], ['Bracelets', '/collections/bracelets']] }, { title: 'By Style', links: [['American Diamond', '/collections/american-diamond'], ['Minimal', '/collections/minimal'], ['Pearl', '/collections/pearl']] }] } },
  { label: 'Everyday Wear', href: '/collections/everyday-wear', mega: { feature: 'ira-gold-hoops', cols: [{ title: 'Shop Everyday', links: [['Earrings', '/collections/earrings'], ['Rings', '/collections/rings'], ['Bangles', '/collections/bangles'], ['Bracelets', '/collections/bracelets']] }, { title: 'By Style', links: [['Minimal', '/collections/minimal'], ['Gold Plated', '/collections/gold-plated'], ['Oxidised', '/collections/oxidised']] }] } },
  { label: 'Necklaces', href: '/collections/necklaces', mega: { feature: 'rani-kundan-choker', cols: [{ title: 'Explore', links: [['All Necklaces', '/collections/necklaces'], ['Jewellery Sets', '/collections/jewellery-sets'], ['Mangalsutra', '/collections/mangalsutra'], ['New Arrivals', '/collections/new-arrivals']] }, { title: 'By Style', links: styleLinks.slice(0, 5) }] } },
  { label: 'Earrings', href: '/collections/earrings', mega: { feature: 'aarohi-kundan-jhumkas', cols: [{ title: 'Explore', links: [['All Earrings', '/collections/earrings'], ['Best Sellers', '/collections/best-sellers'], ['New Arrivals', '/collections/new-arrivals']] }, { title: 'By Style', links: styleLinks.slice(0, 5) }] } },
  { label: 'All Jewellery', href: '/collections/all-jewellery', mega: { feature: 'meher-pearl-drops', cols: [{ title: 'By Category', links: catLinks }, { title: 'By Style', links: styleLinks }] } },
  { label: 'Offers', href: '/collections/offers' },
];
export const announcements = ['Free shipping on orders above ₹1,499', 'Use code VAISHN10 for 10% off your first order', 'New arrivals: The Festive Edit is here', 'Easy 15-day returns on every order'];
