import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 px-6 md:px-12 bg-background text-text-main relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-12 space-y-12 mb-20">
            <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-[0.8] text-text-main">
               SIDHARTH P L
            </h2>
            <div className="h-0.5 w-full bg-text-main opacity-10" />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <p className="text-xl md:text-2xl font-medium opacity-60 max-w-md italic leading-relaxed text-text-muted">
              "Combining artificial intelligence with human-centric design to build the next generation of digital infrastructure."
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Github size={24} />, href: "https://github.com/Sidharth-Prabhu" },
                { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/sidharth-prabhu" },
                { icon: <Mail size={24} />, href: "mailto:mailtosidharth.me@gmail.com" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full border-2 border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-background transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12 lg:justify-items-end">
            <div className="space-y-8">
              <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">NAVIGATION</p>
              <ul className="space-y-4">
                {['ABOUT', 'SERVICES', 'PROJECTS', 'BLOG', 'CONTACT'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-lg font-black tracking-tight hover:text-accent transition-colors flex items-center gap-2 group uppercase">
                      {item}
                      <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-32 pt-12 border-t border-text-main/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
             &copy; 2026 SIDHARTH P L • VISUAL POETRY • ALL RIGHTS RESERVED
           </p>
           <button
            onClick={scrollToTop}
            className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all"
          >
            <ArrowUp size={28} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
