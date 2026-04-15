import { motion } from 'framer-motion';
import { User, Code, Terminal, Brain, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const About = () => {
  const { isDark } = useTheme();
  const highlights = [
    'AI & DATA SCIENCE ENG',
    'FOUNDER @ FRISSCO',
    'SYSTEMS PROGRAMMER',
    'SECURITY RESEARCHER',
    'FULL STACK DEVELOPER'
  ];

  return (
    <section id="about" className="relative py-32 bg-background text-text-main overflow-hidden">
      {/* Repetitious Background Text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-around pointer-events-none opacity-[0.03] select-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`marquee text-[20vw] font-black leading-none ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
            ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • ABOUT • 
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Primary Title: Focal Point */}
          <div className="lg:col-span-12 text-center mb-28">
             <motion.h2 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-[11.5vw] md:text-[14vw] font-black tracking-tighter leading-[0.8] uppercase"
             >
                ABOUT<br />
                <span className="text-accent text-outline">SIDHARTH</span>
             </motion.h2>
          </div>

          {/* Bottom: Text Content & Startup */}
          <div className="lg:col-span-12 space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8 space-y-8">
                  <p className="text-2xl md:text-[2.25rem] font-medium leading-tight opacity-90">
                    I am an Artificial Intelligence and Data Science Engineering student at Rajalakshmi Institute of Technology with a passion for building robust digital infrastructure.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <p className="text-xl md:text-[1.4rem] font-medium leading-relaxed opacity-70">
                      My work spans the entire stack—from developing low-level kernels like <span className="text-accent">ShOS</span> in C and Assembly to architecting high-performance security platforms like <span className="text-accent">ScopeIntel</span>.
                    </p>
                    <p className="text-xl md:text-[1.4rem] font-medium leading-relaxed opacity-70">
                      As the founder of <span className="font-bold">Frissco Digital Ventures</span>, I bridge the gap between complex technology and real-world business needs. Recognized at the <span className="italic">Infosys TechZooka Innovation Summit 2024</span>.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 lg:pl-10 border-l border-text-main/10 py-2">
                  <div className="grid grid-cols-1 gap-5">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                        <span className="text-[13px] font-black tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Startup Section: Monolithic Robust Full-Width Layout */}
              <div className="pt-20 border-t border-text-main/10">
                 <div className="relative bg-surface/40 border-2 border-text-main/5 overflow-hidden">
                    {/* Section Header: Bold & Integrated */}
                    <div className="p-8 md:p-14 border-b border-text-main/5 flex flex-col md:flex-row justify-between gap-10">
                       <div className="space-y-5 max-w-4xl">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-accent flex items-center justify-center">
                                <Code size={20} className="text-background" />
                              </div>
                             <span className="text-[13px] font-black tracking-[0.4em] uppercase text-accent">Venture Portfolio // Protocol 01</span>
                          </div>
                          <h3 className="text-6xl md:text-[9.5vw] font-black tracking-tighter uppercase leading-[0.75]">
                             FRISSCO<br />
                             <span className="text-outline opacity-40">DIGITAL</span>
                          </h3>
                       </div>
                       <div className="md:w-1/3 flex flex-col justify-end">
                          <div className="space-y-5 border-l-4 border-accent pl-8 py-1">
                             <p className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Executive Vision</p>
                             <p className="text-xl md:text-2xl italic font-medium opacity-80 leading-snug">
                               "Engineering high-performance digital ecosystems for the next generation."
                             </p>
                          </div>
                       </div>
                    </div>

                    {/* Main Content Area: Structural Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                       {/* Brand Anchor: Animated Pattern Background */}
                       <div className="lg:col-span-5 relative p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-text-main/5 overflow-hidden group">
                          {/* Animated Pattern Layer */}
                          <div className="absolute inset-0 bg-[#0a0a0a] opacity-100" />
                          <div 
                            className="absolute inset-0 opacity-[0.15]"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                              backgroundSize: '60px 60px',
                              animation: 'patternMove 20s linear infinite'
                            }}
                          />
                          <style dangerouslySetInnerHTML={{ __html: `
                            @keyframes patternMove {
                              from { background-position: 0 0; }
                              to { background-position: 60px 60px; }
                            }
                          `}} />

                          {/* Logo with Enhanced Visibility - Forced White for Dark Background */}
                          <div className="relative z-10 h-full flex items-center justify-center">
                            <img 
                              src="/images/frissco_logo.png" 
                              alt="FRISSCO Logo" 
                              className="h-36 md:h-56 object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-1000 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            />
                          </div>
                       </div>

                       {/* Description & Capabilities */}
                       <div className="lg:col-span-7">
                          <div className="p-10 md:p-16 space-y-10">
                             <div className="space-y-6">
                                <p className="text-xl md:text-2xl font-medium opacity-90 leading-relaxed">
                                   Frissco Digital Ventures operates as a specialized innovation lab, delivering end-to-end software ecosystems. We leverage AI, low-level systems engineering, and modern web architectures to solve complex business challenges.
                                </p>
                                <div className="flex">
                                   <a 
                                     href="https://www.frissco.net" 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="group/btn relative px-8 py-4 bg-accent text-background font-black uppercase tracking-[0.3em] text-[9px] flex items-center gap-5 hover:bg-text-main transition-all duration-700 overflow-hidden"
                                   >
                                      <span className="relative z-10">Visit Official Platform</span>
                                      <ArrowUpRight size={18} className="relative z-10 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                                      {/* Hover Background Effect */}
                                      <div className="absolute inset-0 bg-text-main translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                                   </a>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 border-t border-text-main/5 items-center">
                                <div className="md:col-span-7 space-y-5">
                                   <h4 className="text-[13px] font-black uppercase tracking-[0.3em] text-accent">Core Competencies</h4>
                                   <ul className="space-y-3 text-lg md:text-xl font-medium opacity-70">
                                      <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-accent rotate-45" /> Custom Enterprise Software</li>
                                      <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-accent rotate-45" /> AI & ML Integration</li>
                                      <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 bg-accent rotate-45" /> Systems Architecture</li>
                                   </ul>
                                </div>
                                <div className="md:col-span-5 flex flex-col items-center justify-center group py-6">
                                   <div className="relative mb-6">
                                      {/* Decorative Stamp Ring */}
                                      <div className="absolute inset-[-20%] border-2 border-dashed border-accent/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-accent/40 transition-colors" />
                                      <img 
                                        src={isDark ? "/images/msme_logo_white.png" : "/images/msme_logo.png"} 
                                        alt="MSME Logo" 
                                        className="h-28 md:h-36 object-contain transition-all duration-1000 group-hover:scale-110" 
                                      />
                                   </div>
                                   <div className="text-center space-y-2">
                                      <div className="flex items-center justify-center gap-2">
                                         <div className="h-[1px] w-5 bg-accent/30" />
                                         <p className="text-[9px] font-black uppercase tracking-[0.5em] text-accent">Official Certification</p>
                                         <div className="h-[1px] w-5 bg-accent/30" />
                                      </div>
                                      <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">
                                         Govt. Certified<br />
                                         <span className="text-accent">MSME Venture</span>
                                      </h4>
                                      <p className="text-[8px] font-bold opacity-30 tracking-widest uppercase">Registry ID: 2024-ALPHA-01</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Footer Ticker: Stats & Meta */}
                    <div className="bg-text-main text-background py-6 px-10 flex flex-wrap justify-around items-center gap-10 overflow-hidden border-t border-text-main/10">
                       {[
                         { label: 'ESTABLISHED', val: '2023' },
                         { label: 'COMPLETED PROJECTS', val: '12+' },
                         { label: 'GEOGRAPHIC REACH', val: 'GLOBAL' },
                         { label: 'CORE ENGINE', val: 'AI-DRIVEN' }
                       ].map((stat, i) => (
                         <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
                            <span className="text-[9px] font-black tracking-[0.4em] opacity-40 uppercase">{stat.label}</span>
                            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-accent">{stat.val}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>        </div>
      </div>
    </section>
  );
};

export default About;
