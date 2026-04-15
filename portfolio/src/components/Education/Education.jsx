import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const educationList = [
   {
      institution: "Rajalakshmi Institute of Technology",
      logo: "/src/assets/images/RIT_Logo.png",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      duration: "2024 – 2028 (Expected)",
      description: "Focusing on Artificial Intelligence, Data Science, and Full Stack Development. Gaining hands-on experience in building scalable and intelligent software solutions.",
      location: "Chennai, Tamil Nadu",
      achievements: ["B.Tech Student", "AI & DS Specialization"]
   }
];

const Education = () => {
  return (
    <section id="education" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-[12px] font-black tracking-[0.4em] text-accent uppercase">
              Academic Foundation
            </p>
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              Pathway
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {educationList.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-surface/40 border-2 border-text-main/5 overflow-hidden transition-all duration-700 hover:border-accent/30"
            >
              {/* Top Meta Bar */}
              <div className="p-5 md:px-10 border-b border-text-main/5 flex justify-between items-center bg-text-main/5">
                <div className="flex items-center gap-4">
                  <div className="w-7 h-7 bg-accent flex items-center justify-center">
                    <GraduationCap size={14} className="text-background" />
                  </div>
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60">Credential Verification // 001</span>
                </div>
                <div className="text-[9px] font-black tracking-[0.3em] uppercase text-accent">
                  {edu.duration}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Technical Details & Degree Highlight */}
                <div className="lg:col-span-8 flex flex-col justify-between order-2 lg:order-1">
                  <div className="p-8 md:p-14 space-y-8">
                    <div className="space-y-3">
                      <p className="text-[13px] font-black uppercase tracking-[0.4em] text-accent">Primary Degree</p>
                      <h3 className="text-4xl md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase text-text-main">
                        {edu.degree.split(' in ').map((part, i) => (
                          <span key={i} className={i === 1 ? "text-accent block mt-3" : "block"}>
                            {part}{i === 0 ? " IN" : ""}
                          </span>
                        ))}
                      </h3>
                      <div className="pt-6 flex items-center gap-5">
                        <div className="h-0.5 w-10 bg-accent" />
                        <p className="text-xl md:text-2xl font-black tracking-tight uppercase text-text-main opacity-80">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <p className="text-lg md:text-xl font-medium leading-relaxed text-text-main opacity-90 max-w-3xl">
                      {edu.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-text-main/10">
                      <div className="space-y-4">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-accent">Core Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.achievements.map((ach, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 border border-text-main/20 text-[9px] font-black uppercase tracking-widest bg-text-main/5 text-text-main group-hover:bg-accent group-hover:text-background group-hover:border-accent transition-all">
                              <Award size={10} />
                              {ach}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 bg-text-main text-background flex flex-col justify-between group-hover:bg-accent group-hover:text-background transition-colors duration-500">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-50">Current Status</p>
                        <p className="text-lg font-black uppercase tracking-tighter leading-tight">In-Progress: Architecting<br />Intelligent Systems</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Monolithic Logo Anchor */}
                <div className="lg:col-span-4 relative overflow-hidden border-b lg:border-b-0 lg:border-l border-text-main/10 min-h-[350px] group/logo order-1 lg:order-2">
                  {/* Animated Pattern Layer */}
                  <div className="absolute inset-0 bg-[#0a0a0a]" />
                  <div 
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '60px 60px',
                      animation: 'patternMove 20s linear infinite'
                    }}
                  />

                  <div className="relative z-10 h-full flex items-center justify-center p-10">
                    <img 
                      src={edu.logo} 
                      alt={edu.institution} 
                      className="h-36 md:h-48 object-contain brightness-0 invert group-hover/logo:scale-105 transition-transform duration-1000"
                    />
                  </div>

                  {/* Overlay Info */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/5 backdrop-blur-md border border-white/10">
                    <p className="text-[9px] font-black tracking-[0.2em] text-white/60 uppercase mb-1">Campus Location</p>
                    <p className="text-base font-black text-white uppercase tracking-tighter text-right">{edu.location}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Bar */}
              <div className="bg-text-main/5 p-3 overflow-hidden border-t border-text-main/10">
                <div className="flex gap-10 items-center whitespace-nowrap opacity-30 group-hover:opacity-60 transition-opacity">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-[9px] font-black tracking-[0.5em] uppercase text-text-main">
                      SYSTEM_STATUS: ACADEMIC_TRACKING_ACTIVE // COMPONENT_ID: EDU_RIT_001
                    </span>
                  ))}
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
