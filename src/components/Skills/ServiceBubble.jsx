import { motion } from 'framer-motion';

const ServiceBubble = () => {
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center pointer-events-none">
      <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-primary to-accent blur-[80px] opacity-20 rounded-full animate-pulse" />
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-64 h-64 md:w-80 md:h-80"
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 backdrop-blur-sm" />
        
        {/* Iridescent Layer */}
        <div className="absolute inset-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-primary/20 to-accent/30 mix-blend-overlay" />
          <motion.div 
            animate={{
               top: ['-100%', '100%'],
               left: ['-100%', '100%']
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45"
          />
        </div>

        {/* Inner Glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 blur-xl" />
        <div className="absolute inset-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center p-4">
            <div className="w-full h-full rounded-full border border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]" />
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceBubble;
