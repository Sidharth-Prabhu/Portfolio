import { motion } from 'framer-motion';
import { Terminal, Layout, Database, Cpu, Layers } from 'lucide-react';
import skillsData from '../../data/skills.json';

const categoryMeta = {
  "Languages": {
    index: "01",
    label: "SYSTEMS & APPLIED AI",
    icon: Terminal,
    description: "Core compiled, typed, and assembly languages for bare-metal engineering, high-throughput backend services, and algorithms."
  },
  "Frameworks": {
    index: "02",
    label: "REALTIME & FULL-STACK",
    icon: Layout,
    description: "Modern reactive client interfaces, high-concurrency microservices, and collaborative realtime CRDT synchronization."
  },
  "Databases & Backend": {
    index: "03",
    label: "PERSISTENCE & APIS",
    icon: Database,
    description: "Relational and document storage, distributed data access, secure session control, and bidirectional protocol design."
  },
  "Tools & Platforms": {
    index: "04",
    label: "INFRA, KERNEL & RECON",
    icon: Cpu,
    description: "Containerized environments, virtualized bare-metal hardware testing, Linux POSIX tooling, and automated security reconnaissance."
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white shadow-sm">
                <Layers size={18} />
              </div>
              <span className="text-[12px] font-mono font-bold tracking-[0.35em] uppercase text-accent">
                TECHNICAL ARSENAL & TOOLING
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
              TECHNICAL<br />
              <span className="text-outline">SKILLS</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md space-y-4"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "Low-level systems programming, full-stack application development, and security infrastructure."
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-text-muted/70 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>PRODUCTION & SYSTEMS TESTED</span>
            </div>
          </motion.div>
        </div>

        {/* 2x2 Clean Modern Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {skillsData.categories.map((category, idx) => {
            const meta = categoryMeta[category.name] || {
              index: `0${idx + 1}`,
              label: "ENGINEERING DISCIPLINE",
              icon: Cpu,
              description: "Technical methodologies and production stack tools."
            };
            const Icon = meta.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative asym-rounded border-2 border-text-main/10 bg-surface/50 hover:border-accent/50 hover:bg-surface/80 transition-all duration-500 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Header with category index, icon & domain label */}
                  <div className="p-7 md:p-9 border-b border-text-main/10 flex items-start justify-between gap-4 bg-text-main/[0.01]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase text-accent">
                          CATEGORY // {meta.index}
                        </span>
                        <span className="h-3 w-[1px] bg-text-main/20" />
                        <span className="text-[10px] font-mono font-bold tracking-wider text-text-muted/80 uppercase">
                          {meta.label}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[0.95] text-text-main group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                    </div>

                    <div className="w-12 h-12 rounded-xl border border-text-main/10 bg-text-main/[0.03] group-hover:border-accent/40 group-hover:bg-accent/10 flex items-center justify-center text-text-main group-hover:text-accent transition-all duration-300 shrink-0">
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Body: Discipline Description & Skills Pills */}
                  <div className="p-7 md:p-9 space-y-7">
                    <p className="text-sm md:text-base text-text-muted font-normal leading-relaxed">
                      {meta.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase">
                        <span>PROFICIENCIES</span>
                        <span>{category.skills.length} TECHNOLOGIES</span>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="skill-pill-tag group/pill inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold tracking-wide border border-text-main/10 bg-text-main/[0.03] hover:bg-accent/10 hover:border-accent/40 text-text-main transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover/pill:bg-accent group-hover/pill:scale-125 transition-all" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Ribbon */}
                <div className="site-venture-ribbon py-3.5 px-7 md:px-9 flex items-center justify-between border-t border-text-main/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rotate-45" />
                    <span className="opacity-60 text-[10px] font-bold tracking-wider uppercase">
                      SPECIALIZATION
                    </span>
                  </div>
                  <span className="font-bold text-accent tracking-wide uppercase text-[11px]">
                    {meta.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
