import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import LogoMark from '../ui/LogoMark.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 260);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function Loader({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-navy-950"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <LogoMark className="h-16 w-auto" ink="#FFFFFF" cut="#040A1C" accent="#1F78E6" />
            </motion.div>
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-royal-500 to-royal-300" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Layout({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [loading, setLoading] = useState(() => {
    try { return !sessionStorage.getItem('bw-loaded'); } catch { return false; }
  });

  useEffect(() => {
    if (!loading) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => {
      setLoading(false);
      try { sessionStorage.setItem('bw-loaded', '1'); } catch { /* storage unavailable */ }
    }, reduce ? 0 : 950);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900 focus:shadow-lift">Skip to content</a>
      <Loader show={loading} />
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-royal-600 via-royal-400 to-royal-300" />
      <ScrollManager />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
