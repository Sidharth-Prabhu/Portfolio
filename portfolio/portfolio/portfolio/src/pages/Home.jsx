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

const BreathingBackground = () => {
  const dots = [];
  const rows = 15;
  const cols = 15;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const dist = Math.sqrt(Math.pow(i - rows / 2, 2) + Math.pow(j - cols / 2, 2));
      dots.push({ i, j, delay: dist * 0.15 });
    }
  }

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-40 dark:opacity-20">
      <div 
        className="absolute inset-0 grid gap-6 justify-center items-center"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` 
        }}
      >
        {dots.map((dot, idx) => (
          <div
            key={idx}
            className="w-1 h-1 rounded-full bg-primary mx-auto animate-breathe"
            style={{
              animationDelay: `${dot.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative overflow-x-hidden selection:bg-primary/30 min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <BreathingBackground />
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
