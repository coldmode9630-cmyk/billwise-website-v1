import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import Button from '../components/ui/Button.jsx';
import LogoMark from '../components/ui/LogoMark.jsx';

export default function NotFound() {
  useSEO({ title: 'Page Not Found', path: '/404' });
  return (
    <PageTransition>
      <section className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-navy-950 px-4 pt-24 text-center">
        <div aria-hidden className="absolute inset-0 grid-bg-dark mask-fade" />
        <div className="relative">
          <LogoMark className="mx-auto h-16 w-auto animate-float" ink="#fff" cut="#040A1C" accent="#1F78E6" />
          <p className="mt-8 font-serif text-7xl italic text-royal-300">404</p>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">This page couldn’t be found.</h1>
          <p className="mt-3 text-mist-300">The page may have moved, or the link may be incorrect.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" arrow>Back to Home</Button>
            <Button to="/contact" variant="ghostDark">Contact Us</Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
