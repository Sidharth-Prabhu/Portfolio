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

              {/* Previous Works Section: Multi-item showcase */}
              <div id="venture" className="pt-20 border-t border-text-main/10 space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white">
                        <Code size={18} />
                      </div>
                      <span className="text-[12px] font-mono font-bold tracking-[0.35em] uppercase text-accent">
                        TRACK RECORD & ENGAGEMENTS
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-text-main">
                      PREVIOUS <span className="text-outline">WORKS</span>
                    </h3>
                  </div>
                  <p className="text-sm font-mono text-text-muted uppercase tracking-widest">
                    SELECTED CLIENT, STARTUP & INSTITUTIONAL ROLES
                  </p>
                </div>

                {/* Side-by-side 2-column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  {/* Card 1: Frissco Digital Ventures */}
                  <div className="relative asym-rounded border-2 border-text-main/10 bg-surface/50 overflow-hidden shadow-lg transition-all hover:border-accent/40 flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="p-6 sm:p-8 border-b border-text-main/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-accent block">
                            VENTURE // FOUNDER & SDE // 2020 – PRESENT
                          </span>
                          <h4 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-text-main">
                            FRISSCO<br />
                            <span className="text-outline">DIGITAL VENTURES</span>
                          </h4>
                        </div>
                        <a
                          href="https://www.frissco.net"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-4 py-2.5 rounded-lg bg-accent text-white font-mono text-[11px] font-bold tracking-widest uppercase hover:scale-105 transition-transform flex items-center gap-2 shadow-md w-fit"
                        >
                          <span>VISIT</span>
                          <ArrowUpRight size={14} />
                        </a>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Logo Box */}
                        <div className="p-5 rounded-xl bg-text-main/5 border border-text-main/10 flex items-center justify-center min-h-[110px]">
                          <img
                            src="/images/frissco_logo.png"
                            alt="FRISSCO Logo"
                            className="site-frissco-logo max-h-12 w-auto object-contain transition-transform duration-500 hover:scale-105"
                          />
                        </div>

                        {/* MSME Recognition */}
                        <div className="p-4 rounded-xl border border-text-main/10 bg-text-main/[0.03] space-y-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center text-accent">
                              <span className="font-mono text-[10px] font-bold">★</span>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono font-bold tracking-widest text-accent uppercase">
                                OFFICIAL RECOGNITION
                              </p>
                              <h5 className="text-xs font-bold text-text-main uppercase">
                                Govt. of India Registered MSME
                              </h5>
                            </div>
                          </div>
                          <p className="text-[11px] text-text-muted font-mono leading-relaxed">
                            Ministry of MSME • Enterprise Certification for digital infrastructure and software innovation.
                          </p>
                        </div>

                        {/* Narrative */}
                        <div className="space-y-3">
                          <h5 className="text-lg font-black tracking-tight text-text-main leading-snug">
                            Enterprise software, scalable cloud systems, and applied AI pipelines.
                          </h5>
                          <p className="text-sm text-text-muted font-normal leading-relaxed">
                            Independent innovation lab partnering with businesses to architect and deploy production software—from high-concurrency ERP/CRM infrastructure to autonomous AI workflows.
                          </p>
                        </div>

                        {/* Core Competencies */}
                        <div className="space-y-3 pt-4 border-t border-text-main/10">
                          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-accent">
                            CORE COMPETENCIES & ARCHITECTURE
                          </p>
                          <div className="space-y-2.5 text-xs font-mono">
                            <div className="p-2.5 rounded-lg bg-text-main/[0.02] border border-text-main/5">
                              <span className="font-bold text-text-main block">Custom Enterprise Software & ERP/CRM</span>
                              <span className="text-text-muted text-[11px]">React, Spring Boot, PostgreSQL, Docker</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-text-main/[0.02] border border-text-main/5">
                              <span className="font-bold text-text-main block">Applied AI & Intelligent Automation</span>
                              <span className="text-text-muted text-[11px]">Vector embeddings, agentic pipelines & FastAPI microservices</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-text-main/[0.02] border border-text-main/5">
                              <span className="font-bold text-text-main block">Systems Architecture & Infrastructure</span>
                              <span className="text-text-muted text-[11px]">Linux servers, WebSockets & zero-trust networks</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Spec Ribbon */}
                    <div className="site-venture-ribbon py-4 px-6 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-text-main/10">
                      {[
                        { label: 'EST.', val: '2020' },
                        { label: 'SOLUTIONS', val: '12+' },
                        { label: 'REACH', val: 'GLOBAL' },
                        { label: 'ACCREDITED', val: 'MSME' },
                      ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-60">
                            {stat.label}
                          </span>
                          <span className="text-lg sm:text-xl font-black tracking-tight text-accent">
                            {stat.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: Rajalakshmi Institutions */}
                  <div className="relative asym-rounded border-2 border-text-main/10 bg-surface/50 overflow-hidden shadow-lg transition-all hover:border-accent/40 flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="p-6 sm:p-8 border-b border-text-main/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-accent block">
                            INTERNSHIP // SDE INTERN // 2024 – PRESENT
                          </span>
                          <h4 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-[0.9] text-text-main">
                            RAJALAKSHMI<br />
                            <span className="text-outline">INSTITUTIONS</span>
                          </h4>
                        </div>
                        <div className="shrink-0 px-3.5 py-1.5 rounded-lg border border-accent/30 bg-accent/10 text-accent font-mono text-[10px] font-bold tracking-widest uppercase w-fit">
                          SDE INTERN
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Logo Box */}
                        <div className="site-institution-logo-card p-5 rounded-xl flex items-center justify-center min-h-[110px]">
                          <img
                            src="/images/rajalakshmi_institutions_transparent.png"
                            alt="Rajalakshmi Institutions"
                            className="site-institution-logo hover:scale-105"
                          />
                        </div>

                        {/* Institutional Role Recognition */}
                        <div className="p-4 rounded-xl border border-text-main/10 bg-text-main/[0.03] space-y-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-full border border-accent/40 flex items-center justify-center text-accent">
                              <span className="font-mono text-[10px] font-bold">🏛</span>
                            </div>
                            <div>
                              <p className="text-[9px] font-mono font-bold tracking-widest text-accent uppercase">
                                INSTITUTIONAL ROLE
                              </p>
                              <h5 className="text-xs font-bold text-text-main uppercase">
                                Software Developer Intern
                              </h5>
                            </div>
                          </div>
                          <p className="text-[11px] text-text-muted font-mono leading-relaxed">
                            Contributing to engineering software platforms, mission-critical administrative systems, and DevOps pipelines.
                          </p>
                        </div>

                        {/* Narrative */}
                        <div className="space-y-3">
                          <h5 className="text-lg font-black tracking-tight text-text-main leading-snug">
                            Architecting institutional systems, POS workflows, and event infrastructure.
                          </h5>
                          <p className="text-sm text-text-muted font-normal leading-relaxed">
                            Serving as Software Developer Intern, architecting core campus management platforms, payment/order processing systems, and continuous delivery pipelines.
                          </p>
                        </div>

                        {/* Projects Breakdown (Requested by User) */}
                        <div className="space-y-3 pt-4 border-t border-text-main/10">
                          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-accent">
                            KEY PROJECTS & ROLES
                          </p>
                          <div className="space-y-3">
                            {/* Project 1 */}
                            <div className="p-3.5 rounded-xl bg-accent/[0.04] border border-accent/20 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-black text-sm text-text-main tracking-tight uppercase">
                                  Tillo POS and Order Management system
                                </span>
                              </div>
                              <div className="inline-block px-2.5 py-0.5 rounded bg-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                                Lead Software Developer & DevOps
                              </div>
                              <p className="text-[11px] text-text-muted font-mono leading-relaxed pt-1">
                                Point of Sale and high-concurrency order management system with real-time checkout, inventory tracking, order routing, and containerized CI/CD DevOps infrastructure.
                              </p>
                            </div>

                            {/* Project 2 */}
                            <div className="p-3.5 rounded-xl bg-accent/[0.04] border border-accent/20 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-black text-sm text-text-main tracking-tight uppercase">
                                  Event Management System
                                </span>
                              </div>
                              <div className="inline-block px-2.5 py-0.5 rounded border border-accent/40 bg-accent/10 text-accent font-mono text-[10px] font-bold uppercase tracking-wider">
                                Co-developer & DevOps
                              </div>
                              <p className="text-[11px] text-text-muted font-mono leading-relaxed pt-1">
                                Campus-wide event lifecycle management platform featuring attendee registration, automated pass generation, attendance tracking, and production server deployment.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Spec Ribbon */}
                    <div className="site-venture-ribbon py-4 px-6 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-text-main/10">
                      {[
                        { label: 'ORG', val: 'REC / RIT' },
                        { label: 'ROLE', val: 'SDE' },
                        { label: 'CAMPUS', val: 'CHENNAI' },
                        { label: 'STATUS', val: 'ACTIVE' },
                      ].map((stat, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-60">
                            {stat.label}
                          </span>
                          <span className="text-base sm:text-lg font-black tracking-tight text-accent truncate">
                            {stat.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
