import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PREVIOUS WORKS', href: '#venture' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
    { name: 'DOWNLOAD CV', href: '/resume.pdf', download: 'Sidharth_PL_Resume.pdf' },
  ];

  return (
    <header className="fixed top-4 md:top-5 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={`pixel-nav-capsule-dynamic pointer-events-auto relative flex items-center justify-between gap-5 md:gap-9 px-5 sm:px-6 py-2.5 rounded-full border transition-all duration-300 ${
          isDark
            ? 'bg-[#111827] text-white border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            : 'bg-white text-slate-900 border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Brand: Rounded Star Badge + Name */}
        <a
          href="#home"
          className="flex items-center gap-3 group shrink-0"
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center p-1.5 group-hover:scale-105 transition-all border ${
              isDark
                ? 'bg-indigo-950/60 border-indigo-500/30'
                : 'bg-indigo-50 border-indigo-200/70'
            }`}
          >
            <img 
              src="/subtle-logo.svg" 
              alt="✦" 
              className="w-4 h-4 object-contain" 
            />
          </div>
          <span
            className={`font-bold text-sm md:text-base tracking-tight font-sans transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Sidharth P L
          </span>
        </a>

        {/* Desktop Links: Dark text in light theme, Light text in dark theme */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              {...(link.download ? { download: link.download } : {})}
              className={`font-mono text-[11px] font-bold tracking-[0.14em] transition-colors uppercase whitespace-nowrap ${
                isDark
                  ? 'text-slate-200 hover:text-indigo-400'
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Tools: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'text-slate-200 hover:bg-slate-800 hover:text-indigo-400'
                : 'text-slate-700 hover:bg-slate-100 hover:text-indigo-600'
            }`}
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'text-white hover:bg-slate-800'
                : 'text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full left-0 right-0 mt-3 p-5 rounded-2xl border shadow-xl flex flex-col gap-2 md:hidden ${
                isDark
                  ? 'bg-[#111827] text-white border-white/10 shadow-2xl'
                  : 'bg-white text-slate-900 border-slate-200 shadow-xl'
              }`}
            >
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  {...(link.download ? { download: link.download } : {})}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-xs font-bold tracking-widest py-2 px-3 rounded-lg transition-colors uppercase ${
                    isDark
                      ? 'text-slate-200 hover:text-indigo-400 hover:bg-slate-800'
                      : 'text-slate-800 hover:text-indigo-600 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
