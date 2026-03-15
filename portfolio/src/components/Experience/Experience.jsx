import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "Founder",
    company: "Frissco Digital Ventures",
    duration: "2023 – Present",
    description: "Built and managed projects under Frissco Media Group including software development and freelancing services. Delivered end-to-end software products for clients while leading product innovation in healthcare, education, and digital business transformation.",
    location: "Chennai, India"
  },
  {
    role: "Freelance Software Developer",
    company: "Self-Employed",
    duration: "2022 – Present",
    description: "Developed custom web, mobile, and backend applications for diverse clients. Notable work includes e-commerce dashboards, digital healthcare solutions, and educational platforms.",
    location: "Remote"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4 bg-background dark:bg-dark-background">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative text-black dark:text-white after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          Work <span className="text-primary dark:text-dark-primary">Experience</span>
        </motion.h2>

        <div className="relative w-full border-l-2 border-primary/20 ml-4 md:ml-0 space-y-12 pb-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-12 group"
            >
              <div className="absolute top-0 -left-[11px] w-5 h-5 rounded-full bg-primary border-4 border-white dark:border-dark-background shadow-lg shadow-primary/20 group-hover:scale-125 transition-transform duration-300 z-10" />
              
              <div className="glass p-8 rounded-3xl shadow-md group-hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/5 relative after:content-[''] after:absolute after:top-2 after:-left-3 after:w-6 after:h-6 after:bg-inherit after:rotate-45 after:border-l after:border-b after:border-black/5 dark:after:border-white/5 overflow-hidden break-words">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-black dark:text-white">
                      <Briefcase size={20} className="text-primary" />
                      {exp.role}
                    </h3>
                    <p className="text-lg font-semibold text-primary/80 dark:text-dark-primary/80 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm font-medium opacity-60 text-black dark:text-white">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={16} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="opacity-80 leading-relaxed text-lg italic text-black dark:text-white">
                  "{exp.description}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
