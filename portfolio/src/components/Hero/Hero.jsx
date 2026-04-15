import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import profileImg from '../../assets/images/my_profile_transparent.png';
import Atom from './Atom';

const Hero = () => {
  const stats = [
    { label: 'PROJECTS COMPLETED', value: '+30' },
    { label: 'CLIENTS WORLDWIDE', value: '+15' },
    { label: 'YEARS EXPERIENCE', value: '+3' },
  ];

  const socialLinks = ['YT', 'IG', 'FB', 'X'];

  return (
    <section id="home" className="pt-40 pb-20 px-6 md:px-12 bg-background min-h-[90vh] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <h1 className="text-[14vw] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-text-main">
                SIDHARTH<br />P L
              </h1>

              <div className="max-w-md space-y-6">
                <p className="text-xl md:text-2xl font-medium text-text-muted leading-relaxed">
                  Welcome to a visual journey that transcends time and space. Discover the artistry of moments.
                </p>

                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <div key={link} className="w-12 h-12 rounded-full border border-text-main/10 flex items-center justify-center font-black text-xs hover:bg-text-main hover:text-background transition-all cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-8 border-t border-text-main/5">
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="text-5xl md:text-6xl font-black tracking-tighter">{stat.value}</h3>
                    <p className="text-[10px] font-black tracking-[0.2em] opacity-60 uppercase max-w-[120px] leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content / Featured Image */}
          <div className="lg:col-span-5 relative w-full flex justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] max-w-[500px]"
            >
              {/* Asymmetrical Shape Background */}
              <div className="absolute inset-0 bg-surface asym-rounded scale-[1.05] translate-x-4 translate-y-4 border border-text-main/5" />

              {/* Main Image Container */}
              <div className="absolute inset-0 bg-accent overflow-hidden asym-rounded border border-text-main/5 shadow-2xl">
                <img
                  src={profileImg}
                  alt="Sidharth P L"
                  className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-12 -right-6 w-16 h-16 rounded-full bg-text-main text-background flex items-center justify-center shadow-xl z-10 animate-bounce">
                <div className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-background opacity-20" />
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/4 w-16 h-16 rounded-full bg-text-main text-background flex items-center justify-center shadow-2xl z-10 hover:scale-110 transition-transform cursor-pointer">
                <ArrowUpRight size={32} />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
