import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const educationList = [
  {
    institution: "Rajalakshmi Institute of Technology",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    duration: "2024 – 2028 (Expected)",
    description: "Focusing on Artificial Intelligence, Data Science, and Full Stack Development. Gaining hands-on experience in building scalable and intelligent software solutions.",
    location: "Chennai, Tamil Nadu",
    achievements: ["B.Tech Student", "AI & DS Specialization"]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-4 bg-black/5 dark:bg-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          My <span className="text-primary dark:text-dark-primary">Education</span>
        </motion.h2>

        <div className="w-full space-y-12">
          {educationList.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-10 rounded-3xl shadow-lg border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all duration-300 relative group overflow-hidden break-words"
            >
              <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-bl-[100px] -z-0 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="p-6 rounded-3xl bg-primary/10 text-primary self-start group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  < GraduationCap size={48} />
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-black/90 dark:text-white/90">
                        {edu.institution}
                      </h3>
                      <p className="text-xl font-medium text-primary dark:text-dark-primary mt-2">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 text-sm font-semibold opacity-60">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                  
                  <p className="opacity-80 text-lg leading-relaxed max-w-2xl">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-black/5 dark:border-white/10 mt-6">
                    {edu.achievements.map((ach, achIdx) => (
                      <div key={achIdx} className="flex items-center gap-2 text-sm font-bold text-primary dark:text-dark-primary bg-primary/5 px-4 py-2 rounded-xl">
                        <Award size={16} />
                        {ach}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
