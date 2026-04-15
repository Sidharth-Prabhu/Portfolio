import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const Atom = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse values
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse movement into rotation degrees
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to range [-0.5, 0.5]
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-default group">
      {/* Background Glows */}
      <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full animate-pulse delay-700 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1500
        }}
        className="relative w-72 h-72 md:w-96 md:h-96"
      >
        {/* Baseline Auto-Rotation Wrapper */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Iridescent Metallic Rings */}
          {[0, 60, 120].map((rotate, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                transform: `rotateY(${rotate}deg) rotateX(70deg)`,
                borderWidth: '24px',
                borderStyle: 'solid',
                borderColor: 'transparent',
                // Iridescent metallic effect using conic and linear gradients
                background: `
                  conic-gradient(
                    from 0deg,
                    rgba(99, 102, 241, 0.8),
                    rgba(168, 85, 247, 0.8),
                    rgba(236, 72, 153, 0.8),
                    rgba(99, 102, 241, 0.8)
                  ) border-box,
                  linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.4) 100%) border-box
                `,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                boxShadow: `
                  0 0 40px rgba(99, 102, 241, 0.3),
                  inset 0 0 20px rgba(255, 255, 255, 0.2)
                `,
                filter: 'brightness(1.2) contrast(1.1)',
              }}
              animate={{
                scale: [1, 1.02, 1],
                rotateX: [70, 72, 70],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Core Structure */}
          <div className="absolute inset-0 m-auto w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-3xl rounded-full border border-white/20 shadow-[0_0_80px_rgba(99,102,241,0.4)] flex items-center justify-center overflow-hidden">
            <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
            >
               <div className="w-1/2 h-1/2 rounded-full bg-white opacity-20 blur-md" />
            </motion.div>
          </div>
        </motion.div>

        {/* Orbiting Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white]"
            animate={{
              rotate: [0, 360],
              y: [0, 50, 0, -50, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
              y: { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${150 + i * 40}px center`,
              opacity: 0.6
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Atom;
