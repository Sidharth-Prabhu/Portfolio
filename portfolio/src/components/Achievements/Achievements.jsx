import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star, Github, Globe, Code, ArrowUpRight } from 'lucide-react';

const achievementsList = [
  {
    icon: <Trophy size={48} />,
    title: "Finalist - Infosys TechZooka",
    org: "Innovation Summit 2024",
    description: "One of the 6 finalists selected for the 'Moves' medicine delivery application project.",
    date: "2024"
  },
  {
    icon: <Award size={48} />,
    title: "MongoDB Schema Design",
    org: "MongoDB University",
    description: "Earned MongoDB Schema Design patterns and Antipatterns Skill badge.",
    date: "2024"
  },
  {
    icon: <Medal size={48} />,
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
    <section id="achievements" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              RECOGNITION
            </p>
            <h2 className="text-7xl md:text-9xl font-black leading-none tracking-tighter uppercase whitespace-pre-line text-text-main">
              HONORS &<br />STATS
            </h2>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 asym-rounded border-2 border-primary text-center group hover:bg-primary hover:text-background transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-black mx-auto mb-8 transition-transform group-hover:scale-110">
                {stat.icon}
              </div>
              <h4 className="text-4xl font-black tracking-tighter uppercase leading-none">{stat.value}</h4>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {achievementsList.map((ach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-10 md:p-12 asym-rounded border-2 border-primary flex flex-col justify-between group h-full hover:bg-primary hover:text-background transition-all duration-700 min-h-[450px]"
            >
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-500">
                    {ach.icon}
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black tracking-widest text-accent italic">{ach.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl font-black tracking-tighter uppercase leading-none group-hover:text-accent transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-[11px] font-black tracking-[0.2em] text-accent uppercase italic opacity-60">
                    {ach.org}
                  </p>
                </div>

                <p className="text-xl font-medium leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity text-text-muted">
                  {ach.description}
                </p>
              </div>

              <div className="pt-10 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] font-black tracking-widest uppercase italic">AWARDED PROTOCOL</span>
                 <ArrowUpRight size={32} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
