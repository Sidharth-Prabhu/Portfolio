import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import projectsData from '../../data/projects.json';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="py-24 px-4 bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          Featured <span className="text-primary dark:text-dark-primary">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {projectsData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/5 dark:border-white/5 relative flex flex-col break-words"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/20 relative flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
                <Code size={64} className="text-primary opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="absolute top-4 right-4 text-xs font-mono font-bold text-primary px-3 py-1 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  #{index + 1}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="opacity-70 text-sm md:text-base line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4 flex-grow">
                  {project.tech.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-bold transition-all hover:bg-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-6 mt-auto">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl glass font-bold text-sm md:text-base hover:bg-primary hover:text-white transition-all border border-black/10 dark:border-white/10"
                  >
                    <Github size={18} />
                    GitHub
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-white font-bold text-sm md:text-base shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
