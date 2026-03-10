import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo3D from "./Logo3D";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State deteksi mobile
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Kurangi range parallax
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // 1. Cek apakah device mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => setVisible(true), 300);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6"
      style={{ opacity }}
    >
      {/* 2. PARTIKEL: Hanya muncul di Desktop, atau kurangi jumlahnya di mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 1000, opacity: [0, 0.5, 0] }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-px h-12 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Konten Utama */}
      <motion.div 
        style={{ y }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-48 h-48 md:w-64 md:h-64 mb-6">
          <Logo3D />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          className="text-center"
        >
          <h2 className="text-red-600 font-bold tracking-[0.3em] text-sm md:text-base mb-2">
            ANNIVERSARY 13 TH
          </h2>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white">
            BRIGADDE <span className="text-red-600">22</span>
          </h1>
          <p className="mt-4 text-gray-400 tracking-widest text-[10px] md:text-xs uppercase">
            Pengabdian Tanpa Batas • Setia Berani
          </p>
        </motion.div>
      </motion.div>

      {/* 3. DEKORASI: Matikan animasi kompleks di mobile */}
      {!isMobile && (
        <>
          <motion.div 
            className="absolute bottom-10 left-5 w-16 h-16 border-2 border-red-500/20 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-20 right-10 w-24 h-24 border border-red-500/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </motion.section>
  );
}