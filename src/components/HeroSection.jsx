import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo3D from "./Logo3D";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textRevealed, setTextRevealed] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    const textTimer = setTimeout(() => setTextRevealed(true), 800);
    
    // Mouse move effect untuk parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Data untuk particle yang lebih interaktif
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-black text-white"
    >

      {/* ===== Dynamic Background dengan efek militer ===== */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/30 to-black"></div>
        
        {/* Pattern grid garis taktis */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Efek lampu sorot bergerak */}
        <motion.div 
          animate={{
            x: [0, 100, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-red-600/20 to-transparent rounded-full blur-[100px]"
        />
        
        <motion.div 
          animate={{
            x: [0, -100, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-red-600/20 to-transparent rounded-full blur-[100px]"
        />
      </motion.div>

      {/* Noise overlay dengan animasi */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20 animate-pulse-slow"></div>

      {/* ===== Interactive Particles ===== */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-red-500/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Logo dengan efek hover dan parallax */}
      <motion.div 
        className="relative z-30 mb-12 cursor-pointer"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Efek glow berputar */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-2 border-red-500/30 rounded-full border-t-red-500"
        />
        
        {/* Lingkaran pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-8 bg-red-500/10 rounded-full blur-md"
        />
        
        <motion.div
          initial={{ y: -50, opacity: 0, rotate: -10 }}
          animate={{ 
            y: 0, 
            opacity: visible ? 1 : 0,
            rotate: visible ? 0 : -10
          }}
          transition={{ duration: 1, type: "spring" }}
          className="w-36 h-36 md:w-48 md:h-48 mx-auto relative"
        >
          <Logo3D />
        </motion.div>
      </motion.div>

      {/* Main content dengan text reveal animation */}
      <motion.div
        className="relative z-30 max-w-3xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Teks undangan dengan typing effect */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-gray-400 mb-6 tracking-wide relative inline-block"
        >
          <span className="relative">
            Dengan hormat kami mengundang
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-px bg-red-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: textRevealed ? 1 : 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </span>
        </motion.p>

        {/* Main Title dengan efek glitch */}
        <div className="relative mb-6">
          <motion.h1 
            className="text-3xl md:text-6xl font-black leading-tight relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Glitch effect layers */}
            <motion.span 
              className="absolute inset-0 text-red-500 -translate-x-1 translate-y-1 opacity-50"
              animate={{ 
                x: [-2, 2, -2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
            >
              Anniversary 13 Tahun
            </motion.span>
            
            <motion.span 
              className="absolute inset-0 text-blue-500 translate-x-1 -translate-y-1 opacity-50"
              animate={{ 
                x: [2, -2, 2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
            >
              Anniversary 13 Tahun
            </motion.span>
            
            {/* Teks utama */}
            <span className="relative z-10">
              Anniversary 13 Tahun
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-4xl font-bold text-red-500 mt-2"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            Pengabdian Angkatan Dua Dua
          </motion.h2>

          {/* Efek blur pada teks */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 blur-xl -z-10"
            animate={{ 
              x: [-20, 20, -20],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        {/* Decorative line dengan animasi */}
        <motion.div 
          className="relative h-[2px] w-0 mx-auto mb-6 rounded-full overflow-hidden"
          animate={{ width: textRevealed ? "100px" : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          
          
        </motion.div>
      </motion.div>

      

      {/* Floating shapes dengan efek lebih hidup */}
      <motion.div 
        className="absolute bottom-10 left-5 w-16 h-16 border-2 border-red-500/30 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute top-20 right-10 w-24 h-24 border border-red-500/20 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute top-1/3 left-1/4 w-32 h-32 bg-red-500/5 rounded-full blur-xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-red-600/5 rounded-full blur-xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </section>
  );
}