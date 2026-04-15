import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Education from '../components/Education/Education';
import Achievements from '../components/Achievements/Achievements';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden selection:bg-primary/30 min-h-screen bg-background text-text-main transition-colors">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] origin-left"
        style={{ scaleX }}
      />
      
      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[150px] rounded-full animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      <Navbar />
      <main className="relative z-10 space-y-0">
        <Hero />
        <div className="bg-surface">
          <About />
        </div>
        <Skills />
        <div className="bg-surface">
          <Education />
        </div>
        <Projects />
        <div className="bg-surface">
          <Experience />
        </div>
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
