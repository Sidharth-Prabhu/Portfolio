import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';

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
    <section id="experience" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              PROFESSIONAL
            </p>
            <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line">
              HISTORY
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "A timeline of building digital ventures and custom software solutions."
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
              className="group asym-rounded border-2 border-primary p-10 md:p-16 flex flex-col md:flex-row gap-12 items-start hover:bg-primary hover:text-background transition-all duration-700 overflow-hidden relative"
            >
              <div className="md:w-1/3 space-y-4">
                 <div className="text-sm font-black tracking-[0.3em] uppercase opacity-40 italic">{exp.duration}</div>
                 <h3 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase group-hover:text-accent transition-colors">
                    {exp.role}
                 </h3>
              </div>

              <div className="md:w-2/3 space-y-10">
                 <div className="space-y-4">
                    <p className="text-2xl font-black tracking-tight uppercase opacity-60">
                       {exp.company}
                    </p>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                       {exp.description}
                    </p>
                 </div>
                 
                 <div className="flex items-center gap-6">
                    <div className="h-0.5 w-16 bg-accent" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">{exp.location}</span>
                 </div>
              </div>

              <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight size={48} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
