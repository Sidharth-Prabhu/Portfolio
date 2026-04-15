import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#skills' },
    { name: 'PORTFOLIO', href: '#projects' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ThemeToggle = ({ mobile = false }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`${
        mobile ? 'p-4 border border-text-main/10' : 'p-2'
      } rounded-full hover:bg-text-main/5 transition-colors relative`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: 20, opacity: 0, rotate: 45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: -45 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun size={mobile ? 32 : 20} /> : <Moon size={mobile ? 32 : 20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 overflow-hidden ${
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-lg border-b border-text-main/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center text-text-main">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-primary" />
            <div className="w-6 h-6 rounded-full border-2 border-primary" />
          </div>
        </motion.div>

        {/* Centered Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-black tracking-[0.3em] hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col gap-1.5 w-6 items-end"
          >
            <div className={`h-0.5 bg-text-main transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'}`} />
            <div className={`h-0.5 bg-text-main transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`} />
            <div className={`h-0.5 bg-text-main transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[90] flex flex-col items-center justify-center space-y-12"
          >
            {links.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-6xl text-text-main font-black tracking-tighter hover:text-accent transition-colors uppercase"
              >
                {link.name}
              </motion.a>
            ))}
            <ThemeToggle mobile />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

