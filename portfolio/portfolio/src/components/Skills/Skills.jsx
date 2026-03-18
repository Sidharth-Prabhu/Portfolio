import { motion } from 'framer-motion';
import skillsData from '../../data/skills.json';
import { Code2, Terminal, Hammer, Cpu } from 'lucide-react';

const categoryIcons = {
  "Programming": <Code2 size={24} />,
  "Frameworks": <Terminal size={24} />,
  "Tools": <Hammer size={24} />,
  "Technologies": <Cpu size={24} />
};

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          My <span className="text-primary dark:text-dark-primary">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {skillsData.categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-primary dark:text-dark-primary mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  {categoryIcons[category.name] || <Code2 size={24} />}
                </div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-3 glass rounded-xl text-center font-medium shadow-sm hover:shadow-md transition-all cursor-default border border-black/5 dark:border-white/5 hover:bg-primary/5 dark:hover:bg-primary/10 overflow-hidden break-words"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
