'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function Preloader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem('vaishn-intro')) return; sessionStorage.setItem('vaishn-intro', '1'); } catch {}
    setShow(true); const t = setTimeout(() => setShow(false), 2100); return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div initial={{ opacity: 0, scale: 0.7, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="VAISHN" className="h-32 w-32 object-contain md:h-40 md:w-40" style={{ mixBlendMode: 'multiply' }} />
          </motion.div>
          <motion.p initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.5em' }} transition={{ delay: 0.5, duration: 1.2 }} className="mt-4 font-display text-3xl font-semibold text-burgundy">VAISHN</motion.p>
          <div className="mt-6 h-px w-40 overflow-hidden bg-gold/30"><motion.div className="h-full bg-gold" initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 1.7, ease: 'easeInOut' }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
