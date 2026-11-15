import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import Hero from '../components/home/Hero.jsx';
import Marquee from '../components/home/Marquee.jsx';
import Intro from '../components/home/Intro.jsx';
import ServicesOverview from '../components/home/ServicesOverview.jsx';
import WhyChoose from '../components/home/WhyChoose.jsx';
import Process from '../components/home/Process.jsx';
import FAQ from '../components/home/FAQ.jsx';
import FinalCTA from '../components/home/FinalCTA.jsx';

export default function Home() {
  useSEO({ path: '/' });
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <Intro />
      <ServicesOverview />
      <WhyChoose />
      <Process />
      <FAQ />
      <FinalCTA />
    </PageTransition>
  );
}
