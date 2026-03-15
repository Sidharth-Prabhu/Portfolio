import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, Code } from 'lucide-react';

const Hero = () => {
  const [tagline, setTagline] = useState('');
  const fullTagline = "B.Tech AI & Data Science Student | Founder @ Frissco Digital Ventures";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullTagline.length) {
      const timeout = setTimeout(() => {
        setTagline(prev => prev + fullTagline[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const codeBlock = `
const developer = {
  name: "Sidharth P L",
  role: "AI & Data Science Student",
  expertise: ["Java", "Python", "Full Stack"],
  venture: "Frissco Digital Ventures"
};

function build(idea) {
  return idea.toReality();
}
`;

  return (
    <section id="home" className="min-h-screen pt-20 flex items-center px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Sidharth <span className="text-primary dark:text-dark-primary">P L</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-black/60 dark:text-white/60">
              Founder & Software Developer
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="h-12">
            <p className="text-lg md:text-xl font-mono opacity-80 leading-relaxed border-r-2 border-primary animate-pulse inline-block">
              {tagline}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-primary text-white font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Code size={20} />
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="px-8 py-3 rounded-full bg-black/5 dark:bg-white/5 font-semibold flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all border border-black/10 dark:border-white/10 active:scale-95"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden md:flex items-center justify-center relative"
        >
          <div className="w-full h-[400px] bg-slate-950 rounded-2xl overflow-hidden p-4 shadow-2xl relative z-10 border border-white/5">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-2 text-xs font-mono text-white/40">portfolio.js</div>
            </div>
            <pre className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-slate-300">
              <code className="text-slate-300">{codeBlock}</code>
            </pre>
          </div>
          {/* Animated background shape */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              borderRadius: ["20%", "50%", "20%"]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-3xl -z-0 rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
