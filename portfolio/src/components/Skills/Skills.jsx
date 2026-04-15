import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import skillsData from '../../data/skills.json';

const Skills = () => {
  const serviceNames = {
    "Programming": "SOFTWARE ARCHITECTURE",
    "Frameworks": "WEB DEVELOPMENT",
    "Databases": "DATA ENGINEERING",
    "Tools & Others": "CLOUD SOLUTIONS"
  };

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              CAPABILITIES
            </p>
            <h2 className="text-7xl md:text-[8rem] font-black leading-none tracking-tighter uppercase whitespace-pre-line">
              OUR<br />SERVICES
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillsData.categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 md:p-16 asym-rounded border-2 transition-all duration-500 hover:-translate-y-2 group flex flex-col justify-between min-h-[400px] ${
                idx % 3 === 1 
                  ? 'bg-accent text-background border-accent' 
                  : 'bg-transparent text-text-main border-primary hover:bg-primary hover:text-background'
              }`}
            >
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                   <div className="text-sm font-black tracking-[0.3em] uppercase opacity-40">0{idx + 1}</div>
                   <ArrowUpRight size={32} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase">
                  {serviceNames[category.name] || category.name.toUpperCase()}
                </h3>
              </div>

              <div className="space-y-6">
                 <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
                         {skill}
                      </span>
                    ))}
                 </div>
                 <div className="h-1 w-20 bg-current opacity-40" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
