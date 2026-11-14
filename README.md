# VAISHN — Premium Jewellery Storefront

Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion · Lucide

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Replace sample products
All catalogue data lives in `lib/data.ts`. Add real photos per product with `images: ['/products/a.jpg', ...]`
(files go in `public/products/`). Products without `images` use the built-in illustrated artwork.
Cart, wishlist, coupon and recently viewed items persist in localStorage.
Test coupons: VAISHN10, WELCOME15, FLAT200.

