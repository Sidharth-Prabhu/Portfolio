import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              ACADEMIC FOUNDATION
            </p>
            <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
              ACADEMIC<br />
              <span className="text-accent text-outline">PATHWAY</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "Rigorous undergraduate engineering in artificial intelligence, algorithms, and distributed systems."
            </p>
          </motion.div>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative asym-rounded border-2 border-text-main/10 bg-surface/50 overflow-hidden"
          >
            {/* Card Sub-Header */}
            <div className="p-8 md:p-14 border-b border-text-main/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center text-white">
                    <GraduationCap size={18} />
                  </div>
                  <span className="text-[12px] font-mono font-bold tracking-[0.35em] uppercase text-accent">
                    UNDERGRADUATE DEGREE // 2024 — 2028
                  </span>
                </div>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-text-main">
                  B.TECH IN<br />
                  <span className="text-accent">ARTIFICIAL INTELLIGENCE</span> & DATA SCIENCE
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-2 rounded-lg border border-text-main/10 bg-text-main/5 text-text-main font-mono text-xs font-bold tracking-widest uppercase">
                  STATUS: ACTIVE (YEAR 3/4)
                </span>
                <span className="px-4 py-2 rounded-lg bg-accent text-white font-mono text-xs font-bold tracking-widest uppercase">
                  2024 – 2028
                </span>
              </div>
            </div>

            {/* Two-Column Academic Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column (7 cols): Narrative & Specializations */}
              <div className="lg:col-span-7 p-8 md:p-14 space-y-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-text-main/10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-accent">
                      INSTITUTION
                    </p>
                    <h4 className="text-2xl md:text-3xl font-black tracking-tight text-text-main uppercase">
                      Rajalakshmi Institute of Technology
                    </h4>
                    <p className="text-sm font-mono text-text-muted">
                      Chennai, Tamil Nadu, India • Affiliated to Anna University • AICTE Approved
                    </p>
                  </div>
                  <p className="text-base md:text-lg text-text-muted font-normal leading-relaxed">
                    Pursuing Bachelor of Technology in Artificial Intelligence and Data Science. Engineering curriculum grounded in deep neural networks, machine learning algorithms, database architecture, and low-level computing systems—paired with rigorous hands-on projects spanning bare-metal OS programming and high-performance security tooling.
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-text-main/10">
                  <p className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-accent">
                    CURRICULUM & CORE SPECIALIZATIONS
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rotate-45 mt-2 flex-shrink-0" />
                      <div className="space-y-1">
                        <span className="text-sm md:text-base font-bold text-text-main tracking-tight">
                          Artificial Intelligence & Machine Learning
                        </span>
                        <p className="text-xs font-mono text-text-muted">
                          Machine Learning Algorithms, Deep Learning, Neural Network Architectures, Computer Vision & LLMs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rotate-45 mt-2 flex-shrink-0" />
                      <div className="space-y-1">
                        <span className="text-sm md:text-base font-bold text-text-main tracking-tight">
                          Data Science, Analytics & Database Engineering
                        </span>
                        <p className="text-xs font-mono text-text-muted">
                          PostgreSQL, MongoDB, Big Data Processing, Vector Databases & Statistical Modeling
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-accent rotate-45 mt-2 flex-shrink-0" />
                      <div className="space-y-1">
                        <span className="text-sm md:text-base font-bold text-text-main tracking-tight">
                          Systems Engineering, Networks & Security
                        </span>
                        <p className="text-xs font-mono text-text-muted">
                          Operating Systems Concepts, Linux Internals, Computer Networks & Information Security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Logo & Institutional Specs */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center gap-6 bg-text-main/[0.02]">
                <div className="p-8 rounded-xl bg-text-main/5 border border-text-main/10 flex items-center justify-center min-h-[160px]">
                  <img
                    src="/images/RIT_Logo.png"
                    alt="Rajalakshmi Institute of Technology"
                    className="site-rit-logo transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 rounded-xl border border-text-main/10 bg-text-main/[0.03] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-text-main/10">
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-accent uppercase">
                      ACADEMIC PROGRAM
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-text-muted uppercase">
                      UNDERGRADUATE
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between items-center text-text-main">
                      <span className="opacity-60">Degree:</span>
                      <span className="font-bold">B.Tech (4 Years)</span>
                    </div>
                    <div className="flex justify-between items-center text-text-main">
                      <span className="opacity-60">Discipline:</span>
                      <span className="font-bold text-accent">AI & Data Science</span>
                    </div>
                    <div className="flex justify-between items-center text-text-main">
                      <span className="opacity-60">Affiliation:</span>
                      <span className="font-bold">Anna University</span>
                    </div>
                    <div className="flex justify-between items-center text-text-main">
                      <span className="opacity-60">Location:</span>
                      <span className="font-bold">Chennai, Tamil Nadu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Spec Ribbon */}
            <div className="site-venture-ribbon py-6 px-8 md:px-14 flex flex-wrap justify-between items-center gap-6 border-t border-text-main/10">
              {[
                { label: 'PROGRAM TIMELINE', val: '2024 — 2028' },
                { label: 'PROGRESSION', val: 'YEAR 3 / 4' },
                { label: 'CAMPUS LOCATION', val: 'CHENNAI, IN' },
                { label: 'FIELD', val: 'AI & DATA SCIENCE' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase opacity-60">
                    {item.label}
                  </span>
                  <span className="text-2xl md:text-3xl font-black tracking-tight text-accent">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
