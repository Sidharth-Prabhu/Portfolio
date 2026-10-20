import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    role: "Founder & Software Engineer",
    company: "Frissco Digital Ventures",
    duration: "February 2020 – Present",
    description: "Founded a software startup focused on enterprise software solutions. Developed ERP, CRM, and network simulation products using React, Spring Boot, PostgreSQL, and Docker. Designed and deployed full-stack applications from concept to production. Led product architecture, UI/UX design, backend development, and deployment.",
    location: "Chennai, Tamil Nadu"
  },
  {
    role: "Software Developer Intern",
    company: "Rajalakshmi Institutions",
    duration: "2024 – Present",
    description: "Developing institutional software platforms, administrative workflows, and digital student systems. Building high-performance web applications and backend services supporting academic infrastructure.",
    location: "Chennai, Tamil Nadu"
  },
  {
    role: "Systems & Security Engineer",
    company: "Independent Engineering",
    duration: "2024 – Present",
    description: "Architected 32-bit x86 OS (ShOS) in C/NASM with custom Multiboot-compliant bootloader, VGA/keyboard drivers, memory management, and shell. Engineered high-performance Attack Surface Management recon platform (ScopeIntel) with async parallel discovery and automated PDF audit reporting.",
    location: "Chennai, Tamil Nadu"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase font-mono">
              CAREER & VENTURES
            </p>
            <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
              EXPERIENCE
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "Entrepreneurial venture leadership and end-to-end full-stack systems engineering."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group asym-rounded border-2 border-primary/20 bg-surface/30 p-10 md:p-16 flex flex-col md:flex-row gap-12 items-start hover:border-accent hover:bg-surface/60 transition-all duration-700 overflow-hidden relative shadow-lg"
            >
              <div className="md:w-1/3 space-y-4">
                 <div className="text-xs font-mono font-black tracking-[0.3em] uppercase text-accent">{exp.duration}</div>
                 <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter uppercase group-hover:text-accent transition-colors">
                    {exp.role}
                 </h3>
              </div>

              <div className="md:w-2/3 space-y-8">
                 <div className="space-y-4">
                    <p className="text-xl md:text-2xl font-black tracking-tight uppercase opacity-80 font-mono">
                       {exp.company}
                    </p>
                    <p className="text-lg md:text-xl font-normal leading-relaxed max-w-2xl text-text-muted">
                       {exp.description}
                    </p>
                 </div>
                 
                 <div className="flex items-center gap-6">
                    <div className="h-0.5 w-16 bg-accent" />
                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-text-muted/70">{exp.location}</span>
                 </div>
              </div>

              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={44} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
