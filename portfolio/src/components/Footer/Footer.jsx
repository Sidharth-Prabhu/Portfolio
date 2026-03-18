import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-4 bg-background dark:bg-dark-background border-t border-black/5 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-3xl font-extrabold tracking-tighter text-primary dark:text-dark-primary italic">Sidharth P L</h2>
          <p className="text-lg opacity-60 font-medium text-center max-w-sm text-black dark:text-white">
            B.Tech AI & Data Science Student | Founder @ Frissco Digital Ventures
          </p>
        </div>

        <div className="flex gap-10">
          <a href="https://github.com/Sidharth-Prabhu" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full glass hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-primary/20 text-black dark:text-white">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/sidharth-prabhu" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full glass hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-primary/20 text-black dark:text-white">
            <Linkedin size={24} />
          </a>
          <a href="mailto:mailtosidharth.me@gmail.com" className="p-4 rounded-full glass hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-primary/20 text-black dark:text-white">
            <Mail size={24} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-black/5 dark:border-white/5 w-full pt-12">
          <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em] text-black dark:text-white flex items-center gap-3">
            &copy; 2026 Sidharth P L • All Rights Reserved
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 opacity-60">
              v1.0-beta
            </span>
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="absolute -top-8 right-12 p-5 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
