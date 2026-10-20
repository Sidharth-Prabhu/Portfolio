import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 px-6 md:px-12 bg-background text-text-main relative overflow-hidden border-t border-text-main/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-12 space-y-8 mb-12">
            <h2 className="text-[10vw] font-black tracking-tighter uppercase leading-[0.85] text-text-main">
               SIDHARTH P L
            </h2>
            <div className="h-0.5 w-full bg-text-main opacity-10" />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <p className="text-xl md:text-2xl font-normal opacity-70 max-w-lg leading-relaxed text-text-muted">
              "AI & Data Science student and self-taught systems engineer building end-to-end software, bare-metal systems, and scalable platforms."
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Github size={22} />, href: "https://github.com/Sidharth-Prabhu", label: "GitHub" },
                { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/sidharth-prabhu", label: "LinkedIn" },
                { icon: <Mail size={22} />, href: "mailto:mail@sidharthprabhu.co.in", label: "Email" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-text-main/20 flex items-center justify-center hover:bg-text-main hover:text-background transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:justify-items-end">
            <div className="space-y-6">
              <p className="text-[10px] font-mono font-black tracking-[0.4em] uppercase text-accent">NAVIGATION</p>
              <ul className="space-y-3 font-mono text-sm">
                {[
                  { name: 'ABOUT', href: '#about' },
                  { name: 'VENTURE', href: '#venture' },
                  { name: 'EDUCATION', href: '#education' },
                  { name: 'PROJECTS', href: '#projects' },
                  { name: 'SKILLS', href: '#skills' },
                  { name: 'CONTACT', href: '#contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="font-bold tracking-wider hover:text-accent transition-colors flex items-center gap-1.5 group uppercase text-text-muted hover:text-accent">
                      {item.name}
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-24 pt-10 border-t border-text-main/10 flex flex-col sm:flex-row justify-between items-center gap-6">
           <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted/60">
             &copy; 2026 SIDHARTH P L • SYSTEMS & AI ENGINEER • ALL RIGHTS RESERVED
           </p>
           <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowUp size={22} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
