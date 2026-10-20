import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profileImg from '../../assets/images/my_profile_transparent.png';

const Hero = () => {

  const socialLinks = [
    { label: 'GH', href: 'https://github.com/Sidharth-Prabhu', title: 'GitHub' },
    { label: 'IN', href: 'https://linkedin.com/in/sidharth-prabhu', title: 'LinkedIn' },
    { label: 'MAIL', href: 'mailto:mail@sidharthprabhu.co.in', title: 'Email' },
    { label: 'CV', href: '/resume.pdf', title: 'Resume' },
  ];

  return (
    <section id="home" className="pt-40 pb-20 px-6 md:px-12 bg-background min-h-[90vh] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h1 className="text-[14vw] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-text-main">
                <div className="subtle-hero-title">
                  <span>Sidharth</span>
                  <img src="/subtle-logo.svg" className="subtle-inline-logo" alt="✦" title="Sidharth P L" />
                  <span>P&nbsp;L</span>
                </div>
              </h1>

              <div className="max-w-md space-y-6">
                <p className="text-xl md:text-2xl font-medium text-text-muted leading-relaxed">
                  AI & Data Science student and self-taught systems engineer with hands-on experience spanning operating systems, cybersecurity tooling, and full-stack product development. Founder of Frissco Digital Ventures & Top 6 Infosys TechZooka finalist.
                </p>

                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') || link.href.endsWith('.pdf') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      title={link.title}
                      className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center font-black text-xs hover:bg-text-main hover:text-background transition-all cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Interactive Tech Stack Strip */}
              <div className="pt-6 border-t border-text-main/10 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[11px] font-mono font-bold tracking-[0.28em] text-accent uppercase">
                      CORE TECH STACK & SYSTEMS
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider hidden sm:inline">
                    LOW-LEVEL TO FULL-STACK
                  </span>
                </div>

                {/* Primary Interactive Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: 'C / x86 & NASM', category: 'Systems' },
                    { name: 'React', category: 'Frontend' },
                    { name: 'TypeScript', category: 'Frontend' },
                    { name: 'Python & FastAPI', category: 'Backend & AI' },
                    { name: 'Spring Boot', category: 'Enterprise' },
                    { name: 'Docker', category: 'DevOps' },
                    { name: 'PostgreSQL', category: 'Data' },
                    { name: 'Linux Kernel', category: 'OS' },
                  ].map((tech, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ duration: 0.15 }}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-text-main/10 bg-surface/60 hover:border-accent hover:bg-accent/5 hover:shadow-sm cursor-default transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                      <span className="text-xs font-mono font-bold tracking-tight text-text-main group-hover:text-accent transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Smooth Infinite Marquee Ticker */}
                <div className="relative overflow-hidden rounded-xl bg-text-main/[0.02] border border-text-main/5 py-2 select-none">
                  <div className="flex w-max animate-marquee gap-6 font-mono text-[11px] font-semibold text-text-muted uppercase tracking-widest">
                    {[
                      'C (x86 Bare Metal)',
                      'NASM Assembly',
                      'React',
                      'TypeScript',
                      'FastAPI',
                      'Spring Boot',
                      'Docker & CI/CD',
                      'PostgreSQL',
                      'WebSockets & Yjs',
                      'QEMU & GDB',
                      'Attack Surface Recon',
                      'C (x86 Bare Metal)',
                      'NASM Assembly',
                      'React',
                      'TypeScript',
                      'FastAPI',
                      'Spring Boot',
                      'Docker & CI/CD',
                      'PostgreSQL',
                      'WebSockets & Yjs',
                      'QEMU & GDB',
                      'Attack Surface Recon',
                    ].map((item, idx) => (
                      <span key={idx} className="flex items-center gap-4">
                        <span className="hover:text-accent transition-colors">{item}</span>
                        <span className="text-accent/40 font-bold">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content / Featured Image */}
          <div className="lg:col-span-5 relative w-full flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] max-w-[500px]"
            >
              {/* Asymmetrical Shape Background */}
              <div className="absolute inset-0 bg-surface asym-rounded scale-[1.05] translate-x-4 translate-y-4 border border-text-main/5" />

              {/* Main Image Container */}
              <div className="absolute inset-0 bg-accent overflow-hidden asym-rounded border border-text-main/5 shadow-2xl">
                <img
                  src={profileImg}
                  alt="Sidharth P L"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:scale-105"
                />
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
