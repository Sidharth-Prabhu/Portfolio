import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Code, BookOpen } from 'lucide-react';
import projectsData from '../../data/projects.json';

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              SELECTED WORKS
            </p>
            <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line">
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
              "A curated collection of digital solutions bridging AI with practical implementation."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col space-y-10"
            >
              {/* Project Image Area */}
              <div className="relative aspect-video asym-rounded overflow-hidden bg-primary border-2 border-primary shadow-2xl transition-all duration-700 hover:scale-[1.02] group/img">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-110 group-hover/img:scale-100"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface group-hover:bg-background transition-colors">
                     <Code size={120} className="text-text-main/10 group-hover:text-accent transition-colors duration-500" />
                  </div>
                )}
                
                <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center font-black text-xl shadow-xl z-10">
                   {index + 1}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-8 px-2">
                <div className="flex items-start justify-between gap-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {project.tech.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                   <div className="flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full border-2 border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-background transition-all"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {project.blog && (
                      <a 
                        href={project.blog}
                        className="w-16 h-16 rounded-full border-2 border-text-main/10 flex items-center justify-center hover:bg-text-main hover:text-background transition-all"
                      >
                        <BookOpen size={24} />
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-text-main text-background flex items-center justify-center hover:scale-110 transition-all border-2 border-text-main"
                      >
                        <ArrowUpRight size={24} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xl font-medium text-text-muted leading-relaxed max-w-xl">
                  {project.description}
                </p>
              </div>
            </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
