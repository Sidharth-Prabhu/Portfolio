import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Code, BookOpen, ExternalLink, Terminal } from 'lucide-react';
import projectsData from '../../data/projects.json';

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase font-mono">
              FLAGSHIP PROJECTS
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
              FEATURED<br />PROJECTS
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "Engineering robust software from bare-metal operating systems to scalable distributed systems."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projectsData.projects.map((project, index) => {
            const displayName = project.name || project.title.split(' - ')[0];
            const displaySubtitle = project.subtitle || (project.title.includes(' - ') ? project.title.split(' - ')[1] : project.category);
            const isFeatured = project.featured || (project.tech && project.tech.includes('Featured'));
            const cleanTech = (project.tech || []).filter(t => t !== 'Featured');

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative flex flex-col justify-between asym-rounded border-2 border-primary/20 bg-surface/30 hover:border-accent hover:bg-surface/60 transition-all duration-500 p-7 md:p-10 shadow-lg"
              >
                {/* Top Meta Bar */}
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-text-main/10">
                    <div className="flex items-center flex-wrap gap-2.5">
                      <span className="font-mono text-xs font-black tracking-widest text-accent uppercase">
                        // {String(index + 1).padStart(2, '0')}
                      </span>
                      {isFeatured && (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/15 text-accent border border-accent/30">
                          FEATURED
                        </span>
                      )}
                      {project.badge && (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-text-main/5 text-text-muted border border-text-main/15">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Compact Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View Source on GitHub"
                          className="w-9 h-9 rounded-full border border-text-main/20 flex items-center justify-center text-text-main/80 hover:bg-text-main hover:text-background hover:border-text-main transition-all"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {project.blog && (
                        <a 
                          href={project.blog}
                          title="Read Technical Case Study"
                          className="w-9 h-9 rounded-full border border-text-main/20 flex items-center justify-center text-text-main/80 hover:bg-text-main hover:text-background hover:border-text-main transition-all"
                        >
                          <BookOpen size={16} />
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo}
                          target={project.demo.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          title="Launch Demo / Simulator"
                          className="px-3.5 h-9 rounded-full bg-accent text-background font-mono text-xs font-black tracking-wider uppercase flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all shadow-md"
                        >
                          <Terminal size={14} />
                          <span>RUN</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Image / Architecture Preview */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-primary/10 border border-text-main/10 shadow-md mb-6 group/img">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={displayName} 
                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 scale-100 group-hover/img:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-surface/90 group-hover:bg-surface transition-colors p-6 text-center">
                        <Code size={48} className="text-text-main/20 group-hover:text-accent transition-colors duration-500 mb-2" />
                        <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted/70 font-bold">
                          {displayName} CORE ARCHITECTURE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight uppercase group-hover:text-accent transition-colors leading-tight">
                        {displayName}
                      </h3>
                      {project.category && (
                        <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-accent uppercase font-bold shrink-0">
                          // {project.category}
                        </span>
                      )}
                    </div>
                    {displaySubtitle && (
                      <p className="font-mono text-xs text-text-muted/80 tracking-wider uppercase font-semibold">
                        {displaySubtitle}
                      </p>
                    )}
                  </div>

                  {/* Project Description */}
                  <p className="text-sm md:text-base text-text-muted leading-relaxed font-normal mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills Footer */}
                <div className="pt-4 border-t border-text-main/10 flex flex-wrap gap-2">
                  {cleanTech.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide border border-text-main/15 bg-text-main/[0.04] text-text-main/80 group-hover:border-text-main/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
