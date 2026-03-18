import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star, Github, Globe, Code } from 'lucide-react';

const achievementsList = [
  {
    icon: <Trophy size={48} className="text-yellow-500" />,
    title: "Finalist - Infosys TechZooka",
    org: "Innovation Summit 2024",
    description: "One of the 6 finalists selected for the 'Moves' medicine delivery application project.",
    date: "2024"
  },
  {
    icon: <Award size={48} className="text-blue-500" />,
    title: "MongoDB Schema Design",
    org: "MongoDB University",
    description: "Earned MongoDB Schema Design patterns and Antipatterns Skill badge.",
    date: "2024"
  },
  {
    icon: <Medal size={48} className="text-orange-500" />,
    title: "Google Solution Challenge",
    org: "Google Developers",
    description: "Active participant in the Google Solution Challenge Hackathon 2025.",
    date: "2025"
  }
];

const stats = [
  { icon: <Github size={24} />, label: "Open Source", value: "Contributor" },
  { icon: <Globe size={24} />, label: "Vector Search", value: "Certified" },
  { icon: <Star size={24} />, label: "GitHub Profile", value: "Active" },
  { icon: <Code size={24} />, label: "Tech Stack", value: "Full Stack" }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-4 bg-background dark:bg-dark-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-20 relative text-black dark:text-white after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          My <span className="text-primary dark:text-dark-primary">Achievements</span>
        </motion.h2>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl text-center border border-black/5 dark:border-white/5 shadow-md group hover:shadow-xl transition-all duration-300 overflow-hidden break-words"
            >
              <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-extrabold mb-2 text-black dark:text-white">{stat.value}</h4>
              <p className="text-sm font-semibold opacity-60 uppercase tracking-widest text-black dark:text-white">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {achievementsList.map((ach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all duration-300 shadow-lg relative group overflow-hidden break-words"
            >
              <div className="mb-8 p-6 bg-primary/5 rounded-3xl w-fit group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {ach.icon}
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-bold text-black dark:text-white">{ach.title}</h3>
                </div>
                <p className="font-bold text-primary dark:text-dark-primary/80 uppercase tracking-wider text-xs">{ach.org} • {ach.date}</p>
                <p className="opacity-80 text-lg leading-relaxed text-black dark:text-white">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
