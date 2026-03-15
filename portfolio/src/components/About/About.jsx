import { motion } from 'framer-motion';
import { User, Code, Terminal, Brain } from 'lucide-react';
import profileImg from '../../assets/images/my_profile.jpg';

const About = () => {
  const highlights = [
    { icon: <User size={20} />, text: 'B.Tech AI & Data Science' },
    { icon: <Brain size={20} />, text: 'Freelance Software Developer' },
    { icon: <Code size={20} />, text: 'Full Stack Enthusiast' },
    { icon: <Terminal size={20} />, text: 'Systems & Cloud' },
  ];

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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="about" className="py-24 px-4 bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-16 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-4 after:mx-auto"
        >
          About <span className="text-primary dark:text-dark-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:scale-110 transition-transform duration-500 -z-10"></div>
              <div className="w-64 h-80 md:w-80 md:h-[450px] glass rounded-3xl overflow-hidden border-2 border-white/20 relative z-10">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 font-bold text-black/10 dark:text-white/10 text-9xl select-none">
                  SP
                </div>
                {/* Profile Image */}
                <img
                  src={profileImg}
                  alt="Sidharth P L"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.p variants={itemVariants} className="text-lg leading-relaxed opacity-80">
              Innovative and detail-oriented B.Tech Artificial Intelligence and Data Science student with strong expertise in Java, Python, Node.js, and full-stack development. Experienced in building freelance projects, web and mobile applications, and scalable backend solutions.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed opacity-80">
              Founder of Frissco Digital Ventures, with a proven ability to deliver creative software solutions aligned with real-world needs. Hands-on exposure to cloud, automation, and AI-driven applications.
            </motion.p>

            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-primary/10 transition-colors group cursor-default shadow-sm border border-black/5 dark:border-white/5"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {highlight.icon}
                  </div>
                  <span className="font-semibold">{highlight.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
