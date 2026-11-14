import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import BrandBanner from '@/components/BrandBanner';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import MobileBottomNav from '@/components/MobileBottomNav';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#FAF6F0',
};

export const metadata: Metadata = {
  title: 'VAISHN — Premium Indian Jewellery',
  description: 'Premium, elegant and modern Indian jewellery. Kundan, pearl, American diamond and more.',
  icons: { icon: '/logo.jpg' },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VAISHN',
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-gold selection:text-white">
        <StoreProvider>
          <Preloader />
          <ScrollProgress />
          {/* Fixed Sticky Top Navigation (Announcement Bar + Header pinned at top of viewport) */}
          <div className="sticky top-0 z-50 w-full bg-[#FAF6F0]">
            <AnnouncementBar />
            <Header />
          </div>
          <main className="pb-16 md:pb-0 min-h-[60vh]">{children}</main>
          <BrandBanner />
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <MobileBottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
